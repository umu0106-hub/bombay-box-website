/**
 * BOMBAY BOX · MENU DATA
 * Single source of truth. All prices and copy from official menu.
 */

export type Category =
  | 'bowl'
  | 'tiffin'
  | 'street'
  | 'grill'
  | 'biryani'
  | 'snacks'
  | 'drinks'

export type BadgeKey =
  | 'popular'
  | 'new'
  | 'chef'
  | 'veg'
  | 'nonveg'
  | 'staff'

export interface MenuItem {
  id: string
  category: Category
  name: string
  description: string
  price: number
  emoji?: string
  badges?: BadgeKey[]
  servedWith?: string
}

export interface BowlOption {
  id: string
  name: string
  description: string
  upcharge: number
  included?: boolean
}

export interface CategoryMeta {
  key: Category
  number: string
  title: string
  emoji: string
  appetiteCopy: string
  subLabel?: string
  note?: string
  bandColor: string
}

/* -------------------------------------------------------------------------- */
/*  Category metadata                                                          */
/* -------------------------------------------------------------------------- */

export const categories: CategoryMeta[] = [
  {
    key: 'bowl',
    number: '01',
    title: 'Build Your Bowl',
    emoji: '🥣',
    appetiteCopy:
      'Your bowl. Your rules. Start with fluffy basmati, pick your protein, layer on two bold sauces, pile on the toppings. Every combo hits.',
    bandColor: '#FF6B1A',
  },
  {
    key: 'tiffin',
    number: '02',
    title: 'Daily Tiffin Box',
    emoji: '🍱',
    appetiteCopy:
      "The whole meal in one box. Curries change every day — whatever the chef is making fresh, that's what you get. Show up, trust the kitchen, never be disappointed.",
    subLabel: "Chef's Selection",
    note: "Ask staff for today's selection · Curries change daily · Limited quantity",
    bandColor: '#FFAC30',
  },
  {
    key: 'street',
    number: '03',
    title: 'Street Fusion',
    emoji: '🌮',
    appetiteCopy:
      "Mumbai street energy meets global flavors. These aren't fusion experiments — they're combinations that just work.",
    subLabel: 'New & Trending',
    bandColor: '#C0392B',
  },
  {
    key: 'grill',
    number: '04',
    title: 'Grill & Tandoori',
    emoji: '🔥',
    appetiteCopy:
      "The tandoor runs hot all day. Everything that comes out of it has that unmistakable char, smoke, and depth you can't get anywhere else.",
    bandColor: '#8B3A1A',
  },
  {
    key: 'biryani',
    number: '05',
    title: 'Biryani',
    emoji: '🍚',
    appetiteCopy:
      "Slow-cooked dum biryani. The rice absorbs everything — every spice, every drop of flavor. This isn't a side. It's the main event.",
    bandColor: '#B8861B',
  },
  {
    key: 'snacks',
    number: '06',
    title: 'Snacks',
    emoji: '🥟',
    appetiteCopy: 'Quick bites with big personality.',
    bandColor: '#6A4A22',
  },
  {
    key: 'drinks',
    number: '07',
    title: 'Drinks',
    emoji: '🥤',
    appetiteCopy: 'Wash it down right.',
    bandColor: '#5A7A6E',
  },
]

/* -------------------------------------------------------------------------- */
/*  Bowl Builder                                                              */
/* -------------------------------------------------------------------------- */

export const bowlBase: BowlOption = {
  id: 'base-basmati',
  name: 'Basmati Rice',
  description: 'Aged long-grain, perfectly steamed',
  upcharge: 0,
  included: true,
}

export const bowlProteins: BowlOption[] = [
  {
    id: 'protein-egg',
    name: 'Egg',
    description: 'Soft-cooked spiced egg, broken into your bowl',
    upcharge: 0,
    included: true,
  },
  {
    id: 'protein-paneer',
    name: 'Paneer',
    description: 'House-pressed cottage cheese, pillowy and fresh',
    upcharge: 0,
    included: true,
  },
  {
    id: 'protein-chicken',
    name: 'Chicken',
    description: 'Tender halal chicken, marinated & cooked to order',
    upcharge: 2.99,
  },
]

export const bowlSauces: BowlOption[] = [
  {
    id: 'sauce-makhani',
    name: 'Makhani Sauce',
    description: 'Velvety tomato cream — the one everyone loves',
    upcharge: 0,
  },
  {
    id: 'sauce-blossom',
    name: 'Spicy Blossom',
    description: 'Bold aromatic spice blend with a slow heat',
    upcharge: 0,
  },
  {
    id: 'sauce-fire',
    name: 'Fire Roasted Chili',
    description: 'Smoky, charred, unapologetically hot',
    upcharge: 0,
  },
  {
    id: 'sauce-mango',
    name: 'Creamy Mango Glaze',
    description: 'Sweet mango meets gentle spice — addictive',
    upcharge: 0,
  },
]

