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
    emoji: '👑',
    appetiteCopy:
      'The king of Indian rice. Fragrant basmati, tender proteins, layer of spice. One scoop and you understand why empires were built on biryani.',
    bandColor: '#9B59B6',
  },
  {
    key: 'snacks',
    number: '06',
    title: 'Snacks & Sides',
    emoji: '🤤',
    appetiteCopy:
      "Cravings between meals? Samosas, pakoras, fries with masala salt. The stuff that makes you come back.",
    bandColor: '#E67E22',
  },
  {
    key: 'drinks',
    number: '07',
    title: 'Drinks',
    emoji: '🥤',
    appetiteCopy:
      'Refreshing drinks to cool down the spice. Mango lassi, masala chai, cold coffee, and more.',
    bandColor: '#3498DB',
  },
]

/* -------------------------------------------------------------------------- */
/*  Menu Items                                                                 */
/* -------------------------------------------------------------------------- */

export const menuItems: MenuItem[] = [
  // BOWLS (Build Your Bowl)
  {
    id: 'bowl-chicken-tikka',
    category: 'bowl',
    name: 'Chicken Tikka Bowl',
    description: 'Tandoori chicken, basmati, cucumber raita',
    price: 10.99,
    emoji: '🍗',
    badges: ['popular'],
  },
  {
    id: 'bowl-paneer-tikka',
    category: 'bowl',
    name: 'Paneer Tikka Bowl',
    description: 'Cottage cheese, basmati, mint yogurt',
    price: 9.99,
    emoji: '🧀',
    badges: ['veg'],
  },
  {
    id: 'bowl-lamb-seekh',
    category: 'bowl',
    name: 'Lamb Seekh Bowl',
    description: 'Minced lamb kebab, basmati, tomato salsa',
    price: 12.99,
    emoji: '🐑',
  },
  {
    id: 'bowl-shrimp-masala',
    category: 'bowl',
    name: 'Shrimp Masala Bowl',
    description: 'Spiced shrimp, basmati, lemon rice',
    price: 13.99,
    emoji: '🦐',
  },
  {
    id: 'bowl-veg-deluxe',
    category: 'bowl',
    name: 'Veg Deluxe Bowl',
    description: 'Mixed vegetables, paneer, basmati',
    price: 8.99,
    emoji: '🥕',
    badges: ['veg', 'popular'],
  },

  // TIFFIN
  {
    id: 'tiffin-daily',
    category: 'tiffin',
    name: "Today's Chef Selection",
    description: "Chef's fresh curry of the day with rice. Ask your server what's cooking!",
    price: 11.99,
    emoji: '👨‍🍳',
    badges: ['chef', 'popular'],
  },

  // STREET
  {
    id: 'street-pav-bhaji',
    category: 'street',
    name: 'Pav Bhaji',
    description: 'Spiced vegetable mash with buttered bread',
    price: 7.99,
    emoji: '🥖',
    badges: ['veg', 'new'],
  },
  {
    id: 'street-samosa-wrap',
    category: 'street',
    name: 'Crispy Samosa Wrap',
    description: 'Fried samosa deconstructed in a wrap with tamarind chutney',
    price: 8.99,
    emoji: '🌯',
    badges: ['veg', 'new'],
  },
  {
    id: 'street-kathi-roll',
    category: 'street',
    name: 'Kathi Chicken Roll',
    description: 'Tandoori chicken wrapped in paratha with onions and chutney',
    price: 9.99,
    emoji: '🌯',
    badges: ['popular'],
  },

  // GRILL & TANDOORI
  {
    id: 'grill-tandoori-chicken',
    category: 'grill',
    name: 'Tandoori Chicken Half',
    description: 'Marinated in yogurt and spices, char-grilled perfection',
    price: 13.99,
    emoji: '🍗',
    badges: ['popular'],
  },
  {
    id: 'grill-seekh-kebab',
    category: 'grill',
    name: 'Lamb Seekh Kebab (2pc)',
    description: 'Minced lamb with herbs and spices',
    price: 11.99,
    emoji: '🐑',
  },
  {
    id: 'grill-paneer-tikka',
    category: 'grill',
    name: 'Paneer Tikka (6pc)',
    description: 'Soft cottage cheese in yogurt marinade',
    price: 10.99,
    emoji: '🧀',
    badges: ['veg'],
  },

  // BIRYANI
  {
    id: 'biryani-chicken',
    category: 'biryani',
    name: 'Chicken Biryani',
    description: 'Fragrant basmati, tender chicken, aromatic spices',
    price: 12.99,
    emoji: '👑',
    badges: ['popular'],
  },
  {
    id: 'biryani-veg',
    category: 'biryani',
    name: 'Vegetable Biryani',
    description: 'Mixed vegetables with saffron rice',
    price: 10.99,
    emoji: '👑',
    badges: ['veg'],
  },
  {
    id: 'biryani-goat',
    category: 'biryani',
    name: 'Goat Biryani',
    description: 'Tender goat meat with basmati and caramelized onions',
    price: 15.99,
    emoji: '👑',
  },
  {
    id: 'biryani-shrimp',
    category: 'biryani',
    name: 'Shrimp Biryani',
    description: 'Spiced shrimp with fragrant rice',
    price: 14.99,
    emoji: '👑',
  },

  // SNACKS
  {
    id: 'snack-samosa',
    category: 'snacks',
    name: 'Samosa (3pc)',
    description: 'Crispy fried pastry with spiced potato filling',
    price: 4.99,
    emoji: '🤤',
    badges: ['veg'],
  },
  {
    id: 'snack-pakora',
    category: 'snacks',
    name: 'Vegetable Pakora (6pc)',
    description: 'Battered and fried vegetables',
    price: 6.99,
    emoji: '🤤',
    badges: ['veg'],
  },
  {
    id: 'snack-fries-masala',
    category: 'snacks',
    name: 'Fries with Masala Salt',
    description: 'Crispy fries dusted with spiced salt',
    price: 3.99,
    emoji: '🍟',
    badges: ['veg'],
  },

  // DRINKS
  {
    id: 'drink-mango-lassi',
    category: 'drinks',
    name: 'Mango Lassi',
    description: 'Sweet yogurt drink with mango pulp',
    price: 4.99,
    emoji: '🥤',
    badges: ['veg'],
  },
  {
    id: 'drink-masala-chai',
    category: 'drinks',
    name: 'Masala Chai',
    description: 'Spiced Indian tea with milk',
    price: 2.99,
    emoji: '☕',
    badges: ['veg'],
  },
  {
    id: 'drink-cold-coffee',
    category: 'drinks',
    name: 'Cold Coffee',
    description: 'Iced coffee with milk and a touch of cardamom',
    price: 3.99,
    emoji: '🥤',
    badges: ['veg'],
  },
]

