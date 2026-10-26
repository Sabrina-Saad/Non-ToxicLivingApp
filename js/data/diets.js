/*
 * Diet filters used by Search, Recipes and Label Check.
 *
 * Each diet:
 *   id, label
 *   safe:  phrases removed before checking (e.g. "almond flour" is fine for gluten-free)
 *   bad:   [regex, what to call it] - any match means the food doesn't fit
 *   yes:   regex that signals a product is made for this diet ("vegan", "gluten-free"...)
 *   swap:  regex matched against a recipe's swap tags ("Dairy-free", "Low-carb"...)
 *   off:   Open Food Facts allergen / analysis tags that rule it out
 *   keto:  true = also judged on net carbs, not just ingredients
 *
 * Matching is done on lower-case text. Keep phrases specific: "butter" must not flag
 * "peanut butter", "egg" must not flag "eggplant".
 */
(function () {
  const MEAT = [
    ["\\b(beef|steak|brisket|veal|bison|venison)\\b", "beef or red meat"],
    ["\\b(chicken|turkey|duck|poultry)\\b", "poultry"],
    ["\\b(pork|bacon|ham|prosciutto|pancetta|chorizo)\\b", "pork"],
    ["\\b(sausages?|pepperoni|salami|hot dogs?|meatballs?|ground meat|meat)\\b", "meat"],
    ["\\blamb\\b", "lamb"],
    ["\\b(tallow|lard|suet)\\b", "animal fat"],
    ["\\b(bone broth|chicken broth|beef broth|chicken stock|beef stock)\\b", "meat broth"],
    ["\\bgelatin\\b", "gelatin (from animals)"],
    ["\\b(collagen)\\b", "collagen (from animals)"]
  ];
  const FISH = [
    ["\\b(fish|salmon|tuna|cod|tilapia|halibut|trout|sardines?|anchov(y|ies)|mackerel|caviar)\\b", "fish"],
    ["\\b(shrimp|prawns?|crab|lobster|scallops?|clams?|oysters?|mussels?|shellfish)\\b", "shellfish"],
    ["\\bworcestershire\\b", "Worcestershire (contains anchovy)"],
    ["\\bfish sauce\\b", "fish sauce"]
  ];
  const DAIRY = [
    ["\\b(milk|whole milk|buttermilk|half[- ]and[- ]half|evaporated milk|condensed milk|milk powder|milkfat|milk fat)\\b", "milk"],
    ["\\b(butter|ghee)\\b", "butter or ghee"],
    ["\\b(cheese|cheddar|parmesan|parmigiano|mozzarella|ricotta|feta|gouda|cream cheese|cottage cheese)\\b", "cheese"],
    ["\\b(cream|sour cream|heavy cream|whipping cream|creme fraiche)\\b", "cream"],
    ["\\b(yogurt|yoghurt|kefir|skyr)\\b", "yogurt"],
    ["\\b(whey|casein|caseinate|lactose)\\b", "milk protein"]
  ];
  const DAIRY_SAFE = [
    "(coconut|almond|oat|cashew|soy|rice|hemp|nut|plant|macadamia|pea)[- ]?(milk|cream|yogurt|yoghurt|butter|cheese)s?",
    "(peanut|almond|cashew|sunflower|sunflower seed|seed|nut|cocoa|cacao|coconut|shea|apple|pecan|walnut|pistachio)[- ]butter",
    "cream of tartar", "dairy[- ]free \\w+", "vegan \\w+", "non[- ]dairy \\w+", "milk chocolate free", "no (milk|dairy)"
  ];
  const EGG = [["\\b(eggs?|egg whites?|egg yolks?|yolks?|mayo|mayonnaise|aioli|meringue|albumen)\\b", "egg"]];
  const EGG_SAFE = ["egg[- ]free \\w*", "vegan (mayo|mayonnaise|aioli)", "flax egg", "chia egg", "no eggs?"];
  const GLUTEN = [
    ["\\b(wheat|einkorn|spelt|farro|kamut|durum|semolina|triticale|bulgur|couscous|seitan)\\b", "wheat"],
    ["\\b(barley|rye|malt|malted|brewer'?s yeast)\\b", "barley, rye or malt"],
    ["\\b(flour|all[- ]purpose)\\b", "wheat flour"],
    ["\\b(bread|breadcrumbs|panko|croutons|buns?|bagels?|pizza dough|crust|crackers|pretzels)\\b", "bread or crackers"],
    ["\\b(pasta|spaghetti|fettuccine|penne|macaroni|linguine|lasagna|noodles|orzo|ramen)\\b", "pasta"],
    ["\\bsoy sauce\\b", "soy sauce (made with wheat)"],
    ["\\b(flour tortillas?|tortillas?|wraps?)\\b", "flour tortillas"],
    ["\\b(oats|oat|oatmeal|rolled oats)\\b", "oats (fine only if certified gluten-free)"]
  ];
  const GLUTEN_SAFE = [
    "gluten[- ]free \\w+(?: \\w+)?", "grain[- ]free \\w+", "certified gluten[- ]free",
    "(almond|coconut|cassava|tapioca|rice|brown rice|chickpea|garbanzo|buckwheat|sorghum|arrowroot|potato|corn|oat|tiger nut|banana|plantain|millet|teff|quinoa|amaranth)[- ](flour|starch|meal|pasta|noodles|crackers|tortillas?|wraps?)",
    "corn tortillas?", "cassava tortillas?", "almond flour tortillas?", "lettuce wraps?", "lettuce cups?", "rice noodles", "tamari", "coconut aminos",
    "buckwheat", "cornstarch", "corn starch", "cornmeal", "(oat|almond|coconut|cashew) milk", "pie crust-free"
  ];
  const GRAINS_LEGUMES = [
    ["\\b(rice|oats?|oatmeal|corn|cornmeal|cornstarch|quinoa|millet|sorghum|popcorn|tortilla chips)\\b", "grains"],
    ["\\b(beans?|black beans|pinto|kidney beans|lentils|chickpeas|garbanzo|hummus|edamame|tofu|tempeh|soy|soybean|peanuts?|peas)\\b", "legumes"],
    ["\\b(sugar|cane sugar|brown sugar|powdered sugar|corn syrup|high fructose corn syrup|dextrose)\\b", "refined sugar"]
  ];
  const PALEO_SAFE = [
    "coconut sugar", "maple sugar", "date sugar", "sugar[- ]free", "no (added )?sugar", "(almond|coconut|cassava|tapioca|tiger nut|arrowroot|plantain) (flour|starch)",
    "green beans", "snap peas", "snow peas", "coconut aminos", "(almond|cashew|coconut|sunflower) butter", "ghee", "rice vinegar", "corn-free"
  ];
  const SUGAR_CARBS = [
    ["\\b(sugar|cane sugar|brown sugar|powdered sugar|coconut sugar|corn syrup|high fructose corn syrup|dextrose|glucose|fructose|maltodextrin|molasses|agave|honey|maple syrup|maple|syrup|dates|raisins|fruit juice concentrate)\\b", "sugar"],
    ["\\b(flour|wheat|einkorn|bread|pasta|spaghetti|noodles|crackers|tortillas?|rice|oats?|oatmeal|corn|cornmeal|cornstarch|potato|potatoes|potato starch|tapioca|cassava|starch|cereal|granola|banana|bananas|beans|lentils|chickpeas)\\b", "starch or grains"]
  ];
  const KETO_SAFE = [
    "sugar[- ]free \\w*", "no (added )?sugar", "zero sugar", "(almond|coconut|flax|sunflower seed|lupin) (flour|meal)", "monk fruit", "stevia",
    "erythritol", "allulose", "sugar alcohol", "corn oil", "rice bran oil", "green beans", "riced cauliflower", "cauliflower rice", "rice vinegar"
  ];

  const MEAT_SAFE = ["vegetable broth", "veggie broth", "plant[- ]based \\w+", "vegan \\w+", "meatless \\w*", "beefsteak tomato", "coconut meat", "marine collagen", "agar", "vegan gelatin"];

  window.NTL_DIETS = [
    {
      id: "gluten-free", label: "Gluten-free",
      safe: GLUTEN_SAFE, bad: GLUTEN,
      yes: "gluten[- ]free|grain[- ]free|\\bgf\\b|cassava|almond flour|paleo",
      swap: "gluten[- ]free",
      off: { allergens: ["en:gluten"] }
    },
    {
      id: "vegetarian", label: "Vegetarian",
      safe: MEAT_SAFE, bad: [...MEAT, ...FISH],
      yes: "vegetarian|vegan|plant[- ]based",
      swap: "vegetarian|vegan",
      off: { analysis: ["en:non-vegetarian"], allergens: ["en:fish", "en:crustaceans", "en:molluscs"] }
    },
    {
      id: "vegan", label: "Vegan",
      safe: [...MEAT_SAFE, ...DAIRY_SAFE, ...EGG_SAFE], bad: [...MEAT, ...FISH, ...DAIRY, ...EGG, ["\\b(honey|beeswax|carmine|cochineal|shellac)\\b", "honey or insect-derived"]],
      yes: "\\bvegan\\b|plant[- ]based",
      swap: "\\bvegan\\b",
      off: { analysis: ["en:non-vegan"], allergens: ["en:milk", "en:eggs", "en:fish", "en:crustaceans", "en:molluscs"] }
    },
    {
      id: "dairy-free", label: "Dairy-free",
      safe: DAIRY_SAFE, bad: DAIRY,
      yes: "dairy[- ]free|non[- ]dairy|\\bvegan\\b|plant[- ]based|oat milk|almond milk|coconut milk|coconut cream",
      swap: "dairy[- ]free|\\bvegan\\b",
      off: { allergens: ["en:milk"] }
    },
    {
      id: "pescatarian", label: "Pescatarian",
      safe: MEAT_SAFE, bad: MEAT,
      yes: "pescatarian|vegetarian|vegan|plant[- ]based|wild[- ]caught|seafood|salmon|tuna|sardines|fish",
      swap: "vegetarian|vegan|pescatarian|shrimp|fish|salmon",
      off: { analysis: ["en:non-vegetarian"], allergensOk: true }
    },
    {
      id: "keto", label: "Keto", keto: true,
      safe: KETO_SAFE, bad: SUGAR_CARBS,
      yes: "\\bketo\\b|sugar[- ]free|zero sugar|no sugar|0g sugar|low[- ]carb|stevia|monk fruit|allulose",
      swap: "keto|low[- ]carb|lower carb",
      off: {}
    },
    {
      id: "paleo", label: "Paleo",
      safe: [...PALEO_SAFE, ...DAIRY_SAFE, ...GLUTEN_SAFE.filter((s) => !/oat|corn|rice|quinoa|millet|sorghum|buckwheat|chickpea|garbanzo|teff|amaranth/.test(s))],
      bad: [...GRAINS_LEGUMES, ...GLUTEN.filter(([re]) => !/oats/.test(re)), ...DAIRY.filter(([, n]) => n !== "butter or ghee")],
      yes: "\\bpaleo\\b|grain[- ]free|whole30",
      swap: "paleo|grain[- ]free",
      off: {}
    }
  ];

  // Product categories that are always (or never) a fit, so a category like "Beef" is
  // flagged for vegetarians even when the brand blurbs don't say "beef".
  window.NTL_DIET_CATEGORY_WORDS = {
    keto: "\\b(cookies?|candy|gumm(y|ies)|chips|cereal|granola|soda|crackers|ice cream|pasta|bread|tortillas?|popcorn|sweets|sugar|syrup|jam|jelly|juice|rice|oats|flour|mac|pizza|pancake|waffle)\\b",
    paleo: "\\b(bread|pasta|cereal|crackers|tortilla chips|popcorn|candy|soda|peanut|hummus|mac|pizza|rice|oats|flour|yogurt|milk|ice cream|cheese|creamer)\\b"
  };
})();
