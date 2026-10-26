# Non-Toxic Living

**Like Yuka, but better: it doesn't just grade what's bad. It tells you what to buy instead.**

Non-Toxic Living is an app for people who eat clean, avoid seed oils and synthetic dyes, and want real food from real farmers. Search anything you're craving or shopping for and get:

- **Clean brands to buy.** Each brand gets a 0–100 score (Excellent / Good / Poor / Bad), the oil it uses, and links to Amazon, Thrive Market, Target, Walmart, Whole Foods and nearby stores. Each category also lists the common brands to skip. When nothing seed-oil-free exists, it shows the "least bad" option and explains why.
- **Clean recipes.** 20 recipes, including cookies, rice crispy treats, brownies, pizza, tacos, chicken tenders, smash burgers with tallow fries, Greek-yogurt ice cream and gummy bears. Each one has exact ingredients and a clean brand for every item, with buy links. You also get easy numbered steps, a servings scaler, nutrition per serving (calories, **protein**, carbs, fat, fiber, sugar), and swaps (vegetarian, vegan, dairy-free, gluten-free, higher-protein…).
- **Label Check.** Scan a barcode with your phone camera (works on iPhone and Android) or type the number. It looks the product up in [Open Food Facts](https://world.openfoodfacts.org), then Open Beauty Facts for toothpaste, deodorant and the like. You can also paste any ingredient list. The app flags seed oils, synthetic dyes, preservatives, artificial sweeteners and emulsifiers, notes how the EU treats each one, and says how much of a seed oil is in the product based on where it sits in the list. Then it suggests a cleaner alternative.
- **Shop Local.** Enter a ZIP code or use your location to find farmers markets, farm stands, butchers and health food stores near you (from OpenStreetMap). There are also one-tap map searches for grass-fed beef farms, raw milk, pasture-raised eggs, CSAs, U-pick and local honey. It links trusted directories (USDA Local Food Directories, LocalHarvest, Eatwild, American Grassfed Association, Real Milk Finder) and has a guide to buying 100% US grass-fed beef straight from a farmer.
- **Clothing & Home.** 100% cotton, wool, linen and silk for t-shirts, jeans, underwear, socks, activewear, pajamas, sheets, blankets, towels, mattresses and baby clothes. Lines that blend in synthetics are flagged honestly. Includes a fiber cheat sheet.
- **Diet filters.** Pick gluten-free, vegetarian, vegan, dairy-free, pescatarian, keto or paleo under the search bar, on Recipes, on Label Check or in Settings (one choice applies everywhere). Recipes are sorted into "fits", "works with a swap" and hidden. Brands are tagged when we can tell they fit or don't. Scanned products are checked against your diet using the ingredients, Open Food Facts allergen tags and, for keto, net carbs.
- **Shopping list.** Add any brand or every ingredient in a recipe with one tap, then check items off or share the list.
- **About Us.** Covers US vs. EU food rules, Red 40 and kids, fluoride, polyester and fertility, and why we built this. Every claim has a numbered source.
- **Optional AI for any food.** Paste your own Anthropic API key in Settings to generate a clean recipe or brand guide for anything that isn't in the built-in guide.

It's installable on your phone (Add to Home Screen) and the built-in guide works offline.

## Run it

No build step. It's plain HTML, CSS and JavaScript.

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

To put it online for free: on GitHub go to **Settings → Pages**, then set **Source: Deploy from a branch** and pick this branch with `/ (root)`.

## Edit the content

All the content lives in plain data files, so you can add brands and recipes without touching the app code:

| File | What's in it |
|---|---|
| `js/data/products.js` | Grocery & home product categories: brand picks, scores, brands to avoid, "least bad" notes |
| `js/data/recipes.js` | Recipes: ingredients (numbers so servings can scale), brand picks, steps, nutrition, swaps |
| `js/data/clothing.js` | Natural-fiber clothing & home textile brands, plus the fiber cheat sheet |
| `js/data/additives.js` | The ingredient red-flag list used by Label Check |
| `js/data/diets.js` | Diet rules: which ingredients break each diet, and phrases that are fine ("almond flour", "peanut butter") |
| `js/vendor/zxing.min.js` | Barcode reader ([ZXing](https://github.com/zxing-js/library), Apache-2.0) for phones without a built-in one, like iPhone |
| `index.html` | Page layout, including the About Us page and its sources |

Buy links are generated automatically from the brand and product name, so they don't go stale.

> Brand formulas change. The app always reminds people to read the label. This is education, not medical advice.
