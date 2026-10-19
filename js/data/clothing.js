/*
 * Natural-fiber clothing & home textiles. Goal: 100% cotton, wool, linen, silk, hemp - no polyester.
 * "mat" is the fiber content we expect; "note" flags lines that blend in synthetics so people check tags.
 */
window.NTL_CLOTHING = [
  {
    id: "tshirts", name: "T-Shirts & Basics", emoji: "👕",
    keys: ["t shirt", "t-shirt", "tshirt", "tee", "tees", "tank top", "basics", "shirt", "shirts", "clothes", "clothing"],
    tip: "Look for '100% cotton' (ideally GOTS-certified organic, which also bans toxic dyes & finishes). 'Cotton blend' or 'tri-blend' = polyester.",
    picks: [
      { b: "Kotn", p: "Essential Tees", mat: "100% organic Egyptian cotton", why: "Long-staple cotton, direct from farmers in Egypt.", site: "https://kotn.com" },
      { b: "Pact", p: "Organic Cotton Tees", mat: "100% organic cotton (most tees)", why: "GOTS & Fair Trade certified. Some styles add elastane - check tag.", site: "https://wearpact.com" },
      { b: "Jungmaven", p: "Hemp/Organic Cotton Tees", mat: "Hemp + organic cotton", why: "Hemp gets softer every wash, made in USA.", site: "https://jungmaven.com" },
      { b: "Hanes", p: "Beefy-T", mat: "100% cotton", why: "Budget option - conventional cotton, but no polyester.", site: "https://www.hanes.com" }
    ],
    avoid: "Athletic/'performance' tees, 'tri-blends', anything 'moisture-wicking' (= polyester)."
  },
  {
    id: "jeans", name: "Jeans & Pants", emoji: "👖",
    keys: ["jeans", "denim", "pants", "trousers", "chinos", "shorts"],
    tip: "Stretchy jeans are blended with polyester/elastane. Rigid 100% cotton denim lasts decades and softens with wear.",
    picks: [
      { b: "Levi's", p: "501 Original Fit (non-stretch)", mat: "100% cotton", why: "The original. Check the tag - some washes now add stretch.", site: "https://www.levi.com" },
      { b: "Wrangler", p: "Cowboy Cut 13MWZ", mat: "100% cotton", why: "Made for ranchers. Durable and cheap.", site: "https://www.wrangler.com" },
      { b: "Mother Denim / Agolde", p: "Rigid denim lines", mat: "100% cotton (rigid styles)", why: "Women's cuts in 100% cotton rigid denim.", site: "https://agolde.com" },
      { b: "Patagonia", p: "Organic Cotton Jeans & Canvas Pants", mat: "Organic cotton (most)", why: "Fair Trade sewn, some styles add hemp.", site: "https://www.patagonia.com" }
    ],
    avoid: "'Stretch', 'jeggings', 'comfort waist' - usually 2-30% polyester/elastane."
  },
  {
    id: "underwear", name: "Underwear & Bras", emoji: "🩲",
    keys: ["underwear", "panties", "boxers", "briefs", "bra", "bras", "lingerie", "thong"],
    tip: "This is the most important swap - polyester sits against your most sensitive skin. A small 1990s study found polyester underwear stopped sperm production in men; levels returned after switching back.",
    picks: [
      { b: "Cottonique", p: "Organic Cotton Underwear & Bras", mat: "100% organic cotton, latex-free", why: "Made for people with chemical sensitivities - even the elastic is cotton-covered.", site: "https://www.cottonique.com" },
      { b: "Pact", p: "Organic Cotton Underwear", mat: "95% organic cotton / 5% elastane", why: "Mostly cotton - very close and affordable.", site: "https://wearpact.com" },
      { b: "Organic Basics", p: "Organic Cotton Underwear", mat: "Organic cotton + small elastane", why: "GOTS-certified.", site: "https://organicbasics.com" },
      { b: "Lunya / Silk lingerie", p: "Washable Silk", mat: "100% silk", why: "Silk is a natural protein fiber.", site: "https://www.lunya.co" }
    ],
    avoid: "Polyester/nylon microfiber 'seamless' underwear and sports bras."
  },
  {
    id: "socks", name: "Socks", emoji: "🧦",
    keys: ["socks", "sock", "stockings", "tights"],
    tip: "100% natural socks are rare (they need some stretch). Look for 80%+ wool or cotton. In 2022 the Center for Environmental Health found BPA in polyester-spandex socks from several big brands.",
    picks: [
      { b: "Minus33", p: "Merino Wool Socks", mat: "Merino wool (high %)", why: "US-made merino, warm & breathable.", site: "https://www.minus33.com" },
      { b: "Darn Tough", p: "Merino Socks", mat: "~60%+ merino wool + nylon", why: "Made in Vermont, lifetime guarantee. Not 100%, but mostly wool.", site: "https://darntough.com" },
      { b: "Maggie's Organics", p: "Organic Cotton Socks", mat: "Organic cotton (high %)", why: "Fair-trade organic cotton.", site: "https://www.maggiesorganics.com" }
    ],
    avoid: "Polyester/spandex athletic socks - especially bright 'sport' socks."
  },
  {
    id: "activewear", name: "Activewear & Leggings", emoji: "🧘",
    keys: ["leggings", "yoga pants", "activewear", "workout clothes", "gym clothes", "sports bra", "athleisure", "lululemon"],
    tip: "The hardest category: nearly all leggings are nylon/polyester + spandex. Best options are merino wool or organic cotton with a little elastane.",
    picks: [
      { b: "Icebreaker", p: "Merino Leggings & Tops", mat: "Merino wool (some 100%, some nylon-core)", why: "Merino regulates temperature and resists odor naturally.", site: "https://www.icebreaker.com" },
      { b: "Pact", p: "Organic Cotton Leggings", mat: "~95% organic cotton / 5% elastane", why: "Closest to all-natural for yoga & lounging.", site: "https://wearpact.com" },
      { b: "Minus33", p: "Merino Base Layers", mat: "100% merino wool", why: "Great for running in cold weather.", site: "https://www.minus33.com" }
    ],
    avoid: "Polyester/nylon/spandex leggings - especially when sweating (heat + friction)."
  },
  {
    id: "sweaters", name: "Sweaters & Knitwear", emoji: "🧶",
    keys: ["sweater", "sweaters", "cardigan", "knit", "hoodie", "sweatshirt", "pullover", "cashmere", "wool sweater"],
    tip: "Look for 100% wool, merino, cashmere, alpaca, or cotton. Many 'wool' sweaters are only 10-30% wool with acrylic.",
    picks: [
      { b: "Quince", p: "Cashmere & Merino Sweaters", mat: "100% Mongolian cashmere / merino", why: "Affordable 100% cashmere.", site: "https://www.quince.com" },
      { b: "Naadam", p: "Cashmere Sweaters", mat: "100% cashmere", why: "Traceable cashmere from Mongolian herders.", site: "https://naadam.co" },
      { b: "L.L.Bean", p: "Classic Ragg Wool / Cotton Sweaters", mat: "Check tag - many 100% wool or cotton", why: "Classic, durable American brand.", site: "https://www.llbean.com" },
      { b: "Pact", p: "Organic Cotton Hoodies & Sweatshirts", mat: "Organic cotton (fleece styles)", why: "Polyester-free sweatshirts.", site: "https://wearpact.com" }
    ],
    avoid: "Acrylic, 'wool blend' with polyester, fleece (= polyester)."
  },
  {
    id: "pajamas", name: "Pajamas & Loungewear", emoji: "😴",
    keys: ["pajamas", "pjs", "pyjamas", "sleepwear", "loungewear", "robe", "nightgown", "kids pajamas"],
    tip: "You wear them 8 hours a night. Kids' pajamas: US flammability rules mean many are polyester or chemically treated - look for 'snug-fitting' cotton (the tag will say 'wear snug-fitting, not flame resistant').",
    picks: [
      { b: "Hanna Andersson", p: "Organic Cotton Kids' Pajamas", mat: "100% organic cotton (snug fit)", why: "Snug-fitting so no flame retardants needed.", site: "https://www.hannaandersson.com" },
      { b: "Coyuchi", p: "Organic Cotton Pajamas & Robes", mat: "100% organic cotton", why: "GOTS certified.", site: "https://www.coyuchi.com" },
      { b: "Lunya", p: "Washable Silk Sleepwear", mat: "100% silk", why: "Breathable natural protein fiber.", site: "https://www.lunya.co" }
    ],
    avoid: "Fleece and 'minky' pajamas; kids' PJs labeled flame-resistant."
  },
  {
    id: "sheets", name: "Sheets & Bedding", emoji: "🛏️",
    keys: ["sheets", "bedding", "bed sheets", "duvet cover", "pillowcase", "pillowcases", "comforter", "duvet", "linen sheets"],
    tip: "You spend a third of your life in bed. 'Microfiber' sheets = polyester. Look for 100% organic cotton (percale or sateen) or 100% linen, ideally GOTS or OEKO-TEX certified.",
    picks: [
      { b: "Coyuchi", p: "Organic Cotton & Linen Sheets", mat: "100% organic cotton / linen", why: "GOTS-certified, regenerative cotton options.", site: "https://www.coyuchi.com" },
      { b: "Boll & Branch", p: "Signature Hemmed Sheets", mat: "100% organic cotton", why: "Fair Trade, GOTS.", site: "https://www.bollandbranch.com" },
      { b: "Brooklinen", p: "Classic Percale / Linen", mat: "100% cotton or 100% linen", why: "OEKO-TEX, widely loved.", site: "https://www.brooklinen.com" },
      { b: "Quince", p: "European Linen Sheets", mat: "100% European flax linen", why: "Linen at a lower price.", site: "https://www.quince.com" },
      { b: "Target", p: "Threshold Organic Cotton Sheets", mat: "100% organic cotton", why: "Budget organic option - read the label.", site: "https://www.target.com/s?searchTerm=organic+cotton+sheets" }
    ],
    avoid: "Microfiber sheets, 'wrinkle-free' (formaldehyde resin finishes), polyester comforter fill."
  },
  {
    id: "blankets", name: "Blankets & Throws", emoji: "🧣",
    keys: ["blanket", "blankets", "throw", "throws", "quilt", "baby blanket", "swaddle", "wool blanket", "cotton blanket"],
    tip: "Those super-soft 'plush' and 'sherpa' blankets are 100% polyester. Wool is naturally flame resistant, temperature regulating and lasts generations.",
    picks: [
      { b: "Faribault Woolen Mill", p: "Wool Blankets & Throws", mat: "100% wool (most)", why: "Made in Faribault, Minnesota since 1865.", site: "https://www.faribaultmill.com" },
      { b: "Pendleton", p: "Wool Blankets", mat: "Wool or wool/cotton (check tag)", why: "Made in Oregon mills since 1909.", site: "https://www.pendleton-usa.com" },
      { b: "Coyuchi", p: "Organic Cotton Throws & Quilts", mat: "100% organic cotton", why: "GOTS-certified cotton.", site: "https://www.coyuchi.com" },
      { b: "Aden + Anais", p: "Organic Cotton Muslin Swaddles", mat: "100% organic cotton muslin", why: "Breathable baby blankets.", site: "https://www.adenandanais.com" },
      { b: "Quince", p: "Cotton & Alpaca Throws", mat: "100% organic cotton / alpaca blends (check)", why: "Affordable natural-fiber throws.", site: "https://www.quince.com" }
    ],
    avoid: "Plush, sherpa, minky, fleece, 'faux fur' - all polyester."
  },
  {
    id: "towels", name: "Towels & Bath", emoji: "🛁",
    keys: ["towels", "towel", "bath towel", "bath mat", "shower curtain", "washcloth", "robe"],
    tip: "PVC/vinyl shower curtains off-gas VOCs. Use a cotton, linen or hemp shower curtain. Towels: 100% cotton or linen.",
    picks: [
      { b: "Coyuchi", p: "Organic Cotton Towels & Shower Curtain", mat: "100% organic cotton", why: "GOTS-certified.", site: "https://www.coyuchi.com" },
      { b: "Parachute", p: "Classic Bath Towels", mat: "100% Turkish cotton", why: "OEKO-TEX certified.", site: "https://www.parachutehome.com" },
      { b: "Rough Linen / Quince", p: "Linen Shower Curtain", mat: "100% linen", why: "Naturally mildew resistant.", site: "https://www.quince.com" }
    ],
    avoid: "Vinyl/PEVA shower curtains, microfiber towels."
  },
  {
    id: "mattress", name: "Mattresses & Pillows", emoji: "🛌",
    keys: ["mattress", "mattresses", "pillow", "pillows", "mattress topper", "crib mattress", "memory foam"],
    tip: "Memory foam = polyurethane foam, often with flame retardants. Organic latex + wool + cotton mattresses pass fire codes using wool instead of chemicals.",
    picks: [
      { b: "Avocado Green", p: "Green Mattress & Pillows", mat: "Organic latex, wool, cotton", why: "GOTS & GOLS certified. Made in California.", site: "https://www.avocadogreenmattress.com" },
      { b: "Naturepedic", p: "Organic Mattresses & Crib Mattresses", mat: "Organic cotton, wool, latex", why: "Top choice for babies' cribs.", site: "https://www.naturepedic.com" },
      { b: "Saatva", p: "Zenhaven Latex Mattress", mat: "Natural Talalay latex, organic cotton, wool", why: "Flame barrier is wool.", site: "https://www.saatva.com" },
      { b: "Holy Lamb Organics", p: "Wool Pillows & Toppers", mat: "Eco-wool + organic cotton", why: "US-made wool bedding.", site: "https://holylamborganics.com" }
    ],
    avoid: "Polyurethane memory foam, 'bed in a box' foam with chemical flame retardants."
  },
  {
    id: "baby", name: "Baby & Kids Clothing", emoji: "👶",
    keys: ["baby clothes", "baby", "onesie", "kids clothes", "toddler", "newborn", "children"],
    tip: "Babies have thin skin and absorb more relative to body size. Choose GOTS organic cotton.",
    picks: [
      { b: "Hanna Andersson", p: "Organic Cotton Kids' Clothing", mat: "Organic cotton", why: "Durable, hand-me-down quality.", site: "https://www.hannaandersson.com" },
      { b: "Burt's Bees Baby", p: "Organic Cotton Bodysuits", mat: "100% organic cotton", why: "Affordable, GOTS-certified.", site: "https://www.burtsbeesbaby.com" },
      { b: "Kyte Baby", p: "Bamboo* & Organic Cotton", mat: "Bamboo viscose / organic cotton", why: "*Bamboo viscose is chemically processed - choose their organic cotton when possible.", site: "https://kytebaby.com" }
    ],
    avoid: "Polyester fleece, character pajamas with plastisol prints."
  },
  {
    id: "dresses", name: "Dresses, Shirts & Workwear", emoji: "👗",
    keys: ["dress", "dresses", "blouse", "button down", "dress shirt", "skirt", "workwear", "suit", "linen"],
    tip: "Linen, cotton poplin, silk and wool suiting are breathable and timeless. Watch for 'rayon/viscose' (chemically processed) and polyester 'crepe'.",
    picks: [
      { b: "Quince", p: "Linen & Silk Dresses / Shirts", mat: "100% linen or 100% silk", why: "Affordable natural fibers.", site: "https://www.quince.com" },
      { b: "Christy Dawn", p: "Dresses", mat: "Deadstock & regenerative cotton", why: "Regenerative farm-to-closet cotton.", site: "https://christydawn.com" },
      { b: "Mate the Label", p: "Organic Cotton & Linen", mat: "Organic cotton / linen", why: "Non-toxic dyes, made in LA.", site: "https://matethelabel.com" },
      { b: "J.Crew / Everlane", p: "Linen & 100% cotton lines", mat: "Check tag", why: "Mainstream brands with natural-fiber lines - just read labels.", site: "https://www.everlane.com" }
    ],
    avoid: "Polyester crepe, chiffon, satin (usually poly), 'stretch' dress shirts."
  }
];

/* Fibers explained - shown as a reference card */
window.NTL_FIBERS = [
  { name: "Organic Cotton", grade: "best", note: "Breathable, washable, no synthetic pesticides. GOTS = also bans toxic dyes & finishes." },
  { name: "Wool / Merino / Alpaca", grade: "best", note: "Temperature regulating, naturally flame resistant & odor resistant." },
  { name: "Linen (flax) & Hemp", grade: "best", note: "Very low water/pesticide crops; get softer with every wash." },
  { name: "Silk & Cashmere", grade: "best", note: "Natural protein fibers. Gentle care." },
  { name: "Conventional Cotton", grade: "good", note: "Still natural. Heavily sprayed crop - wash before wearing." },
  { name: "Lyocell / Tencel", grade: "ok", note: "Wood-based, closed-loop processing. Better than viscose." },
  { name: "Rayon / Viscose / 'Bamboo'", grade: "poor", note: "Plant-based but processed with carbon disulfide. 'Bamboo' clothing is almost always viscose." },
  { name: "Polyester / Nylon / Acrylic / Spandex", grade: "bad", note: "Plastic from petroleum. Sheds microplastics, traps heat & sweat, may carry BPA, phthalates, antimony." }
];
