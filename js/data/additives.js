/*
 * Ingredient red-flag database used by the Label Check scanner.
 * sev: "high" | "moderate" | "low"   ·   type groups results in the UI.
 * re: regex (case-insensitive) matched against the ingredient list.
 * eu: short note on how Europe treats it (when it differs from the US).
 */
window.NTL_ADDITIVES = [
  // ---------- Seed / industrial oils ----------
  { name: "Soybean oil", type: "Seed oil", sev: "high", re: "soy(bean)?\\s*oil", why: "Most common US seed oil. Very high in omega-6 linoleic acid; refined with hexane; oxidizes when heated." },
  { name: "Canola / rapeseed oil", type: "Seed oil", sev: "high", re: "canola|rapeseed", why: "Industrially refined, deodorized & bleached. Often from GMO crops." },
  { name: "Corn oil", type: "Seed oil", sev: "high", re: "corn\\s*oil", why: "Very high omega-6, refined, usually GMO corn." },
  { name: "Cottonseed oil", type: "Seed oil", sev: "high", re: "cottonseed", why: "A by-product of cotton - one of the most heavily pesticide-treated crops in the world. Highly refined." },
  { name: "Vegetable oil", type: "Seed oil", sev: "high", re: "vegetable\\s*oil|vegetable\\s*shortening", why: "Vague term for a seed-oil blend (soy, canola, corn, cottonseed)." },
  { name: "Grapeseed oil", type: "Seed oil", sev: "high", re: "grape\\s*seed\\s*oil|grapeseed", why: "~70% omega-6; solvent-extracted." },
  { name: "Rice bran oil", type: "Seed oil", sev: "moderate", re: "rice\\s*bran\\s*oil", why: "Refined, higher omega-6." },
  { name: "Sunflower / safflower oil", type: "Seed oil", sev: "moderate", re: "sunflower\\s*oil|safflower|sunflower\\s*seed\\s*oil", why: "Seed oil. 'High-oleic' versions are more heat-stable and lower in omega-6 - the 'least bad' seed oil." },
  { name: "Partially hydrogenated oil (trans fat)", type: "Seed oil", sev: "high", re: "partially\\s*hydrogenated", why: "Artificial trans fat. FDA removed it from GRAS status (2015, effective 2018) - should not appear in new products." },
  { name: "Hydrogenated / interesterified oil", type: "Seed oil", sev: "high", re: "(fully\\s*)?hydrogenated|interesterified", why: "Chemically hardened seed oils used in shortening & spreads." },
  { name: "Sesame oil", type: "Seed oil", sev: "low", re: "sesame\\s*oil", why: "A seed oil, but usually used in small amounts for flavor." },
  { name: "Palm oil", type: "Processed fat", sev: "low", re: "palm\\s*(kernel\\s*)?oil|palm\\s*fruit\\s*oil", why: "Not a seed oil and heat-stable, but heavily processed in most packaged foods and linked to deforestation." },

  // ---------- Synthetic dyes ----------
  { name: "Red 40 (Allura Red)", type: "Artificial dye", sev: "high", re: "red\\s*(no\\.?\\s*)?40|allura|e129", why: "Petroleum-based dye. Linked to hyperactivity in some children (Southampton study, Lancet 2007; California OEHHA 2021).", eu: "EU requires a warning: 'may have an adverse effect on activity and attention in children'." },
  { name: "Red 3 (Erythrosine)", type: "Artificial dye", sev: "high", re: "red\\s*(no\\.?\\s*)?3\\b|erythrosine|e127", why: "Caused thyroid tumors in male rats. FDA revoked its food use in January 2025 (deadline Jan 2027) - 35 years after banning it from cosmetics.", eu: "Restricted to a few uses (e.g., cocktail cherries)." },
  { name: "Yellow 5 (Tartrazine)", type: "Artificial dye", sev: "high", re: "yellow\\s*(no\\.?\\s*)?5|tartrazine|e102", why: "Linked to hyperactivity and allergic-type reactions in sensitive people.", eu: "Requires the same child-activity warning label." },
  { name: "Yellow 6 (Sunset Yellow)", type: "Artificial dye", sev: "high", re: "yellow\\s*(no\\.?\\s*)?6|sunset\\s*yellow|e110", why: "Part of the dye mix studied for hyperactivity.", eu: "Requires the child-activity warning label." },
  { name: "Blue 1 / Blue 2", type: "Artificial dye", sev: "moderate", re: "blue\\s*(no\\.?\\s*)?[12]\\b|brilliant\\s*blue|indigo\\s*carmine|e133|e132", why: "Synthetic petroleum dyes; included in California's 2021 neurobehavioral assessment." },
  { name: "Green 3", type: "Artificial dye", sev: "moderate", re: "green\\s*(no\\.?\\s*)?3", why: "Synthetic dye not permitted as a food color in the EU.", eu: "Not approved in the EU." },
  { name: "Citrus Red 2", type: "Artificial dye", sev: "high", re: "citrus\\s*red", why: "Used to color orange peels. IARC: possibly carcinogenic (Group 2B)." },
  { name: "Caramel color", type: "Artificial dye", sev: "moderate", re: "caramel\\s*colou?r", why: "Class III/IV caramel can contain 4-MEI, listed under California Prop 65 as a carcinogen." },
  { name: "Titanium dioxide", type: "Artificial dye", sev: "high", re: "titanium\\s*dioxide|e171", why: "Whitening agent. EFSA (2021) could not rule out genotoxicity.", eu: "Banned as a food additive in the EU since 2022." },
  { name: "Artificial color (unspecified)", type: "Artificial dye", sev: "moderate", re: "artificial\\s*colou?rs?|colou?r\\s*added|\\blake\\b", why: "Synthetic dyes or 'lakes' (dyes bound to aluminum)." },

  // ---------- Preservatives ----------
  { name: "Potassium bromate", type: "Preservative / dough agent", sev: "high", re: "bromate", why: "IARC Group 2B possible carcinogen. Banned from food in California starting 2027.", eu: "Banned in the EU, UK, Canada and many others." },
  { name: "Azodicarbonamide (ADA)", type: "Preservative / dough agent", sev: "high", re: "azodicarbonamide", why: "'Yoga mat chemical' - also used to make foamed plastics. Breaks down into semicarbazide.", eu: "Not permitted in food in the EU." },
  { name: "Brominated vegetable oil (BVO)", type: "Preservative / dough agent", sev: "high", re: "brominated", why: "FDA revoked its use in 2024 after studies showed bromine buildup and thyroid effects.", eu: "Never approved in the EU." },
  { name: "BHA", type: "Preservative", sev: "high", re: "\\bbha\\b|butylated\\s*hydroxyanisole", why: "Listed by California Prop 65 as known to cause cancer; IARC Group 2B." },
  { name: "BHT", type: "Preservative", sev: "moderate", re: "\\bbht\\b|butylated\\s*hydroxytoluene", why: "Synthetic antioxidant; mixed animal evidence. Often found in cereals & cereal liners." },
  { name: "TBHQ", type: "Preservative", sev: "moderate", re: "tbhq|tert-?butylhydroquinone", why: "Petroleum-derived preservative used in fried foods & snacks; animal studies suggest immune effects." },
  { name: "Propylparaben", type: "Preservative", sev: "high", re: "propyl\\s*paraben", why: "Endocrine disruptor. Banned from food in California starting 2027." },
  { name: "Sodium nitrite / nitrate", type: "Preservative", sev: "moderate", re: "sodium\\s*nitr[ia]te|potassium\\s*nitr[ia]te", why: "Forms nitrosamines when heated. WHO/IARC classifies processed meat as Group 1 carcinogen." },
  { name: "Sodium benzoate", type: "Preservative", sev: "moderate", re: "sodium\\s*benzoate|potassium\\s*benzoate", why: "Can form benzene with vitamin C (ascorbic acid); part of the Southampton hyperactivity study mix." },
  { name: "Calcium propionate", type: "Preservative", sev: "low", re: "calcium\\s*propionate", why: "Bread preservative; small studies suggest metabolic effects." },
  { name: "Potassium sorbate", type: "Preservative", sev: "low", re: "potassium\\s*sorbate|sorbic\\s*acid", why: "Generally low concern - a sign of a shelf-stable processed product." },

  // ---------- Sweeteners ----------
  { name: "High-fructose corn syrup", type: "Sweetener", sev: "high", re: "high[-\\s]*fructose|hfcs|glucose[-\\s]*fructose", why: "Cheap industrial sweetener; associated with fatty liver & metabolic disease in high intake." },
  { name: "Corn syrup", type: "Sweetener", sev: "moderate", re: "(?<!fructose\\s)corn\\s*syrup", why: "Refined sugar from (mostly GMO) corn." },
  { name: "Aspartame", type: "Sweetener", sev: "high", re: "aspartame", why: "IARC classified as 'possibly carcinogenic to humans' (Group 2B) in 2023." },
  { name: "Sucralose (Splenda)", type: "Sweetener", sev: "moderate", re: "sucralose", why: "A 2023 study found a sucralose by-product (sucralose-6-acetate) was genotoxic in lab tests; may alter gut bacteria." },
  { name: "Acesulfame potassium", type: "Sweetener", sev: "moderate", re: "acesulfame", why: "Artificial sweetener; limited long-term human data." },
  { name: "Saccharin", type: "Sweetener", sev: "moderate", re: "saccharin", why: "Artificial sweetener." },
  { name: "Erythritol", type: "Sweetener", sev: "moderate", re: "erythritol", why: "Cleveland Clinic study (Nature Medicine, 2023) linked higher blood erythritol to heart attack & stroke risk." },
  { name: "Maltodextrin", type: "Sweetener", sev: "low", re: "maltodextrin", why: "Ultra-processed filler with a very high glycemic index." },

  // ---------- Emulsifiers, gums, other ----------
  { name: "Carrageenan", type: "Emulsifier / thickener", sev: "moderate", re: "carrageenan", why: "Linked to gut inflammation in animal studies." },
  { name: "Polysorbate 80", type: "Emulsifier / thickener", sev: "moderate", re: "polysorbate", why: "Emulsifier shown to disrupt gut microbiome in mouse studies." },
  { name: "Carboxymethylcellulose", type: "Emulsifier / thickener", sev: "moderate", re: "carboxymethyl\\s*cellulose|cellulose\\s*gum", why: "A 2022 human feeding study (Gastroenterology) found it altered gut bacteria." },
  { name: "Mono- & diglycerides", type: "Emulsifier / thickener", sev: "low", re: "mono-?\\s*and\\s*diglycerides|mono\\s*&\\s*diglycerides|monoglycerides", why: "Made from (often seed) oils; can contain small amounts of trans fat not listed on the label." },
  { name: "DATEM", type: "Emulsifier / thickener", sev: "low", re: "datem", why: "Dough conditioner used in industrial bread." },
  { name: "PGPR", type: "Emulsifier / thickener", sev: "low", re: "pgpr|polyglycerol\\s*polyricinoleate", why: "Cheap emulsifier used to reduce cocoa butter in chocolate." },
  { name: "Soy lecithin", type: "Emulsifier / thickener", sev: "low", re: "soy\\s*lecithin", why: "Usually low concern; solvent-extracted from GMO soy." },
  { name: "Artificial flavor", type: "Flavor", sev: "moderate", re: "artificial\\s*flavou?r", why: "Lab-made flavor compounds; a marker of ultra-processing." },
  { name: "'Natural flavors'", type: "Flavor", sev: "low", re: "natural\\s*flavou?rs?", why: "Can legally contain dozens of undisclosed chemicals, solvents and carriers." },
  { name: "MSG / yeast extract", type: "Flavor", sev: "low", re: "monosodium\\s*glutamate|\\bmsg\\b|yeast\\s*extract|autolyzed|hydrolyzed\\s*\\w+\\s*protein", why: "Flavor enhancers designed to make food hyper-palatable. Some people report sensitivity." },
  { name: "Modified food starch", type: "Filler", sev: "low", re: "modified\\s*(food\\s*|corn\\s*)?starch", why: "Chemically altered starch - often from GMO corn." },
  { name: "Phosphate additives", type: "Filler", sev: "low", re: "phosphoric\\s*acid|sodium\\s*phosphate|dipotassium\\s*phosphate|sodium\\s*aluminum\\s*phosphate", why: "High phosphate intake from additives may stress kidneys and bones; sodium aluminum phosphate adds aluminum." }
];