export const bowlToppings: BowlOption[] = [
  {
    id: 'topping-chickpea',
    name: 'Zesty Chickpea',
    description: 'Spiced chana with chaat masala kick',
    upcharge: 0,
    included: true,
  },
  {
    id: 'topping-garden',
    name: 'Garden Crunch Mix',
    description: 'Cool fresh vegetables for texture',
    upcharge: 0,
    included: true,
  },
  {
    id: 'topping-salsa',
    name: 'Classic Fresh Salsa',
    description: 'Tomato, onion, cilantro — bright & clean',
    upcharge: 0,
    included: true,
  },
  {
    id: 'topping-butter',
    name: 'Herb Butter Drizzle',
    description: 'Rich, savory, makes everything better',
    upcharge: 0,
    included: true,
  },
  {
    id: 'topping-papad',
    name: 'Fried Papad Strips',
    description: 'Crispy lentil chips — the crunch factor',
    upcharge: 0,
    included: true,
  },
]

/** Returns price for a chosen protein bowl. */
export function bowlBasePrice(proteinId: string): number {
  if (proteinId === 'protein-chicken') return 14.98
  return 11.99
}

export const EXTRA_SAUCE_PRICE = 1.5

/* -------------------------------------------------------------------------- */
/*  Static menu items                                                          */
/* -------------------------------------------------------------------------- */

export const menuItems: MenuItem[] = [
  // ===== Tiffin =====
  {
    id: 'tiffin-veg',
    category: 'tiffin',
    name: 'Veg Tiffin',
    description:
      "A full home-style Indian meal. Like someone's mom cooked for you. 2 Veg Curries (chef's daily choice) · 1 Dal · 4 Roti · Basmati Rice · Fresh Salad.",
    price: 13.99,
    badges: ['veg', 'chef'],
    servedWith: '2 Veg Curries · Dal · 4 Roti · Rice · Salad',
  },
  {
    id: 'tiffin-nonveg',
    category: 'tiffin',
    name: 'Non-Veg Tiffin',
    description:
      "Rich curries, hot bread, fluffy rice. The complete comfort package. 2 Non-Veg Curries (chef's daily choice) · 1 Dal · 4 Roti · Basmati Rice · Fresh Salad.",
    price: 17.99,
    badges: ['nonveg', 'chef'],
    servedWith: '2 Non-Veg Curries · Dal · 4 Roti · Rice · Salad',
  },

  // ===== Street Fusion — Tacos =====
  {
    id: 'taco-chicken',
    category: 'street',
    name: 'Chicken Tikka Taco',
    description:
      'Smoky tikka, cool mint chutney, sharp onions, fresh cilantro. Get two.',
    price: 10.99,
    badges: ['new'],
  },
  {
    id: 'taco-paneer',
    category: 'street',
    name: 'Paneer Taco',
    description:
      'Grilled paneer with sweet-sour tamarind and crisp fresh salad.',
    price: 9.99,
    badges: ['veg', 'new'],
  },
  {
    id: 'taco-egg',
    category: 'street',
    name: 'Egg Bhurji Taco',
    description:
      'Fluffy spiced scrambled egg with fiery green chutney. Breakfast? Lunch? Yes.',
    price: 9.99,
    badges: ['new'],
  },
  {
    id: 'taco-chana',
    category: 'street',
    name: 'Chana Taco',
    description:
      'Spiced chickpea, cooling raita, tangy pickle slaw. Accidentally vegan, intentionally delicious.',
    price: 8.99,
    badges: ['veg'],
  },

  // ===== Street Fusion — Quesadillas =====
  {
    id: 'quesadilla-chicken',
    category: 'street',
    name: 'Chicken Tikka Quesadilla',
    description:
      'Tandoori tikka and melted cheese with peppers and mint chutney. Crispy outside, molten inside.',
    price: 10.99,
    badges: ['new'],
  },
  {
    id: 'quesadilla-paneer',
    category: 'street',
    name: 'Paneer Quesadilla',
    description:
      'Grilled paneer, gooey cheese, caramelized onion, fresh coriander.',
    price: 9.99,
    badges: ['veg'],
  },
  {
    id: 'quesadilla-egg',
    category: 'street',
    name: 'Egg Quesadilla',
    description:
      'Spiced egg bhurji, colorful peppers, our house spice blend. Better than it sounds.',
    price: 9.99,
  },
  {
    id: 'quesadilla-cheese',
    category: 'street',
    name: 'Cheese Quesadilla',
    description:
      'Three-cheese blend, jalapeños, green chutney. Pure, unapologetic comfort.',
    price: 8.99,
    badges: ['veg'],
  },

  // ===== Grill & Tandoori =====
  {
    id: 'tandoor-tikka',
    category: 'grill',
    name: 'Chicken Tikka',
    description:
      'Boneless chicken marinated overnight in yogurt and spices. Chargrilled with char marks.',
    price: 13.99,
    badges: ['popular'],
  },
  {
    id: 'tandoor-half',
    category: 'grill',
    name: 'Tandoori Chicken (Half)',
    description:
      'Half bird, marinated deep, roasted in the tandoor until the skin blisters perfectly.',
    price: 11.99,
  },
  {
    id: 'tandoor-full',
    category: 'grill',
    name: 'Tandoori Chicken (Full)',
    description:
      'The whole chicken. Marinated 24 hours. Enough said.',
    price: 18.99,
  },
  {
    id: 'tandoor-sheekh',
    category: 'grill',
    name: 'Sheekh Kebab',
    description:
      'Spiced minced chicken hand-pressed onto skewers. Char-edged, juicy center.',
    price: 14.99,
  },

  // ===== Biryani =====
  {
    id: 'biryani-chicken',
    category: 'biryani',
    name: 'Chicken Biryani',
    description:
      'Aromatic basmati layered with slow-cooked chicken, whole spices, sealed and dum-cooked.',
    price: 15.99,
    badges: ['staff'],
    servedWith: 'Served with Raita & Salan',
  },
  {
    id: 'biryani-veg',
    category: 'biryani',
    name: 'Veg Biryani',
    description:
      'Seasonal vegetables, saffron-kissed basmati, dum style. Light but deeply satisfying.',
    price: 12.99,
    badges: ['veg'],
    servedWith: 'Served with Raita & Salan',
  },

  // ===== Snacks =====
  {
    id: 'snack-dabeli',
    category: 'snacks',
    name: 'Dabeli (2 pc)',
    description:
      'Spiced mashed potato, pomegranate seeds, roasted peanuts, stuffed in toasted pav. A Mumbai classic. Sweet, spicy, crunchy, all at once.',
    price: 9.99,
    badges: ['veg'],
  },
  {
    id: 'snack-samosapav',
    category: 'snacks',
    name: 'Samosa Pav (2 pc)',
    description:
      'Crispy golden samosa pressed into soft buttered toasted pav. Street food perfection.',
    price: 9.99,
    badges: ['veg'],
  },

  // ===== Drinks =====
  {
    id: 'drink-roselassi',
    category: 'drinks',
    name: 'Rose Lassi',
    description: 'Chilled yogurt blended with rose syrup. Floral, sweet, cooling.',
    price: 3.99,
    emoji: '🌹',
  },
  {
    id: 'drink-cane',
    category: 'drinks',
    name: 'Sugar Cane Juice',
    description: 'Freshly pressed cane juice. Naturally sweet, nothing added.',
    price: 3.99,
    emoji: '🌾',
  },
  {
    id: 'drink-soda',
    category: 'drinks',
    name: 'Can Soda',
    description: 'Assorted canned sodas. Cold and simple.',
    price: 1.99,
    emoji: '🥫',
  },
  {
    id: 'drink-thumsup',
    category: 'drinks',
    name: 'Thums Up',
    description: "India's bold, strong cola. Not your average Coke.",
    price: 2.49,
    emoji: '⚡',
  },
  {
    id: 'drink-limca',
    category: 'drinks',
    name: 'Limca',
    description: 'Fizzy lemon-lime soda from India. Refreshing and tangy.',
    price: 2.49,
    emoji: '🍋',
  },
]