/* -------------------------------------------------------------------------- */
/*  Bowl Customization Options                                                */
/* -------------------------------------------------------------------------- */

export const bowlProteins: BowlOption[] = [
  { id: 'protein-chicken', name: 'Chicken Tikka', description: 'Tender tandoori chicken', upcharge: 0, included: true },
  { id: 'protein-paneer', name: 'Paneer', description: 'Soft cottage cheese', upcharge: 0, included: true },
  { id: 'protein-lamb', name: 'Lamb Seekh', description: 'Minced lamb kebab', upcharge: 2.0 },
  { id: 'protein-shrimp', name: 'Shrimp', description: 'Masala shrimp', upcharge: 2.5 },
  { id: 'protein-tofu', name: 'Tofu', description: 'Marinated crispy tofu', upcharge: 1.0 },
]

export const bowlSauces: BowlOption[] = [
  { id: 'sauce-tikka', name: 'Tikka Masala', description: 'Creamy tomato sauce', upcharge: 0 },
  { id: 'sauce-curry', name: 'Curry', description: 'Spiced coconut curry', upcharge: 0 },
  { id: 'sauce-tandoori', name: 'Tandoori', description: 'Smoky tandoori sauce', upcharge: 0 },
  { id: 'sauce-mint', name: 'Mint Yogurt', description: 'Cooling mint yogurt', upcharge: 0 },
  { id: 'sauce-chutney', name: 'Tamarind Chutney', description: 'Sweet and tangy', upcharge: 0 },
]

export const bowlToppings: BowlOption[] = [
  { id: 'top-cucumber', name: 'Cucumber Salad', description: 'Fresh cucumber', upcharge: 0 },
  { id: 'top-onion', name: 'Red Onions', description: 'Sliced red onions', upcharge: 0 },
  { id: 'top-cilantro', name: 'Cilantro', description: 'Fresh cilantro', upcharge: 0 },
  { id: 'top-lime', name: 'Lime', description: 'Squeeze of lime', upcharge: 0 },
  { id: 'top-nuts', name: 'Cashew Nuts', description: 'Roasted cashews', upcharge: 1.0 },
  { id: 'top-egg', name: 'Boiled Egg', description: 'Halved boiled egg', upcharge: 0.99 },
]

/* -------------------------------------------------------------------------- */
/*  Restaurant Metadata                                                        */
/* -------------------------------------------------------------------------- */

export const RESTAURANT = {
  name: 'Bombay Box',
  location: '194 Rt 17 N, Rochelle Park, NJ 07602',
  inside: 'Inside Subzi Bazar',
  phone: '201-546-1558',
  taxRate: 0.06625, // NJ standard rate (6.625%)
  currency: 'USD',
}

/* -------------------------------------------------------------------------- */
/*  Utilities                                                                  */
/* -------------------------------------------------------------------------- */

export function formatPrice(price: number): string {
  return `$${price.toFixed(2)}`
}

export function getMenuItemById(id: string): MenuItem | undefined {
  return menuItems.find((item) => item.id === id)
}

export function getItemsByCategory(category: Category): MenuItem[] {
  return menuItems.filter((item) => item.category === category)
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
