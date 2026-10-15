/**
 * Catalogue data for Morello Studio. Product imagery lives in /public/home; the <Media>
 * component falls back gracefully if any asset is unavailable. Lookbook /
 * editorial imagery lives in /public/about.
 *
 * `images` holds every shot for a product (first = card / hero shot). Drop
 * more filenames in as photography arrives and the card hover-swap and PDP
 * gallery pick them up automatically.
 */
export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: number;
  drop: string;
  images: string[];
  sizes: string[];
  /** Sizes currently out of stock — rendered disabled, kept visible. */
  soldOut?: string[];
  badge?: "New in" | "Best seller" | "Last units";
  description: string;
  details: string[];
  /** Model reference, e.g. "Model is 183 cm and wears size M". */
  fit?: string;
  /** Slugs of the same piece in other colours — rendered as swatch links. */
  colorways?: string[];
};

const APPAREL = ["XS", "S", "M", "L", "XL", "XXL"];
const SHOES = ["40", "41", "42", "43", "44", "45"];

export const products: Product[] = [
  {
    id: "ark-01",
    slug: "sun-faded-box-tee",
    fit: "Model is 183 cm and wears size M",
    name: "Sun-Faded Box Tee",
    category: "Essentials",
    price: 70,
    drop: "Core",
    images: ["/home/5.jpg"],
    sizes: APPAREL,
    badge: "Best seller",
    description:
      "The core of the wardrobe. A boxy, heavyweight tee garment-dyed and sun-faded so no two pieces read exactly alike — it arrives already lived-in.",
    details: [
      "240 GSM heavyweight cotton jersey",
      "Garment-dyed, pre-shrunk",
      "Boxy cut, dropped shoulder",
      "Ribbed collar with interior taping",
    ],
  },
  {
    id: "ark-02",
    slug: "pinstripe-overshirt",
    fit: "Model is 185 cm and wears size L",
    name: "Pinstripe Overshirt",
    category: "Shirting",
    price: 145,
    drop: "Vol. 03",
    images: ["/home/2.jpg"],
    sizes: APPAREL,
    soldOut: ["XS"],
    badge: "New in",
    description:
      "A workwear silhouette cut from a suiting pinstripe — the overshirt that moves between site jacket and blazer without asking permission.",
    details: [
      "Brushed cotton-wool blend",
      "Corozo buttons",
      "Two chest patch pockets",
      "Relaxed fit — size down for tailored",
    ],
  },
  {
    id: "ark-03",
    slug: "drawcord-wide-trouser",
    fit: "Model is 183 cm and wears size M",
    name: "Drawcord Wide Trouser",
    category: "Bottoms",
    price: 150,
    drop: "Vol. 03",
    images: ["/home/3.jpg"],
    sizes: APPAREL,
    description:
      "A wide, straight leg that stacks clean over anything. Drawcord waist, deep pockets, and a drape that does the talking.",
    details: [
      "Midweight cotton twill",
      "Elasticated drawcord waist",
      "Wide straight leg",
      "Two rear welt pockets",
    ],
  },
  {
    id: "ark-04",
    slug: "folklore-knit-polo",
    fit: "Model is 180 cm and wears size M",
    name: "Folklore Knit Polo",
    category: "Knitwear",
    price: 165,
    drop: "Vol. 02",
    images: ["/home/1.jpg"],
    sizes: ["S", "M", "L", "XL"],
    soldOut: ["S"],
    badge: "Last units",
    description:
      "Jacquard-knit polo pulling motifs from folk textiles — the loudest quiet piece in the drop. Vol. 02 archive; when it's gone, it's gone.",
    details: [
      "Merino-blend jacquard knit",
      "Open placket, ribbed collar",
      "Regular fit",
      "Hand wash cold",
    ],
  },
  {
    id: "ark-05",
    slug: "replica-low-sneaker",
    fit: "True to size — model wears EU 43",
    name: "Replica Low Sneaker",
    category: "Footwear",
    price: 220,
    drop: "Vol. 03",
    images: ["/home/4.jpg"],
    sizes: SHOES,
    soldOut: ["45"],
    description:
      "A low-profile court shoe stripped of branding. Full-grain leather upper, gum sole, and nothing else to say.",
    details: [
      "Full-grain leather upper",
      "Gum rubber cupsole",
      "Cotton laces, waxed spare included",
      "Made in Portugal",
    ],
  },
  {
    id: "ark-06",
    slug: "relaxed-selvage-denim",
    fit: "Model is 185 cm and wears size L",
    name: "Relaxed Selvage Denim",
    category: "Denim",
    price: 160,
    drop: "Vol. 03",
    images: ["/home/red.jpg"],
    sizes: APPAREL,
    description:
      "13.5oz selvage denim in a relaxed straight cut. Raw, unwashed — break it in yourself and let it record where you've been.",
    details: [
      "13.5oz Japanese selvage denim",
      "Raw / unwashed",
      "Relaxed straight leg",
      "Chain-stitched hem",
    ],
  },
  {
    id: "ark-07",
    slug: "saffron-fitted-tee",
    fit: "Model is 180 cm and wears size M",
    colorways: ["cornflower-fitted-tee"],
    name: "Saffron Fitted Tee",
    category: "Essentials",
    price: 75,
    drop: "Vol. 03",
    images: ["/home/tee1.jpg"],
    sizes: APPAREL,
    badge: "New in",
    description:
      "The fitted counterpart to the box tee, dyed a deep saffron. Cut close through the body with a slightly longer sleeve.",
    details: [
      "200 GSM combed cotton",
      "Fitted cut, set-in sleeve",
      "Garment-dyed saffron",
      "Pre-shrunk",
    ],
  },
  {
    id: "ark-08",
    slug: "cornflower-fitted-tee",
    fit: "Model is 180 cm and wears size M",
    colorways: ["saffron-fitted-tee"],
    name: "Cornflower Fitted Tee",
    category: "Essentials",
    price: 75,
    drop: "Vol. 03",
    images: ["/home/tee2.jpg"],
    sizes: APPAREL,
    badge: "New in",
    description:
      "Same fitted block, dyed cornflower blue. Built to hold its shape and its colour through seasons of wear.",
    details: [
      "200 GSM combed cotton",
      "Fitted cut, set-in sleeve",
      "Garment-dyed cornflower",
      "Pre-shrunk",
    ],
  },
  {
    id: "ark-09",
    slug: "atelier-striped-long-sleeve",
    fit: "Model is 183 cm and wears size L",
    colorways: ["crimson-mariner-long-sleeve", "breton-striped-long-sleeve"],
    name: "Atelier Striped Long Sleeve",
    category: "Long Sleeves",
    price: 95,
    drop: "Vol. 03",
    images: ["/home/longsleeve.jpg"],
    sizes: APPAREL,
    description:
      "A painter's stripe on a heavyweight long sleeve — the studio uniform, cut roomy enough to work in.",
    details: [
      "220 GSM cotton jersey",
      "Yarn-dyed stripe",
      "Relaxed fit, ribbed cuffs",
      "Reinforced shoulder seams",
    ],
  },
  {
    id: "ark-10",
    slug: "crimson-mariner-long-sleeve",
    fit: "Model is 183 cm and wears size L",
    colorways: ["atelier-striped-long-sleeve", "breton-striped-long-sleeve"],
    name: "Crimson Mariner Long Sleeve",
    category: "Long Sleeves",
    price: 95,
    drop: "Vol. 03",
    images: ["/home/longsleeve1.jpg"],
    sizes: APPAREL,
    soldOut: ["XXL"],
    description:
      "Breton codes, turned up. A crimson mariner stripe on the same heavyweight block as the Atelier.",
    details: [
      "220 GSM cotton jersey",
      "Yarn-dyed crimson stripe",
      "Relaxed fit, ribbed cuffs",
      "Boat neck collar",
    ],
  },
  {
    id: "ark-11",
    slug: "breton-striped-long-sleeve",
    fit: "Model is 183 cm and wears size L",
    colorways: ["atelier-striped-long-sleeve", "crimson-mariner-long-sleeve"],
    name: "Breton Striped Long Sleeve",
    category: "Long Sleeves",
    price: 95,
    drop: "Vol. 03",
    images: ["/home/longsleeve2.jpg"],
    sizes: APPAREL,
    description:
      "The classic navy Breton, done properly: tight stripe, heavy jersey, a collar that sits right under anything.",
    details: [
      "220 GSM cotton jersey",
      "Yarn-dyed navy stripe",
      "Relaxed fit, ribbed cuffs",
      "Boat neck collar",
    ],
  },
  {
    id: "ark-13",
    slug: "mansion-banquet-long-sleeve",
    fit: "Model is 185 cm and wears size L",
    colorways: [
      "out-of-office-long-sleeve",
      "sophisticated-pleasure-long-sleeve",
    ],
    name: "Mansion Banquet Long Sleeve",
    category: "Graphics",
    price: 110,
    drop: "Vol. 03",
    images: ["/home/graphhic1.png"],
    sizes: APPAREL,
    badge: "New in",
    description:
      "The Morello Mansion back print — a banquet table set for people who don't like resorts. Washed bone jersey, printed and numbered in Kathmandu.",
    details: [
      "240 GSM garment-washed cotton jersey",
      "Water-based back print",
      "Boxy fit, dropped shoulder",
      "Mansion 2026 — Kathmandu, Nepal",
    ],
  },
  {
    id: "ark-14",
    slug: "out-of-office-long-sleeve",
    fit: "Model is 185 cm and wears size L",
    colorways: [
      "mansion-banquet-long-sleeve",
      "sophisticated-pleasure-long-sleeve",
    ],
    name: "Out of Office Long Sleeve",
    category: "Graphics",
    price: 110,
    drop: "Vol. 03",
    images: ["/home/graphic2.png"],
    sizes: APPAREL,
    badge: "New in",
    description:
      "This tee is my out of office reply. Margarita-hour back print on a washed indigo body — check in, tune out.",
    details: [
      "240 GSM garment-washed cotton jersey",
      "Acid-washed indigo dye",
      "Water-based back print",
      "Boxy fit, dropped shoulder",
    ],
  },
  {
    id: "ark-15",
    slug: "sophisticated-pleasure-long-sleeve",
    fit: "Model is 185 cm and wears size L",
    colorways: ["mansion-banquet-long-sleeve", "out-of-office-long-sleeve"],
    name: "Sophisticated Pleasure Long Sleeve",
    category: "Graphics",
    price: 110,
    drop: "Vol. 03",
    images: ["/home/graphic3.png"],
    sizes: APPAREL,
    soldOut: ["XS"],
    description:
      "Two bottles, one sentiment. Hand-drawn still-life back print on deep navy — sophisticated pleasure, worn loud.",
    details: [
      "240 GSM garment-washed cotton jersey",
      "Deep navy garment dye",
      "Water-based back print",
      "Boxy fit, dropped shoulder",
    ],
  },
  {
    id: "ark-12",
    slug: "drawcord-linen-trouser",
    fit: "Model is 183 cm and wears size M",
    name: "Drawcord Linen Trouser",
    category: "Bottoms",
    price: 130,
    drop: "Vol. 03",
    images: ["/home/linenpants.jpg"],
    sizes: APPAREL,
    badge: "New in",
    description:
      "The summer answer to the wide trouser. European linen with the same drawcord waist and an easy tapered leg.",
    details: [
      "100% European flax linen",
      "Elasticated drawcord waist",
      "Relaxed taper",
      "Side seam pockets",
    ],
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

/** Same-category pieces first, then the rest of the drop, capped at `limit`. */
export function relatedProducts(product: Product, limit = 4): Product[] {
  const same = products.filter(
    (p) => p.id !== product.id && p.category === product.category,
  );
  const rest = products.filter(
    (p) => p.id !== product.id && p.category !== product.category,
  );
  return [...same, ...rest].slice(0, limit);
}

export function formatPrice(n: number): string {
  return `$${n}`;
}

export type SizeGuide = {
  columns: string[];
  rows: string[][];
  note: string;
};

const TOPS_GUIDE: SizeGuide = {
  columns: ["Size", "Chest (cm)", "Length (cm)", "Sleeve (cm)"],
  rows: [
    ["XS", "102", "66", "58"],
    ["S", "108", "68", "60"],
    ["M", "114", "70", "62"],
    ["L", "120", "72", "64"],
    ["XL", "126", "74", "66"],
    ["XXL", "132", "76", "68"],
  ],
  note: "Garments measured flat across the chest. Cuts run relaxed — take your usual size, or size down for a closer fit.",
};

const BOTTOMS_GUIDE: SizeGuide = {
  columns: ["Size", "Waist (cm)", "Hip (cm)", "Inseam (cm)"],
  rows: [
    ["XS", "70", "104", "74"],
    ["S", "74", "108", "75"],
    ["M", "78", "112", "76"],
    ["L", "82", "116", "77"],
    ["XL", "86", "120", "78"],
    ["XXL", "90", "124", "79"],
  ],
  note: "Waist measured relaxed — the drawcord pulls in a further 6 cm. Hems are left long enough to stack or crop.",
};

const FOOTWEAR_GUIDE: SizeGuide = {
  columns: ["EU", "Insole (cm)", "US"],
  rows: [
    ["40", "25.5", "7"],
    ["41", "26.2", "8"],
    ["42", "26.8", "8.5"],
    ["43", "27.5", "9.5"],
    ["44", "28.1", "10"],
    ["45", "28.8", "11"],
  ],
  note: "True to size on a standard-width foot. Between sizes, take the larger — the leather does not stretch much.",
};

export function sizeGuideFor(product: Product): SizeGuide {
  if (product.category === "Footwear") return FOOTWEAR_GUIDE;
  if (product.category === "Bottoms" || product.category === "Denim")
    return BOTTOMS_GUIDE;
  return TOPS_GUIDE;
}

export const lookbook = [
  {
    id: "lb-01",
    title: "Concrete Hymns",
    tag: "Editorial 01",
    image: "/about/ab1.jpg",
  },
  {
    id: "lb-02",
    title: "Off Hours",
    tag: "Editorial 02",
    image: "/about/ab2.jpg",
  },
  {
    id: "lb-03",
    title: "Static Noise",
    tag: "Editorial 03",
    image: "/about/ab3.jpg",
  },
  {
    id: "lb-04",
    title: "Quiet Riot",
    tag: "Editorial 04",
    image: "/about/ab4.jpg",
  },
  {
    id: "lb-05",
    title: "Common Thread",
    tag: "Editorial 05",
    image: "/about/ab5.jpg",
  },
];
