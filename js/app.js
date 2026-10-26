/* Non-Toxic Living - main app (no build step, plain JS). */
(function () {
  "use strict";

  const PRODUCTS = window.NTL_PRODUCTS || [];
  const RECIPES = window.NTL_RECIPES || [];
  const CLOTHING = window.NTL_CLOTHING || [];
  const FIBERS = window.NTL_FIBERS || [];
  const ADDITIVES = (window.NTL_ADDITIVES || []).map((a) => ({ ...a, rx: new RegExp(a.re, "i") }));
  const CAT_WORDS = window.NTL_DIET_CATEGORY_WORDS || {};
  const DIETS = (window.NTL_DIETS || []).map((d) => ({
    ...d,
    safeRx: new RegExp(d.safe.join("|"), "gi"),
    badRx: d.bad.map(([re, name]) => ({ rx: new RegExp(re, "i"), name })),
    yesRx: new RegExp(d.yes, "i"),
    swapRx: new RegExp(d.swap, "i"),
    catRx: CAT_WORDS[d.id] ? new RegExp(CAT_WORDS[d.id], "i") : null
  }));
  const NON_FOOD = new Set(["Home", "Personal Care"]);

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const enc = encodeURIComponent;

  /* ---------------- icons (thin line, no emoji) ---------------- */
  const ICONS = {
    search: '<circle cx="11" cy="11" r="6.5"/><path d="m16 16 4 4"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    minus: '<path d="M5 12h14"/>',
    check: '<path d="m5 12.5 4.5 4.5L19 7"/>',
    x: '<path d="M6 6l12 12M18 6 6 18"/>',
    ban: '<circle cx="12" cy="12" r="8.5"/><path d="M6 18 18 6"/>',
    pin: '<path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z"/><circle cx="12" cy="10" r="2.2"/>',
    clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
    arrow: '<path d="m9 5 7 7-7 7"/>',
    external: '<path d="M7 17 17 7M9 7h8v8"/>',
    shirt: '<path d="M9 4 4 6.5 5.5 11 8 10v10h8V10l2.5 1L20 6.5 15 4a3 3 0 0 1-6 0Z"/>',
    share: '<path d="M12 15V4M8 8l4-4 4 4"/><path d="M5 12v7a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-7"/>'
  };
  const icon = (name, size = 18) =>
    `<svg class="ic" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name]}</svg>`;

  /* ---------------- storage (never throws) ---------------- */
  const store = {
    get(k, fallback) {
      try { const v = localStorage.getItem("ntl:" + k); return v == null ? fallback : JSON.parse(v); } catch { return fallback; }
    },
    set(k, v) {
      try { localStorage.setItem("ntl:" + k, JSON.stringify(v)); } catch { /* private mode */ }
    },
    del(k) {
      try { localStorage.removeItem("ntl:" + k); } catch { /* ignore */ }
    }
  };

  function toast(msg) {
    const t = $("#toast");
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(toast._t);
    toast._t = setTimeout(() => t.classList.remove("show"), 2400);
  }

  /* ---------------- navigation ---------------- */
  const VIEWS = ["search", "recipes", "scan", "local", "clothing", "about", "list"];
  function go(view, { push = true } = {}) {
    if (!VIEWS.includes(view)) view = "search";
    if (view !== "scan") stopScan();
    $$(".view").forEach((v) => v.classList.toggle("active", v.id === "view-" + view));
    $$(".tabbar button").forEach((b) => b.classList.toggle("active", b.dataset.go === view));
    if (push && location.hash !== "#" + view) history.pushState(null, "", "#" + view);
    if (view === "list") renderList();
    window.scrollTo({ top: 0 });
  }
  window.addEventListener("popstate", () => go(location.hash.slice(1) || "search", { push: false }));

  document.addEventListener("click", (e) => {
    const goEl = e.target.closest("[data-go]");
    if (goEl) { e.preventDefault(); closeSheets(); go(goEl.dataset.go); return; }
    const s = e.target.closest("[data-search]");
    if (s) { e.preventDefault(); closeSheets(); runSearch(s.dataset.search); return; }
    const r = e.target.closest("[data-recipe]");
    if (r) { e.preventDefault(); openRecipe(r.dataset.recipe); return; }
    const add = e.target.closest("[data-add]");
    if (add) { e.preventDefault(); addToList([JSON.parse(add.dataset.add)]); return; }
    const d = e.target.closest("[data-diet]");
    if (d) { toggleDiet(d.dataset.diet); return; }
    if (e.target.closest("[data-diet-clear]")) { setDiets([]); return; }
    if (e.target.closest("[data-close]")) closeSheets();
  });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeSheets(); });

  /* ---------------- diets ---------------- */
  const getDiets = () => store.get("diets", []).filter((id) => DIETS.some((d) => d.id === id));
  const activeDiets = () => { const ids = getDiets(); return DIETS.filter((d) => ids.includes(d.id)); };
  const dietLabels = (list) => list.map((d) => d.label).join(" + ");

  function setDiets(ids) {
    store.set("diets", ids);
    syncDietBars();
    onDietChange();
  }
  function toggleDiet(id) {
    const ids = getDiets();
    setDiets(ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]);
  }
  function renderDietBars() {
    $$("[data-diet-bar]").forEach((el) => {
      const title = el.dataset.dietTitle || "Diet";
      el.innerHTML = `<div class="diet-head"><p class="kicker">${esc(title)}</p><button class="diet-clear" data-diet-clear hidden>Clear</button></div>
        <div class="diet-bar" role="group" aria-label="${esc(title)}">${DIETS.map((d) =>
          `<button class="diet-chip" data-diet="${esc(d.id)}" aria-pressed="false">${icon("check", 15)}${esc(d.label)}</button>`).join("")}</div>`;
    });
    syncDietBars();
  }
  // Update pressed state in place so the scrolled chip row doesn't jump.
  function syncDietBars() {
    const ids = getDiets();
    $$(".diet-chip").forEach((b) => b.setAttribute("aria-pressed", String(ids.includes(b.dataset.diet))));
    $$("[data-diet-clear]").forEach((b) => (b.hidden = !ids.length));
  }
  function onDietChange() {
    const q = $("#q").value;
    if (q.trim() && $("#results").innerHTML) renderResults(q);
    renderRecipeGrid($("#recipeFilter").value);
    if (lastAnalysis) renderAnalysis(lastAnalysis, { scroll: false });
    if (!$("#sheet").hidden && currentRecipe) openRecipe(currentRecipe, currentServings, { keepScroll: true });
  }

  // What in `text` breaks this diet? Returns [{ name, word }].
  function dietConflicts(diet, text) {
    let t = " " + String(text || "").toLowerCase().replace(/[’']/g, "'") + " ";
    t = t.replace(diet.safeRx, " ");
    t = t.replace(/\b(no|without|free of|zero|never|not)\s+(added\s+)?[a-z]+(?:\s*(?:,|or|and|&)\s*[a-z]+)*/g, " ").replace(/\b[a-z]+-free\b/g, " ");
    const out = [];
    for (const b of diet.badRx) {
      const m = t.match(b.rx);
      if (m && !out.some((o) => o.name === b.name)) out.push({ name: b.name, word: m[0].trim() });
    }
    return out;
  }

  // Recipe vs one diet: "fits" | "swap" | "no", with the conflicting ingredients.
  function recipeDiet(r, diet) {
    const conflicts = [];
    if (diet.keto) {
      const n = r.nutrition || {};
      const net = Math.round((n.carbs ?? 99) - (n.fiber ?? 0));
      if (net > 10) conflicts.push({ item: `about ${net}g net carbs per ${r.unit || "serving"}`, name: "too many carbs" });
    } else {
      r.ingredients.forEach((i, idx) => {
        // "butter or coconut oil" only breaks a diet if every option does; "(optional)" never does.
        const text = String(i.item).replace(/\([^)]*\b(swap|instead|not)\b[^)]*\)/gi, " ");
        if (/\boptional\b/i.test(text)) return;
        const alts = text.replace(/[()]/g, " ").split(/\s+or\s+/i).map((a) => dietConflicts(diet, a));
        if (alts.every((c) => c.length)) conflicts.push({ idx, item: i.item, name: alts[0][0].name });
      });
    }
    const swap = (r.swaps || []).find((s) => diet.swapRx.test(s.tag));
    return { diet, conflicts, swap, status: !conflicts.length ? "fits" : swap ? "swap" : "no" };
  }
  function recipeFit(r, diets = activeDiets()) {
    const per = diets.map((d) => recipeDiet(r, d));
    const status = per.some((p) => p.status === "no") ? "no" : per.some((p) => p.status === "swap") ? "swap" : "fits";
    return { per, status };
  }

  // Product pick vs the selected diets: "yes" | "no" | "unknown"
  function pickFit(category, pick, diets) {
    const catText = `${category.name} ${(category.keys || []).join(" ")}`;
    const text = `${pick.p} ${pick.why || ""}`;
    const per = diets.map((d) => {
      const conflict = dietConflicts(d, text);
      if (conflict.length) return { d, s: "no", why: conflict[0].name };
      if (d.yesRx.test(text)) return { d, s: "yes" };
      const catBad = dietConflicts(d, catText).length || (d.catRx && d.catRx.test(catText));
      if (catBad && pick.b !== "Homemade") return { d, s: "no", why: "" };
      return { d, s: "unknown" };
    });
    const status = per.some((p) => p.s === "no") ? "no" : per.every((p) => p.s === "yes") ? "yes" : "unknown";
    return { per, status };
  }

  /* ---------------- link builders ---------------- */
  function buyLinks(brand, product) {
    const q = `${brand} ${product}`.trim();
    return [
      { label: "Amazon", url: `https://www.amazon.com/s?k=${enc(q)}` },
      { label: "Thrive Market", url: `https://thrivemarket.com/search?search=${enc(q)}` },
      { label: "Target", url: `https://www.target.com/s?searchTerm=${enc(q)}` },
      { label: "Walmart", url: `https://www.walmart.com/search?q=${enc(q)}` },
      { label: "Whole Foods", url: `https://www.wholefoodsmarket.com/search?text=${enc(q)}` },
      { label: "Nearby", url: `https://www.google.com/maps/search/?api=1&query=${enc(q + " near me")}` }
    ];
  }
  const linkRow = (links) =>
    `<div class="buy">${links.map((l) => l.url.startsWith("#")
      ? `<a href="#" data-go="${esc(l.url.slice(1))}">${esc(l.label)}</a>`
      : `<a href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)}</a>`).join("")}</div>`;

  /* ---------------- scores (Yuka-style) ---------------- */
  function grade(score) {
    if (score >= 75) return { cls: "s-ex", label: "Excellent" };
    if (score >= 50) return { cls: "s-good", label: "Good" };
    if (score >= 25) return { cls: "s-poor", label: "Poor" };
    return { cls: "s-bad", label: "Bad" };
  }

  /* ---------------- search ---------------- */
  const STOP = new Set("i im i'm me my a an the to for of and or with without want wanna need looking find show give get buy buying some any something craving crave am is are what where how can could would like please brand brands recipe recipes make making bake cook clean healthy healthier good best non nontoxic toxic free natural real option options alternative alternatives store near".split(" "));
  const norm = (s) => String(s).toLowerCase().replace(/[’']/g, "").replace(/[^a-z0-9\s-]/g, " ").replace(/-/g, " ").replace(/\s+/g, " ").trim();
  const sing = (t) => (t.length > 3 ? t.replace(/ies$/, "y").replace(/([^s])s$/, "$1") : t);
  const toks = (s) => norm(s).split(" ").filter((t) => t && !STOP.has(t)).map(sing);

  function scoreItem(query, item) {
    const q = norm(query).replace(/\b(seed oil free|no seed oils?|without seed oils?|non toxic|nontoxic)\b/g, " ").replace(/\s+/g, " ").trim();
    const qPad = " " + toks(q).join(" ") + " ";
    const qT = toks(q);
    if (!qT.length) return 0;
    let best = 0;
    const keys = [item.name || item.title, ...(item.keys || [])];
    for (const k of keys) {
      const kT = toks(k);
      const kj = kT.join(" ");
      if (!kj) continue;
      if (kj === qT.join(" ")) best = Math.max(best, 100);
      else if (qPad.includes(" " + kj + " ")) best = Math.max(best, 60 + kj.length);
      else if (kj.includes(qT.join(" ")) && qT.join(" ").length >= 3) best = Math.max(best, 40);
      const overlap = qT.filter((t) => kT.includes(t)).length;
      if (overlap) best = Math.max(best, 15 * overlap + (overlap === kT.length ? 10 : 0));
    }
    return best;
  }
  const searchIn = (list, q, min = 15) =>
    list.map((it) => ({ it, s: scoreItem(q, it) })).filter((x) => x.s >= min).sort((a, b) => b.s - a.s);

  function runSearch(query) {
    go("search");
    $("#q").value = query;
    renderResults(query);
  }

  // Home screen: one "skip this, choose that" swap, changing daily.
  function renderDailySwap() {
    const pool = PRODUCTS.filter((p) => !NON_FOOD.has(p.cat) && (p.avoid || []).length && (p.picks || []).some((k) => k.site));
    if (!pool.length) return;
    const p = pool[Math.floor(Date.now() / 86400000) % pool.length];
    const pick = p.picks.filter((k) => k.site).sort((x, y) => (y.score || 0) - (x.score || 0))[0];
    const skip = p.avoid[0];
    $("#dailySwap").innerHTML = `<section class="swap-card" aria-label="Today's swap">
      <div class="swap-head"><p class="kicker">Today's swap · ${esc(p.name)}</p><a href="#" data-search="${esc(p.keys && p.keys[0] ? p.keys[0] : p.name)}">See all</a></div>
      <div class="swap-pair">
        <div class="swap-skip"><small>Skip</small><b>${esc(skip.b)}</b><span>${esc(skip.why)}</span></div>
        <div class="swap-choose"><small>Choose · ${esc(pick.score ?? "")}</small><b>${esc(pick.b)} ${esc(pick.p)}</b><span>${esc(pick.why)}</span></div>
      </div>
    </section>`;
  }

  function renderResults(query) {
    const out = $("#results");
    $("#homeExtras").hidden = !!query.trim();
    document.body.classList.toggle("searching", !!query.trim());
    if (!query.trim()) { out.innerHTML = ""; return; }
    const diets = activeDiets();

    let prods = searchIn(PRODUCTS, query);
    let recs = searchIn(RECIPES, query);
    let cloth = searchIn(CLOTHING, query);
    // Drop weak partial matches (e.g. "rice" in fried rice when searching "rice krispies")
    const top = Math.max(0, ...[prods, recs, cloth].map((l) => (l[0] ? l[0].s : 0)));
    const strong = (l, n) => l.filter((x) => x.s >= top * 0.5).slice(0, n);
    prods = strong(prods, 5); recs = strong(recs, 6); cloth = strong(cloth, 3);

    let hiddenRecipes = 0;
    if (diets.length) {
      const before = recs.length;
      recs = recs.filter((x) => recipeFit(x.it, diets).status !== "no")
        .sort((a, b) => (recipeFit(a.it, diets).status === "fits" ? 0 : 1) - (recipeFit(b.it, diets).status === "fits" ? 0 : 1));
      hiddenRecipes = before - recs.length;
    }

    const nq = norm(query);
    const wantsRecipe = /\b(craving|crave|recipe|make|bake|cook|homemade)\b/.test(nq);
    const sections = [];
    if (prods.length) sections.push({ s: prods[0].s + (wantsRecipe ? 0 : 5), products: true, html: prods.map((x) => productCard(x.it)).join('<hr class="divider">') });
    if (recs.length || hiddenRecipes) sections.push({
      s: (recs[0] ? recs[0].s : 0) + (wantsRecipe ? 50 : 0),
      html: `<div class="subhead"><h2 class="sec-title" style="margin:0">Make it yourself</h2></div>${recs.length ? `<div class="grid">${recs.map((x) => recipeCard(x.it)).join("")}</div>` : ""}
        ${hiddenRecipes ? `<p class="hidden-note">${hiddenRecipes} recipe${hiddenRecipes > 1 ? "s" : ""} hidden because ${hiddenRecipes > 1 ? "they don't" : "it doesn't"} fit ${esc(dietLabels(diets))}.</p>` : ""}`
    });
    if (cloth.length) sections.push({ s: cloth[0].s, html: `<h2 class="sec-title">Natural-fiber picks</h2>${cloth.map((x) => clothingCard(x.it)).join("")}` });
    sections.sort((a, b) => b.s - a.s);

    // The first section leads the page with a big title, like its own screen.
    if (sections[0] && sections[0].products) sections[0].html = sections[0].html.replace('<article class="product">', '<article class="product lead">').replace(/<h2 class="product-title">(.*?)<\/h2>/, '<h1 class="product-title">$1</h1>');
    out.innerHTML = (sections.length ? sections.map((s) => s.html).join('<hr class="divider">') : noResults(query)) + aiBox(query, !sections.length);
    bindAiBox(out, query);
    store.set("lastSearch", query);
  }

  function noResults(q) {
    return `<div class="card empty">
      <h3>We don't have "${esc(q)}" in our guide yet</h3>
      <p>Here's how to find a clean version fast:</p>
      <ol class="steps">
        <li>Flip the package and use <a href="#" data-go="scan">Label Check</a> to scan or paste the ingredients.</li>
        <li>Look for <b>avocado oil, olive oil, coconut oil, butter or tallow</b>, and no canola, soybean, sunflower or "vegetable oil".</li>
        <li>Search the clean grocers below.</li>
      </ol>
      ${linkRow([
        { label: "Thrive Market", url: `https://thrivemarket.com/search?search=${enc(q)}` },
        { label: "Amazon: seed oil free", url: `https://www.amazon.com/s?k=${enc(q + " seed oil free")}` },
        { label: "Whole Foods", url: `https://www.wholefoodsmarket.com/search?text=${enc(q)}` },
        { label: "Google: clean brands", url: `https://www.google.com/search?q=${enc(q + " no seed oils clean brand")}` }
      ])}
    </div>`;
  }

  /* ---------------- product cards ---------------- */
  // One brand pick, laid out like the design: score, brand, product, why; oil + "Add to list";
  // store links tucked under "Where to buy".
  function pickCard({ k, fit }, category) {
    const g = grade(k.score ?? 70);
    let action, where = "";
    if (k.recipe) action = `<a href="#" class="btn small" data-recipe="${esc(k.recipe)}">View recipe</a>`;
    else if (k.local) action = `<a class="btn small" target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query=${enc(k.p + " near me")}">Find near me</a>`;
    else {
      action = `<button class="btn small" data-add='${esc(JSON.stringify({ name: `${k.b} - ${k.p}`, note: category.name }))}'>Add to list</button>`;
      if (k.b !== "Any brand" && k.b !== "Homemade") where = `<details class="where"><summary>Where to buy</summary>${linkRow([...(k.site ? [{ label: "Brand site", url: k.site }] : []), ...buyLinks(k.b, k.p)])}</details>`;
    }
    const dietTags = fit ? fit.per.map((x) =>
      x.s === "yes" ? `<span class="tag fit">${icon("check", 12)}${esc(x.d.label)}</span>`
      : x.s === "no" ? `<span class="tag nofit">Not ${esc(x.d.label.toLowerCase())}</span>` : "").join("") : "";
    return `<li class="pick${fit && fit.status === "no" ? " dim" : ""}">
      <div class="pick-top">
        <div class="score ${g.cls}" title="${g.label}"><b>${esc(k.score ?? "-")}</b><small>${g.label}</small></div>
        <div class="pick-body">
          <div class="pick-head"><b>${esc(k.b)}</b><span>${esc(k.p)}</span></div>
          <p>${esc(k.why)}</p>
        </div>
      </div>
      <div class="pick-foot">
        <div class="tags">${k.oil && k.oil !== "None" ? `<span class="tag">Oil · ${esc(k.oil)}</span>` : ""}${dietTags}</div>
        ${action}
      </div>
      ${where}
    </li>`;
  }

  function productCard(p, { ai = false, lead = false } = {}) {
    const diets = NON_FOOD.has(p.cat) ? [] : activeDiets();
    const rank = { yes: 0, unknown: 1, no: 2 };
    const picks = (p.picks || []).map((k) => ({ k, fit: diets.length ? pickFit(p, k, diets) : null }))
      .sort((a, b) => (a.fit && b.fit ? rank[a.fit.status] - rank[b.fit.status] : 0));
    const allNo = diets.length && picks.length && picks.every((x) => x.fit.status === "no");
    const Title = lead ? "h1" : "h2";
    return `<article class="product${lead ? " lead" : ""}">
      <header><p class="kicker">${esc(p.cat || "")}${ai ? ` <span class="ai-badge">AI suggestion</span>` : ""}</p><${Title} class="product-title">${esc(p.name)}</${Title}></header>
      ${allNo ? `<p class="diet-note">None of these fit ${esc(dietLabels(diets))}. Try the recipe tab for a version you can make.</p>` : ""}
      ${p.tip ? `<div class="tip"><b>What to know</b>${esc(p.tip)}</div>` : ""}
      ${p.leastBad ? `<div class="leastbad"><b>Hard to find seed-oil-free?</b> ${esc(p.leastBad)}</div>` : ""}
      <div class="subhead"><h3>Cleanest picks</h3><span class="meta">Scored 0-100</span></div>
      <ul class="picks">${picks.map((x) => pickCard(x, p)).join("")}</ul>
      ${(p.avoid || []).length ? `<div class="subhead"><h3>Skip these</h3></div>
      <ul class="card skip-list">${p.avoid.map((a) => `<li>${icon("ban", 18)}<div><b>${esc(a.b)}</b><span>${esc(a.why)}</span></div></li>`).join("")}</ul>` : ""}
      <p class="fine">Formulas change. Always double-check the label before you buy.</p>
    </article>`;
  }

  /* ---------------- clothing ---------------- */
  function clothingCard(c) {
    const picks = c.picks.map((k) => `<li class="pick">
      <div class="pick-top">
        <div class="score s-fiber">${icon("shirt", 22)}</div>
        <div class="pick-body">
          <div class="pick-head"><b>${esc(k.b)}</b><span>${esc(k.p)}</span></div>
          <p>${esc(k.why)}</p>
        </div>
      </div>
      <div class="pick-foot">
        <div class="tags"><span class="tag">${esc(k.mat)}</span></div>
        <button class="btn small" data-add='${esc(JSON.stringify({ name: `${k.b} - ${k.p}`, note: c.name }))}'>Add to list</button>
      </div>
      <details class="where"><summary>Where to buy</summary>${linkRow([
        { label: "Brand site", url: k.site },
        { label: "Amazon", url: `https://www.amazon.com/s?k=${enc(k.b + " " + k.p)}` },
        { label: "Google Shopping", url: `https://www.google.com/search?tbm=shop&q=${enc(k.b + " " + k.p)}` }
      ])}</details>
    </li>`).join("");
    return `<article class="product">
      <header><p class="kicker">No polyester</p><h2 class="product-title">${esc(c.name)}</h2></header>
      <div class="tip"><b>What to know</b>${esc(c.tip)}</div>
      <div class="subhead"><h3>Cleanest picks</h3><span class="meta">100% natural fiber</span></div>
      <ul class="picks">${picks}</ul>
      <div class="subhead"><h3>Skip these</h3></div>
      <ul class="card skip-list"><li>${icon("ban", 18)}<div><span>${esc(c.avoid)}</span></div></li></ul>
    </article>`;
  }

  function renderClothing(filter = "") {
    const list = filter.trim() ? searchIn(CLOTHING, filter, 10).map((x) => x.it) : CLOTHING;
    $("#clothingList").innerHTML = list.length ? list.map(clothingCard).join('<hr class="divider">') : `<div class="card empty"><p>No match. Try "blanket", "sheets", "jeans" or "underwear".</p></div>`;
  }
  function renderFibers() {
    $("#fiberList").innerHTML = FIBERS.map((f) => `<div class="fiber g-${f.grade}"><div><b>${esc(f.name)}</b><span>${esc(f.note)}</span></div></div>`).join("");
  }

  /* ---------------- recipes ---------------- */
  function recipeCard(r) {
    const diets = activeDiets();
    const nut = r.nutrition || {};
    const tags = diets.length
      ? recipeFit(r, diets).per.map((x) => x.status === "fits" ? `<span class="tag fit">${icon("check", 12)}${esc(x.diet.label)}</span>`
        : x.status === "swap" ? `<span class="tag swapfit">${esc(x.diet.label)} with a swap</span>` : "").join("")
      : (r.tags || []).slice(0, 2).map((t) => `<span class="tag">${esc(t)}</span>`).join("");
    return `<button class="card recipe-card" data-recipe="${esc(r.id)}">
      <div class="rc-top"><p class="kicker">${nut.protein ?? "-"}g protein · ${nut.cal ?? "-"} cal</p><h3>${esc(r.title)}</h3></div>
      <div class="rc-body"><p class="meta">${esc(r.time)}</p><div class="tags">${tags}</div></div>
    </button>`;
  }
  function renderRecipeGrid(filter = "") {
    let list = filter.trim() ? searchIn(RECIPES, filter, 10).map((x) => x.it) : RECIPES;
    const diets = activeDiets();
    const grid = (l) => `<div class="grid">${l.map(recipeCard).join("")}</div>`;
    if (!list.length) {
      $("#recipeGrid").innerHTML = `<div class="card empty"><p>No recipe match. Try the main search, or add an AI key in Settings to generate any recipe.</p></div>`;
      return;
    }
    if (!diets.length) { $("#recipeGrid").innerHTML = grid(list); return; }
    const fits = [], swaps = [];
    let hidden = 0;
    list.forEach((r) => { const s = recipeFit(r, diets).status; if (s === "fits") fits.push(r); else if (s === "swap") swaps.push(r); else hidden++; });
    const label = esc(dietLabels(diets));
    $("#recipeGrid").innerHTML = `
      ${fits.length ? `<div class="subhead"><h3>Fits ${label}</h3><span class="meta">${fits.length}</span></div>${grid(fits)}` : `<p class="hidden-note">No recipe fits ${label} exactly as written.</p>`}
      ${swaps.length ? `<div class="subhead"><h3>Works with a swap</h3><span class="meta">${swaps.length}</span></div>${grid(swaps)}` : ""}
      ${hidden ? `<p class="hidden-note">${hidden} recipe${hidden > 1 ? "s" : ""} hidden because ${hidden > 1 ? "they don't" : "it doesn't"} fit ${label}.</p>` : ""}`;
  }

  const FRACS = [[0, ""], [0.125, "⅛"], [0.25, "¼"], [0.333, "⅓"], [0.5, "½"], [0.667, "⅔"], [0.75, "¾"], [1, ""]];
  function fmtQty(q, u) {
    if (!q) return "";
    if (/^(lb|oz)$/.test(u)) return `${Math.round(q * 10) / 10} ${u}`;
    const whole = Math.floor(q);
    let frac = q - whole, best = FRACS[0];
    for (const f of FRACS) if (Math.abs(frac - f[0]) < Math.abs(frac - best[0])) best = f;
    const w = best[0] === 1 ? whole + 1 : whole;
    const str = `${w || ""}${best[1]}`;
    if (!str) return "pinch";
    return `${str}${u ? " " + u : ""}`;
  }
  const plural = (u, n) => (n === 1 || /s$/.test(u) ? u : u + "s");

  let currentRecipe = null;
  let currentServings = null;
  function openRecipe(idOrObj, servings, { keepScroll = false } = {}) {
    const r = typeof idOrObj === "string" ? RECIPES.find((x) => x.id === idOrObj) || (currentRecipe && currentRecipe.id === idOrObj ? currentRecipe : null) : idOrObj;
    if (!r) return;
    currentRecipe = r;
    const n = servings || r.serves;
    currentServings = n;
    const f = n / r.serves;
    const nut = r.nutrition || {};
    const diets = activeDiets();
    const fit = diets.length && r.ingredients ? recipeFit(r, diets) : null;
    const conflictAt = new Map();
    if (fit) fit.per.forEach((p) => p.conflicts.forEach((c) => { if (c.idx != null) conflictAt.set(c.idx, [...(conflictAt.get(c.idx) || []), p.diet.label]); }));

    const ingr = r.ingredients.map((i, idx) => {
      const qty = fmtQty(i.q * f, i.u);
      const bad = conflictAt.get(idx);
      const brand = !i.brand ? ""
        : /^(organic|local)\b/i.test(i.brand) ? `<span class="ing-brand">${esc(i.brand)} · farmers market or grocery</span>`
        : `<a class="ing-brand" href="https://www.amazon.com/s?k=${enc(i.brand)}" target="_blank" rel="noopener">${esc(i.brand)}</a>`;
      return `<li${bad ? ' class="conflict"' : ""}><span class="ing-qty">${esc(qty)}</span><div><span>${esc(i.item)}${bad ? ` <span class="tag nofit">Not ${esc(bad.join(", ").toLowerCase())}</span>` : ""}</span>${brand}</div></li>`;
    }).join("");

    const dietPanel = fit ? `<div class="diet-panel">${fit.per.map((p) =>
      p.status === "fits" ? `<div class="diet-row fits"><b>${esc(p.diet.label)}</b>Fits as written.</div>`
      : p.status === "swap" ? `<div class="diet-row swap"><b>${esc(p.diet.label)} with a swap</b>${esc(p.swap.text)}</div>`
      : `<div class="diet-row no"><b>Not ${esc(p.diet.label.toLowerCase())}</b>Contains ${esc(p.conflicts.map((c) => c.item).join(", "))}.</div>`).join("")}</div>` : "";
    const swapSel = Math.max(0, (r.swaps || []).findIndex((s) => diets.some((d) => d.swapRx.test(s.tag))));

    const panel = $("#sheet .sheet-panel");
    const keep = keepScroll ? panel.scrollTop : 0;
    $("#sheetBody").innerHTML = `
      <div class="recipe">
        <div class="recipe-hero">
          <p class="kicker" style="margin:0">Recipe · makes ${r.serves} ${esc(plural(r.unit || "serving", r.serves))}</p>
          <h2>${esc(r.title)}</h2>
          ${r.intro ? `<p class="intro">${esc(r.intro)}</p>` : ""}
          <div class="tags"><span class="tag">${icon("clock", 13)}${esc(r.time)}</span>${(r.tags || []).map((t) => `<span class="tag">${esc(t)}</span>`).join("")}${r.ai ? `<span class="ai-badge">AI-generated · double-check labels</span>` : ""}</div>
        </div>
        <div class="recipe-body">
        ${dietPanel}
        <div class="nutri">
          <div><b>${nut.cal ?? "-"}</b><span>cal</span></div>
          <div><b>${nut.protein ?? "-"}g</b><span>protein</span></div>
          <div><b>${nut.carbs ?? "-"}g</b><span>carbs</span></div>
          <div><b>${nut.fat ?? "-"}g</b><span>fat</span></div>
        </div>
        <p class="fine" style="margin-top:8px">Per ${esc(r.unit || "serving")}, estimated · ${nut.fiber ?? "-"}g fiber · ${nut.sugar ?? "-"}g sugar</p>
        <div class="ing-head">
          <h3>Ingredients</h3>
          <button class="btn primary small" id="addAllIng">Add all to list</button>
        </div>
        <div class="stepper" aria-label="Servings">
          <button data-serv="-1" aria-label="Fewer">${icon("minus", 16)}</button><span><b>${n}</b> ${esc(plural(r.unit || "serving", n))}</span><button data-serv="1" aria-label="More">${icon("plus", 16)}</button>
        </div>
        <ul class="ingredients">${ingr}</ul>
        <h3>Method</h3>
        <ol class="steps big">${r.steps.map((s) => `<li><span>${esc(s)}</span></li>`).join("")}</ol>
        ${r.tip ? `<p class="tip"><b>Tip</b>${esc(r.tip)}</p>` : ""}
        ${(r.swaps || []).length ? `<div class="card swap-box"><h3>Swaps</h3>
          <div class="chips" role="group" aria-label="Swaps">${r.swaps.map((s, i) => `<button class="chip${i === swapSel ? " active" : ""}" data-swap="${i}" aria-pressed="${i === swapSel}">${esc(s.tag)}</button>`).join("")}</div>
          <p class="swap-text">${esc(r.swaps[swapSel].text)}</p></div>` : ""}
        </div>
      </div>`;
    $$("[data-swap]", $("#sheetBody")).forEach((b) => b.addEventListener("click", () => {
      $$("[data-swap]", $("#sheetBody")).forEach((x) => { x.classList.toggle("active", x === b); x.setAttribute("aria-pressed", String(x === b)); });
      $(".swap-text", $("#sheetBody")).textContent = r.swaps[Number(b.dataset.swap)].text;
    }));
    $$("[data-serv]", $("#sheetBody")).forEach((b) =>
      b.addEventListener("click", () => openRecipe(r, Math.max(1, n + Number(b.dataset.serv)), { keepScroll: true })));
    $("#addAllIng").addEventListener("click", () =>
      addToList(r.ingredients.filter((i) => i.q || i.brand).map((i) => ({ name: `${fmtQty(i.q * f, i.u)} ${i.item}`.trim(), note: i.brand ? `${i.brand} · ${r.title}` : r.title }))));
    openSheet("#sheet");
    panel.scrollTop = keep;
  }

  function openSheet(sel) {
    const s = $(sel);
    const wasHidden = s.hidden;
    s.hidden = false;
    document.body.classList.add("no-scroll");
    if (wasHidden) $(".sheet-panel", s).scrollTop = 0;
  }
  function closeSheets() {
    $$(".sheet").forEach((s) => (s.hidden = true));
    document.body.classList.remove("no-scroll");
  }

  /* ---------------- shopping list ---------------- */
  const getList = () => store.get("list", []);
  function saveList(list) {
    store.set("list", list);
    const c = list.filter((i) => !i.done).length;
    $("#listCount").textContent = c;
    $("#listCount").dataset.zero = String(!c);
  }
  function addToList(items) {
    const list = getList();
    let added = 0;
    for (const it of items) if (!list.some((x) => x.name === it.name)) { list.push({ ...it, done: false }); added++; }
    saveList(list);
    toast(added ? `Added ${added} item${added > 1 ? "s" : ""} to your list` : "Already on your list");
  }
  function renderList() {
    const list = getList();
    const body = $("#listBody");
    if (!list.length) { body.innerHTML = `<div class="card empty"><p>Your list is empty. Tap <b>List</b> on any brand, or add every ingredient from a recipe.</p></div>`; return; }
    body.innerHTML = `<div class="card"><ul class="shoplist">${list.map((i, idx) => `
      <li class="${i.done ? "done" : ""}"><label><input type="checkbox" data-li="${idx}" ${i.done ? "checked" : ""}><span><b>${esc(i.name)}</b>${i.note ? `<small>${esc(i.note)}</small>` : ""}</span></label>
      <button class="x" data-del="${idx}" aria-label="Remove ${esc(i.name)}">${icon("x", 16)}</button></li>`).join("")}</ul>
      <div class="row"><button class="btn primary" id="copyList">${icon("share", 16)}Share list</button><button class="btn quiet" id="clearDone">Clear checked</button><button class="btn danger" id="clearAll">Clear all</button></div></div>`;
    $$("[data-li]", body).forEach((c) => c.addEventListener("change", () => { const l = getList(); l[c.dataset.li].done = c.checked; saveList(l); renderList(); }));
    $$("[data-del]", body).forEach((b) => b.addEventListener("click", () => { const l = getList(); l.splice(b.dataset.del, 1); saveList(l); renderList(); }));
    $("#clearDone").addEventListener("click", () => { saveList(getList().filter((i) => !i.done)); renderList(); });
    $("#clearAll").addEventListener("click", () => { if (confirm("Clear your whole list?")) { saveList([]); renderList(); } });
    $("#copyList").addEventListener("click", async () => {
      const text = "Non-Toxic Living shopping list\n" + getList().filter((i) => !i.done).map((i) => `- ${i.name}${i.note ? ` (${i.note})` : ""}`).join("\n");
      try {
        if (navigator.share) await navigator.share({ title: "Shopping list", text });
        else { await navigator.clipboard.writeText(text); toast("Copied"); }
      } catch { /* user cancelled */ }
    });
  }

  /* ---------------- label check ---------------- */
  function analyze(text) {
    const lower = String(text || "").toLowerCase();
    const hits = [];
    for (const a of ADDITIVES) {
      const m = a.rx.exec(lower);
      if (m) hits.push({ ...a, pos: lower.length ? m.index / lower.length : 0 });
    }
    const penalty = { high: 25, moderate: 12, low: 4 };
    let score = 100 - hits.reduce((s, h) => s + penalty[h.sev], 0);
    return { hits, score: Math.max(0, Math.min(100, score)) };
  }

  /* Added sugar: judged on grams per 100g when Open Food Facts has them, otherwise on
   * where sugar sits in the ingredient list (ingredients are listed by weight).
   * Honey, maple, coconut sugar and dates count a little less than refined sugar. */
  const SUGARS = [
    ["high[-\\s]*fructose corn syrup|glucose[-\\s]*fructose", "high-fructose corn syrup", true],
    ["corn syrup( solids)?", "corn syrup", true],
    ["coconut (palm )?sugar|coconut nectar", "coconut sugar", false],
    ["maple syrup|maple sugar", "maple syrup", false],
    ["date syrup|date sugar|dates", "dates", false],
    ["honey", "honey", false],
    ["(brown |powdered |invert |cane |beet |turbinado |raw |organic )?sugar|sucrose|evaporated cane juice|cane juice", "sugar", true],
    ["dextrose|glucose( syrup)?|fructose|maltose", "dextrose or glucose", true],
    ["(brown )?rice syrup|tapioca syrup|malt syrup|barley malt", "rice or malt syrup", true],
    ["agave( nectar| syrup)?", "agave", true],
    ["molasses", "molasses", true],
    ["fruit juice concentrate|(apple|grape|pear) juice concentrate", "fruit juice concentrate", true]
  ].map(([re, name, refined]) => ({ rx: new RegExp("\\b(?:" + re + ")\\b", "i"), name, refined }));

  function sugarCheck(text, product) {
    let lower = " " + String(text || "").toLowerCase().replace(/\b(sugar[- ]free|no (added )?sugars?|zero sugar|unsweetened)\b/g, (m) => " ".repeat(m.length)) + " ";
    const found = [];
    for (const s of SUGARS) {
      const m = lower.match(s.rx);
      if (!m) continue;
      found.push({ ...s, at: m.index });
      // Blank it out so "high fructose corn syrup" isn't also counted as "corn syrup" and "fructose".
      lower = lower.replace(new RegExp(s.rx.source, "gi"), (x) => " ".repeat(x.length));
    }
    const grams = Number(product && product.nutriments && product.nutriments.sugars_100g);
    const hasGrams = product && product.nutriments && product.nutriments.sugars_100g != null && Number.isFinite(grams);
    if (!found.length && !(hasGrams && grams >= 10)) return { penalty: 0, found, grams: hasGrams ? grams : null };

    found.sort((a, b) => a.at - b.at);
    const first = found[0];
    // Position of the first sugar among the top-level ingredients (commas inside "(...)" don't count).
    const commasBefore = (s, end) => { let d = 0, n = 0; for (let i = 0; i < end; i++) { const c = s[i]; if (c === "(" || c === "[") d++; else if ((c === ")" || c === "]") && d) d--; else if (c === "," && !d) n++; } return n; };
    const idx = first ? commasBefore(lower, first.at) : -1;
    const total = commasBefore(lower, lower.length) + 1;
    let penalty, reason;
    if (hasGrams) {
      const g = Math.round(grams * 10) / 10;
      if (grams >= 45) { penalty = 40; reason = `${g}g of sugar per 100g, almost half the product`; }
      else if (grams >= 22.5) { penalty = 25; reason = `${g}g of sugar per 100g, a high-sugar food`; }
      else if (grams >= 10) { penalty = 12; reason = `${g}g of sugar per 100g`; }
      else if (grams >= 5) { penalty = 5; reason = `${g}g of sugar per 100g, a small amount`; }
      else { penalty = 0; reason = `only ${g}g of sugar per 100g`; }
    } else if (idx === 0) { penalty = 40; reason = `${first.name} is the #1 ingredient`; }
    else if (idx < Math.max(3, total / 3)) { penalty = 25; reason = `${first.name} is one of the first ingredients`; }
    else if (idx < (total * 2) / 3) { penalty = 12; reason = `${first.name} is in the middle of the ingredient list`; }
    else { penalty = 5; reason = `${first.name} is near the end of the list, so it's a small amount`; }
    if (penalty && found.length && found.every((f) => !f.refined)) penalty = Math.round(penalty * 0.75);
    if (found.length >= 3) { penalty += 5; reason += `. It also uses ${found.length} kinds of sugar (${found.map((f) => f.name).join(", ")})`; }
    return { penalty, reason, found, grams: hasGrams ? grams : null, unrefined: found.length && found.every((f) => !f.refined) };
  }

  // Each selected diet vs a label: ingredient words, Open Food Facts allergen/analysis tags and (keto) net carbs.
  function labelDiet(text, product) {
    const nutr = (product && product.nutriments) || {};
    const allergens = (product && product.allergens_tags) || [];
    const analysis = (product && product.ingredients_analysis_tags) || [];
    return activeDiets().map((d) => {
      const reasons = [];
      const carbs = Number(nutr.carbohydrates_100g);
      if (d.keto && product && Number.isFinite(carbs)) {
        const net = Math.round(carbs - (Number(nutr.fiber_100g) || 0));
        if (net > 10) reasons.push(`${net}g net carbs per 100g`);
      } else {
        dietConflicts(d, text).forEach((c) => reasons.push(c.word === c.name ? c.name : `${c.word} (${c.name})`));
      }
      (d.off.allergens || []).forEach((t) => {
        const name = t.replace(/^en:/, "");
        if (allergens.includes(t) && !reasons.some((r) => r.startsWith(name))) reasons.push(`listed allergen: ${name}`);
      });
      (d.off.analysis || []).forEach((t) => { if (analysis.includes(t)) reasons.push(`Open Food Facts marks it ${t.replace(/^en:/, "").replace(/-/g, " ")}`); });
      return { d, reasons: [...new Set(reasons)] };
    });
  }

  let lastAnalysis = null;
  function renderAnalysis(input, { scroll = true } = {}) {
    lastAnalysis = input;
    const { text, product } = input;
    const { hits, score: base } = analyze(text);
    const sugar = sugarCheck(text, product);
    let score = Math.max(0, base - sugar.penalty);
    const nova = product && product.nova_group;
    if (nova === 4) score = Math.max(0, score - 10);
    const g = grade(score);
    const seed = hits.filter((h) => h.type === "Seed oil");
    const groups = {};
    hits.forEach((h) => (groups[h.type] = groups[h.type] || []).push(h));

    let seedHtml;
    if (!seed.length) seedHtml = `<div class="verdict good"><b>Seed oils</b>None found.</div>`;
    else {
      const worst = seed.some((s) => s.sev === "high") ? "high" : "moderate";
      seedHtml = `<div class="verdict ${worst === "high" ? "bad" : "meh"}">
        <b>Seed oil found</b>${seed.map((s) => esc(s.name)).join(", ")}
        ${seed.map((s) => `<small>${esc(s.name)} appears ${s.pos < 0.33 ? "<b>early in the list, so it's a major ingredient</b>" : s.pos < 0.66 ? "in the middle of the list" : "near the end, so it's a small amount"}. ${esc(s.why)}</small>`).join("")}
      </div>`;
    }

    const sugarHtml = sugar.penalty
      ? `<div class="verdict ${sugar.penalty >= 25 ? "bad" : "meh"}"><b>Sugar · rated ${sugar.penalty} points lower</b>${esc(sugar.reason[0].toUpperCase() + sugar.reason.slice(1))}.${sugar.unrefined ? " Less refined sweeteners, so we went a little easier." : ""}</div>`
      : `<div class="verdict good"><b>Sugar</b>${sugar.grams != null ? `${esc(sugar.reason[0].toUpperCase() + sugar.reason.slice(1))}. ` : ""}No added sugar lowered this score.</div>`;
    const flagCount = hits.length + (sugar.penalty >= 12 ? 1 : 0);
    const diet = labelDiet(text, product);
    const dietHtml = diet.length ? `<div class="diet-panel" style="margin-top:0">${diet.map(({ d, reasons }) => reasons.length
      ? `<div class="diet-row no"><b>Not ${esc(d.label.toLowerCase())}</b>${esc(reasons.join("; ").replace(/^./, (c) => c.toUpperCase()))}.</div>`
      : `<div class="diet-row fits"><b>Looks ${esc(d.label.toLowerCase())}</b>${d.id === "gluten-free" ? "No gluten ingredients found. For celiac, look for a certified gluten-free label." : d.keto && !(product && product.nutriments && product.nutriments.carbohydrates_100g != null) ? "No sugars or starches found in the ingredients. Check the carbs on the label." : `Nothing in the ingredients breaks ${esc(d.label.toLowerCase())}.`}</div>`).join("")}</div>` : "";

    const sevLabel = { high: "High", moderate: "Moderate", low: "Low" };
    const matches = product ? searchIn(PRODUCTS, `${product.product_name || ""} ${(product.categories_tags || []).slice(-3).map((c) => c.replace(/^\w\w:/, "")).join(" ")}`, 15).slice(0, 1) : [];

    $("#scanResult").innerHTML = `
      <div class="card result">
        ${product ? `<div class="result-head">${product.image_front_small_url ? `<img src="${esc(product.image_front_small_url)}" alt="">` : ""}<div><p class="kicker" style="margin:0 0 2px">${esc(product.brands || "Scanned product")}</p><h3>${esc(product.product_name || "Unknown product")}</h3></div></div>` : `<p class="kicker">Your ingredient list</p>`}
        <div class="big-score" data-grade="${g.cls}"><b>${score}</b><span>out of 100<strong>${g.label}${flagCount ? ` · ${flagCount} red flag${flagCount > 1 ? "s" : ""}` : ""}</strong></span></div>
        <div class="bar" style="color:var(--${g.cls})"><i style="width:${Math.max(2, score)}%"></i></div>
        ${sugar.penalty ? `<p class="score-note">Rated ${sugar.penalty} points lower because of sugar.</p>` : ""}
        ${nova ? `<p class="meta" style="margin-top:10px">NOVA processing group <b>${nova}</b>${nova === 4 ? " (ultra-processed, rated 10 points lower)" : ""}</p>` : ""}
      </div>
      ${dietHtml}
      ${sugarHtml}
      ${seedHtml}
      ${hits.length ? `<h3 class="sec-title" style="margin-top:22px">What we flagged</h3><div class="card" style="padding-top:2px;padding-bottom:2px">${Object.entries(groups).map(([type, list]) => `
          <h4>${esc(type)}</h4>
          <ul class="flags">${list.map((h) => `<li><div><b>${esc(h.name)}</b><span class="sev sev-${h.sev}">${sevLabel[h.sev]}</span></div>${esc(h.why)}${h.eu ? `<span class="eu">In the EU: ${esc(h.eu)}</span>` : ""}</li>`).join("")}</ul>`).join("")}</div>`
        : `<div class="verdict good"><b>Additives</b>No red-flag additives found. Nice pick.</div>`}
      <details class="ingredients-analyzed"><summary>Ingredients we checked</summary><p class="fine">${esc(text)}</p></details>
      ${matches.length ? `<h2 class="sec-title">Cleaner alternatives</h2>${productCard(matches[0].it)}` : ""}`;
    if (scroll) $("#scanResult").scrollIntoView({ behavior: "smooth", block: "start" });
  }

  // Shops print UPC-A (12 digits); Open Food Facts usually stores EAN-13 (a leading 0). Try both.
  function barcodeVariants(code) {
    const v = [code];
    if (code.length === 12) v.push("0" + code);
    if (code.length === 13 && code.startsWith("0")) v.push(code.slice(1));
    if (code.length === 8) v.push(code.padStart(13, "0"));
    return [...new Set(v)];
  }
  const OFF_FIELDS = "product_name,brands,image_front_small_url,ingredients_text,ingredients_text_en,nova_group,categories_tags,allergens_tags,ingredients_analysis_tags,nutriments";
  async function fetchProduct(code) {
    const hosts = ["https://world.openfoodfacts.org", "https://world.openbeautyfacts.org"];
    for (const host of hosts) {
      for (const c of barcodeVariants(code)) {
        try {
          const res = await fetch(`${host}/api/v2/product/${c}.json?fields=${OFF_FIELDS}`);
          if (!res.ok) continue;
          const data = await res.json();
          if (data.status === 1 && data.product) return data.product;
        } catch { /* offline or blocked: try the next */ }
      }
    }
    return null;
  }

  async function lookupBarcode(code) {
    code = String(code || "").replace(/\D/g, "");
    if (code.length < 6) { toast("Enter the numbers under the barcode"); return; }
    $("#barcode").value = code;
    $("#scanResult").innerHTML = `<div class="card"><p class="loading">Looking up ${esc(code)}...</p></div>`;
    $("#scanResult").scrollIntoView({ behavior: "smooth", block: "start" });
    if (!navigator.onLine) {
      $("#scanResult").innerHTML = `<div class="card"><h3>You're offline</h3><p>Looking up a barcode needs a connection. You can still paste the ingredient list below.</p></div>`;
      return;
    }
    const p = await fetchProduct(code);
    if (!p) {
      $("#scanResult").innerHTML = `<div class="card"><h3>Product not found</h3><p>Barcode ${esc(code)} isn't in the Open Food Facts database yet. Paste the ingredient list below instead, or <a href="https://world.openfoodfacts.org/cgi/product.pl" target="_blank" rel="noopener">add it to Open Food Facts</a> to help others.</p></div>`;
      $("#pasteCard").open = true;
      return;
    }
    const text = p.ingredients_text_en || p.ingredients_text;
    if (!text) {
      $("#scanResult").innerHTML = `<div class="card"><p class="kicker">${esc(p.brands || "Found it")}</p><h3>${esc(p.product_name || "Found it")}</h3><p>This product has no ingredient list in Open Food Facts yet. Paste the ingredients from the package below and we'll check them.</p></div>`;
      $("#pasteCard").open = true;
      return;
    }
    renderAnalysis({ text, product: p });
  }

  /* ---------------- barcode scanner ----------------
   * Uses the phone's built-in BarcodeDetector where it exists (Android Chrome).
   * iPhone Safari, Firefox and most desktops don't have one, so we fall back to
   * ZXing (js/vendor/zxing.min.js), loaded only when the camera is first opened.
   */
  const FORMATS = ["ean_13", "ean_8", "upc_a", "upc_e"];
  let scanStream = null;
  let scanTimer = null;
  let detectFn = null;

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = src; s.onload = resolve; s.onerror = () => reject(new Error("load " + src));
      document.head.appendChild(s);
    });
  }

  async function getDetector() {
    if (detectFn) return detectFn;
    if ("BarcodeDetector" in window) {
      try {
        const supported = await window.BarcodeDetector.getSupportedFormats();
        const formats = FORMATS.filter((f) => supported.includes(f));
        if (formats.length) {
          const det = new window.BarcodeDetector({ formats });
          detectFn = async (video) => { const c = await det.detect(video); return c.length ? c[0].rawValue : null; };
          return detectFn;
        }
      } catch { /* fall through to ZXing */ }
    }
    if (!window.ZXing) await loadScript("js/vendor/zxing.min.js");
    const Z = window.ZXing;
    const hints = new Map();
    hints.set(Z.DecodeHintType.POSSIBLE_FORMATS, [Z.BarcodeFormat.EAN_13, Z.BarcodeFormat.EAN_8, Z.BarcodeFormat.UPC_A, Z.BarcodeFormat.UPC_E]);
    hints.set(Z.DecodeHintType.TRY_HARDER, true);
    const reader = new Z.MultiFormatReader();
    reader.setHints(hints);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    detectFn = async (video) => {
      const w = video.videoWidth, h = video.videoHeight;
      if (!w || !h) return null;
      // Read the middle band of the frame (where the guide is) at up to 1000px wide: faster and sharper.
      const scale = Math.min(1, 1000 / w);
      const bandH = Math.round(h * 0.6);
      canvas.width = Math.round(w * scale);
      canvas.height = Math.round(bandH * scale);
      ctx.drawImage(video, 0, Math.round((h - bandH) / 2), w, bandH, 0, 0, canvas.width, canvas.height);
      try {
        const bmp = new Z.BinaryBitmap(new Z.HybridBinarizer(new Z.HTMLCanvasElementLuminanceSource(canvas)));
        return reader.decodeWithState(bmp).getText();
      } catch { return null; } finally { reader.reset(); }
    };
    return detectFn;
  }

  async function startScan() {
    const panel = $("#scanPanel");
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      toast(location.protocol === "https:" || location.hostname === "localhost" ? "This browser can't open the camera. Type the barcode number instead." : "The camera needs a secure (https) connection. Type the barcode number instead.");
      $("#barcode").focus();
      return;
    }
    $("#startScan").disabled = true;
    try {
      const [detect, stream] = await Promise.all([
        getDetector(),
        navigator.mediaDevices.getUserMedia({ audio: false, video: { facingMode: { ideal: "environment" }, width: { ideal: 1920 }, height: { ideal: 1080 } } })
      ]);
      scanStream = stream;
      const video = $("#scanVideo");
      video.srcObject = stream;
      video.setAttribute("playsinline", "");
      await video.play();
      panel.classList.add("live");
      $("#scanHint").textContent = "Line up the barcode inside the frame";
      setupTorch(stream.getVideoTracks()[0]);
      let busy = false;
      const tick = async () => {
        if (!scanStream) return;
        if (!busy && video.readyState >= 2) {
          busy = true;
          try {
            const code = await detect(video);
            if (code && /^\d{6,14}$/.test(code)) {
              if (navigator.vibrate) navigator.vibrate(60);
              stopScan();
              lookupBarcode(code);
              return;
            }
          } catch { /* frame not ready */ }
          busy = false;
        }
        scanTimer = setTimeout(tick, 120);
      };
      tick();
    } catch (err) {
      stopScan();
      const name = err && err.name;
      toast(name === "NotAllowedError" ? "Camera permission is off. Allow camera access in Settings, or type the barcode."
        : name === "NotFoundError" ? "No camera found. Type the barcode number instead."
        : "Couldn't open the camera. Type the barcode number instead.");
    } finally {
      $("#startScan").disabled = false;
    }
  }

  function setupTorch(track) {
    const btn = $("#torchBtn");
    btn.hidden = true;
    btn.setAttribute("aria-pressed", "false");
    try {
      const caps = track && track.getCapabilities ? track.getCapabilities() : {};
      if (!caps.torch) return;
      btn.hidden = false;
      btn.onclick = async () => {
        const on = btn.getAttribute("aria-pressed") !== "true";
        try { await track.applyConstraints({ advanced: [{ torch: on }] }); btn.setAttribute("aria-pressed", String(on)); } catch { /* not supported */ }
      };
    } catch { /* no capabilities API */ }
  }

  function stopScan() {
    clearTimeout(scanTimer);
    if (scanStream) scanStream.getTracks().forEach((t) => t.stop());
    scanStream = null;
    const video = $("#scanVideo");
    if (video) video.srcObject = null;
    const panel = $("#scanPanel");
    if (panel) panel.classList.remove("live");
  }
  document.addEventListener("visibilitychange", () => { if (document.hidden) stopScan(); });

  /* ---------------- shop local ---------------- */
  const LOCAL_SEARCHES = [
    "farmers market", "grass fed beef farm", "raw milk farm", "pasture raised eggs farm", "local butcher shop", "CSA farm share",
    "u-pick farm", "local honey beekeeper", "sourdough bakery", "health food store", "pasture raised chicken farm", "pastured pork farm"
  ];
  function renderLocalChips(loc) {
    const where = loc ? ` near ${loc}` : " near me";
    $("#localChips").innerHTML = LOCAL_SEARCHES.map((t) =>
      `<a class="chip" target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query=${enc(t + where)}">${esc(t[0].toUpperCase() + t.slice(1))}</a>`).join("");
  }

  const TYPE_LABEL = (t) =>
    t.amenity === "marketplace" ? "Farmers market" :
    t.shop === "farm" ? "Farm stand / farm shop" :
    t.shop === "butcher" ? "Butcher" :
    t.shop === "greengrocer" ? "Produce market" :
    t.shop === "health_food" ? "Health food store" :
    t.shop === "dairy" ? "Dairy" : "Local food";

  function miles(a, b) {
    const R = 3958.8, rad = Math.PI / 180;
    const dLat = (b.lat - a.lat) * rad, dLon = (b.lon - a.lon) * rad;
    const h = Math.sin(dLat / 2) ** 2 + Math.cos(a.lat * rad) * Math.cos(b.lat * rad) * Math.sin(dLon / 2) ** 2;
    return 2 * R * Math.asin(Math.sqrt(h));
  }
  const radiusMeters = () => Number(($("#radius [aria-checked='true']") || {}).dataset?.r || 40000);

  async function findLocal(center, label) {
    const out = $("#localResults");
    const r = radiusMeters();
    out.innerHTML = `<div class="card"><p class="loading">Finding farms and markets near ${esc(label)}...</p></div>`;
    renderLocalChips(label === "you" ? "" : label);
    const around = `(around:${r},${center.lat},${center.lon})`;
    const q = `[out:json][timeout:25];(
      nwr["amenity"="marketplace"]${around};
      nwr["shop"="farm"]${around};
      nwr["shop"="butcher"]${around};
      nwr["shop"="greengrocer"]${around};
      nwr["shop"="health_food"]${around};
      nwr["shop"="dairy"]${around};
    );out center tags 150;`;
    try {
      const res = await fetch("https://overpass-api.de/api/interpreter", { method: "POST", body: "data=" + enc(q), headers: { "Content-Type": "application/x-www-form-urlencoded" } });
      if (!res.ok) throw new Error("overpass " + res.status);
      const data = await res.json();
      const places = data.elements.map((el) => {
        const pos = el.type === "node" ? { lat: el.lat, lon: el.lon } : el.center;
        const t = el.tags || {};
        const type = TYPE_LABEL(t);
        return pos && { name: t.name || `Unnamed ${type.toLowerCase()}`, type, t, pos, d: miles(center, pos) };
      }).filter(Boolean).sort((a, b) => a.d - b.d).slice(0, 60);

      if (!places.length) {
        out.innerHTML = `<div class="card"><h3>No listings found on the open map near ${esc(label)}</h3><p>Small farms are often unlisted. Use the quick searches and directories below. They cover far more farms.</p></div>`;
        return;
      }
      const types = [...new Set(places.map((p) => p.type))];
      out.innerHTML = `<div class="subhead"><h3>Near ${esc(label)}</h3><span class="meta">${places.length} places</span></div>
        <div class="chips filter-chips"><button class="chip active" data-ft="">All</button>${types.map((t) => `<button class="chip" data-ft="${esc(t)}">${esc(t)}</button>`).join("")}</div>
        <ul class="places">${places.map((p) => {
          const addr = [p.t["addr:housenumber"], p.t["addr:street"], p.t["addr:city"]].filter(Boolean).join(" ");
          const site = p.t.website || p.t["contact:website"];
          return `<li class="place" data-type="${esc(p.type)}"><span class="place-dot">${icon("pin", 18)}</span>
            <div class="place-body">
              <p class="kicker">${esc(p.type)}</p>
              <b>${esc(p.name)}</b>
              <span class="meta">${p.d.toFixed(1)} mi${addr ? ` · ${esc(addr)}` : ""}</span>
              ${p.t.opening_hours ? `<span class="meta">${esc(p.t.opening_hours)}</span>` : ""}
              <span class="place-links">${site ? `<a target="_blank" rel="noopener" href="${esc(site)}">Website</a>` : ""}<a target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query=${enc(p.name + " " + (p.t["addr:city"] || label))}">Reviews</a></span>
            </div>
            <a class="round-btn small" target="_blank" rel="noopener" aria-label="Directions to ${esc(p.name)}" href="https://www.google.com/maps/dir/?api=1&destination=${p.pos.lat},${p.pos.lon}">${icon("arrow", 18)}</a>
          </li>`;
        }).join("")}</ul>
        <p class="fine">Map data © OpenStreetMap contributors. Always call ahead; hours change seasonally.</p>`;
      $$("[data-ft]", out).forEach((b) => b.addEventListener("click", () => {
        $$("[data-ft]", out).forEach((x) => x.classList.toggle("active", x === b));
        $$(".places li", out).forEach((li) => (li.hidden = !!b.dataset.ft && li.dataset.type !== b.dataset.ft));
      }));
    } catch {
      out.innerHTML = `<div class="card"><h3>The map service is busy</h3><p>Try again in a minute, or use the quick searches below.</p></div>`;
    }
  }

  async function geocode(q) {
    const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&limit=1&countrycodes=us&q=${enc(q)}`, { headers: { Accept: "application/json" } });
    const data = await res.json();
    if (!data.length) throw new Error("not found");
    return { lat: Number(data[0].lat), lon: Number(data[0].lon) };
  }

  /* ---------------- AI (optional, user's own key) ---------------- */
  const AI_SYSTEM = `You are the expert behind "Non-Toxic Living", an app for people who eat clean, avoid seed oils and toxins, and buy real food from real farmers.
Standards you apply:
- No seed oils (soybean, canola/rapeseed, corn, cottonseed, sunflower, safflower, grapeseed, rice bran, "vegetable oil"). Prefer butter, ghee, beef tallow, coconut oil, extra-virgin olive oil, avocado oil.
- No synthetic dyes (Red 40, Yellow 5/6, Blue 1), no HFCS, no artificial sweeteners, minimal gums and preservatives.
- Prefer organic, grass-fed & grass-finished, pasture-raised, US-raised meat; local farms; real sourdough; organic or Italian pasta.
- Only recommend real brands sold in the US. If you are not sure a specific product is still seed-oil free, say "check label" in the reason. Never invent brands.
- If no widely available seed-oil-free product exists in a category, say so honestly in leastBad and rank the least-bad options with a lower score.
- Recipes: exact quantities, short easy steps, nutrition per serving estimated from USDA values, and swaps (always include vegetarian, plus dairy-free / gluten-free / higher protein where relevant).
- Use no emoji in any text field.`;

  const RECIPE_SCHEMA = {
    type: "object", additionalProperties: false,
    required: ["title", "emoji", "time", "serves", "unit", "tags", "intro", "ingredients", "steps", "nutrition", "swaps", "tip"],
    properties: {
      title: { type: "string" }, emoji: { type: "string" }, time: { type: "string" }, serves: { type: "integer" }, unit: { type: "string" },
      tags: { type: "array", items: { type: "string" } }, intro: { type: "string" },
      ingredients: { type: "array", items: { type: "object", additionalProperties: false, required: ["q", "u", "item", "brand"], properties: { q: { type: "number" }, u: { type: "string" }, item: { type: "string" }, brand: { type: "string" } } } },
      steps: { type: "array", items: { type: "string" } },
      nutrition: { type: "object", additionalProperties: false, required: ["cal", "protein", "carbs", "fat", "fiber", "sugar"], properties: { cal: { type: "number" }, protein: { type: "number" }, carbs: { type: "number" }, fat: { type: "number" }, fiber: { type: "number" }, sugar: { type: "number" } } },
      swaps: { type: "array", items: { type: "object", additionalProperties: false, required: ["tag", "text"], properties: { tag: { type: "string" }, text: { type: "string" } } } },
      tip: { type: "string" }
    }
  };
  const PRODUCT_SCHEMA = {
    type: "object", additionalProperties: false,
    required: ["name", "emoji", "tip", "leastBad", "picks", "avoid"],
    properties: {
      name: { type: "string" }, emoji: { type: "string" }, tip: { type: "string" }, leastBad: { type: "string" },
      picks: { type: "array", items: { type: "object", additionalProperties: false, required: ["b", "p", "score", "oil", "why"], properties: { b: { type: "string" }, p: { type: "string" }, score: { type: "integer" }, oil: { type: "string" }, why: { type: "string" } } } },
      avoid: { type: "array", items: { type: "object", additionalProperties: false, required: ["b", "why"], properties: { b: { type: "string" }, why: { type: "string" } } } }
    }
  };

  let AnthropicCtor = null;
  async function askClaude(kind, query) {
    const apiKey = store.get("apiKey", "");
    if (!apiKey) throw new Error("Add your Anthropic API key in Settings first.");
    if (!AnthropicCtor) AnthropicCtor = (await import("https://cdn.jsdelivr.net/npm/@anthropic-ai/sdk@0.131.0/+esm")).default;
    const client = new AnthropicCtor({ apiKey, dangerouslyAllowBrowser: true });
    const diets = activeDiets();
    const dietLine = diets.length ? ` It must be ${dietLabels(diets).toLowerCase()}.` : "";
    const prompt = kind === "recipe"
      ? `Create a clean, non-toxic, seed-oil-free recipe for: "${query}".${dietLine} Make it taste like the real thing. Recommend a specific clean brand for each store-bought ingredient (use "organic ___" for produce).`
      : `List the cleanest non-toxic, seed-oil-free brands to buy for: "${query}".${dietLine} Give 3-6 picks scored 0-100 (Yuka-style, 100 = cleanest) and 1-3 common brands to avoid. Leave leastBad empty unless clean options are genuinely hard to find.`;
    const msg = await client.beta.messages.create({
      model: "claude-opus-5-5",
      max_tokens: 16000,
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
      output_config: { effort: "low", format: { type: "json_schema", schema: kind === "recipe" ? RECIPE_SCHEMA : PRODUCT_SCHEMA } },
      system: AI_SYSTEM,
      messages: [{ role: "user", content: prompt }]
    });
    if (msg.stop_reason === "refusal") throw new Error("The AI declined this request. Try rephrasing.");
    if (msg.stop_reason === "max_tokens") throw new Error("The answer was cut off. Please try again.");
    const text = msg.content.filter((b) => b.type === "text").map((b) => b.text).join("");
    return JSON.parse(text);
  }

  function aiBox(query, prominent) {
    const hasKey = !!store.get("apiKey", "");
    return `<div class="card ai-box ${prominent ? "prominent" : ""}">
      <p class="kicker">${prominent ? "Not in our guide yet" : "Want more options?"}</p>
      <h3>${prominent ? "Get it with AI" : "Ask AI for more"}</h3>
      <p>${hasKey ? `Generate a clean recipe or brand list for <b>"${esc(query)}"</b>.` : `Add your own Anthropic API key in <a href="#" id="aiSettings">Settings</a> to generate a clean recipe or brand list for <i>any</i> food.`}</p>
      ${hasKey ? `<div class="row"><button class="btn primary" data-ai="recipe">Clean recipe</button><button class="btn" data-ai="product">Clean brands</button></div><div class="ai-out"></div>` : ""}
    </div>`;
  }
  function bindAiBox(root, query) {
    const s = $("#aiSettings", root);
    if (s) s.addEventListener("click", (e) => { e.preventDefault(); openSettings(); });
    $$("[data-ai]", root).forEach((b) => b.addEventListener("click", async () => {
      const outEl = $(".ai-out", root);
      const kind = b.dataset.ai;
      $$("[data-ai]", root).forEach((x) => (x.disabled = true));
      outEl.innerHTML = `<p class="loading">Creating a clean ${kind === "recipe" ? "recipe" : "brand guide"} for "${esc(query)}"...</p>`;
      try {
        const data = await askClaude(kind, query);
        if (kind === "recipe") {
          const r = { ...data, id: "ai-" + Date.now(), ai: true, keys: [] };
          outEl.innerHTML = `<div class="grid">${recipeCard(r)}</div>`;
          currentRecipe = r;
          openRecipe(r);
        } else {
          outEl.innerHTML = productCard({ ...data, cat: "AI suggestion" }, { ai: true });
        }
      } catch (err) {
        outEl.innerHTML = `<p class="error">${esc(err && err.status === 401 ? "That API key was rejected. Check it in Settings." : err.message || "Something went wrong.")}</p>`;
      } finally {
        $$("[data-ai]", root).forEach((x) => (x.disabled = false));
      }
    }));
  }

  function openSettings() {
    $("#apiKey").value = store.get("apiKey", "");
    openSheet("#settings");
  }

  /* ---------------- init ---------------- */
  function init() {
    const quick = ["mayonnaise", "cookies", "grass-fed beef", "canned tuna", "toothpaste", "wool blanket"];
    $("#quickChips").innerHTML = quick.map((q) => `<button class="chip" data-search="${esc(q)}">${esc(q[0].toUpperCase() + q.slice(1))}</button>`).join("");
    renderDietBars();
    renderDailySwap();
    $("#q").addEventListener("input", (e) => { if (!e.target.value.trim()) renderResults(""); });
    $("#searchBack").addEventListener("click", () => { $("#q").value = ""; renderResults(""); window.scrollTo({ top: 0 }); });

    $("#searchForm").addEventListener("submit", (e) => { e.preventDefault(); $("#q").blur(); runSearch($("#q").value); });
    $("#recipeFilter").addEventListener("input", (e) => renderRecipeGrid(e.target.value));
    $("#clothingFilter").addEventListener("input", (e) => renderClothing(e.target.value));

    $("#lookupBarcode").addEventListener("click", () => lookupBarcode($("#barcode").value));
    $("#barcode").addEventListener("keydown", (e) => { if (e.key === "Enter") lookupBarcode($("#barcode").value); });
    $("#startScan").addEventListener("click", startScan);
    $("#stopScan").addEventListener("click", stopScan);
    $("#analyzeBtn").addEventListener("click", () => {
      const t = $("#ingredientsInput").value.trim();
      if (!t) { toast("Paste an ingredient list first"); return; }
      renderAnalysis({ text: t });
    });
    $("#sampleBtn").addEventListener("click", () => {
      $("#ingredientsInput").value = "Enriched flour (wheat flour, niacin, reduced iron, thiamine mononitrate, riboflavin, folic acid), sugar, soybean oil, high fructose corn syrup, palm oil, cocoa, salt, leavening (baking soda), soy lecithin, artificial flavor, Red 40, Yellow 5, TBHQ.";
      renderAnalysis({ text: $("#ingredientsInput").value });
    });

    $$("#radius [data-r]").forEach((b) => b.addEventListener("click", () => {
      $$("#radius [data-r]").forEach((x) => x.setAttribute("aria-checked", String(x === b)));
      store.set("radius", b.dataset.r);
    }));
    const savedR = store.get("radius", "");
    if (savedR) $$("#radius [data-r]").forEach((x) => x.setAttribute("aria-checked", String(x.dataset.r === savedR)));

    $("#locForm").addEventListener("submit", async (e) => {
      e.preventDefault();
      const q = $("#locInput").value.trim();
      if (!q) return;
      store.set("loc", q);
      try { findLocal(await geocode(q), q); }
      catch { $("#localResults").innerHTML = `<div class="card"><p>Couldn't find "${esc(q)}". Try a 5-digit ZIP code.</p></div>`; renderLocalChips(q); }
    });
    $("#useGeo").addEventListener("click", () => {
      if (!navigator.geolocation) { toast("Location isn't available"); return; }
      navigator.geolocation.getCurrentPosition(
        (p) => findLocal({ lat: p.coords.latitude, lon: p.coords.longitude }, "you"),
        () => toast("Location permission is off. Type a ZIP code instead."),
        { timeout: 10000 }
      );
    });
    const savedLoc = store.get("loc", "");
    if (savedLoc) $("#locInput").value = savedLoc;
    renderLocalChips(savedLoc);

    $("#openList").addEventListener("click", () => go("list"));
    $("#openSettings").addEventListener("click", openSettings);
    $("#saveKey").addEventListener("click", () => {
      const k = $("#apiKey").value.trim();
      if (!k) { toast("Paste a key first"); return; }
      store.set("apiKey", k); closeSheets(); toast("Key saved on this device");
      if ($("#q").value) runSearch($("#q").value);
    });
    $("#clearKey").addEventListener("click", () => { store.del("apiKey"); $("#apiKey").value = ""; toast("Key removed"); });

    renderRecipeGrid();
    renderClothing();
    renderFibers();
    saveList(getList());
    go(location.hash.slice(1) || "search", { push: false });

    if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
      navigator.serviceWorker.register("sw.js").catch(() => {});
    }
  }

  init();
})();
