/*
 * Curated grocery + home product guide.
 *
 * Each category:
 *   id, name, emoji, cat, keys (search words), tip (what to know),
 *   picks:  cleanest brands  { b: brand, p: product, score 0-100, oil, why, site }
 *   avoid:  common offenders { b, why }
 *   leastBad (optional): shown when a truly seed-oil-free option is hard to find
 *
 * Buy links (Amazon, Thrive Market, Target, Walmart, Whole Foods, Google Maps "near me")
 * are generated automatically from brand + product in app.js, so they never go stale.
 * Formulas change - the app always reminds people to double-check the label.
 */
window.NTL_PRODUCTS = [
  {
    id: "mayo", name: "Mayonnaise", emoji: "🥚", cat: "Condiments",
    keys: ["mayo", "mayonnaise", "aioli", "sandwich spread"],
    tip: "Regular mayo is mostly soybean or canola oil. Look for 100% avocado oil or olive oil as the ONLY oil. Watch out: \"made with avocado oil\" from mainstream brands often still blends in soybean/canola.",
    picks: [
      { b: "Primal Kitchen", p: "Avocado Oil Mayo", score: 94, oil: "Avocado oil", why: "Avocado oil, organic cage-free eggs, no sugar, no seed oils.", site: "https://www.primalkitchen.com" },
      { b: "Chosen Foods", p: "100% Avocado Oil Mayo", score: 92, oil: "Avocado oil", why: "Only avocado oil. Chosen Foods avocado oil passed the UC Davis purity testing.", site: "https://chosenfoods.com" },
      { b: "Sir Kensington's", p: "Avocado Oil Mayonnaise", score: 86, oil: "Avocado oil", why: "Avocado oil version only - their 'Classic' uses sunflower oil, so grab the avocado jar.", site: "https://www.sirkensingtons.com" },
      { b: "Homemade", p: "2-Minute Avocado Oil Mayo", score: 100, oil: "Avocado or light olive oil", why: "Egg, oil, lemon, salt. See the recipe in the Recipes tab.", recipe: "mayo" }
    ],
    avoid: [
      { b: "Hellmann's / Best Foods Real", why: "Soybean oil is the first ingredient." },
      { b: "Duke's", why: "Soybean oil base." },
      { b: "Kraft Mayo / Miracle Whip", why: "Soybean oil, plus sugar and modified starch in Miracle Whip." }
    ]
  },
  {
    id: "ketchup", name: "Ketchup", emoji: "🍅", cat: "Condiments",
    keys: ["ketchup", "catsup", "tomato sauce condiment"],
    tip: "Classic ketchup is sweetened with high-fructose corn syrup. Look for organic tomatoes and little to no added sugar.",
    picks: [
      { b: "Primal Kitchen", p: "Organic Unsweetened Ketchup", score: 95, oil: "None", why: "No added sugar, organic tomatoes, balsamic for sweetness.", site: "https://www.primalkitchen.com" },
      { b: "True Made Foods", p: "Veggie Ketchup", score: 88, oil: "None", why: "Sweetened with carrots, spinach & butternut squash instead of HFCS.", site: "https://truemadefoods.com" },
      { b: "Heinz", p: "Organic Tomato Ketchup", score: 70, oil: "None", why: "Organic sugar instead of corn syrup - a decent budget swap.", site: "https://www.heinz.com" }
    ],
    avoid: [{ b: "Heinz Tomato Ketchup (regular)", why: "High-fructose corn syrup AND corn syrup." }]
  },
  {
    id: "dressing", name: "Salad Dressing & Ranch", emoji: "🥗", cat: "Condiments",
    keys: ["salad dressing", "dressing", "ranch", "caesar", "vinaigrette", "italian dressing", "bbq sauce", "buffalo sauce", "sauce"],
    tip: "Nearly every store dressing is soybean or canola oil. Avocado oil or extra-virgin olive oil dressings are the clean options - or make your own in 1 minute.",
    picks: [
      { b: "Primal Kitchen", p: "Ranch / Caesar / Greek Vinaigrette", score: 92, oil: "Avocado oil", why: "Whole line uses avocado oil, no sugar in most flavors.", site: "https://www.primalkitchen.com" },
      { b: "Chosen Foods", p: "Avocado Oil Dressings", score: 88, oil: "Avocado oil", why: "Avocado oil base, simple ingredients.", site: "https://chosenfoods.com" },
      { b: "Primal Kitchen", p: "Classic BBQ Sauce / Buffalo Sauce", score: 88, oil: "Avocado oil (buffalo)", why: "Unsweetened BBQ, clean buffalo sauce.", site: "https://www.primalkitchen.com" },
      { b: "Homemade", p: "Clean Ranch Dressing", score: 100, oil: "Avocado oil mayo", why: "See the Recipes tab.", recipe: "ranch" }
    ],
    avoid: [
      { b: "Hidden Valley Ranch", why: "Soybean/canola oil, plus MSG, artificial flavors, preservatives." },
      { b: "Kraft / Wish-Bone / Ken's", why: "Soybean or canola oil base." }
    ]
  },
  {
    id: "chips", name: "Potato Chips", emoji: "🥔", cat: "Snacks",
    keys: ["chips", "potato chips", "crisps", "kettle chips", "salty snack"],
    tip: "Most chips are fried in sunflower, canola or corn oil. Avocado oil, coconut oil or beef tallow chips exist and taste amazing.",
    picks: [
      { b: "Masa Chips", p: "Beef Tallow Chips", score: 92, oil: "Grass-fed beef tallow", why: "Fried in 100% grass-fed beef tallow. No seed oils.", site: "https://masachips.com" },
      { b: "Jackson's", p: "Sweet Potato Chips", score: 90, oil: "Avocado or coconut oil", why: "Built the brand on no seed oils.", site: "https://www.jacksonshonest.com" },
      { b: "Siete", p: "Kettle Cooked Potato Chips", score: 86, oil: "Avocado oil", why: "Avocado oil, simple ingredients.", site: "https://sietefoods.com" },
      { b: "Boulder Canyon", p: "Avocado Oil Kettle Chips", score: 80, oil: "Avocado oil", why: "Grab the avocado oil bags only - other lines use sunflower/canola.", site: "https://www.bouldercanyonfoods.com" },
      { b: "Kettle Brand", p: "Avocado Oil Chips", score: 76, oil: "Avocado oil", why: "Widely available; only the avocado oil line is seed-oil free.", site: "https://www.kettlebrand.com" }
    ],
    avoid: [
      { b: "Lay's / Ruffles", why: "Sunflower, corn and/or canola oil." },
      { b: "Doritos / Cheetos", why: "Corn/canola/sunflower oil PLUS Red 40, Yellow 5, Yellow 6 and MSG." },
      { b: "Pringles", why: "Vegetable oils, dried potato flakes, maltodextrin - ultra-processed." }
    ]
  },
  {
    id: "tortilla-chips", name: "Tortilla Chips", emoji: "🌮", cat: "Snacks",
    keys: ["tortilla chips", "nachos", "corn chips", "chips and salsa"],
    tip: "Look for chips fried in avocado oil or tallow and made with organic (non-GMO) corn or cassava.",
    picks: [
      { b: "Masa Chips", p: "Tallow Tortilla Chips", score: 94, oil: "Grass-fed beef tallow", why: "Organic heirloom corn + tallow. Three ingredients.", site: "https://masachips.com" },
      { b: "Siete", p: "Grain Free Tortilla Chips", score: 88, oil: "Avocado oil", why: "Cassava-based, avocado oil.", site: "https://sietefoods.com" },
      { b: "Ancient Crunch", p: "Tallow Tortilla Chips", score: 86, oil: "Beef tallow", why: "Tallow-fried, simple ingredient list. Check label per flavor.", site: "https://www.google.com/search?q=Ancient+Crunch+tallow+tortilla+chips" }
    ],
    avoid: [{ b: "Tostitos / Mission chips", why: "Corn, sunflower and/or canola oil; conventional corn." }]
  },
  {
    id: "crackers", name: "Crackers", emoji: "🍘", cat: "Snacks",
    keys: ["crackers", "cracker", "goldfish", "cheez-it", "ritz", "wheat thins"],
    tip: "Crackers are one of the hardest seed-oil-free categories. Seed-based crackers with no added oil are the cleanest.",
    leastBad: "Simple Mills Almond Flour Crackers use organic sunflower oil - still a seed oil, but organic, expeller-pressed and far better than the hydrogenated soybean/canola in Ritz or Cheez-It. If you can't find the top picks, it's the 'least bad' option.",
    picks: [
      { b: "Mary's Gone Crackers", p: "Original Crackers", score: 88, oil: "No added oil", why: "Whole brown rice, quinoa, flax & sesame seeds. No added oil.", site: "https://www.marysgonecrackers.com" },
      { b: "Flackers", p: "Flax Seed Crackers", score: 86, oil: "No added oil", why: "Organic flax, apple cider vinegar, sea salt.", site: "https://www.flackers.com" },
      { b: "Simple Mills", p: "Almond Flour Crackers", score: 60, oil: "Organic sunflower oil", why: "LEAST BAD: clean otherwise, but contains sunflower oil.", site: "https://www.simplemills.com" }
    ],
    avoid: [
      { b: "Ritz", why: "Soybean/canola/palm oil, high-fructose corn syrup in some versions." },
      { b: "Cheez-It / Goldfish", why: "Soybean, sunflower or canola oil; ultra-processed." }
    ]
  },
  {
    id: "cookies", name: "Store-Bought Cookies & Sweets", emoji: "🍪", cat: "Snacks",
    keys: ["cookies", "cookie", "oreos", "sweets", "dessert", "treat", "biscuits"],
    tip: "Almost every packaged cookie uses canola, palm or soybean oil. Your best bet is baking them yourself (5 ingredients, see Recipes) - or the cleanest packaged options below.",
    leastBad: "If you buy packaged, choose ones made with butter, coconut oil or cocoa butter. Palm oil isn't a seed oil but is heavily processed - better than canola/soy, not ideal.",
    picks: [
      { b: "Homemade", p: "Chocolate Chip Cookies", score: 100, oil: "Grass-fed butter", why: "Our recipe uses grass-fed butter, coconut sugar and clean chocolate.", recipe: "cookies" },
      { b: "Hu Kitchen", p: "Hu Gems / Hu Chocolate Bars", score: 90, oil: "Cocoa butter", why: "Organic cacao, coconut sugar - no refined sugar, no emulsifiers.", site: "https://hukitchen.com" },
      { b: "Simple Mills", p: "Crunchy Cookies", score: 62, oil: "Check label (coconut oil / sunflower)", why: "Almond-flour based; oil varies by flavor - read the label.", site: "https://www.simplemills.com" }
    ],
    avoid: [{ b: "Oreo / Chips Ahoy", why: "Palm & canola oil, HFCS (Chips Ahoy), artificial flavor." }]
  },
  {
    id: "bread", name: "Bread", emoji: "🍞", cat: "Bakery",
    keys: ["bread", "sandwich bread", "toast", "sourdough", "buns", "bagels"],
    tip: "Real bread is flour, water, salt (+ yeast). Most supermarket loaves add soybean oil, sugar, dough conditioners and preservatives. A real sourdough from a local bakery is #1.",
    picks: [
      { b: "Local Bakery", p: "Real Sourdough", score: 98, oil: "None", why: "Long-fermented, easier to digest. Ask: 'flour, water, salt?'", local: true },
      { b: "Food for Life", p: "Ezekiel 4:9 Sprouted Bread", score: 88, oil: "None", why: "Sprouted grains & legumes, no added oil or sugar. Freezer aisle.", site: "https://www.foodforlife.com" },
      { b: "Bread SRSLY", p: "Gluten-Free Sourdough", score: 82, oil: "Check label", why: "Small-batch gluten-free sourdough.", site: "https://breadsrsly.com" }
    ],
    avoid: [{ b: "Wonder / Nature's Own / Sara Lee", why: "Soybean oil, sugar/HFCS, dough conditioners (DATEM), calcium propionate." }]
  },
  {
    id: "peanut-butter", name: "Peanut & Nut Butter", emoji: "🥜", cat: "Pantry",
    keys: ["peanut butter", "almond butter", "nut butter", "pb", "cashew butter"],
    tip: "The only ingredients should be nuts (and salt). Skip any jar with hydrogenated oils or palm oil.",
    picks: [
      { b: "Crazy Richard's", p: "100% Peanuts Peanut Butter", score: 96, oil: "None", why: "Literally just peanuts.", site: "https://www.crazyrichards.com" },
      { b: "Smucker's", p: "Natural Peanut Butter", score: 88, oil: "None", why: "Peanuts + salt. Easy to find everywhere.", site: "https://www.smuckers.com" },
      { b: "Santa Cruz Organic", p: "Dark Roasted Peanut Butter (stir)", score: 88, oil: "None in the 'stir' version", why: "Organic peanuts. Avoid the 'no-stir' (palm oil).", site: "https://www.scojuice.com" },
      { b: "Barney Butter", p: "Almond Butter", score: 84, oil: "Check label - some flavors add palm", why: "Smooth blanched almond butter.", site: "https://barneybutter.com" }
    ],
    avoid: [{ b: "Jif / Skippy", why: "Hydrogenated rapeseed, cottonseed and soybean oils, plus sugar." }]
  },
  {
    id: "chocolate", name: "Chocolate & Candy Bars", emoji: "🍫", cat: "Sweets",
    keys: ["chocolate", "candy bar", "dark chocolate", "chocolate chips", "reese's", "peanut butter cups"],
    tip: "Real chocolate = cacao, cocoa butter, sugar. Skip PGPR, 'vegetable oil' and artificial flavor (vanillin).",
    picks: [
      { b: "Hu Kitchen", p: "Hu Chocolate Bars & Gems", score: 94, oil: "Cocoa butter", why: "Organic, coconut sugar, no emulsifiers or refined sugar.", site: "https://hukitchen.com" },
      { b: "Lily's", p: "Dark Chocolate / Baking Chips", score: 80, oil: "Cocoa butter", why: "Stevia-sweetened; contains erythritol in some products (see Label Check).", site: "https://lilys.com" },
      { b: "Theo", p: "Organic Dark Chocolate", score: 88, oil: "Cocoa butter", why: "Organic, fair trade, short ingredient list.", site: "https://theochocolate.com" },
      { b: "Unreal", p: "Dark Chocolate Peanut Butter Cups", score: 78, oil: "Check label", why: "Colored/sweetened with real food, no artificial dyes.", site: "https://getunreal.com" }
    ],
    avoid: [
      { b: "Hershey's / Reese's", why: "PGPR, soy lecithin, vanillin (artificial), Reese's adds TBHQ in some products." },
      { b: "M&M's / Skittles", why: "Red 40, Yellow 5, Yellow 6, Blue 1 - dyes the EU makes carry a warning label." }
    ]
  },
  {
    id: "candy", name: "Gummies & Kids' Candy", emoji: "🍬", cat: "Sweets",
    keys: ["candy", "gummies", "gummy bears", "fruit snacks", "sour candy", "lollipops", "skittles", "sour patch"],
    tip: "Synthetic dyes (Red 40, Yellow 5 & 6, Blue 1) are the #1 thing to avoid for kids. Look for colors from fruit/vegetable juice.",
    picks: [
      { b: "Homemade", p: "Real-Juice Gummy Bears", score: 100, oil: "None", why: "Grass-fed gelatin + 100% juice + honey. Recipe tab.", recipe: "gummies" },
      { b: "YumEarth", p: "Organic Gummy Bears / Lollipops", score: 84, oil: "None", why: "Organic, no synthetic dyes, allergy friendly.", site: "https://yumearth.com" },
      { b: "SmartSweets", p: "Gummy Bears", score: 72, oil: "None", why: "Low sugar, no artificial colors. Uses allulose & soluble fiber.", site: "https://smartsweets.com" },
      { b: "Annie's", p: "Organic Bunny Fruit Snacks", score: 70, oil: "Check label", why: "No synthetic dyes; still sugary - a treat, not a snack.", site: "https://www.annies.com" }
    ],
    avoid: [{ b: "Skittles / Sour Patch Kids / Welch's Fruit Snacks", why: "Red 40, Yellow 5/6, Blue 1, corn syrup." }]
  },
  {
    id: "ice-cream", name: "Ice Cream", emoji: "🍦", cat: "Frozen",
    keys: ["ice cream", "gelato", "frozen dessert", "popsicle", "froyo", "frozen yogurt"],
    tip: "Real ice cream = cream, milk, sugar, eggs, vanilla. 'Frozen dairy dessert' = cheaper oils, gums and fillers. Or make Greek-yogurt ice cream (Recipes).",
    picks: [
      { b: "Alec's Ice Cream", p: "Organic A2 Ice Cream", score: 92, oil: "None", why: "Regenerative organic, A2 dairy, gum-free.", site: "https://alecsicecream.com" },
      { b: "Häagen-Dazs", p: "Vanilla (and simple flavors)", score: 84, oil: "None", why: "Cream, milk, sugar, egg yolks, vanilla - that's it. Easy to find.", site: "https://www.icecream.com/us/en/brands/haagen-dazs" },
      { b: "Van Leeuwen", p: "French Ice Cream", score: 82, oil: "None in dairy line", why: "Egg-yolk custard base, short ingredients. Check vegan line for oils.", site: "https://vanleeuwenicecream.com" },
      { b: "Homemade", p: "Greek Yogurt Protein Ice Cream", score: 100, oil: "None", why: "10g protein per serving. Recipe tab.", recipe: "yogurt-ice-cream" }
    ],
    avoid: [{ b: "'Frozen dairy dessert' tubs, Breyers flavors with fillers", why: "Corn syrup, gums, mono- & diglycerides, artificial flavors & colors." }]
  },
  {
    id: "yogurt", name: "Yogurt", emoji: "🥛", cat: "Dairy",
    keys: ["yogurt", "greek yogurt", "yoghurt", "kefir", "skyr"],
    tip: "Buy plain, full-fat, organic or grass-fed yogurt and sweeten it yourself with honey or fruit. Flavored cups can have 15g+ sugar and starches.",
    picks: [
      { b: "Maple Hill", p: "100% Grass-Fed Greek Yogurt", score: 94, oil: "None", why: "100% grass-fed organic milk, just milk + cultures.", site: "https://maplehill.com" },
      { b: "FAGE", p: "Total Plain Greek Yogurt (5%)", score: 88, oil: "None", why: "Milk + cultures, 18g protein per cup.", site: "https://usa.fage" },
      { b: "Siggi's", p: "Plain Whole Milk Skyr", score: 86, oil: "None", why: "High protein, low sugar.", site: "https://siggis.com" },
      { b: "Lifeway", p: "Plain Whole Milk Kefir", score: 86, oil: "None", why: "12 live probiotic cultures.", site: "https://lifewaykefir.com" }
    ],
    avoid: [{ b: "Yoplait / Dannon Light & Fit", why: "Added sugar or sucralose/aspartame, modified starch, sometimes dyes." }]
  },
  {
    id: "milk", name: "Milk & Plant Milk", emoji: "🐄", cat: "Dairy",
    keys: ["milk", "raw milk", "whole milk", "oat milk", "almond milk", "plant milk", "a2 milk", "dairy"],
    tip: "Best: local grass-fed milk (raw where legal) or low-temp pasteurized, non-homogenized. Most oat milks contain canola (rapeseed) oil - pick plant milks with 2-3 ingredients.",
    picks: [
      { b: "Local Farm", p: "Raw or Low-Temp Pasteurized Grass-Fed Milk", score: 98, oil: "None", why: "Find one in the Shop Local tab (Real Milk Finder). Raw milk laws vary by state - know your farmer.", local: true },
      { b: "Kalona SuperNatural", p: "Organic Whole Milk (non-homogenized)", score: 92, oil: "None", why: "Grass-fed, low-temp vat pasteurized, cream-top.", site: "https://www.kalonasupernatural.com" },
      { b: "Alexandre Family Farm", p: "Regenerative Organic A2/A2 Milk", score: 92, oil: "None", why: "A2 cows, regenerative organic certified.", site: "https://www.alexandrefamilyfarm.com" },
      { b: "Maple Hill", p: "100% Grass-Fed Organic Milk", score: 88, oil: "None", why: "Grass-fed organic, widely available.", site: "https://maplehill.com" },
      { b: "MALK / Three Trees", p: "Almond Milk", score: 86, oil: "None", why: "Plant milk with no oils or gums - nuts & water.", site: "https://malkorganics.com" }
    ],
    avoid: [
      { b: "Oatly / most oat milks", why: "Rapeseed (canola) oil + high-glycemic processed oats." },
      { b: "Silk / Califia (many varieties)", why: "Sunflower or canola oil, gums, added sugar." }
    ]
  },
  {
    id: "butter", name: "Butter & Ghee", emoji: "🧈", cat: "Dairy",
    keys: ["butter", "ghee", "margarine", "spread", "i can't believe"],
    tip: "Real butter from grass-fed cows has more vitamin K2 and CLA. Margarine and 'buttery spreads' are seed-oil blends.",
    picks: [
      { b: "Kerrygold", p: "Pure Irish Grass-Fed Butter", score: 92, oil: "None", why: "Irish cows graze ~240+ days a year.", site: "https://www.kerrygoldusa.com" },
      { b: "Vital Farms", p: "Pasture-Raised Butter", score: 90, oil: "None", why: "Pasture-raised US cows.", site: "https://vitalfarms.com" },
      { b: "Organic Valley", p: "Pasture Butter", score: 88, oil: "None", why: "Organic, from pasture season milk.", site: "https://www.organicvalley.coop" },
      { b: "4th & Heart", p: "Grass-Fed Ghee", score: 90, oil: "None", why: "Great for high-heat cooking, lactose/casein light.", site: "https://www.4thandheart.com" }
    ],
    avoid: [{ b: "Country Crock / I Can't Believe It's Not Butter / Smart Balance", why: "Soybean, canola and palm oil blends with emulsifiers and 'natural flavor'." }]
  },
  {
    id: "cooking-oil", name: "Cooking Oils & Fats", emoji: "🫒", cat: "Pantry",
    keys: ["oil", "cooking oil", "olive oil", "avocado oil", "coconut oil", "tallow", "lard", "vegetable oil", "canola", "frying oil", "fat"],
    tip: "Cook with stable fats: beef tallow, ghee, butter, coconut oil, avocado oil. Use extra-virgin olive oil for low-medium heat and drizzling. A 2020 UC Davis study found most avocado oils on shelves were rancid or cut with other oils - buy from brands that passed.",
    picks: [
      { b: "Fatworks", p: "Grass-Fed Beef Tallow", score: 95, oil: "Beef tallow", why: "The best high-heat frying fat. Also great for skin.", site: "https://www.fatworks.com" },
      { b: "Graza", p: "Extra Virgin Olive Oil (Sizzle & Drizzle)", score: 92, oil: "EVOO", why: "Single-origin Spanish olives, squeeze bottle.", site: "https://www.graza.co" },
      { b: "Brightland", p: "Extra Virgin Olive Oil", score: 92, oil: "EVOO", why: "California olives, light-blocking bottle.", site: "https://brightland.co" },
      { b: "California Olive Ranch", p: "100% California EVOO", score: 86, oil: "EVOO", why: "Affordable, certified California EVOO.", site: "https://californiaoliveranch.com" },
      { b: "Chosen Foods", p: "100% Pure Avocado Oil", score: 88, oil: "Avocado oil", why: "Passed UC Davis purity testing.", site: "https://chosenfoods.com" },
      { b: "Marianne's", p: "Avocado Oil", score: 86, oil: "Avocado oil", why: "Passed UC Davis purity testing.", site: "https://www.google.com/search?q=Marianne%27s+avocado+oil" },
      { b: "Nutiva", p: "Organic Virgin Coconut Oil", score: 86, oil: "Coconut oil", why: "Great for popcorn and baking.", site: "https://www.nutiva.com" }
    ],
    avoid: [{ b: "Wesson / Crisco / Mazola / any 'vegetable oil'", why: "Soybean, canola, corn and cottonseed oils - highly refined with hexane." }]
  },
  {
    id: "eggs", name: "Eggs", emoji: "🍳", cat: "Protein",
    keys: ["eggs", "egg", "pasture raised eggs", "free range eggs"],
    tip: "'Cage-free' just means not in a cage - still indoors. 'Pasture-raised' (Certified Humane) = 108 sq ft of outdoor space per hen. Local farm eggs are best.",
    picks: [
      { b: "Local Farm", p: "Pasture-Raised Eggs", score: 98, oil: "None", why: "Deep orange yolks, support your neighbor.", local: true },
      { b: "Vital Farms", p: "Pasture-Raised Eggs", score: 90, oil: "None", why: "Certified Humane pasture-raised.", site: "https://vitalfarms.com" },
      { b: "Pete & Gerry's", p: "Organic Free-Range Eggs", score: 84, oil: "None", why: "Organic feed (no GMO), Certified Humane.", site: "https://www.peteandgerrys.com" }
    ],
    avoid: [{ b: "Conventional / 'farm fresh' / 'natural' cartons", why: "Meaningless labels - conventional hens fed GMO corn & soy indoors." }]
  },
  {
    id: "beef", name: "Beef (100% US, Grass-Fed)", emoji: "🥩", cat: "Protein",
    keys: ["beef", "steak", "ground beef", "hamburger", "grass fed beef", "meat", "ribeye", "brisket", "roast"],
    tip: "For years, beef raised in Argentina, Brazil, Australia, etc. could be labeled 'Product of USA' just because it was repackaged here. A USDA rule fixed that starting Jan 1, 2026 - now 'Product of USA' must mean born, raised, slaughtered AND processed in the US. Still: look for '100% grass-fed AND grass-finished', 'American Grassfed Association' (requires US-born & raised), or buy straight from a farmer. No GMO cattle are sold in US stores - the GMO issue is the corn/soy FEED, which grass-finished cattle don't eat.",
    picks: [
      { b: "Local Farm", p: "Grass-Fed, Grass-Finished Beef (quarter/half cow)", score: 100, oil: "None", why: "Cheapest per pound for real beef. Find farms in the Shop Local tab (EatWild).", local: true },
      { b: "White Oak Pastures", p: "Grass-Fed Beef", score: 96, oil: "None", why: "Regenerative family farm in Bluffton, Georgia. Born & raised there.", site: "https://www.whiteoakpastures.com" },
      { b: "US Wellness Meats", p: "Grass-Fed Beef", score: 94, oil: "None", why: "100% grass-fed from US family farms, ships nationwide.", site: "https://grasslandbeef.com" },
      { b: "Grass Roots Farmers' Cooperative", p: "Grass-Fed Beef Box", score: 92, oil: "None", why: "Farmer-owned co-op of US family farms.", site: "https://grassrootscoop.com" },
      { b: "Wild Pastures", p: "Grass-Fed Beef Box", score: 86, oil: "None", why: "Sourced from small US farms.", site: "https://wildpastures.com" },
      { b: "Crowd Cow", p: "Beef (filter by US farm)", score: 82, oil: "None", why: "Marketplace that shows which farm each cut comes from - choose the US ones.", site: "https://www.crowdcow.com" }
    ],
    avoid: [
      { b: "Generic 'grass-fed' store brands", why: "Often imported from Australia, Uruguay, Brazil - check the fine print on the package." },
      { b: "Conventional feedlot beef", why: "GMO corn/soy feed, routine antibiotics, growth-promoting implants." }
    ]
  },
  {
    id: "chicken", name: "Chicken & Poultry", emoji: "🍗", cat: "Protein",
    keys: ["chicken", "poultry", "turkey", "chicken breast", "chicken thighs", "wings"],
    tip: "Most US chicken is raised indoors on GMO feed and washed in antimicrobial solutions (peracetic acid/chlorine) - a practice the EU bans. Look for pasture-raised, organic, and 'air-chilled'.",
    picks: [
      { b: "Local Farm", p: "Pasture-Raised Chicken", score: 98, oil: "None", why: "Moved to fresh pasture daily.", local: true },
      { b: "White Oak Pastures", p: "Pasture-Raised Chicken", score: 94, oil: "None", why: "Regenerative, pasture-raised.", site: "https://www.whiteoakpastures.com" },
      { b: "Pasturebird", p: "Pasture-Raised Chicken", score: 88, oil: "None", why: "Pasture-raised, at Costco & Whole Foods in some regions.", site: "https://pasturebird.com" },
      { b: "Mary's / Bell & Evans", p: "Organic Air-Chilled Chicken", score: 84, oil: "None", why: "Air-chilled (no chlorine bath), organic feed.", site: "https://www.bellandevans.com" }
    ],
    avoid: [{ b: "Conventional chicken (Tyson, Perdue standard lines)", why: "Indoor-raised, GMO feed, chemical-water chilled, sometimes 'enhanced' with salt solution." }]
  },
  {
    id: "bacon", name: "Bacon, Sausage & Deli Meat", emoji: "🥓", cat: "Protein",
    keys: ["bacon", "sausage", "deli meat", "lunch meat", "ham", "turkey slices", "salami", "pepperoni", "hot dogs", "hot dog", "franks"],
    tip: "The WHO's cancer agency (IARC) classifies processed meat as a Group 1 carcinogen, mostly due to nitrites and how it's cured. Choose no-sugar, pasture-raised, and eat it as a side - not every day. Note: 'uncured' products use celery powder, which is still a source of nitrite.",
    picks: [
      { b: "Local Farm", p: "Pastured Pork Bacon & Sausage", score: 94, oil: "None", why: "Ask for no-sugar, no-nitrite cures.", local: true },
      { b: "Pederson's Natural Farms", p: "No Sugar Uncured Bacon", score: 86, oil: "None", why: "No sugar, Whole30 approved.", site: "https://pedersonsfarms.com" },
      { b: "Applegate", p: "Organic Grass-Fed Beef Hot Dogs / Deli", score: 82, oil: "None", why: "Organic, grass-fed, no added nitrites (besides celery).", site: "https://applegate.com" },
      { b: "US Wellness Meats", p: "Grass-Fed Beef Franks & Liverwurst", score: 88, oil: "None", why: "100% grass-fed beef, simple seasoning.", site: "https://grasslandbeef.com" }
    ],
    avoid: [{ b: "Oscar Mayer / Ball Park / conventional bacon", why: "Sodium nitrite, corn syrup, dextrose, conventional pork." }]
  },
  {
    id: "pasta", name: "Pasta", emoji: "🍝", cat: "Pantry",
    keys: ["pasta", "spaghetti", "noodles", "penne", "macaroni", "fettuccine", "gluten free pasta"],
    tip: "Italian pasta is made under EU rules - many Americans digest it better. Look for organic or imported Italian durum wheat, bronze-cut. Gluten-free? Brown rice or chickpea.",
    picks: [
      { b: "Jovial", p: "Organic Einkorn or Brown Rice Pasta", score: 94, oil: "None", why: "Made in Italy, organic. Ancient einkorn wheat or gluten-free brown rice.", site: "https://jovialfoods.com" },
      { b: "Rustichella d'Abruzzo", p: "Bronze-Cut Pasta", score: 90, oil: "None", why: "Italian durum, bronze-die, slow-dried.", site: "https://www.rustichella.it" },
      { b: "Bionaturae", p: "Organic Pasta", score: 88, oil: "None", why: "Organic, made in Italy.", site: "https://bionaturae.com" },
      { b: "Banza", p: "Chickpea Pasta", score: 78, oil: "None", why: "Higher protein & fiber, gluten-free. Contains pea protein & xanthan.", site: "https://eatbanza.com" }
    ],
    avoid: [{ b: "Conventional US 'enriched' pasta", why: "Conventional wheat (often glyphosate-desiccated), synthetic enrichment." }]
  },
  {
    id: "pasta-sauce", name: "Pasta Sauce & Marinara", emoji: "🥫", cat: "Pantry",
    keys: ["pasta sauce", "marinara", "tomato sauce", "spaghetti sauce", "pizza sauce", "vodka sauce"],
    tip: "Good sauce = tomatoes, olive oil, garlic, onion, herbs. Many jars sneak in soybean oil, canola and added sugar.",
    picks: [
      { b: "Rao's Homemade", p: "Marinara Sauce", score: 92, oil: "Olive oil", why: "Italian tomatoes, olive oil, no added sugar.", site: "https://www.raos.com" },
      { b: "Carbone", p: "Marinara", score: 90, oil: "Olive oil", why: "Olive oil, Italian tomatoes, no sugar added.", site: "https://carbonefinefood.com" },
      { b: "Primal Kitchen", p: "Tomato Basil Marinara", score: 88, oil: "Olive oil", why: "Organic, no sugar added.", site: "https://www.primalkitchen.com" }
    ],
    avoid: [{ b: "Prego / Ragu / Classico (many)", why: "Canola or soybean oil, added sugar." }]
  },
  {
    id: "cereal", name: "Cereal & Granola", emoji: "🥣", cat: "Breakfast",
    keys: ["cereal", "granola", "oatmeal", "oats", "breakfast", "froot loops", "lucky charms", "cheerios", "muesli"],
    tip: "Kids' cereal is where dyes and BHT hide. Choose organic oats (to avoid glyphosate residue) and granola made with coconut oil or butter.",
    picks: [
      { b: "One Degree Organic", p: "Sprouted Rolled Oats", score: 94, oil: "None", why: "Organic, glyphosate-residue-free certified.", site: "https://onedegreefoods.com" },
      { b: "Purely Elizabeth", p: "Ancient Grain Granola", score: 86, oil: "Coconut oil", why: "Coconut oil + coconut sugar, gluten-free.", site: "https://purelyelizabeth.com" },
      { b: "Lovebird", p: "Grain-Free Cereal", score: 82, oil: "Check label", why: "Grain-free, no gums or refined sugar.", site: "https://www.lovebirdfoods.com" },
      { b: "Seven Sundays", p: "Muesli", score: 84, oil: "None", why: "Untoasted whole grains, nuts and fruit.", site: "https://sevensundays.com" }
    ],
    avoid: [{ b: "Froot Loops / Lucky Charms / Trix", why: "Red 40, Yellow 5 & 6, Blue 1, BHT (Froot Loops), refined sugar." }]
  },
  {
    id: "bars", name: "Protein Bars, Jerky & Meat Sticks", emoji: "🍫", cat: "Snacks",
    keys: ["protein bar", "bar", "granola bar", "snack bar", "jerky", "meat stick", "beef stick", "clif", "quest"],
    tip: "Most protein bars are candy bars with soy isolate, sugar alcohols and palm oil. Look for whole-food bars and grass-fed meat sticks.",
    picks: [
      { b: "RXBAR", p: "Protein Bar", score: 84, oil: "None", why: "Egg whites, dates, nuts - 'no B.S.' ingredient list.", site: "https://www.rxbar.com" },
      { b: "LÄRABAR", p: "Fruit & Nut Bar", score: 84, oil: "None", why: "Dates + nuts, often 2-4 ingredients.", site: "https://www.larabar.com" },
      { b: "Chomps", p: "Grass-Fed Beef Sticks", score: 86, oil: "None", why: "Grass-fed, no sugar. (Some beef is imported - check package for US options.)", site: "https://chomps.com" },
      { b: "EPIC", p: "Provisions Bars & Strips", score: 82, oil: "None", why: "Meat-based, minimal ingredients.", site: "https://epicprovisions.com" }
    ],
    avoid: [{ b: "Clif / Nature Valley / Quest", why: "Brown rice syrup, cane sugar, soy protein isolate, canola/palm oil, sucralose (Quest)." }]
  },
  {
    id: "protein-powder", name: "Protein Powder", emoji: "💪", cat: "Supplements",
    keys: ["protein powder", "whey", "protein shake", "collagen", "shake"],
    tip: "Protein powders can contain heavy metals and artificial sweeteners. Choose third-party tested, grass-fed, unflavored or naturally sweetened.",
    picks: [
      { b: "Equip Foods", p: "Prime Protein (Grass-Fed Beef)", score: 90, oil: "None", why: "Grass-fed beef isolate, third-party tested.", site: "https://equipfoods.com" },
      { b: "Promix", p: "Grass-Fed Whey Protein", score: 88, oil: "None", why: "Grass-fed whey, simple ingredients.", site: "https://promixnutrition.com" },
      { b: "Truvani", p: "Plant-Based Protein", score: 84, oil: "None", why: "Organic pea/pumpkin, tested for heavy metals.", site: "https://www.truvani.com" },
      { b: "Vital Proteins / Great Lakes", p: "Collagen Peptides", score: 84, oil: "None", why: "Grass-fed bovine collagen.", site: "https://greatlakeswellness.com" }
    ],
    avoid: [{ b: "Muscle Milk / Premier (and similar)", why: "Sucralose, acesulfame K, canola/sunflower oil, carrageenan." }]
  },
  {
    id: "creamer", name: "Coffee Creamer", emoji: "☕", cat: "Dairy",
    keys: ["creamer", "coffee creamer", "half and half", "coffee", "latte", "coffee mate"],
    tip: "Most flavored creamers are soybean oil + corn syrup + 'artificial flavor'. Real cream is the cleanest creamer.",
    picks: [
      { b: "Organic Valley / local dairy", p: "Grass-Fed Heavy Cream or Half & Half", score: 96, oil: "None", why: "Just cream. Add maple + vanilla for 'flavored'.", site: "https://www.organicvalley.coop" },
      { b: "Laird Superfood", p: "Unsweetened Creamer", score: 80, oil: "Coconut milk powder", why: "Coconut-based, no seed oils.", site: "https://lairdsuperfood.com" },
      { b: "Nutpods", p: "Unsweetened Creamer", score: 74, oil: "None", why: "Dairy-free almond/coconut; contains gums.", site: "https://nutpods.com" }
    ],
    avoid: [{ b: "Coffee-mate / International Delight", why: "Soybean/hydrogenated oils, corn syrup, artificial flavor, dipotassium phosphate." }]
  },
  {
    id: "soda", name: "Soda & Drinks", emoji: "🥤", cat: "Drinks",
    keys: ["soda", "pop", "soft drink", "energy drink", "sparkling water", "coke", "sprite", "gatorade", "sports drink", "juice", "drink"],
    tip: "Regular soda = HFCS + caramel color (some types contain 4-MEI, a Prop 65 carcinogen). Diet = aspartame (IARC 'possibly carcinogenic', 2023). Sports drinks = dyes.",
    picks: [
      { b: "Mountain Valley", p: "Spring Water (glass bottles)", score: 96, oil: "None", why: "American spring water bottled in glass.", site: "https://mountainvalleyspring.com" },
      { b: "Spindrift", p: "Sparkling Water", score: 92, oil: "None", why: "Sparkling water + real squeezed fruit.", site: "https://www.drinkspindrift.com" },
      { b: "Olipop", p: "Prebiotic Soda", score: 80, oil: "None", why: "Low sugar, fiber. Contains stevia.", site: "https://drinkolipop.com" },
      { b: "LMNT", p: "Electrolyte Drink Mix", score: 82, oil: "None", why: "Electrolytes without dyes or sugar. Sweetened with stevia.", site: "https://drinklmnt.com" }
    ],
    avoid: [
      { b: "Mountain Dew / Fanta / Gatorade", why: "Yellow 5, Red 40, HFCS; Mtn Dew historically contained BVO (FDA revoked it in 2024)." },
      { b: "Diet Coke / Diet Pepsi", why: "Aspartame, acesulfame K, caramel color, phosphoric acid." }
    ]
  },
  {
    id: "popcorn", name: "Popcorn", emoji: "🍿", cat: "Snacks",
    keys: ["popcorn", "microwave popcorn", "kettle corn"],
    tip: "Microwave popcorn bags have historically been lined with PFAS 'forever chemicals'. Pop it on the stove in coconut oil or ghee - 5 minutes.",
    picks: [
      { b: "Homemade", p: "Stovetop Coconut Oil Popcorn", score: 100, oil: "Coconut oil / ghee", why: "Recipe tab.", recipe: "popcorn" },
      { b: "LesserEvil", p: "Organic Popcorn", score: 86, oil: "Coconut oil / avocado oil", why: "Organic, coconut oil, Himalayan salt.", site: "https://lesserevil.com" },
      { b: "Jolly Time / Anson Mills", p: "Organic Popcorn Kernels", score: 92, oil: "None", why: "Buy organic kernels and pop them yourself.", site: "https://www.google.com/search?q=organic+popcorn+kernels" }
    ],
    avoid: [{ b: "SkinnyPop / Boom Chicka Pop / Act II", why: "Sunflower or palm/soy oil; Act II adds artificial butter flavor." }]
  },
  {
    id: "tortillas", name: "Tortillas & Wraps", emoji: "🌯", cat: "Bakery",
    keys: ["tortillas", "tortilla", "wraps", "wrap", "burrito", "taco shells"],
    tip: "Real corn tortillas are 3 ingredients: corn, lime, water. Flour tortillas almost always use soybean/hydrogenated shortening.",
    picks: [
      { b: "Siete", p: "Almond Flour or Cassava Tortillas", score: 86, oil: "Avocado oil", why: "Grain-free, avocado oil.", site: "https://sietefoods.com" },
      { b: "Masienda", p: "Heirloom Masa Harina", score: 94, oil: "None", why: "Make 3-ingredient corn tortillas at home.", site: "https://masienda.com" },
      { b: "Local Tortilleria", p: "Fresh Corn Tortillas", score: 92, oil: "None", why: "Ask for nixtamal corn tortillas - corn, lime, water.", local: true }
    ],
    avoid: [{ b: "Mission / Old El Paso flour tortillas", why: "Vegetable shortening (interesterified/hydrogenated soybean oil), dough conditioners, preservatives." }]
  },
  {
    id: "hummus", name: "Hummus & Dips", emoji: "🧆", cat: "Snacks",
    keys: ["hummus", "dip", "guacamole", "queso", "salsa", "tzatziki"],
    tip: "Real hummus uses olive oil and tahini. The biggest brand uses soybean oil.",
    picks: [
      { b: "Ithaca", p: "Cold-Crafted Hummus", score: 90, oil: "Extra-virgin olive oil", why: "EVOO, fresh lemon, no preservatives.", site: "https://ithacafinefoods.com" },
      { b: "Siete", p: "Dairy-Free Queso", score: 80, oil: "Avocado oil", why: "Cashew-based queso with avocado oil.", site: "https://sietefoods.com" },
      { b: "Wholly / homemade", p: "Guacamole", score: 90, oil: "None", why: "Avocado, lime, onion, salt. Guac is naturally clean.", site: "https://www.eatwholly.com" }
    ],
    avoid: [{ b: "Sabra", why: "Soybean oil and/or canola, potassium sorbate." }]
  },
  {
    id: "mac-cheese", name: "Mac & Cheese / Boxed Meals", emoji: "🧀", cat: "Pantry",
    keys: ["mac and cheese", "mac n cheese", "kraft dinner", "boxed meal", "cheese", "shredded cheese"],
    tip: "Pre-shredded cheese is coated with cellulose and natamycin - grate from a block. Box mac: look for real cheese powder, no dyes.",
    picks: [
      { b: "Homemade", p: "10-Minute Real Cheddar Mac", score: 100, oil: "Butter", why: "Recipe tab.", recipe: "mac-cheese" },
      { b: "Kerrygold / Tillamook / Organic Valley", p: "Block Cheese (grate it yourself)", score: 92, oil: "None", why: "Milk, cultures, salt, enzymes.", site: "https://www.kerrygoldusa.com" },
      { b: "Annie's", p: "Organic Shells & White Cheddar", score: 70, oil: "None", why: "Organic, no synthetic dyes; still processed.", site: "https://www.annies.com" },
      { b: "Banza", p: "Chickpea Mac & Cheese", score: 70, oil: "None", why: "More protein & fiber.", site: "https://eatbanza.com" }
    ],
    avoid: [{ b: "Velveeta / Kraft Singles", why: "'Pasteurized prepared cheese product' - milk protein concentrate, sodium phosphate, colors." }]
  },
  {
    id: "frozen-pizza", name: "Frozen Pizza & Meals", emoji: "🍕", cat: "Frozen",
    keys: ["pizza", "frozen pizza", "frozen meal", "tv dinner", "frozen food"],
    tip: "Frozen pizza crust is usually soybean oil + dough conditioners. Make yogurt-dough pizza in 25 minutes, or pick from below.",
    leastBad: "If a frozen pizza lists 'olive oil' but ALSO 'canola' or 'soybean' further down, it's a blend. The least bad choice is the one where the seed oil appears last in the list (= smallest amount).",
    picks: [
      { b: "Homemade", p: "2-Ingredient Dough Pizza", score: 100, oil: "Olive oil", why: "Greek yogurt + flour crust, 22g protein. Recipe tab.", recipe: "pizza" },
      { b: "Cappello's", p: "Grain-Free Pizza", score: 76, oil: "Check label", why: "Almond-flour crust, simple ingredients.", site: "https://cappellos.com" },
      { b: "Rao's Made for Home", p: "Frozen Pizza", score: 70, oil: "Check label", why: "Shorter ingredient list than most.", site: "https://www.raos.com" }
    ],
    avoid: [{ b: "DiGiorno / Red Baron / Totino's", why: "Soybean oil, dough conditioners, BHA/BHT in toppings, dextrose." }]
  },
  {
    id: "sweeteners", name: "Sugar & Sweeteners", emoji: "🍯", cat: "Pantry",
    keys: ["sugar", "sweetener", "honey", "maple syrup", "stevia", "monk fruit", "splenda", "syrup", "pancake syrup"],
    tip: "Pick real-food sweeteners: raw local honey, pure maple syrup, coconut sugar, dates. Many 'monk fruit' blends are mostly erythritol - a 2023 Nature Medicine study linked erythritol to clotting risk.",
    picks: [
      { b: "Local Beekeeper", p: "Raw Local Honey", score: 96, oil: "None", why: "Find at the farmers market (Shop Local tab).", local: true },
      { b: "Crown Maple / Coombs Family Farms", p: "Organic Pure Maple Syrup", score: 92, oil: "None", why: "100% maple. Not 'pancake syrup'.", site: "https://www.coombsfamilyfarms.com" },
      { b: "Big Tree Farms / Wholesome", p: "Organic Coconut Sugar", score: 86, oil: "None", why: "1:1 sugar swap, less refined.", site: "https://www.bigtreefarms.com" },
      { b: "Lakanto", p: "Pure Monk Fruit (no erythritol)", score: 78, oil: "None", why: "Look for the pure extract, not the erythritol blend.", site: "https://www.lakanto.com" }
    ],
    avoid: [
      { b: "Aunt Jemima/Pearl Milling, Mrs. Butterworth's", why: "Corn syrup + caramel color + preservatives - not maple." },
      { b: "Splenda / Equal / Sweet'N Low", why: "Sucralose, aspartame, saccharin." }
    ]
  },
  {
    id: "salt", name: "Salt & Seasonings", emoji: "🧂", cat: "Pantry",
    keys: ["salt", "seasoning", "spices", "taco seasoning", "ranch seasoning", "season salt", "bouillon", "broth", "stock"],
    tip: "Seasoning packets often hide maltodextrin, MSG, sugar and anti-caking agents. Broth often has 'natural flavor' and yeast extract. Choose unrefined salt and single-ingredient spices.",
    picks: [
      { b: "Redmond", p: "Real Salt", score: 94, oil: "None", why: "Unrefined, mined in Utah from an ancient sea bed.", site: "https://redmond.life" },
      { b: "Siete", p: "Taco Seasoning", score: 86, oil: "None", why: "Clean spice blend.", site: "https://sietefoods.com" },
      { b: "Kettle & Fire", p: "Bone Broth", score: 88, oil: "None", why: "Slow-simmered grass-fed bones.", site: "https://www.kettleandfire.com" },
      { b: "Simply Organic", p: "Single-Ingredient Spices", score: 88, oil: "None", why: "Organic, non-irradiated.", site: "https://www.simplyorganic.com" }
    ],
    avoid: [{ b: "Lawry's / Old El Paso packets / bouillon cubes", why: "MSG, maltodextrin, sugar, hydrogenated oils (bouillon)." }]
  },
  {
    id: "toothpaste", name: "Toothpaste (Fluoride-Free)", emoji: "🪥", cat: "Personal Care",
    keys: ["toothpaste", "fluoride free", "mouthwash", "teeth", "oral care", "hydroxyapatite"],
    tip: "Hydroxyapatite (the mineral your enamel is made of) is the fluoride-free alternative used in Japan since the 1990s. Clinical trials have found it comparable to fluoride for cavity prevention.",
    picks: [
      { b: "Boka", p: "Nano-Hydroxyapatite Toothpaste", score: 92, oil: "None", why: "n-HA, no fluoride, no SLS.", site: "https://www.boka.com" },
      { b: "Risewell", p: "Mineral Toothpaste", score: 92, oil: "None", why: "Hydroxyapatite, clean ingredients.", site: "https://risewell.com" },
      { b: "Davids", p: "Nano-Hydroxyapatite Toothpaste", score: 90, oil: "None", why: "Made in USA, metal tube (recyclable).", site: "https://davidsusa.com" }
    ],
    avoid: [{ b: "Crest / Colgate (standard)", why: "Fluoride, SLS, titanium dioxide, artificial sweeteners, some contain dyes (Blue 1)." }]
  },
  {
    id: "deodorant", name: "Deodorant", emoji: "🧴", cat: "Personal Care",
    keys: ["deodorant", "antiperspirant", "body wash", "soap", "lotion", "shampoo"],
    tip: "Skip anything with 'fragrance/parfum' (can hide phthalates) and look for simple, plant-based formulas.",
    picks: [
      { b: "Primally Pure", p: "Deodorant & Body Care", score: 92, oil: "Tallow/plant butters", why: "Short, clean ingredient lists.", site: "https://primallypure.com" },
      { b: "Dr. Bronner's", p: "Pure-Castile Soap (unscented)", score: 92, oil: "Organic coconut/olive", why: "Organic castile soap - body, hands, cleaning.", site: "https://www.drbronner.com" },
      { b: "Native", p: "Unscented Deodorant", score: 76, oil: "None", why: "Aluminum-free, widely available - choose unscented.", site: "https://www.nativecos.com" }
    ],
    avoid: [{ b: "Axe / Secret / Old Spice (scented)", why: "Synthetic 'fragrance', aluminum compounds, propylene glycol." }]
  },
  {
    id: "laundry", name: "Laundry & Cleaning", emoji: "🧺", cat: "Home",
    keys: ["laundry detergent", "detergent", "fabric softener", "dryer sheets", "cleaning", "dish soap", "cleaner", "all purpose cleaner"],
    tip: "Synthetic fragrance stays in your clothes and against your skin all day. Dryer sheets coat fabric with fragrance and quats. Use wool dryer balls instead.",
    picks: [
      { b: "Branch Basics", p: "Concentrate (laundry, surfaces, dishes)", score: 94, oil: "None", why: "One fragrance-free concentrate for the whole house.", site: "https://branchbasics.com" },
      { b: "Molly's Suds", p: "Laundry Powder", score: 90, oil: "None", why: "Short ingredient list, unscented option.", site: "https://mollyssuds.com" },
      { b: "Seventh Generation", p: "Free & Clear Detergent", score: 78, oil: "None", why: "Easy to find, fragrance & dye-free.", site: "https://www.seventhgeneration.com" },
      { b: "Woolzies / Friendsheep", p: "100% Wool Dryer Balls", score: 96, oil: "None", why: "Replace dryer sheets entirely.", site: "https://www.google.com/search?q=100%25+wool+dryer+balls" }
    ],
    avoid: [{ b: "Tide (scented) / Gain / Downy / Bounce", why: "Synthetic fragrance, optical brighteners, dyes, quats." }]
  },
  {
    id: "cookware", name: "Cookware", emoji: "🍳", cat: "Home",
    keys: ["pan", "pans", "cookware", "non stick", "nonstick", "teflon", "pots", "skillet", "air fryer"],
    tip: "Traditional non-stick (PTFE/Teflon) belongs to the PFAS 'forever chemical' family - the story of DuPont and PFOA is told in the movie Dark Waters (2019). Cast iron, stainless steel and carbon steel last a lifetime.",
    picks: [
      { b: "Lodge", p: "Cast Iron Skillet", score: 96, oil: "None", why: "Made in South Pittsburg, Tennessee since 1896. ~$25.", site: "https://www.lodgecastiron.com" },
      { b: "Made In / All-Clad", p: "Stainless Steel Cookware", score: 92, oil: "None", why: "Fully clad stainless, no coatings.", site: "https://madeincookware.com" },
      { b: "de Buyer / Made In", p: "Carbon Steel Pan", score: 92, oil: "None", why: "Naturally non-stick once seasoned.", site: "https://www.debuyer.com" },
      { b: "Caraway", p: "Ceramic-Coated Cookware", score: 74, oil: "None", why: "PFAS-free ceramic coating; wears faster than steel.", site: "https://www.carawayhome.com" }
    ],
    avoid: [{ b: "Scratched Teflon / PTFE non-stick pans", why: "PFAS family; coatings break down when scratched or overheated." }]
  },
  {
    id: "water", name: "Water Filters", emoji: "💧", cat: "Home",
    keys: ["water", "water filter", "fluoride filter", "tap water", "reverse osmosis", "brita", "filter"],
    tip: "Standard pitcher filters (like Brita) don't remove fluoride and only reduce some contaminants. Reverse osmosis removes fluoride, PFAS, and most heavy metals. Check your city's report at the EWG Tap Water Database.",
    picks: [
      { b: "AquaTru", p: "Countertop Reverse Osmosis", score: 94, oil: "None", why: "No install needed, NSF-certified, reduces fluoride & PFAS.", site: "https://aquatru.com" },
      { b: "Clearly Filtered", p: "Pitcher / Under-Sink", score: 88, oil: "None", why: "Third-party tested for fluoride and PFAS reduction.", site: "https://www.clearlyfiltered.com" },
      { b: "Waterdrop", p: "Under-Sink Reverse Osmosis", score: 86, oil: "None", why: "Tankless RO for the whole kitchen.", site: "https://www.waterdropfilter.com" }
    ],
    avoid: [{ b: "Unfiltered tap / basic carbon pitchers", why: "Don't reduce fluoride; limited PFAS reduction." }]
  },
  {
    id: "sunscreen", name: "Sunscreen", emoji: "☀️", cat: "Personal Care",
    keys: ["sunscreen", "spf", "sunblock"],
    tip: "An FDA study (JAMA, 2020) found chemical filters like oxybenzone absorb into the bloodstream above the FDA's safety-testing threshold. Mineral (zinc oxide) sunscreens sit on top of the skin.",
    picks: [
      { b: "Badger", p: "Mineral Sunscreen", score: 92, oil: "Organic sunflower/beeswax", why: "Zinc oxide, organic ingredients.", site: "https://www.badgerbalm.com" },
      { b: "Thinksport / Thinkbaby", p: "Mineral Sunscreen", score: 86, oil: "None", why: "Zinc oxide, kid-friendly.", site: "https://www.thinksport.com" },
      { b: "Raw Elements", p: "Zinc Sunscreen Tin", score: 90, oil: "None", why: "Non-nano zinc, plastic-free tin.", site: "https://rawelementsusa.com" }
    ],
    avoid: [{ b: "Banana Boat / Coppertone (chemical sprays)", why: "Oxybenzone, octinoxate, homosalate; aerosol inhalation risk." }]
  },
  {
    id: "candles", name: "Candles & Air Fresheners", emoji: "🕯️", cat: "Home",
    keys: ["candles", "candle", "air freshener", "plug in", "febreze", "wax melts"],
    tip: "Paraffin wax is a petroleum by-product and 'fragrance' can hide phthalates. Beeswax or coconut wax with essential oils is the clean swap.",
    picks: [
      { b: "Big Dipper Wax Works", p: "100% Beeswax Candles", score: 94, oil: "None", why: "Pure beeswax, cotton wicks.", site: "https://www.bigdipperwaxworks.com" },
      { b: "Local Beekeeper", p: "Beeswax Candles", score: 96, oil: "None", why: "Farmers markets often have them.", local: true },
      { b: "Simmer pot", p: "Orange peel + cinnamon + cloves on the stove", score: 100, oil: "None", why: "Free and actually smells like Christmas.", site: "https://www.google.com/search?q=simmer+pot+recipe" }
    ],
    avoid: [{ b: "Bath & Body Works candles / Glade Plug-ins / Febreze", why: "Paraffin, synthetic fragrance, VOCs." }]
  },

  // ---------- More foods ----------
  {
    id: "canned-fish", name: "Canned Tuna, Salmon & Sardines", cat: "Protein",
    keys: ["tuna", "canned tuna", "tuna fish", "canned salmon", "sardines", "anchovies", "canned fish", "tinned fish", "mackerel"],
    tip: "Read what the fish is packed in. 'Vegetable oil' means soybean oil, and many water-packed tunas add 'vegetable broth' made from soy. Look for fish + salt, or fish in olive oil. Smaller fish (skipjack, sardines) carry less mercury than albacore.",
    picks: [
      { b: "Wild Planet", p: "Wild Skipjack Tuna", score: 94, oil: "None", why: "Pole-and-line caught, just tuna and sea salt. No water or oil added.", site: "https://www.wildplanetfoods.com" },
      { b: "Safe Catch", p: "Elite Wild Tuna", score: 94, oil: "None", why: "Every tuna is tested for mercury. Just tuna and sea salt.", site: "https://safecatch.com" },
      { b: "Fishwife", p: "Tinned Smoked Salmon & Sardines", score: 90, oil: "Olive oil", why: "Packed in olive oil. Responsibly sourced fish.", site: "https://eatfishwife.com" },
      { b: "Wild Planet", p: "Wild Sardines in Extra Virgin Olive Oil", score: 92, oil: "Extra-virgin olive oil", why: "Low-mercury, high omega-3, packed in EVOO.", site: "https://www.wildplanetfoods.com" }
    ],
    avoid: [
      { b: "Tuna 'in vegetable oil' (e.g. StarKist Chunk Light in Vegetable Oil)", why: "Packed in soybean oil." },
      { b: "Chunk light tuna in water with 'vegetable broth'", why: "The broth usually contains soy and pyrophosphate. Check the label." }
    ]
  },
  {
    id: "seafood", name: "Salmon, Shrimp & Seafood", cat: "Protein",
    keys: ["salmon", "fish", "seafood", "shrimp", "cod", "halibut", "scallops", "wild caught", "fresh fish", "frozen fish"],
    tip: "Choose wild-caught. Farmed salmon gets its pink color from astaxanthin added to the feed, often synthetic, and has tested higher for PCBs and dioxins. Much imported farmed shrimp has been refused at the US border for banned antibiotics.",
    picks: [
      { b: "Vital Choice", p: "Wild Alaskan Salmon", score: 95, oil: "None", why: "Wild-caught, flash-frozen, third-party tested.", site: "https://www.vitalchoice.com" },
      { b: "Wild Alaskan Company", p: "Wild Seafood Box", score: 93, oil: "None", why: "100% wild-caught Alaskan salmon, cod and halibut, shipped frozen.", site: "https://wildalaskancompany.com" },
      { b: "Local fish market", p: "Wild-caught, US-caught fish", score: 92, oil: "None", why: "Ask: 'Is it wild or farmed? Where was it caught?'", local: true },
      { b: "Any brand", p: "Wild-caught US Gulf or Pacific shrimp", score: 86, oil: "None", why: "Look for 'wild-caught' and 'Product of USA' on the bag." }
    ],
    avoid: [
      { b: "Farmed Atlantic salmon", why: "Feed-added color, higher PCBs and dioxins in testing." },
      { b: "Breaded fish sticks & popcorn shrimp", why: "Fried in soybean or canola oil before freezing." }
    ]
  },
  {
    id: "broth", name: "Bone Broth & Soup", cat: "Pantry",
    keys: ["bone broth", "broth", "chicken broth", "beef broth", "soup", "canned soup", "chicken noodle soup", "stock"],
    tip: "Real broth is bones, water, vegetables and salt. Condensed 'cream of' soups are thickened with modified starch and seed oil.",
    picks: [
      { b: "Kettle & Fire", p: "Bone Broth (beef or chicken)", score: 92, oil: "None", why: "Grass-fed beef or organic chicken bones, simmered for hours.", site: "https://www.kettleandfire.com" },
      { b: "Bonafide Provisions", p: "Organic Bone Broth (frozen)", score: 94, oil: "None", why: "Organic, sold frozen so no preservatives are needed.", site: "https://bonafideprovisions.com" },
      { b: "Pacific Foods", p: "Organic Bone Broth", score: 86, oil: "None", why: "Organic and easy to find in most grocery stores.", site: "https://www.pacificfoods.com" },
      { b: "Local farm", p: "Soup bones (make your own)", score: 100, oil: "None", why: "Ask a farmer for marrow and knuckle bones. Simmer 12-24 hours.", local: true }
    ],
    avoid: [{ b: "Campbell's Condensed 'Cream of' soups", why: "Vegetable oil (canola, corn, cottonseed or soybean), modified starch." }]
  },
  {
    id: "hot-sauce", name: "Hot Sauce & Salsa", cat: "Condiments",
    keys: ["hot sauce", "salsa", "pico de gallo", "sriracha", "buffalo sauce", "chili sauce", "tabasco", "cholula"],
    tip: "Classic hot sauces are just peppers, vinegar and salt. Buffalo and 'wing' sauces are where soybean oil sneaks in. Fresh salsa from the refrigerated section usually has no oil at all.",
    picks: [
      { b: "Tabasco", p: "Original Red Sauce", score: 96, oil: "None", why: "Three ingredients: vinegar, red pepper, salt.", site: "https://www.tabasco.com" },
      { b: "Frank's RedHot", p: "Original Cayenne Pepper Sauce", score: 92, oil: "None", why: "Aged cayenne, vinegar, water, salt, garlic. Make your own Buffalo sauce with butter.", site: "https://www.franksredhot.com" },
      { b: "Cholula", p: "Original Hot Sauce", score: 88, oil: "None", why: "Peppers, vinegar, salt, spices. Contains a little xanthan gum.", site: "https://www.cholula.com" },
      { b: "Green Mountain Gringo", p: "Salsa", score: 90, oil: "None", why: "Vegetables, vinegar and spices. No oil or sugar.", site: "https://greenmountaingringo.com" }
    ],
    avoid: [{ b: "Bottled Buffalo & wing sauces", why: "Many add soybean or canola oil and 'butter flavor'. Check the label." }]
  },
  {
    id: "bbq-sauce", name: "BBQ Sauce & Marinades", cat: "Condiments",
    keys: ["bbq sauce", "barbecue sauce", "barbeque", "marinade", "steak sauce", "honey mustard"],
    tip: "Most BBQ sauce is high-fructose corn syrup with tomato. Look for no HFCS and as little sugar as you can find.",
    picks: [
      { b: "Primal Kitchen", p: "Organic Unsweetened Classic BBQ Sauce", score: 92, oil: "None", why: "No added sugar, organic tomato base.", site: "https://www.primalkitchen.com" },
      { b: "Stubb's", p: "Original Legendary Bar-B-Q Sauce", score: 70, oil: "None", why: "Cane sugar instead of HFCS. A decent grocery-store pick.", site: "https://www.stubbsbbq.com" }
    ],
    avoid: [
      { b: "Sweet Baby Ray's", why: "High-fructose corn syrup is the first ingredient." },
      { b: "KC Masterpiece", why: "High-fructose corn syrup, caramel color." }
    ]
  },
  {
    id: "soy-sauce", name: "Soy Sauce, Teriyaki & Asian Sauces", cat: "Condiments",
    keys: ["soy sauce", "tamari", "coconut aminos", "teriyaki", "stir fry sauce", "asian sauce", "sushi"],
    tip: "Traditionally brewed soy sauce is soybeans, wheat, salt and water. Cheap 'soy sauce' is hydrolyzed soy protein with corn syrup and caramel color. Coconut aminos is the soy-free, gluten-free swap.",
    picks: [
      { b: "Coconut Secret", p: "Coconut Aminos", score: 94, oil: "None", why: "Coconut sap and sea salt. Soy-free and gluten-free.", site: "https://www.coconutsecret.com" },
      { b: "San-J", p: "Organic Tamari", score: 90, oil: "None", why: "Brewed, gluten-free soy sauce.", site: "https://san-j.com" },
      { b: "Bragg", p: "Organic Coconut Aminos", score: 92, oil: "None", why: "Soy-free soy sauce swap.", site: "https://www.bragg.com" },
      { b: "Primal Kitchen", p: "No-Soy Teriyaki Sauce", score: 86, oil: "Avocado oil", why: "Coconut aminos base, no refined sugar.", site: "https://www.primalkitchen.com" }
    ],
    avoid: [{ b: "La Choy Soy Sauce", why: "Hydrolyzed soy protein, corn syrup, caramel color." }]
  },
  {
    id: "pickles", name: "Pickles, Sauerkraut & Fermented Veggies", cat: "Condiments",
    keys: ["pickles", "pickle", "dill pickles", "sauerkraut", "kimchi", "fermented", "relish"],
    tip: "Naturally fermented pickles and kraut live in the refrigerated aisle and are full of probiotics. Shelf-stable pickles can contain Yellow 5 and polysorbate 80.",
    picks: [
      { b: "Bubbies", p: "Kosher Dill Pickles", score: 96, oil: "None", why: "Naturally fermented in salt brine. No vinegar, no dyes.", site: "https://www.bubbies.com" },
      { b: "Grillo's Pickles", p: "Italian Dill Spears", score: 92, oil: "None", why: "Cucumbers, vinegar, garlic, dill, salt. Refrigerated.", site: "https://grillospickles.com" },
      { b: "Wildbrine", p: "Raw Sauerkraut", score: 94, oil: "None", why: "Raw and fermented, with live cultures.", site: "https://wildbrine.com" },
      { b: "Cleveland Kitchen", p: "Fermented Kraut", score: 90, oil: "None", why: "Fermented cabbage, refrigerated.", site: "https://clevelandkitchen.com" }
    ],
    avoid: [{ b: "Vlasic (some varieties)", why: "Yellow 5 and polysorbate 80 in some pickles. Check the label." }]
  },
  {
    id: "jam", name: "Jam, Jelly & Fruit Spread", cat: "Pantry",
    keys: ["jam", "jelly", "fruit spread", "preserves", "grape jelly", "strawberry jam", "pb&j"],
    tip: "Grape jelly is often HFCS with a little juice. Pick spreads where fruit is the first ingredient.",
    picks: [
      { b: "Crofter's", p: "Organic Just Fruit Spread", score: 92, oil: "None", why: "Organic fruit, sweetened with fruit juice.", site: "https://www.croftersorganic.com" },
      { b: "St. Dalfour", p: "Fruit Spread", score: 88, oil: "None", why: "Fruit and grape juice concentrate. No cane sugar." },
      { b: "Bonne Maman", p: "Preserves", score: 76, oil: "None", why: "Simple ingredients. Real sugar, but no corn syrup." }
    ],
    avoid: [{ b: "Smucker's Concord Grape Jelly", why: "High-fructose corn syrup and corn syrup." }]
  },
  {
    id: "coffee", name: "Coffee", cat: "Drinks",
    keys: ["coffee", "coffee beans", "ground coffee", "espresso", "cold brew", "k cups", "coffee pods", "decaf"],
    tip: "Choose organic, and whole beans if you can. If you drink decaf, look for Swiss Water or CO2 process instead of chemical solvents.",
    picks: [
      { b: "Purity Coffee", p: "Organic Coffee", score: 94, oil: "None", why: "Organic. Tested for mold toxins and pesticides.", site: "https://puritycoffee.com" },
      { b: "Kicking Horse", p: "Organic Whole Bean Coffee", score: 88, oil: "None", why: "Organic and fair trade. Easy to find.", site: "https://www.kickinghorsecoffee.com" },
      { b: "Local roaster", p: "Fresh-roasted organic beans", score: 90, oil: "None", why: "Ask for organic and the roast date.", local: true }
    ],
    avoid: [
      { b: "Artificially flavored coffees", why: "Lab-made flavorings sprayed on the beans." },
      { b: "Solvent-processed decaf", why: "Some decaf uses methylene chloride. Look for Swiss Water Process." }
    ]
  },
  {
    id: "tea", name: "Tea", cat: "Drinks",
    keys: ["tea", "green tea", "herbal tea", "chamomile", "matcha", "iced tea", "tea bags"],
    tip: "Skip shiny 'silken' pyramid bags made of nylon or PET plastic. A 2019 study found one plastic tea bag released billions of microplastic particles into the cup. Loose-leaf is cleanest.",
    picks: [
      { b: "Loose-leaf", p: "Organic loose tea + stainless steel infuser", score: 98, oil: "None", why: "No bag at all." },
      { b: "Traditional Medicinals", p: "Organic Herbal Teas", score: 90, oil: "None", why: "Certified organic herbs.", site: "https://www.traditionalmedicinals.com" },
      { b: "Pukka", p: "Organic Herbal Teas", score: 88, oil: "None", why: "Certified organic." }
    ],
    avoid: [{ b: "Plastic 'silken' pyramid tea bags", why: "Release microplastics into hot water." }]
  },
  {
    id: "kombucha", name: "Kombucha & Gut-Health Drinks", cat: "Drinks",
    keys: ["kombucha", "probiotic drink", "kefir water", "gut health", "fermented drink"],
    tip: "Real kombucha is tea, sugar and a culture, and most of the sugar is eaten during fermentation. Look for 'raw' and organic, in glass.",
    picks: [
      { b: "Health-Ade", p: "Kombucha", score: 90, oil: "None", why: "Organic, small-batch, glass bottles.", site: "https://health-ade.com" },
      { b: "GT's", p: "Synergy Raw Kombucha", score: 90, oil: "None", why: "Raw, organic, glass bottles.", site: "https://gtslivingfoods.com" }
    ],
    avoid: [{ b: "'Prebiotic' and 'gut-health' sodas with sucralose", why: "Artificial sweeteners in a health halo. Check the label." }]
  },
  {
    id: "electrolytes", name: "Electrolytes & Sports Drinks", cat: "Drinks",
    keys: ["electrolytes", "sports drink", "gatorade", "powerade", "hydration", "coconut water", "body armor", "pedialyte"],
    tip: "Most sports drinks are sugar water with dyes. For real hydration, pick an unsweetened or stevia-sweetened electrolyte mix, or plain coconut water.",
    picks: [
      { b: "Harmless Harvest", p: "Organic Coconut Water", score: 94, oil: "None", why: "Just organic coconut water. Nothing added.", site: "https://harmlessharvest.com" },
      { b: "LMNT", p: "Electrolyte Drink Mix", score: 86, oil: "None", why: "Sodium, potassium, magnesium. No sugar or dyes. Contains stevia.", site: "https://drinklmnt.com" },
      { b: "Redmond", p: "Re-Lyte Electrolyte Mix", score: 86, oil: "None", why: "Made with Redmond Real Salt. No dyes.", site: "https://redmondlife.com" },
      { b: "Ultima", p: "Replenisher Electrolyte Mix", score: 84, oil: "None", why: "No sugar or dyes. Sweetened with stevia.", site: "https://www.ultimareplenisher.com" }
    ],
    avoid: [
      { b: "Gatorade", why: "Sugar plus Red 40, Yellow 5 or Blue 1 in many flavors." },
      { b: "Powerade", why: "High-fructose corn syrup and synthetic dyes." }
    ]
  },
  {
    id: "kids-drinks", name: "Juice & Kids' Drinks", cat: "Drinks",
    keys: ["juice", "kids drinks", "juice box", "apple juice", "orange juice", "sunny d", "lemonade", "fruit punch", "capri sun"],
    tip: "Look for 100% juice with no added sugar or dyes, and water it down for kids. 'Juice drinks' and 'punch' are usually corn syrup and dye.",
    picks: [
      { b: "Lakewood", p: "Organic Pure Juice", score: 90, oil: "None", why: "100% organic juice in glass bottles. Not from concentrate.", site: "https://www.lakewoodjuices.com" },
      { b: "Honest Kids", p: "Organic Juice Drinks", score: 80, oil: "None", why: "Organic, sweetened only with juice." },
      { b: "Homemade", p: "Water + a splash of 100% juice", score: 98, oil: "None", why: "Half the sugar, same flavor kids like." }
    ],
    avoid: [
      { b: "SunnyD", why: "Corn syrup, canola oil, Yellow 5 and Yellow 6." },
      { b: "Hawaiian Punch", why: "High-fructose corn syrup and Red 40." }
    ]
  },
  {
    id: "frozen-treats", name: "Popsicles & Frozen Treats", cat: "Frozen",
    keys: ["popsicle", "popsicles", "ice pops", "freezer pops", "frozen treats", "fruit bars", "otter pops"],
    tip: "Freezer pops and rocket pops are mostly sugar and dye. Fruit-based pops, or blending fruit and freezing it yourself, are the swap.",
    picks: [
      { b: "GoodPop", p: "Organic Fruit Pops", score: 90, oil: "None", why: "Organic, real fruit, no artificial dyes.", site: "https://goodpop.com" },
      { b: "Chloe's", p: "Fruit Pops", score: 86, oil: "None", why: "Fruit, water and a little cane sugar." },
      { b: "Homemade", p: "Blended fruit + yogurt in molds", score: 100, oil: "None", why: "Blend, pour, freeze. Done." }
    ],
    avoid: [{ b: "Popsicle Firecracker / Bomb Pop / Otter Pops", why: "Red 40, Blue 1 and other dyes, corn syrup." }]
  },
  {
    id: "flour", name: "Flour & Baking Mixes", cat: "Pantry",
    keys: ["flour", "all purpose flour", "almond flour", "cassava flour", "pancake mix", "waffle mix", "baking mix", "bisquick", "cake mix", "baking"],
    tip: "Choose unbleached, unbromated flour (potassium bromate is banned in the EU). Boxed mixes often add seed oil to the dry mix.",
    picks: [
      { b: "Jovial", p: "Organic Einkorn All-Purpose Flour", score: 94, oil: "None", why: "Ancient wheat many people digest more easily.", site: "https://jovialfoods.com" },
      { b: "King Arthur", p: "Organic Unbleached All-Purpose Flour", score: 90, oil: "None", why: "Unbleached and never bromated.", site: "https://www.kingarthurbaking.com" },
      { b: "Bob's Red Mill", p: "Super-Fine Almond Flour", score: 92, oil: "None", why: "Grain-free and gluten-free baking.", site: "https://www.bobsredmill.com" },
      { b: "Otto's Naturals", p: "Cassava Flour", score: 92, oil: "None", why: "Grain-free, gluten-free, nut-free.", site: "https://www.ottosnaturals.com" },
      { b: "Simple Mills", p: "Almond Flour Pancake & Waffle Mix", score: 88, oil: "None", why: "Almond flour, arrowroot, coconut sugar. No oil in the mix.", site: "https://www.simplemills.com" }
    ],
    avoid: [
      { b: "Bisquick & most boxed baking mixes", why: "Refined vegetable oil blended into the dry mix. Check the label." },
      { b: "Bromated or bleached flour", why: "Potassium bromate: IARC 'possible carcinogen', banned in the EU." }
    ]
  },
  {
    id: "canned-goods", name: "Canned Tomatoes & Beans", cat: "Pantry",
    keys: ["canned tomatoes", "tomato paste", "crushed tomatoes", "canned beans", "black beans", "chickpeas", "beans", "tomatoes", "passata"],
    tip: "Acidic tomatoes pull more BPA out of can linings. Choose tomatoes in glass, and beans in BPA-free cans (or cook dried beans).",
    picks: [
      { b: "Jovial", p: "Organic Tomatoes (glass jars)", score: 94, oil: "None", why: "Italian tomatoes in glass, so no can lining at all.", site: "https://jovialfoods.com" },
      { b: "Mutti", p: "Tomato Passata & Polpa", score: 88, oil: "None", why: "Italian tomatoes, simple ingredients.", site: "https://mutti-parma.com" },
      { b: "Eden Foods", p: "Organic Beans", score: 90, oil: "None", why: "Organic, cooked with kombu, BPA-free lined cans.", site: "https://www.edenfoods.com" },
      { b: "Any brand", p: "Organic dried beans", score: 96, oil: "None", why: "Soak overnight, then simmer or pressure-cook." }
    ],
    avoid: [{ b: "Cans not labeled BPA-free", why: "Linings can leach BPA, especially with tomatoes." }]
  },
  {
    id: "baby-food", name: "Baby & Toddler Food", cat: "Baby",
    keys: ["baby food", "toddler snacks", "baby puffs", "pouches", "teething wafers", "baby", "toddler", "puffs"],
    tip: "A 2021 US House report found toxic heavy metals in major baby food brands, highest in rice-based snacks. Rotate foods, limit rice puffs, and choose brands that publish their test results.",
    picks: [
      { b: "Homemade", p: "Steamed and mashed veggies, fruit and meat", score: 100, oil: "None", why: "You know exactly what's in it." },
      { b: "Serenity Kids", p: "Savory Pouches", score: 90, oil: "None", why: "Pasture-raised meat with organic veggies. Low sugar.", site: "https://www.myserenitykids.com" }
    ],
    avoid: [{ b: "Rice-based puffs & teething wafers", why: "Highest heavy-metal levels in the 2021 congressional report." }]
  },
  {
    id: "gum", name: "Gum & Mints", cat: "Snacks",
    keys: ["gum", "chewing gum", "mints", "breath mints", "trident", "orbit", "extra gum"],
    tip: "Conventional gum base is synthetic plastic and rubber, usually sweetened with aspartame and preserved with BHT. Chicle is the original natural gum base.",
    picks: [
      { b: "Simply Gum", p: "Natural Chewing Gum", score: 92, oil: "None", why: "Chicle base. No synthetic ingredients.", site: "https://simplygum.com" },
      { b: "Glee Gum", p: "Natural Chewing Gum", score: 88, oil: "None", why: "Chicle base, no artificial sweeteners or dyes.", site: "https://www.gleegum.com" }
    ],
    avoid: [{ b: "Trident / Orbit / Extra", why: "Synthetic gum base, aspartame, BHT." }]
  }
];