/* -------------------------------------------------------------------------- */
/*  Restaurant constants                                                       */
/* -------------------------------------------------------------------------- */

export const RESTAURANT = {
  name: 'Bombay Box',
  tagline: 'Fresh Ingredients. Made Every Day.',
  secondaryTagline: 'Fast Indian Takeout That Hits Different.',
  address: '194 Rt 17 N, Rochelle Park, NJ 07602',
  addressDetail: 'Inside Subzi Bazar',
  phone: '201-546-1558',
  phoneHref: 'tel:+12015461558',
  website: 'eatbombaybox.com',
  websiteUrl: 'https://eatbombaybox.com',
  type: 'Takeout Only · No Dine-In',
  allergyNote:
    'Shared kitchen · May contain Gluten · Dairy · Nuts',
  dietary: 'Halal available · Jain on request',
  taxRate: 0.06625, // NJ sales tax
} as const

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                   */
/* -------------------------------------------------------------------------- */

export function formatPrice(n: number): string {
  return `$${n.toFixed(2)}`
}

export function itemsByCategory(cat: Category): MenuItem[] {
  return menuItems.filter((i) => i.category === cat)
}

export function getBadgeLabel(b: BadgeKey): { label: string; cls: string } {
  switch (b) {
    case 'popular': return { label: '⭐ Most Popular', cls: 'badge-amber' }
    case 'new':     return { label: '✨ New & Trending', cls: 'badge-sage' }
    case 'chef':    return { label: "👨‍🍳 Chef's Pick", cls: 'badge-spice' }
    case 'veg':     return { label: '🌿 Veg', cls: 'badge-veg' }
    case 'nonveg':  return { label: '🥩 Non-Veg', cls: 'badge-nonveg' }
    case 'staff':   return { label: '🔥 Staff Favorite', cls: 'badge-saffron' }
  }
}
