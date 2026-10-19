/*
 * Clean recipes. Quantities are numeric (q) + unit (u) so the app can scale servings.
 * "brand" is the non-toxic product we recommend - the app turns it into buy links.
 * Nutrition is an estimate PER SERVING, calculated from USDA values for the listed brands/ingredients.
 */
window.NTL_RECIPES = [
  {
    id: "cookies", title: "Brown Butter Chocolate Chip Cookies", emoji: "🍪",
    keys: ["cookies", "cookie", "chocolate chip cookies", "chocolate chip", "baking", "dessert", "sweet"],
    time: "15 min prep · 11 min bake", serves: 18, unit: "cookie",
    tags: ["Vegetarian", "No seed oils", "No refined sugar"],
    intro: "Crispy edges, gooey middle - made with grass-fed butter, coconut sugar and organic einkorn flour.",
    ingredients: [
      { q: 0.5, u: "cup", item: "grass-fed butter (1 stick), softened", brand: "Kerrygold Unsalted Butter" },
      { q: 0.75, u: "cup", item: "coconut sugar", brand: "Big Tree Farms Organic Coconut Sugar" },
      { q: 1, u: "", item: "pasture-raised egg + 1 extra yolk", brand: "Vital Farms Pasture-Raised Eggs" },
      { q: 2, u: "tsp", item: "pure vanilla extract", brand: "Simply Organic Pure Vanilla Extract" },
      { q: 2, u: "cups", item: "organic einkorn all-purpose flour", brand: "Jovial Einkorn All-Purpose Flour" },
      { q: 1, u: "tsp", item: "baking soda", brand: "Bob's Red Mill Baking Soda" },
      { q: 0.5, u: "tsp", item: "unrefined sea salt", brand: "Redmond Real Salt" },
      { q: 1, u: "cup", item: "dark chocolate chips", brand: "Hu Kitchen Dark Chocolate Gems" }
    ],
    steps: [
      "Heat oven to 350°F (175°C). Line a baking sheet with unbleached parchment paper.",
      "Beat the softened butter and coconut sugar together for 2 minutes until fluffy.",
      "Add the egg, extra yolk and vanilla. Mix until smooth.",
      "Stir in flour, baking soda and salt just until no dry flour remains. Don't overmix.",
      "Fold in the chocolate chips. Chill the dough 15 minutes (makes thicker cookies).",
      "Scoop 2-tablespoon balls, 2 inches apart. Bake 10-12 minutes until edges are golden.",
      "Cool 5 minutes on the pan - they finish setting as they cool. Sprinkle with flaky salt."
    ],
    nutrition: { cal: 180, protein: 3, carbs: 22, fat: 9, fiber: 2, sugar: 10 },
    swaps: [
      { tag: "Gluten-free", text: "Swap einkorn for 2½ cups Bob's Red Mill Super-Fine Almond Flour (add 2 tbsp tapioca flour). Adds ~2g protein per cookie." },
      { tag: "Dairy-free", text: "Use ½ cup organic virgin coconut oil (solid) instead of butter." },
      { tag: "Vegan", text: "Coconut oil + 1 flax egg (1 tbsp ground flax + 3 tbsp water, rest 5 min) + dairy-free Hu chocolate." },
      { tag: "Higher protein", text: "Replace ¼ cup flour with 2 scoops grass-fed vanilla whey (Promix). ~6g protein per cookie." },
      { tag: "Lower sugar", text: "Use ½ cup coconut sugar and Lily's stevia-sweetened chips." }
    ],
    tip: "Brown the butter first (cook until nutty and golden, then cool) for a toffee-like flavor."
  },
  {
    id: "rice-krispies", title: "Clean Rice Crispy Treats", emoji: "🍘",
    keys: ["rice krispies", "rice krispie", "rice crispy", "rice crispies", "rice krispy treats", "rice krispie treats", "marshmallow treats", "marshmallow", "krispies"],
    time: "10 min + 30 min set", serves: 16, unit: "square",
    tags: ["Gluten-free", "No seed oils", "No dyes"],
    intro: "The nostalgic treat, minus the BHT, corn syrup and artificial flavors. Brown rice crisps + clean marshmallows + grass-fed butter.",
    ingredients: [
      { q: 3, u: "tbsp", item: "grass-fed butter", brand: "Kerrygold Salted Butter" },
      { q: 10, u: "oz", item: "clean marshmallows (1 bag)", brand: "Dandies Vanilla Marshmallows" },
      { q: 1, u: "tsp", item: "pure vanilla extract", brand: "Simply Organic Pure Vanilla Extract" },
      { q: 0.25, u: "tsp", item: "sea salt", brand: "Redmond Real Salt" },
      { q: 6, u: "cups", item: "organic brown rice crisps cereal", brand: "One Degree Organic Sprouted Brown Rice Crisps" }
    ],
    steps: [
      "Line an 8x8 or 9x9 pan with unbleached parchment paper.",
      "Melt the butter in a large pot over LOW heat (don't let it brown).",
      "Add the marshmallows, stirring constantly until fully melted and smooth - about 3-4 minutes.",
      "Turn off the heat. Stir in vanilla and salt.",
      "Add the rice crisps and fold gently until every piece is coated.",
      "Press into the pan with a buttered spatula - press lightly so they stay chewy.",
      "Let set 30 minutes at room temperature, then cut into 16 squares."
    ],
    nutrition: { cal: 120, protein: 1, carbs: 23, fat: 3, fiber: 0, sugar: 11 },
    swaps: [
      { tag: "Vegetarian / Vegan", text: "Regular marshmallows contain pork gelatin. Dandies are already vegan - use coconut oil instead of butter for fully vegan." },
      { tag: "Higher protein", text: "Stir in 2 scoops unflavored collagen (Vital Proteins) with the marshmallows - adds ~2g protein per square." },
      { tag: "Chocolate", text: "Drizzle with 1/3 cup melted Hu dark chocolate gems." },
      { tag: "PB version", text: "Melt in ¼ cup natural peanut butter (Crazy Richard's) with the butter." }
    ],
    tip: "The #1 mistake is high heat - it makes them hard. Keep it low and slow."
  },
  {
    id: "brownies", title: "Fudgy One-Bowl Brownies", emoji: "🟫",
    keys: ["brownies", "brownie", "chocolate", "chocolate dessert", "fudge"],
    time: "10 min prep · 25 min bake", serves: 16, unit: "brownie",
    tags: ["Gluten-free", "Vegetarian", "No seed oils"],
    intro: "Dense, fudgy, and made with real cacao and almond flour.",
    ingredients: [
      { q: 0.5, u: "cup", item: "grass-fed butter, melted", brand: "Kerrygold Unsalted Butter" },
      { q: 1, u: "cup", item: "coconut sugar", brand: "Big Tree Farms Organic Coconut Sugar" },
      { q: 2, u: "", item: "pasture-raised eggs", brand: "Vital Farms Pasture-Raised Eggs" },
      { q: 2, u: "tsp", item: "vanilla extract", brand: "Simply Organic Pure Vanilla Extract" },
      { q: 0.5, u: "cup", item: "raw cacao powder", brand: "Navitas Organic Cacao Powder" },
      { q: 1, u: "cup", item: "super-fine almond flour", brand: "Bob's Red Mill Super-Fine Almond Flour" },
      { q: 0.25, u: "tsp", item: "sea salt", brand: "Redmond Real Salt" },
      { q: 0.5, u: "cup", item: "dark chocolate chips", brand: "Hu Kitchen Dark Chocolate Gems" }
    ],
    steps: [
      "Heat oven to 350°F. Line an 8x8 pan with parchment.",
      "Whisk melted butter and coconut sugar for 1 minute.",
      "Whisk in eggs and vanilla until glossy (about 1 minute - this makes the crackly top).",
      "Add cacao, almond flour and salt. Stir until smooth. Fold in chocolate chips.",
      "Spread in the pan. Bake 22-26 minutes - a toothpick should come out with moist crumbs.",
      "Cool completely (at least 1 hour) before cutting. They firm up as they cool."
    ],
    nutrition: { cal: 185, protein: 3, carbs: 17, fat: 12, fiber: 2, sugar: 13 },
    swaps: [
      { tag: "Dairy-free", text: "Use ½ cup melted coconut oil." },
      { tag: "Vegan", text: "Coconut oil + 2 flax eggs. They'll be more cakey." },
      { tag: "Protein", text: "Add 1 scoop grass-fed chocolate whey; reduce almond flour to ¾ cup." },
      { tag: "Nut-free", text: "Use ¾ cup einkorn flour instead of almond flour." }
    ]
  },
  {
    id: "pancakes", title: "Fluffy Einkorn Pancakes", emoji: "🥞",
    keys: ["pancakes", "pancake", "waffles", "breakfast", "flapjacks", "hotcakes"],
    time: "20 min", serves: 4, unit: "serving (3 pancakes)",
    tags: ["Vegetarian", "No seed oils"],
    intro: "Better than the box (which often has canola oil, sugar and preservatives). Cook in butter - not vegetable oil spray.",
    ingredients: [
      { q: 1.5, u: "cups", item: "einkorn all-purpose flour", brand: "Jovial Einkorn All-Purpose Flour" },
      { q: 1, u: "tbsp", item: "coconut sugar", brand: "Big Tree Farms Organic Coconut Sugar" },
      { q: 2, u: "tsp", item: "aluminum-free baking powder", brand: "Bob's Red Mill Baking Powder" },
      { q: 0.5, u: "tsp", item: "sea salt", brand: "Redmond Real Salt" },
      { q: 1.25, u: "cups", item: "whole grass-fed milk", brand: "Maple Hill Grass-Fed Whole Milk" },
      { q: 1, u: "", item: "pasture-raised egg", brand: "Vital Farms Pasture-Raised Eggs" },
      { q: 3, u: "tbsp", item: "melted butter (+ more for the pan)", brand: "Kerrygold Unsalted Butter" },
      { q: 0, u: "", item: "To serve: pure maple syrup & berries", brand: "Coombs Family Farms Organic Maple Syrup" }
    ],
    steps: [
      "Whisk flour, coconut sugar, baking powder and salt in a bowl.",
      "In another bowl whisk milk, egg and melted butter.",
      "Pour wet into dry and stir just until combined - lumps are GOOD. Rest 5 minutes.",
      "Heat a cast iron skillet over medium-low. Add a little butter.",
      "Pour ¼ cup batter per pancake. Flip when bubbles form and edges look set (2-3 min).",
      "Cook 1-2 minutes more. Serve with real maple syrup - not 'pancake syrup' (that's corn syrup + caramel color)."
    ],
    nutrition: { cal: 310, protein: 9, carbs: 39, fat: 13, fiber: 3, sugar: 7 },
    swaps: [
      { tag: "Protein", text: "Swap ½ cup flour for ½ cup vanilla grass-fed whey and add 2 tbsp milk. ~20g protein per serving." },
      { tag: "Gluten-free", text: "Use Simple Mills Pancake & Waffle Mix (no oil in the mix - cook in butter)." },
      { tag: "Dairy-free", text: "Use MALK almond milk and melted coconut oil." },
      { tag: "Banana", text: "Mash 1 ripe banana into the wet ingredients and skip the coconut sugar." }
    ]
  },
  {
    id: "mac-cheese", title: "10-Minute Real Cheddar Mac", emoji: "🧀",
    keys: ["mac and cheese", "mac n cheese", "macaroni", "macaroni and cheese", "cheesy pasta", "comfort food", "kraft"],
    time: "15 min", serves: 4, unit: "serving",
    tags: ["Vegetarian", "No dyes", "No seed oils"],
    intro: "Real cheese grated from a block (pre-shredded is coated in cellulose). No Yellow 5 or 6, no 'cheese product'.",
    ingredients: [
      { q: 8, u: "oz", item: "organic elbow pasta", brand: "Jovial Organic Einkorn Elbows" },
      { q: 2, u: "tbsp", item: "grass-fed butter", brand: "Kerrygold Salted Butter" },
      { q: 2, u: "tbsp", item: "flour (or 1 tbsp tapioca for GF)", brand: "Jovial Einkorn All-Purpose Flour" },
      { q: 1, u: "cup", item: "whole milk, warm", brand: "Maple Hill Grass-Fed Whole Milk" },
      { q: 8, u: "oz", item: "sharp cheddar, grated from a block", brand: "Kerrygold Aged Cheddar" },
      { q: 0.5, u: "tsp", item: "sea salt + pinch of mustard powder & paprika", brand: "Redmond Real Salt" }
    ],
    steps: [
      "Cook pasta in well-salted water 1 minute less than the package says. Save ½ cup pasta water, then drain.",
      "In the same pot melt butter over medium. Whisk in flour and cook 1 minute.",
      "Slowly whisk in warm milk. Simmer 2 minutes until it coats a spoon.",
      "Turn heat to LOW. Add cheese by handfuls, stirring until melted.",
      "Add salt, mustard powder, paprika. Stir in the pasta. Thin with pasta water if needed."
    ],
    nutrition: { cal: 530, protein: 23, carbs: 48, fat: 27, fiber: 2, sugar: 5 },
    swaps: [
      { tag: "Hidden veggies", text: "Blend ½ cup steamed butternut squash into the sauce - kids won't notice." },
      { tag: "Protein", text: "Use Banza chickpea pasta (+8g protein) and stir in ½ cup cottage cheese." },
      { tag: "Gluten-free", text: "Jovial brown rice elbows + tapioca flour instead of wheat flour." },
      { tag: "Add meat", text: "Top with crumbled pastured bacon or grass-fed ground beef." }
    ]
  },
  {
    id: "chicken-tenders", title: "Crispy Parmesan Chicken Tenders", emoji: "🍗",
    keys: ["chicken nuggets", "nuggets", "chicken tenders", "chicken strips", "fried chicken", "chicken fingers", "chick fil a", "mcnuggets", "chicken"],
    time: "30 min", serves: 4, unit: "serving",
    tags: ["Gluten-free", "High protein", "No seed oils"],
    intro: "Crispy outside, juicy inside - no seed-oil deep fryer. Baked or air-fried, or pan-fried in tallow.",
    ingredients: [
      { q: 1.5, u: "lb", item: "pasture-raised chicken breast, cut into strips", brand: "Pasturebird Chicken Breast" },
      { q: 2, u: "", item: "pasture-raised eggs, beaten", brand: "Vital Farms Pasture-Raised Eggs" },
      { q: 0.75, u: "cup", item: "almond flour", brand: "Bob's Red Mill Super-Fine Almond Flour" },
      { q: 0.5, u: "cup", item: "finely grated Parmigiano-Reggiano", brand: "Parmigiano Reggiano DOP" },
      { q: 1, u: "tsp", item: "each: garlic powder, paprika, sea salt", brand: "Simply Organic Garlic Powder" },
      { q: 2, u: "tbsp", item: "avocado oil (or ¼ cup tallow to pan-fry)", brand: "Chosen Foods Avocado Oil" }
    ],
    steps: [
      "Heat oven to 425°F (or air fryer to 400°F). Line a sheet with parchment.",
      "Mix almond flour, Parmesan, garlic powder, paprika and salt in a shallow bowl.",
      "Dip each strip in egg, then press into the coating on both sides.",
      "Place on the sheet and brush or drizzle with avocado oil.",
      "Bake 18-20 minutes, flipping halfway (air fryer: 10-12 min). Internal temp: 165°F.",
      "Serve with homemade ranch or Primal Kitchen honey mustard."
    ],
    nutrition: { cal: 550, protein: 65, carbs: 5, fat: 28, fiber: 2, sugar: 1 },
    swaps: [
      { tag: "Vegetarian", text: "Use thick slices of extra-firm organic tofu (pressed) or cauliflower florets. Protein drops to ~22g." },
      { tag: "Nut-free", text: "Crush plain pork rinds (Epic) or Siete tortilla chips instead of almond flour." },
      { tag: "Dairy-free", text: "Skip Parmesan; add 2 tbsp nutritional yeast." },
      { tag: "Kid-friendly", text: "Cut into nugget-size pieces and bake 12-14 minutes." }
    ]
  },
  {
    id: "burger", title: "Smash Burgers & Tallow Fries", emoji: "🍔",
    keys: ["burger", "burgers", "cheeseburger", "hamburger", "fries", "french fries", "fast food", "mcdonalds", "in n out"],
    time: "45 min", serves: 4, unit: "burger + fries",
    tags: ["High protein", "No seed oils"],
    intro: "McDonald's fries were cooked in beef tallow until 1990. We're bringing it back - with 100% US grass-fed beef.",
    ingredients: [
      { q: 1.5, u: "lb", item: "grass-fed ground beef 85/15 (US-raised)", brand: "White Oak Pastures Ground Beef" },
      { q: 4, u: "slices", item: "real cheddar (not 'American cheese product')", brand: "Organic Valley Raw Sharp Cheddar" },
      { q: 4, u: "", item: "sourdough buns (or lettuce wraps)", brand: "local bakery sourdough buns" },
      { q: 2, u: "lb", item: "organic russet potatoes", brand: "organic russet potatoes" },
      { q: 1, u: "cup", item: "beef tallow for frying (you can strain & reuse)", brand: "Fatworks Grass-Fed Beef Tallow" },
      { q: 1, u: "tsp", item: "sea salt + pepper", brand: "Redmond Real Salt" },
      { q: 0, u: "", item: "Toppings: Primal Kitchen ketchup, onions, pickles, lettuce", brand: "Primal Kitchen Organic Unsweetened Ketchup" }
    ],
    steps: [
      "FRIES: Cut potatoes into ¼-inch sticks. Soak in cold water 30 min, then dry VERY well with a towel.",
      "Heat tallow in a heavy pot or cast iron to 325°F. Fry in batches 5 minutes until soft but pale. Remove.",
      "Raise heat to 375°F. Fry again 2-3 minutes until golden and crispy. Salt immediately.",
      "BURGERS: Divide beef into 8 loose balls (2 per burger). Don't overwork the meat.",
      "Heat a cast iron skillet until smoking hot. Place a ball, smash hard with a spatula into a thin patty. Salt & pepper.",
      "Cook 2 minutes until a dark crust forms. Flip, add cheese, cook 1 minute.",
      "Stack two patties on a toasted bun. Add toppings."
    ],
    nutrition: { cal: 935, protein: 50, carbs: 78, fat: 46, fiber: 7, sugar: 3 },
    swaps: [
      { tag: "Low-carb", text: "Lettuce-wrap the burger and swap fries for roasted sweet potato wedges. Saves ~60g carbs." },
      { tag: "Vegetarian", text: "Use a portobello cap or a homemade black bean patty; fries stay the same." },
      { tag: "Lighter fries", text: "Toss fries in 1 tbsp tallow and bake at 425°F for 35 min, flipping once." },
      { tag: "Dairy-free", text: "Skip cheese; add avocado slices." }
    ]
  },
  {
    id: "pizza", title: "2-Ingredient Dough Pizza", emoji: "🍕",
    keys: ["pizza", "pizza dough", "flatbread", "pepperoni pizza", "cheese pizza"],
    time: "30 min", serves: 4, unit: "serving (2 slices)",
    tags: ["Vegetarian", "High protein", "No seed oils"],
    intro: "Greek yogurt + flour = a chewy crust with 22g protein per serving and zero dough conditioners.",
    ingredients: [
      { q: 1.5, u: "cups", item: "einkorn or organic unbleached flour (+ more for dusting)", brand: "Jovial Einkorn All-Purpose Flour" },
      { q: 1.5, u: "tsp", item: "aluminum-free baking powder", brand: "Bob's Red Mill Baking Powder" },
      { q: 0.5, u: "tsp", item: "sea salt", brand: "Redmond Real Salt" },
      { q: 1, u: "cup", item: "plain whole-milk Greek yogurt", brand: "FAGE Total 5% Plain Greek Yogurt" },
      { q: 0.5, u: "cup", item: "marinara", brand: "Rao's Homemade Marinara Sauce" },
      { q: 8, u: "oz", item: "fresh mozzarella", brand: "Organic Valley Fresh Mozzarella" },
      { q: 1, u: "tbsp", item: "extra-virgin olive oil + fresh basil", brand: "Graza Drizzle Extra Virgin Olive Oil" }
    ],
    steps: [
      "Heat oven to 475°F with a sheet pan or pizza stone inside.",
      "Mix flour, baking powder and salt. Add yogurt and stir, then knead 1-2 minutes into a smooth ball.",
      "Roll out on parchment to a 12-inch circle. Brush with olive oil.",
      "Spread marinara, tear mozzarella on top.",
      "Slide parchment onto the hot pan. Bake 12-15 minutes until the crust is golden and cheese bubbles.",
      "Top with fresh basil and a drizzle of olive oil."
    ],
    nutrition: { cal: 435, protein: 22, carbs: 40, fat: 20, fiber: 2, sugar: 4 },
    swaps: [
      { tag: "Pepperoni", text: "Add Applegate Organic Uncured Pepperoni (no added nitrites except celery)." },
      { tag: "Gluten-free", text: "Use Bob's Red Mill 1-to-1 GF flour, or a Cappello's crust." },
      { tag: "Dairy-free", text: "Use coconut yogurt in the dough and skip or swap the cheese for cashew mozzarella." },
      { tag: "Veggie loaded", text: "Top with mushrooms, peppers, olives and arugula after baking." }
    ]
  },
  {
    id: "yogurt-ice-cream", title: "Greek Yogurt Protein Ice Cream", emoji: "🍨",
    keys: ["ice cream", "frozen yogurt", "froyo", "gelato", "frozen dessert", "nice cream", "dessert", "sweet"],
    time: "5 min + freeze", serves: 4, unit: "scoop (½ cup)",
    tags: ["Vegetarian", "Gluten-free", "High protein"],
    intro: "The swap: Greek yogurt instead of ice cream. Creamy, tangy, and 10g protein per scoop.",
    ingredients: [
      { q: 2, u: "cups", item: "plain whole-milk Greek yogurt", brand: "Maple Hill Grass-Fed Greek Yogurt" },
      { q: 0.25, u: "cup", item: "pure maple syrup or raw honey", brand: "Coombs Family Farms Organic Maple Syrup" },
      { q: 1, u: "tsp", item: "vanilla extract", brand: "Simply Organic Pure Vanilla Extract" },
      { q: 1, u: "cup", item: "frozen organic berries (or ¼ cup chocolate chips)", brand: "Cascadian Farm Organic Frozen Berries" }
    ],
    steps: [
      "Whisk yogurt, maple syrup and vanilla until smooth.",
      "Fold in berries (or chocolate chips).",
      "Spread in a loaf pan lined with parchment. Freeze 2-3 hours, stirring once at 1 hour.",
      "Let sit 10 minutes before scooping. (Ice cream maker? Churn 20 min for soft-serve.)"
    ],
    nutrition: { cal: 180, protein: 10, carbs: 22, fat: 5, fiber: 1, sugar: 19 },
    swaps: [
      { tag: "Nice cream", text: "Blend 3 frozen bananas + 2 tbsp milk + 1 tbsp cacao until creamy. Dairy-free & vegan." },
      { tag: "Dairy-free", text: "Use Cocojune or Culina coconut yogurt." },
      { tag: "Extra protein", text: "Blend in 1 scoop vanilla grass-fed whey (+6g protein/scoop)." },
      { tag: "Bark", text: "Spread thin, top with berries + chocolate, freeze 2 hrs, break into pieces." }
    ]
  },
  {
    id: "tacos", title: "Grass-Fed Beef Tacos", emoji: "🌮",
    keys: ["tacos", "taco", "taco tuesday", "mexican", "burrito", "taco bell", "nachos", "ground beef"],
    time: "20 min", serves: 4, unit: "serving (2 tacos)",
    tags: ["Gluten-free", "High protein", "No seed oils"],
    intro: "Taco seasoning packets hide maltodextrin, sugar and anti-caking agents. This homemade blend takes 30 seconds.",
    ingredients: [
      { q: 1, u: "lb", item: "grass-fed ground beef (US-raised)", brand: "US Wellness Meats Ground Beef" },
      { q: 1, u: "tbsp", item: "chili powder", brand: "Simply Organic Chili Powder" },
      { q: 1, u: "tsp", item: "each: cumin, garlic powder, onion powder, sea salt", brand: "Simply Organic Ground Cumin" },
      { q: 0.5, u: "tsp", item: "each: smoked paprika, oregano", brand: "Simply Organic Smoked Paprika" },
      { q: 8, u: "", item: "corn tortillas (corn, lime, water only)", brand: "Masienda Heirloom Corn Tortillas" },
      { q: 1, u: "", item: "ripe avocado", brand: "organic avocado" },
      { q: 0.5, u: "cup", item: "salsa + shredded lettuce, cilantro, lime", brand: "Siete Salsa" },
      { q: 0.5, u: "cup", item: "shredded raw cheddar (from block)", brand: "Organic Valley Raw Sharp Cheddar" }
    ],
    steps: [
      "Brown the beef in a cast iron skillet over medium-high, breaking it up, 6-7 minutes. No need to drain grass-fed fat - it's the good stuff.",
      "Stir in all the spices with ¼ cup water. Simmer 3 minutes until saucy.",
      "Warm tortillas in a dry skillet 30 seconds per side.",
      "Fill with beef, avocado, lettuce, salsa, cheese, cilantro and a squeeze of lime."
    ],
    nutrition: { cal: 495, protein: 28, carbs: 30, fat: 29, fiber: 6, sugar: 2 },
    swaps: [
      { tag: "Vegetarian", text: "Use 2 cans organic black beans (Eden Foods - BPA-free cans) with the same seasoning. ~16g protein." },
      { tag: "Low-carb", text: "Serve in butter lettuce cups or as a taco bowl over cauliflower rice." },
      { tag: "Dairy-free", text: "Skip cheese; double the avocado." },
      { tag: "Chicken", text: "Use 1 lb pasture-raised chicken thighs, diced." }
    ]
  },
  {
    id: "spaghetti", title: "Spaghetti & Grass-Fed Meatballs", emoji: "🍝",
    keys: ["spaghetti", "meatballs", "pasta", "spaghetti and meatballs", "italian", "bolognese", "dinner"],
    time: "40 min", serves: 4, unit: "serving",
    tags: ["High protein", "No seed oils"],
    intro: "Italian pasta + a no-sugar marinara + tender grass-fed meatballs.",
    ingredients: [
      { q: 1, u: "lb", item: "grass-fed ground beef", brand: "White Oak Pastures Ground Beef" },
      { q: 1, u: "", item: "pasture-raised egg", brand: "Vital Farms Pasture-Raised Eggs" },
      { q: 0.33, u: "cup", item: "grated Parmigiano-Reggiano", brand: "Parmigiano Reggiano DOP" },
      { q: 0.25, u: "cup", item: "almond flour (or sourdough breadcrumbs)", brand: "Bob's Red Mill Super-Fine Almond Flour" },
      { q: 2, u: "cloves", item: "garlic, minced + 1 tsp salt, 1 tsp Italian herbs", brand: "Simply Organic Italian Seasoning" },
      { q: 24, u: "oz", item: "marinara (1 jar)", brand: "Rao's Homemade Marinara Sauce" },
      { q: 8, u: "oz", item: "Italian spaghetti", brand: "Rustichella d'Abruzzo Spaghetti" }
    ],
    steps: [
      "Mix beef, egg, Parmesan, almond flour, garlic, salt and herbs with your hands - just until combined.",
      "Roll into 16 meatballs (about 1½ inches).",
      "Brown in a hot skillet with 1 tbsp olive oil or tallow, 5-6 minutes, turning.",
      "Pour in the marinara. Cover and simmer on low 15 minutes.",
      "Meanwhile cook spaghetti in salted water until al dente. Toss with a ladle of sauce.",
      "Serve meatballs on top with extra Parmesan and basil."
    ],
    nutrition: { cal: 675, protein: 36, carbs: 52, fat: 36, fiber: 4, sugar: 6 },
    swaps: [
      { tag: "Vegetarian", text: "Make lentil-mushroom 'meatballs' (1 cup cooked lentils + 1 cup chopped mushrooms + egg + Parmesan)." },
      { tag: "Gluten-free", text: "Jovial brown rice spaghetti or spaghetti squash." },
      { tag: "Lower carb", text: "Zucchini noodles, or half pasta / half zoodles." },
      { tag: "Hidden liver", text: "Mix in 2 oz grated grass-fed beef liver - massive nutrient boost, undetectable." }
    ]
  },
  {
    id: "banana-bread", title: "Maple Banana Bread", emoji: "🍌",
    keys: ["banana bread", "banana", "muffins", "quick bread", "breakfast bread", "snack"],
    time: "10 min prep · 55 min bake", serves: 10, unit: "slice",
    tags: ["Vegetarian", "No refined sugar", "No seed oils"],
    intro: "Most bakery banana bread is made with canola oil. This one uses butter (or coconut oil) and maple syrup.",
    ingredients: [
      { q: 3, u: "", item: "very ripe bananas, mashed", brand: "organic bananas" },
      { q: 2, u: "", item: "pasture-raised eggs", brand: "Vital Farms Pasture-Raised Eggs" },
      { q: 0.33, u: "cup", item: "melted butter or coconut oil", brand: "Kerrygold Unsalted Butter" },
      { q: 0.33, u: "cup", item: "pure maple syrup", brand: "Coombs Family Farms Organic Maple Syrup" },
      { q: 1, u: "tsp", item: "vanilla + 1 tsp cinnamon", brand: "Simply Organic Ceylon Cinnamon" },
      { q: 1.75, u: "cups", item: "einkorn all-purpose flour", brand: "Jovial Einkorn All-Purpose Flour" },
      { q: 1, u: "tsp", item: "baking soda + ½ tsp sea salt", brand: "Bob's Red Mill Baking Soda" }
    ],
    steps: [
      "Heat oven to 350°F. Line a loaf pan with parchment.",
      "Mash bananas. Whisk in eggs, melted butter, maple syrup, vanilla and cinnamon.",
      "Add flour, baking soda and salt. Fold until just combined.",
      "Pour into the pan (top with banana slices + walnuts if you like).",
      "Bake 50-60 minutes until a toothpick comes out clean. Cool 15 min before slicing."
    ],
    nutrition: { cal: 200, protein: 4, carbs: 31, fat: 8, fiber: 2, sugar: 11 },
    swaps: [
      { tag: "Gluten-free", text: "Use 2 cups almond flour + ¼ cup tapioca flour. Bake 45-50 min." },
      { tag: "Vegan", text: "Coconut oil + 2 flax eggs." },
      { tag: "Chocolate", text: "Fold in ½ cup Hu dark chocolate gems." },
      { tag: "Muffins", text: "Bake in 12 muffin cups (unbleached liners) for 20-22 minutes." }
    ]
  },
  {
    id: "mayo", title: "2-Minute Avocado Oil Mayo", emoji: "🥚",
    keys: ["mayo", "mayonnaise", "homemade mayo", "aioli", "sauce"],
    time: "2 min", serves: 16, unit: "tbsp",
    tags: ["Gluten-free", "Dairy-free", "No seed oils"],
    intro: "Store mayo is ~80% soybean oil. Homemade takes 2 minutes with an immersion blender.",
    ingredients: [
      { q: 1, u: "", item: "pasture-raised egg (room temp)", brand: "Vital Farms Pasture-Raised Eggs" },
      { q: 1, u: "cup", item: "avocado oil (or light-tasting olive oil)", brand: "Chosen Foods 100% Pure Avocado Oil" },
      { q: 1, u: "tbsp", item: "lemon juice or apple cider vinegar", brand: "Bragg Organic Apple Cider Vinegar" },
      { q: 1, u: "tsp", item: "Dijon mustard", brand: "Primal Kitchen Dijon Mustard" },
      { q: 0.5, u: "tsp", item: "sea salt", brand: "Redmond Real Salt" }
    ],
    steps: [
      "Put everything in a wide-mouth jar, in this order: egg, lemon, mustard, salt, oil.",
      "Let it settle 30 seconds so the egg sits at the bottom.",
      "Place an immersion blender all the way at the bottom. Turn on and hold still 10 seconds until it turns white.",
      "Slowly pull the blender up while blending until thick. Done!",
      "Keeps 1 week in the fridge."
    ],
    nutrition: { cal: 120, protein: 0, carbs: 0, fat: 14, fiber: 0, sugar: 0 },
    swaps: [
      { tag: "Garlic aioli", text: "Add 1-2 grated garlic cloves." },
      { tag: "Chipotle", text: "Add 1 chipotle pepper + 1 tsp adobo sauce." },
      { tag: "Egg-free", text: "Use 3 tbsp aquafaba (chickpea liquid) instead of the egg." }
    ]
  },
  {
    id: "ranch", title: "Clean Ranch Dressing", emoji: "🥗",
    keys: ["ranch", "ranch dressing", "dip", "dressing", "salad dressing"],
    time: "5 min", serves: 10, unit: "serving (2 tbsp)",
    tags: ["Gluten-free", "Vegetarian", "No seed oils"],
    intro: "No soybean oil, no MSG, no 'natural flavors'. Better than Hidden Valley.",
    ingredients: [
      { q: 0.5, u: "cup", item: "avocado oil mayo (homemade or Primal Kitchen)", brand: "Primal Kitchen Avocado Oil Mayo" },
      { q: 0.5, u: "cup", item: "plain whole-milk Greek yogurt or sour cream", brand: "FAGE Total 5% Plain Greek Yogurt" },
      { q: 0.25, u: "cup", item: "whole milk (to thin)", brand: "Maple Hill Grass-Fed Whole Milk" },
      { q: 1, u: "tbsp", item: "lemon juice", brand: "organic lemons" },
      { q: 1, u: "tbsp", item: "fresh dill + 1 tbsp chives + 1 tbsp parsley, minced", brand: "organic fresh herbs" },
      { q: 0.5, u: "tsp", item: "each: garlic powder, onion powder, salt, pepper", brand: "Simply Organic Garlic Powder" }
    ],
    steps: [
      "Whisk mayo, yogurt and milk until smooth.",
      "Stir in lemon, herbs and spices.",
      "Chill 30 minutes so the flavors meld. Thin with more milk for dressing, keep thick for dip."
    ],
    nutrition: { cal: 110, protein: 1, carbs: 1, fat: 12, fiber: 0, sugar: 1 },
    swaps: [
      { tag: "Dairy-free", text: "Use all mayo + unsweetened MALK almond milk." },
      { tag: "Higher protein", text: "Use all Greek yogurt (no mayo): 3g protein, 25 calories per serving." },
      { tag: "Spicy", text: "Add 1 tbsp Frank's RedHot (cayenne, vinegar, salt, garlic) for buffalo ranch." }
    ]
  },
  {
    id: "gummies", title: "Real-Juice Gummy Bears", emoji: "🐻",
    keys: ["gummies", "gummy bears", "gummy", "fruit snacks", "candy", "kids snacks", "sour candy", "jello"],
    time: "10 min + 30 min set", serves: 4, unit: "serving",
    tags: ["Gluten-free", "Dairy-free", "No dyes"],
    intro: "Colors from real fruit - not Red 40. Grass-fed gelatin adds 9g protein and supports gut lining.",
    ingredients: [
      { q: 1, u: "cup", item: "100% juice (tart cherry, pomegranate, or mango)", brand: "Lakewood Organic Tart Cherry Juice" },
      { q: 2, u: "tbsp", item: "raw honey (to taste)", brand: "Nature Nate's Raw Honey" },
      { q: 4, u: "tbsp", item: "grass-fed beef gelatin", brand: "Great Lakes Wellness Beef Gelatin" },
      { q: 1, u: "tbsp", item: "lemon juice (for 'sour')", brand: "organic lemons" }
    ],
    steps: [
      "Pour juice into a small pot. Sprinkle gelatin on top and let it 'bloom' 5 minutes (don't stir yet).",
      "Turn heat to low and whisk until gelatin dissolves completely - do NOT boil.",
      "Remove from heat. Stir in honey and lemon.",
      "Use a dropper to fill silicone gummy molds (or pour into a parchment-lined dish and cut into squares).",
      "Refrigerate 30 minutes. Pop out. Store in the fridge up to 1 week."
    ],
    nutrition: { cal: 100, protein: 9, carbs: 17, fat: 0, fiber: 0, sugar: 16 },
    swaps: [
      { tag: "Vegan", text: "Use 2 tsp agar-agar powder instead of gelatin; boil 2 minutes to activate." },
      { tag: "Sour gummies", text: "Toss set gummies in coconut sugar + ¼ tsp citric acid." },
      { tag: "Vitamin C", text: "Use fresh-squeezed orange juice." }
    ]
  },
  {
    id: "popcorn", title: "Stovetop Coconut Oil Popcorn", emoji: "🍿",
    keys: ["popcorn", "movie night", "salty snack", "snack"],
    time: "6 min", serves: 3, unit: "serving (~4 cups)",
    tags: ["Gluten-free", "Vegan option", "No seed oils"],
    intro: "Microwave bags have historically been lined with PFAS. Stovetop is faster than delivery and tastes like the movies.",
    ingredients: [
      { q: 3, u: "tbsp", item: "virgin coconut oil (or ghee)", brand: "Nutiva Organic Virgin Coconut Oil" },
      { q: 0.5, u: "cup", item: "organic popcorn kernels", brand: "Arrowhead Mills Organic Popcorn Kernels" },
      { q: 2, u: "tbsp", item: "melted grass-fed butter (optional)", brand: "Kerrygold Salted Butter" },
      { q: 0.75, u: "tsp", item: "fine sea salt", brand: "Redmond Real Salt" }
    ],
    steps: [
      "Add oil and 3 kernels to a large heavy pot with a lid. Heat on medium-high.",
      "When the 3 kernels pop, add the rest. Cover and remove from heat for 30 seconds (makes them all pop at once).",
      "Return to heat. Shake the pot every few seconds. Crack the lid to let steam escape.",
      "When popping slows to 2-3 seconds between pops, dump into a bowl.",
      "Toss with melted butter and fine salt."
    ],
    nutrition: { cal: 310, protein: 4, carbs: 25, fat: 22, fiber: 5, sugar: 0 },
    swaps: [
      { tag: "Vegan", text: "Skip butter; use coconut oil + nutritional yeast for 'cheesy' flavor." },
      { tag: "Kettle corn", text: "Add 2 tbsp coconut sugar with the kernels." },
      { tag: "Lighter", text: "Use 1½ tbsp oil and skip the butter: ~180 calories." }
    ]
  },
  {
    id: "hot-chocolate", title: "Real Hot Chocolate", emoji: "☕",
    keys: ["hot chocolate", "hot cocoa", "cocoa", "chocolate milk", "warm drink", "swiss miss"],
    time: "5 min", serves: 2, unit: "mug",
    tags: ["Vegetarian", "Gluten-free", "No seed oils"],
    intro: "Hot cocoa packets are corn syrup solids, hydrogenated oil and artificial flavor. This is real chocolate.",
    ingredients: [
      { q: 2, u: "cups", item: "whole grass-fed milk", brand: "Kalona SuperNatural Whole Milk" },
      { q: 2, u: "tbsp", item: "raw cacao powder", brand: "Navitas Organic Cacao Powder" },
      { q: 1.5, u: "tbsp", item: "pure maple syrup", brand: "Coombs Family Farms Organic Maple Syrup" },
      { q: 0.5, u: "tsp", item: "vanilla + pinch of sea salt", brand: "Simply Organic Pure Vanilla Extract" }
    ],
    steps: [
      "Whisk cacao and maple with 2 tbsp of the milk to form a paste.",
      "Add remaining milk. Heat over medium, whisking, until steaming (don't boil).",
      "Stir in vanilla and salt. Top with whipped grass-fed cream."
    ],
    nutrition: { cal: 200, protein: 9, carbs: 25, fat: 9, fiber: 2, sugar: 21 },
    swaps: [
      { tag: "Dairy-free", text: "Use MALK oat or almond milk (no oils)." },
      { tag: "Protein", text: "Blend in 1 scoop chocolate grass-fed whey or collagen." },
      { tag: "Mexican", text: "Add ¼ tsp cinnamon + a pinch of cayenne." }
    ]
  },
  {
    id: "fried-rice", title: "Better-Than-Takeout Fried Rice", emoji: "🍚",
    keys: ["fried rice", "chinese food", "takeout", "chinese", "stir fry", "panda express"],
    time: "20 min", serves: 4, unit: "serving",
    tags: ["Gluten-free", "High protein", "No seed oils"],
    intro: "Takeout fried rice is cooked in soybean oil with MSG-heavy sauces. Ghee + coconut aminos = same craveable flavor.",
    ingredients: [
      { q: 1, u: "lb", item: "pasture-raised chicken thighs, diced", brand: "White Oak Pastures Chicken Thighs" },
      { q: 2, u: "tbsp", item: "ghee or avocado oil", brand: "4th & Heart Grass-Fed Ghee" },
      { q: 3, u: "", item: "pasture-raised eggs, beaten", brand: "Vital Farms Pasture-Raised Eggs" },
      { q: 3, u: "cups", item: "cooked jasmine rice (day-old is best)", brand: "Lundberg Organic Jasmine Rice" },
      { q: 1, u: "cup", item: "frozen organic peas & carrots", brand: "Cascadian Farm Organic Peas and Carrots" },
      { q: 3, u: "tbsp", item: "coconut aminos (soy sauce swap)", brand: "Coconut Secret Coconut Aminos" },
      { q: 3, u: "", item: "green onions + 2 garlic cloves, minced", brand: "organic green onions" }
    ],
    steps: [
      "Heat 1 tbsp ghee in a large skillet or wok on high. Cook chicken with a pinch of salt 6-7 minutes until golden. Remove.",
      "Add remaining ghee. Scramble the eggs, then push to the side.",
      "Add garlic, white parts of green onion, and peas & carrots. Cook 2 minutes.",
      "Add the cold rice. Press it flat and let it sit 1 minute to crisp, then toss. Repeat twice.",
      "Return chicken. Add coconut aminos and toss. Top with green onion tops."
    ],
    nutrition: { cal: 450, protein: 32, carbs: 41, fat: 17, fiber: 2, sugar: 3 },
    swaps: [
      { tag: "Vegetarian", text: "Skip chicken; use 5 eggs + 1 block cubed organic tofu." },
      { tag: "Low-carb", text: "Use cauliflower rice (cook 3 min less)." },
      { tag: "Shrimp", text: "Use 1 lb wild-caught US Gulf shrimp; cook 2-3 minutes." },
      { tag: "Flavor note", text: "Toasted sesame oil IS a seed oil. A ½ tsp drizzle for flavor is your call - skip it for strict seed-oil-free." }
    ]
  },
  {
    id: "energy-bites", title: "No-Bake Protein Energy Bites", emoji: "⚡",
    keys: ["energy bites", "protein balls", "energy balls", "snack", "protein snack", "pre workout", "healthy snack"],
    time: "10 min", serves: 16, unit: "bite",
    tags: ["Vegetarian", "Gluten-free option", "No-bake"],
    intro: "Better than a granola bar - 6g protein each, no seed oils or protein isolates.",
    ingredients: [
      { q: 1, u: "cup", item: "organic rolled oats", brand: "One Degree Organic Sprouted Rolled Oats" },
      { q: 0.5, u: "cup", item: "natural peanut or almond butter", brand: "Crazy Richard's 100% Peanut Butter" },
      { q: 0.25, u: "cup", item: "raw honey", brand: "Nature Nate's Raw Honey" },
      { q: 0.5, u: "cup", item: "vanilla grass-fed whey (2 scoops)", brand: "Promix Grass-Fed Whey Protein" },
      { q: 0.33, u: "cup", item: "mini dark chocolate chips", brand: "Hu Kitchen Dark Chocolate Gems" },
      { q: 2, u: "tbsp", item: "ground flax or chia", brand: "Bob's Red Mill Organic Golden Flaxseed Meal" }
    ],
    steps: [
      "Stir everything together in a bowl until it forms a sticky dough. Too dry? Add a splash of milk. Too wet? More oats.",
      "Chill 15 minutes.",
      "Roll into 16 balls. Store in the fridge up to 1 week or freezer 3 months."
    ],
    nutrition: { cal: 120, protein: 6, carbs: 12, fat: 6, fiber: 2, sugar: 6 },
    swaps: [
      { tag: "Vegan", text: "Use maple syrup and Truvani plant protein." },
      { tag: "Nut-free", text: "Use sunflower seed butter (note: it's a seed, but whole-food - not refined oil)." },
      { tag: "No protein powder", text: "Use ½ cup more oats + 2 tbsp collagen." }
    ]
  },
  {
    id: "alfredo", title: "Creamy Chicken Alfredo", emoji: "🍲",
    keys: ["alfredo", "chicken alfredo", "fettuccine", "creamy pasta", "olive garden", "pasta"],
    time: "25 min", serves: 4, unit: "serving",
    tags: ["High protein", "No seed oils"],
    intro: "Jarred alfredo often uses soybean oil and gums. Real alfredo is butter, cream and Parmigiano.",
    ingredients: [
      { q: 8, u: "oz", item: "fettuccine", brand: "Rustichella d'Abruzzo Fettuccine" },
      { q: 1, u: "lb", item: "pasture-raised chicken breast", brand: "Pasturebird Chicken Breast" },
      { q: 3, u: "tbsp", item: "grass-fed butter", brand: "Kerrygold Salted Butter" },
      { q: 3, u: "cloves", item: "garlic, minced", brand: "organic garlic" },
      { q: 1, u: "cup", item: "grass-fed heavy cream", brand: "Organic Valley Heavy Whipping Cream" },
      { q: 1, u: "cup", item: "freshly grated Parmigiano-Reggiano", brand: "Parmigiano Reggiano DOP" }
    ],
    steps: [
      "Season chicken with salt & pepper. Cook in 1 tbsp butter in a skillet 6-7 min per side to 165°F. Rest, then slice.",
      "Cook fettuccine in salted water. Save 1 cup pasta water.",
      "In the same skillet melt remaining butter, add garlic 30 seconds.",
      "Add cream, simmer 3 minutes. Turn heat to low and whisk in Parmesan until smooth.",
      "Toss pasta in the sauce, loosen with pasta water. Top with chicken and black pepper."
    ],
    nutrition: { cal: 775, protein: 53, carbs: 45, fat: 42, fiber: 2, sugar: 3 },
    swaps: [
      { tag: "Lighter", text: "Use half cream + half whole milk and add 2 cups broccoli. ~620 calories." },
      { tag: "Vegetarian", text: "Skip chicken; add sautéed mushrooms + spinach. ~25g protein." },
      { tag: "Gluten-free", text: "Jovial brown rice fettuccine." },
      { tag: "High protein", text: "Blend ½ cup cottage cheese into the sauce (+7g protein)." }
    ]
  }
];
