/* Non-Toxic Living - main app (no build step, plain JS). */
(function () {
  "use strict";

  const PRODUCTS = window.NTL_PRODUCTS || [];
  const RECIPES = window.NTL_RECIPES || [];
  const CLOTHING = window.NTL_CLOTHING || [];
  const FIBERS = window.NTL_FIBERS || [];
  const ADDITIVES = (window.NTL_ADDITIVES || []).map((a) => ({ ...a, rx: new RegExp(a.re, "i") }));

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const enc = encodeURIComponent;

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
    toast._t = setTimeout(() => t.classList.remove("show"), 2200);
  }

  /* ---------------- navigation ---------------- */
  const VIEWS = ["search", "recipes", "scan", "local", "clothing", "about", "list"];
  function go(view, { push = true } = {}) {
    if (!VIEWS.includes(view)) view = "search";
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
    if (e.target.closest("[data-close]")) closeSheets();
  });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeSheets(); });

  /* ---------------- link builders ---------------- */
  function buyLinks(brand, product) {
    const q = `${brand} ${product}`.trim();
    return [
      { label: "Amazon", url: `https://www.amazon.com/s?k=${enc(q)}` },
      { label: "Thrive Market", url: `https://thrivemarket.com/search?search=${enc(q)}` },
      { label: "Target", url: `https://www.target.com/s?searchTerm=${enc(q)}` },
      { label: "Walmart", url: `https://www.walmart.com/search?q=${enc(q)}` },
      { label: "Whole Foods", url: `https://www.wholefoodsmarket.com/search?text=${enc(q)}` },
      { label: "📍 Nearby", url: `https://www.google.com/maps/search/?api=1&query=${enc(q + " near me")}` }
    ];
  }
  const linkRow = (links) =>
    `<div class="buy">${links.map((l) => l.url.startsWith("#")
      ? `<a href="#" data-go="${esc(l.url.slice(1))}">${esc(l.label)}</a>`
      : `<a href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)}</a>`).join("")}</div>`;
  const addBtn = (item) => `<button class="add-btn" data-add='${esc(JSON.stringify(item))}' aria-label="Add to shopping list">＋ List</button>`;

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
    const out = $("#results");
    if (!query.trim()) { out.innerHTML = ""; return; }

    let prods = searchIn(PRODUCTS, query);
    let recs = searchIn(RECIPES, query);
    let cloth = searchIn(CLOTHING, query);
    // Drop weak partial matches (e.g. "rice" in fried rice when searching "rice krispies")
    const top = Math.max(0, ...[prods, recs, cloth].map((l) => (l[0] ? l[0].s : 0)));
    const strong = (l, n) => l.filter((x) => x.s >= top * 0.5).slice(0, n);
    prods = strong(prods, 4); recs = strong(recs, 4); cloth = strong(cloth, 3);

    const nq = norm(query);
    const wantsRecipe = /\b(craving|crave|recipe|make|bake|cook|homemade)\b/.test(nq);
    const sections = [];
    if (prods.length) sections.push({ s: prods[0].s + (wantsRecipe ? 0 : 5), html: `<h2 class="sec-title">🛍️ Clean brands to buy</h2>${prods.map((x) => productCard(x.it)).join("")}` });
    if (recs.length) sections.push({ s: recs[0].s + (wantsRecipe ? 50 : 0), html: `<h2 class="sec-title">👩‍🍳 Make it yourself</h2><div class="grid">${recs.map((x) => recipeCard(x.it)).join("")}</div>` });
    if (cloth.length) sections.push({ s: cloth[0].s, html: `<h2 class="sec-title">🧺 Natural-fiber picks</h2>${cloth.map((x) => clothingCard(x.it)).join("")}` });
    sections.sort((a, b) => b.s - a.s);

    out.innerHTML = (sections.length ? sections.map((s) => s.html).join("") : noResults(query)) + aiBox(query, !sections.length);
    bindAiBox(out, query);
    store.set("lastSearch", query);
  }

  function noResults(q) {
    return `<div class="card empty">
      <h3>We don't have "${esc(q)}" in our guide yet</h3>
      <p>Here's how to find a clean version fast:</p>
      <ol class="steps">
        <li>Flip the package and use <a href="#" data-go="scan">Label Check</a> to scan or paste the ingredients.</li>
        <li>Look for: <b>avocado oil, olive oil, coconut oil, butter or tallow</b> - and no canola, soybean, sunflower or "vegetable oil".</li>
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
  function productCard(p, { ai = false } = {}) {
    const picks = (p.picks || []).map((k) => {
      const g = grade(k.score ?? 70);
      let actions;
      if (k.recipe) actions = `<div class="buy"><a href="#" data-recipe="${esc(k.recipe)}" class="strong">👩‍🍳 See the recipe</a></div>`;
      else if (k.local) actions = linkRow([
        { label: "📍 Find near me", url: `https://www.google.com/maps/search/?api=1&query=${enc(k.p + " near me")}` },
        { label: "🧑‍🌾 Shop Local tab", url: "#local" }
      ]);
      else actions = linkRow([...(k.site ? [{ label: "Brand site", url: k.site }] : []), ...buyLinks(k.b, k.p)]);
      return `<li class="pick">
        <div class="score ${g.cls}" title="${g.label}"><b>${esc(k.score ?? "–")}</b><small>${g.label}</small></div>
        <div class="pick-body">
          <div class="pick-head"><b>${esc(k.b)}</b> <span>${esc(k.p)}</span></div>
          ${k.oil ? `<span class="tag oil">🫒 ${esc(k.oil)}</span>` : ""}
          <p>${esc(k.why)}</p>
          ${actions}
          ${k.recipe ? "" : addBtn({ name: `${k.b} - ${k.p}`, note: p.name })}
        </div>
      </li>`;
    }).join("");
    const avoid = (p.avoid || []).length
      ? `<details class="avoid"><summary>🚫 Skip these (${p.avoid.length})</summary><ul>${p.avoid.map((a) => `<li><b>${esc(a.b)}</b> - ${esc(a.why)}</li>`).join("")}</ul></details>` : "";
    return `<article class="card product">
      <header><span class="emoji">${esc(p.emoji || "🛒")}</span><div><h3>${esc(p.name)}</h3><span class="cat">${esc(p.cat || "")}</span></div>${ai ? `<span class="ai-badge">✨ AI</span>` : ""}</header>
      ${p.tip ? `<p class="tip">💡 ${esc(p.tip)}</p>` : ""}
      ${p.leastBad ? `<div class="leastbad"><b>⚠️ Hard to find seed-oil-free?</b> ${esc(p.leastBad)}</div>` : ""}
      <ul class="picks">${picks}</ul>
      ${avoid}
      <p class="fine">Formulas change - always double-check the label.</p>
    </article>`;
  }

  /* ---------------- clothing ---------------- */
  function clothingCard(c) {
    const picks = c.picks.map((k) => `<li class="pick">
      <div class="score s-fiber"><b>🧵</b></div>
      <div class="pick-body">
        <div class="pick-head"><b>${esc(k.b)}</b> <span>${esc(k.p)}</span></div>
        <span class="tag fiber">${esc(k.mat)}</span>
        <p>${esc(k.why)}</p>
        ${linkRow([
          { label: "Brand site", url: k.site },
          { label: "Amazon", url: `https://www.amazon.com/s?k=${enc(k.b + " " + k.p)}` },
          { label: "Google Shopping", url: `https://www.google.com/search?tbm=shop&q=${enc(k.b + " " + k.p)}` }
        ])}
        ${addBtn({ name: `${k.b} - ${k.p}`, note: c.name })}
      </div></li>`).join("");
    return `<article class="card product">
      <header><span class="emoji">${esc(c.emoji)}</span><div><h3>${esc(c.name)}</h3><span class="cat">No polyester</span></div></header>
      <p class="tip">💡 ${esc(c.tip)}</p>
      <ul class="picks">${picks}</ul>
      <div class="avoid static">🚫 <b>Avoid:</b> ${esc(c.avoid)}</div>
      ${linkRow([
        { label: `Search "100% cotton ${c.name.toLowerCase()}"`, url: `https://www.amazon.com/s?k=${enc("100% cotton " + c.name)}` },
        { label: "100% wool", url: `https://www.amazon.com/s?k=${enc("100% wool " + c.name)}` },
        { label: "Etsy handmade", url: `https://www.etsy.com/search?q=${enc("100% cotton " + c.name)}` }
      ])}
    </article>`;
  }

  function renderClothing(filter = "") {
    const list = filter.trim() ? searchIn(CLOTHING, filter, 10).map((x) => x.it) : CLOTHING;
    $("#clothingList").innerHTML = list.length ? list.map(clothingCard).join("") : `<div class="card empty"><p>No match - try "blanket", "sheets", "jeans" or "underwear".</p></div>`;
  }
  function renderFibers() {
    $("#fiberList").innerHTML = FIBERS.map((f) => `<div class="fiber g-${f.grade}"><b>${esc(f.name)}</b><span>${esc(f.note)}</span></div>`).join("");
  }

  /* ---------------- recipes ---------------- */
  function recipeCard(r) {
    return `<button class="card recipe-card" data-recipe="${esc(r.id)}">
      <span class="emoji big">${esc(r.emoji)}</span>
      <h3>${esc(r.title)}</h3>
      <p class="meta">⏱ ${esc(r.time)} · ${r.nutrition.protein}g protein · ${r.nutrition.cal} cal</p>
      <div class="tags">${(r.tags || []).slice(0, 3).map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</div>
    </button>`;
  }
  function renderRecipeGrid(filter = "") {
    const list = filter.trim() ? searchIn(RECIPES, filter, 10).map((x) => x.it) : RECIPES;
    $("#recipeGrid").innerHTML = list.length ? list.map(recipeCard).join("") : `<div class="card empty"><p>No recipe match. Try the main search - or add an AI key in ⚙️ Settings to generate any recipe.</p></div>`;
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

  let currentRecipe = null;
  function openRecipe(idOrObj, servings) {
    const r = typeof idOrObj === "string" ? RECIPES.find((x) => x.id === idOrObj) || (currentRecipe && currentRecipe.id === idOrObj ? currentRecipe : null) : idOrObj;
    if (!r) return;
    currentRecipe = r;
    const n = servings || r.serves;
    const f = n / r.serves;
    const nut = r.nutrition || {};
    const ingr = r.ingredients.map((i, idx) => {
      const qty = fmtQty(i.q * f, i.u);
      const links = i.brand && !/^(organic|local)\b/i.test(i.brand)
        ? `<div class="ing-links"><span class="brand">✔︎ ${esc(i.brand)}</span>
           <a href="https://www.amazon.com/s?k=${enc(i.brand)}" target="_blank" rel="noopener">Amazon</a>
           <a href="https://thrivemarket.com/search?search=${enc(i.brand)}" target="_blank" rel="noopener">Thrive</a>
           <a href="https://www.target.com/s?searchTerm=${enc(i.brand)}" target="_blank" rel="noopener">Target</a>
           <a href="https://www.google.com/maps/search/?api=1&query=${enc(i.brand + " near me")}" target="_blank" rel="noopener">📍</a></div>`
        : i.brand ? `<div class="ing-links"><span class="brand">✔︎ ${esc(i.brand)} - farmers market or grocery</span></div>` : "";
      return `<li><label><input type="checkbox" data-ing="${idx}"><span><b>${esc(qty)}</b> ${esc(i.item)}</span></label>${links}</li>`;
    }).join("");
    $("#sheetBody").innerHTML = `
      <div class="recipe">
        <div class="recipe-hero"><span class="emoji huge">${esc(r.emoji || "🍽️")}</span>
          <div><h2>${esc(r.title)}</h2><p class="meta">⏱ ${esc(r.time)}</p>
          <div class="tags">${(r.tags || []).map((t) => `<span class="tag">${esc(t)}</span>`).join("")}${r.ai ? `<span class="ai-badge">✨ AI-generated - double-check labels</span>` : ""}</div></div>
        </div>
        ${r.intro ? `<p class="intro">${esc(r.intro)}</p>` : ""}
        <h3>Nutrition <small>per ${esc(r.unit || "serving")} (estimated)</small></h3>
        <div class="nutri">
          <div><b>${nut.cal ?? "–"}</b><span>Calories</span></div>
          <div class="hl-protein"><b>${nut.protein ?? "–"}g</b><span>Protein</span></div>
          <div><b>${nut.carbs ?? "–"}g</b><span>Carbs</span></div>
          <div><b>${nut.fat ?? "–"}g</b><span>Fat</span></div>
          <div><b>${nut.fiber ?? "–"}g</b><span>Fiber</span></div>
          <div><b>${nut.sugar ?? "–"}g</b><span>Sugar</span></div>
        </div>
        <div class="ing-head">
          <h3>Ingredients</h3>
          <div class="stepper" aria-label="Servings">
            <button data-serv="-1" aria-label="Fewer">−</button><span><b>${n}</b> ${esc(r.unit && n === 1 ? r.unit : "servings")}</span><button data-serv="1" aria-label="More">＋</button>
          </div>
        </div>
        <ul class="ingredients">${ingr}</ul>
        <button class="btn primary wide" id="addAllIng">🛒 Add all ingredients to my list</button>
        <h3>Steps</h3>
        <ol class="steps big">${r.steps.map((s) => `<li>${esc(s)}</li>`).join("")}</ol>
        ${r.tip ? `<p class="tip">💡 ${esc(r.tip)}</p>` : ""}
        ${(r.swaps || []).length ? `<h3>Swaps</h3><div class="swaps">${r.swaps.map((s) => `<div class="swap"><span class="tag swap-tag">${esc(s.tag)}</span><p>${esc(s.text)}</p></div>`).join("")}</div>` : ""}
      </div>`;
    $$("[data-serv]", $("#sheetBody")).forEach((b) =>
      b.addEventListener("click", () => openRecipe(r, Math.max(1, n + Number(b.dataset.serv)))));
    $("#addAllIng").addEventListener("click", () =>
      addToList(r.ingredients.filter((i) => i.q || i.brand).map((i) => ({ name: `${fmtQty(i.q * f, i.u)} ${i.item}`.trim(), note: i.brand ? `${i.brand} · ${r.title}` : r.title }))));
    openSheet("#sheet");
  }

  function openSheet(sel) {
    const s = $(sel);
    s.hidden = false;
    document.body.classList.add("no-scroll");
    $(".sheet-panel", s).scrollTop = 0;
  }
  function closeSheets() {
    $$(".sheet").forEach((s) => (s.hidden = true));
    document.body.classList.remove("no-scroll");
  }

  /* ---------------- shopping list ---------------- */
  const getList = () => store.get("list", []);
  function saveList(list) { store.set("list", list); $("#listCount").textContent = list.filter((i) => !i.done).length; }
  function addToList(items) {
    const list = getList();
    let added = 0;
    for (const it of items) if (!list.some((x) => x.name === it.name)) { list.push({ ...it, done: false }); added++; }
    saveList(list);
    toast(added ? `Added ${added} item${added > 1 ? "s" : ""} to your list 🛒` : "Already on your list");
  }
  function renderList() {
    const list = getList();
    const body = $("#listBody");
    if (!list.length) { body.innerHTML = `<div class="card empty"><p>Your list is empty. Tap <b>＋ List</b> on any brand or ingredient.</p></div>`; return; }
    body.innerHTML = `<div class="card"><ul class="shoplist">${list.map((i, idx) => `
      <li class="${i.done ? "done" : ""}"><label><input type="checkbox" data-li="${idx}" ${i.done ? "checked" : ""}><span><b>${esc(i.name)}</b>${i.note ? `<small>${esc(i.note)}</small>` : ""}</span></label>
      <button class="x" data-del="${idx}" aria-label="Remove">✕</button></li>`).join("")}</ul>
      <div class="row"><button class="btn" id="copyList">📋 Copy / share</button><button class="btn" id="clearDone">Clear checked</button><button class="btn danger" id="clearAll">Clear all</button></div></div>`;
    $$("[data-li]", body).forEach((c) => c.addEventListener("change", () => { const l = getList(); l[c.dataset.li].done = c.checked; saveList(l); renderList(); }));
    $$("[data-del]", body).forEach((b) => b.addEventListener("click", () => { const l = getList(); l.splice(b.dataset.del, 1); saveList(l); renderList(); }));
    $("#clearDone").addEventListener("click", () => { saveList(getList().filter((i) => !i.done)); renderList(); });
    $("#clearAll").addEventListener("click", () => { if (confirm("Clear your whole list?")) { saveList([]); renderList(); } });
    $("#copyList").addEventListener("click", async () => {
      const text = "Non-Toxic Living shopping list\n" + getList().filter((i) => !i.done).map((i) => `☐ ${i.name}${i.note ? ` (${i.note})` : ""}`).join("\n");
      try {
        if (navigator.share) await navigator.share({ title: "Shopping list", text });
        else { await navigator.clipboard.writeText(text); toast("Copied!"); }
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

  function renderAnalysis({ text, product }) {
    const { hits, score: base } = analyze(text);
    let score = base;
    const nova = product && product.nova_group;
    if (nova === 4) score = Math.max(0, score - 10);
    const g = grade(score);
    const seed = hits.filter((h) => h.type === "Seed oil");
    const groups = {};
    hits.forEach((h) => (groups[h.type] = groups[h.type] || []).push(h));
    const sevIcon = { high: "🔴", moderate: "🟠", low: "🟡" };

    let seedHtml;
    if (!seed.length) seedHtml = `<div class="verdict good">✅ <b>No seed oils found.</b></div>`;
    else {
      const worst = seed.some((s) => s.sev === "high") ? "high" : "moderate";
      seedHtml = `<div class="verdict ${worst === "high" ? "bad" : "meh"}">
        <b>${worst === "high" ? "🔴" : "🟠"} Seed oils found:</b> ${seed.map((s) => esc(s.name)).join(", ")}<br>
        ${seed.map((s) => `<small>• ${esc(s.name)} appears ${s.pos < 0.33 ? "<b>early in the list - a major ingredient</b>" : s.pos < 0.66 ? "in the middle of the list" : "near the end - a small amount"}. ${esc(s.why)}</small>`).join("<br>")}
      </div>`;
    }

    const matches = product ? searchIn(PRODUCTS, `${product.product_name || ""} ${(product.categories_tags || []).slice(-3).map((c) => c.replace(/^\w\w:/, "")).join(" ")}`, 15).slice(0, 1) : searchIn(PRODUCTS, text, 40).slice(0, 1);

    $("#scanResult").innerHTML = `
      <div class="card result">
        ${product ? `<div class="off-prod">${product.image_front_small_url ? `<img src="${esc(product.image_front_small_url)}" alt="">` : ""}<div><h3>${esc(product.product_name || "Unknown product")}</h3><p class="meta">${esc(product.brands || "")}</p></div></div>` : ""}
        <div class="big-score ${g.cls}"><b>${score}</b><span>/100 · ${g.label}</span></div>
        ${nova ? `<p class="meta">NOVA processing group: <b>${nova}</b>${nova === 4 ? " (ultra-processed, −10)" : ""}</p>` : ""}
        ${seedHtml}
        ${hits.length ? Object.entries(groups).map(([type, list]) => `
          <h4>${esc(type)}</h4>
          <ul class="flags">${list.map((h) => `<li class="sev-${h.sev}">${sevIcon[h.sev]} <b>${esc(h.name)}</b> - ${esc(h.why)}${h.eu ? `<br><small class="eu">🇪🇺 ${esc(h.eu)}</small>` : ""}</li>`).join("")}</ul>`).join("")
          : `<div class="verdict good">🎉 No red-flag additives found. Nice pick!</div>`}
        <details><summary>Ingredients analyzed</summary><p class="fine">${esc(text)}</p></details>
      </div>
      ${matches.length ? `<h2 class="sec-title">🔁 Cleaner alternatives</h2>${productCard(matches[0].it)}` : ""}`;
    $("#scanResult").scrollIntoView({ behavior: "smooth", block: "start" });
  }

  async function lookupBarcode(code) {
    code = String(code || "").replace(/\D/g, "");
    if (code.length < 6) { toast("Enter the numbers under the barcode"); return; }
    $("#scanResult").innerHTML = `<div class="card"><p class="loading">Looking up ${esc(code)}…</p></div>`;
    try {
      const res = await fetch(`https://world.openfoodfacts.org/api/v2/product/${code}.json?fields=product_name,brands,image_front_small_url,ingredients_text,ingredients_text_en,nova_group,categories_tags`);
      const data = await res.json();
      if (data.status !== 1 || !data.product) throw new Error("not found");
      const p = data.product;
      const text = p.ingredients_text_en || p.ingredients_text;
      if (!text) {
        $("#scanResult").innerHTML = `<div class="card"><h3>${esc(p.product_name || "Found it")}</h3><p>This product has no ingredient list in Open Food Facts yet. Paste the ingredients from the package below and we'll check them.</p></div>`;
        return;
      }
      renderAnalysis({ text, product: p });
    } catch {
      $("#scanResult").innerHTML = `<div class="card"><h3>Product not found</h3><p>It isn't in the Open Food Facts database yet. Paste the ingredient list instead - you can also <a href="https://world.openfoodfacts.org/cgi/product.pl" target="_blank" rel="noopener">add it to Open Food Facts</a> to help others.</p></div>`;
    }
  }

  let scanStream = null;
  async function startScan() {
    if (!("BarcodeDetector" in window)) { toast("Live scanning isn't supported in this browser - type the barcode number instead."); $("#barcode").focus(); return; }
    try {
      const detector = new window.BarcodeDetector({ formats: ["ean_13", "ean_8", "upc_a", "upc_e"] });
      scanStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
      const video = $("#scanVideo");
      video.srcObject = scanStream;
      $("#scanner").hidden = false;
      await video.play();
      const tick = async () => {
        if (!scanStream) return;
        try {
          const codes = await detector.detect(video);
          if (codes.length) { const v = codes[0].rawValue; stopScan(); $("#barcode").value = v; lookupBarcode(v); return; }
        } catch { /* frame not ready */ }
        setTimeout(tick, 250);
      };
      tick();
    } catch { toast("Couldn't open the camera"); stopScan(); }
  }
  function stopScan() {
    if (scanStream) scanStream.getTracks().forEach((t) => t.stop());
    scanStream = null;
    $("#scanner").hidden = true;
  }

  /* ---------------- shop local ---------------- */
  const LOCAL_SEARCHES = [
    ["🥕", "farmers market"], ["🥩", "grass fed beef farm"], ["🥛", "raw milk farm"], ["🥚", "pasture raised eggs farm"],
    ["🔪", "local butcher shop"], ["📦", "CSA farm share"], ["🍓", "u-pick farm"], ["🍯", "local honey beekeeper"],
    ["🍞", "sourdough bakery"], ["🥬", "health food store"], ["🐔", "pasture raised chicken farm"], ["🐷", "pastured pork farm"]
  ];
  function renderLocalChips(loc) {
    const where = loc ? ` near ${loc}` : " near me";
    $("#localChips").innerHTML = LOCAL_SEARCHES.map(([e, t]) =>
      `<a class="chip" target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query=${enc(t + where)}">${e} ${esc(t)}</a>`).join("");
  }

  const TYPE_LABEL = (t) =>
    t.amenity === "marketplace" ? ["🥕", "Farmers market"] :
    t.shop === "farm" ? ["🧑‍🌾", "Farm stand / farm shop"] :
    t.shop === "butcher" ? ["🥩", "Butcher"] :
    t.shop === "greengrocer" ? ["🥬", "Produce market"] :
    t.shop === "health_food" ? ["🌿", "Health food store"] :
    t.shop === "dairy" ? ["🥛", "Dairy"] : ["📍", "Local food"];

  function miles(a, b) {
    const R = 3958.8, rad = Math.PI / 180;
    const dLat = (b.lat - a.lat) * rad, dLon = (b.lon - a.lon) * rad;
    const h = Math.sin(dLat / 2) ** 2 + Math.cos(a.lat * rad) * Math.cos(b.lat * rad) * Math.sin(dLon / 2) ** 2;
    return 2 * R * Math.asin(Math.sqrt(h));
  }

  async function findLocal(center, label) {
    const out = $("#localResults");
    const r = Number($("#radius").value);
    out.innerHTML = `<div class="card"><p class="loading">Finding farms & markets near ${esc(label)}…</p></div>`;
    renderLocalChips(label);
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
        const [icon, type] = TYPE_LABEL(t);
        return pos && { name: t.name || `Unnamed ${type.toLowerCase()}`, icon, type, t, pos, d: miles(center, pos) };
      }).filter(Boolean).sort((a, b) => a.d - b.d).slice(0, 60);

      if (!places.length) {
        out.innerHTML = `<div class="card"><h3>No listings found on the open map near ${esc(label)}</h3><p>Small farms are often unlisted. Use the quick searches and directories below - they cover far more farms.</p></div>`;
        return;
      }
      const types = [...new Set(places.map((p) => p.type))];
      out.innerHTML = `<div class="card">
        <h3>${places.length} places near ${esc(label)}</h3>
        <div class="chips filter-chips"><button class="chip active" data-ft="">All</button>${types.map((t) => `<button class="chip" data-ft="${esc(t)}">${esc(t)}</button>`).join("")}</div>
        <ul class="places">${places.map((p) => {
          const addr = [p.t["addr:housenumber"], p.t["addr:street"], p.t["addr:city"]].filter(Boolean).join(" ");
          const site = p.t.website || p.t["contact:website"];
          return `<li data-type="${esc(p.type)}"><span class="emoji">${p.icon}</span><div>
            <b>${esc(p.name)}</b> <small class="meta">${esc(p.type)} · ${p.d.toFixed(1)} mi</small>
            ${addr ? `<div class="meta">${esc(addr)}</div>` : ""}
            ${p.t.opening_hours ? `<div class="meta">🕒 ${esc(p.t.opening_hours)}</div>` : ""}
            <div class="buy"><a target="_blank" rel="noopener" href="https://www.google.com/maps/dir/?api=1&destination=${p.pos.lat},${p.pos.lon}">Directions</a>${site ? `<a target="_blank" rel="noopener" href="${esc(site)}">Website</a>` : ""}<a target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query=${enc(p.name + " " + (p.t["addr:city"] || label))}">Reviews</a></div>
          </div></li>`;
        }).join("")}</ul>
        <p class="fine">Map data © OpenStreetMap contributors. Always call ahead - hours change seasonally.</p></div>`;
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
- Recipes: exact quantities, short easy steps, nutrition per serving estimated from USDA values, and swaps (always include vegetarian, plus dairy-free / gluten-free / higher protein where relevant).`;

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
    if (!apiKey) throw new Error("Add your Anthropic API key in ⚙️ Settings first.");
    if (!AnthropicCtor) AnthropicCtor = (await import("https://cdn.jsdelivr.net/npm/@anthropic-ai/sdk@0.131.0/+esm")).default;
    const client = new AnthropicCtor({ apiKey, dangerouslyAllowBrowser: true });
    const prompt = kind === "recipe"
      ? `Create a clean, non-toxic, seed-oil-free recipe for: "${query}". Make it taste like the real thing. Recommend a specific clean brand for each store-bought ingredient (use "organic ___" for produce).`
      : `List the cleanest non-toxic, seed-oil-free brands to buy for: "${query}". Give 3-6 picks scored 0-100 (Yuka-style, 100 = cleanest) and 1-3 common brands to avoid. Leave leastBad empty unless clean options are genuinely hard to find.`;
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
      <h3>✨ ${prominent ? "Get it with AI" : "Want more options?"}</h3>
      <p>${hasKey ? `Generate a clean recipe or brand list for <b>"${esc(query)}"</b>.` : `Add your own Anthropic API key in <a href="#" id="aiSettings">⚙️ Settings</a> to generate a clean recipe or brand list for <i>any</i> food.`}</p>
      ${hasKey ? `<div class="row"><button class="btn primary" data-ai="recipe">👩‍🍳 Clean recipe</button><button class="btn" data-ai="product">🛍️ Clean brands</button></div><div class="ai-out"></div>` : ""}
    </div>`;
  }
  function bindAiBox(root, query) {
    const s = $("#aiSettings", root);
    if (s) s.addEventListener("click", (e) => { e.preventDefault(); openSettings(); });
    $$("[data-ai]", root).forEach((b) => b.addEventListener("click", async () => {
      const outEl = $(".ai-out", root);
      const kind = b.dataset.ai;
      $$("[data-ai]", root).forEach((x) => (x.disabled = true));
      outEl.innerHTML = `<p class="loading">✨ Creating a clean ${kind === "recipe" ? "recipe" : "brand guide"} for "${esc(query)}"…</p>`;
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
        outEl.innerHTML = `<p class="error">⚠️ ${esc(err && err.status === 401 ? "That API key was rejected - check it in Settings." : err.message || "Something went wrong.")}</p>`;
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
    const quick = ["mayonnaise", "cookies", "rice krispies", "grass-fed beef", "potato chips", "ice cream", "peanut butter", "wool blanket", "cotton sheets", "toothpaste", "pizza", "cooking oil"];
    $("#quickChips").innerHTML = quick.map((q) => `<button class="chip" data-search="${esc(q)}">${esc(q)}</button>`).join("");

    $("#searchForm").addEventListener("submit", (e) => { e.preventDefault(); runSearch($("#q").value); });
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
        () => toast("Location permission denied - type a ZIP instead"),
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
      store.set("apiKey", k); closeSheets(); toast("Key saved on this device ✨");
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
