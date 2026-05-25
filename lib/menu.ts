/**
 * BOMBAY BOX · MENU DATA
 * Single source of truth. All prices and copy.
 * Premium Indian Fast Casual Restaurant
 */

export type Category =
  | 'bowl'
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
  image?: string
  badges?: BadgeKey[]
  servedWith?: string
}

export interface BowlOption {
  id: string
  name: string
  description: string
  image?: string
  upcharge: number
  included?: boolean
}

export interface CategoryMeta {
  key: Category
  number: string
  title: string
  image?: string
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
    image: 'https://images.unsplash.com/photo-1609501676725-7186f017a4b8?w=600&q=80',
    appetiteCopy:
      'Start with fragrant basmati rice. Choose your protein. Layer two bold sauces. Top it all with fresh garnishes. Every combination is perfectly balanced—your way.',
    bandColor: '#A54E27',
  },
  {
    key: 'street',
    number: '02',
    title: 'Street Fusion',
    image: 'https://images.unsplash.com/photo-1599599810694-8a9d45c953b3?w=600&q=80',
    appetiteCopy:
      'Mumbai street food meets modern taste. Handheld, bold, unforgettable. Fresh, never frozen.',
    subLabel: 'New & Trending',
    bandColor: '#D4A574',
  },
  {
    key: 'grill',
    number: '03',
    title: 'Grill & Tandoori',
    image: 'https://images.unsplash.com/photo-1606787613009-3651a3a01f4b?w=600&q=80',
    appetiteCopy:
      'Charred to perfection. The tandoor runs hot all day. Smoke, char, depth you can\'t find elsewhere.',
    bandColor: '#2D4A3D',
  },
  {
    key: 'biryani',
    number: '04',
    title: 'Biryani',
    image: 'https://images.unsplash.com/photo-1631449249649-644f3a42d8e4?w=600&q=80',
    appetiteCopy:
      'Slow-cooked dum biryani. The rice absorbs every spice, every drop of flavor. A complete meal in one bowl.',
    bandColor: '#B8861B',
  },
  {
    key: 'snacks',
    number: '05',
    title: 'Snacks',
    image: 'https://images.unsplash.com/photo-1618164436241-92473ba40e8d?w=600&q=80',
    appetiteCopy: 'Light, crispy, satisfying. Small bites with big flavor.',
    bandColor: '#6A4A22',
  },
  {
    key: 'drinks',
    number: '06',
    title: 'Drinks',
    image: 'https://images.unsplash.com/photo-1597318972826-5a9bfb91a4b8?w=600&q=80',
    appetiteCopy: 'Cool, sweet, authentic. Pair it with your meal.',
    bandColor: '#5A7A6E',
  },
]

/* -------------------------------------------------------------------------- */
/*  Bowl Builder                                                              */
/* -------------------------------------------------------------------------- */

export const bowlBase: BowlOption = {
  id: 'base-basmati',
  name: 'Basmati Rice',
  description: 'Aged long-grain, perfectly steamed. The foundation of every bowl.',
  image: 'https://images.unsplash.com/photo-1505521918220-278ce9c8d70f?w=400&q=80',
  upcharge: 0,
  included: true,
}

export const bowlProteins: BowlOption[] = [
  {
    id: 'protein-egg',
    name: 'Egg',
    description: 'Soft-cooked spiced egg, broken into your bowl',
    image: 'https://images.unsplash.com/photo-1585238341710-4b39bd41d025?w=400&q=80',
    upcharge: 0,
    included: true,
  },
  {
    id: 'protein-paneer',
    name: 'Paneer',
    description: 'House-pressed cottage cheese, pillowy and fresh',
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cda687?w=400&q=80',
    upcharge: 0,
    included: true,
  },
  {
    id: 'protein-chicken',
    name: 'Chicken',
    description: 'Tender, hand-cut, subtly spiced',
    image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400&q=80',
    upcharge: 0,
    included: true,
  },
  {
    id: 'protein-lamb',
    name: 'Lamb',
    description: 'Succulent, aromatic, premium',
    image: 'https://images.unsplash.com/photo-1618515278239-f9c9f96e0a5f?w=400&q=80',
    upcharge: 2.0,
    included: false,
  },
]

export const bowlSauces: BowlOption[] = [
  {
    id: 'sauce-mint',
    name: 'Mint Coriander Chutney',
    description: 'Fresh, cool, herbaceous',
    image: 'https://images.unsplash.com/photo-1596040694635-d18c6ba70b3e?w=400&q=80',
    upcharge: 0,
    included: true,
  },
  {
    id: 'sauce-tamarind',
    name: 'Tamarind Chutney',
    description: 'Sweet, tangy, balanced',
    image: 'https://images.unsplash.com/photo-1596040694635-d18c6ba70b3e?w=400&q=80',
    upcharge: 0,
    included: true,
  },
  {
    id: 'sauce-yogurt',
    name: 'Yogurt Raita',
    description: 'Cooling, creamy, with cumin',
    image: 'https://images.unsplash.com/photo-1629974903457-69f12c60d5d9?w=400&q=80',
    upcharge: 0,
    included: true,
  },
  {
    id: 'sauce-sriracha',
    name: 'Sriracha Aioli',
    description: 'Modern heat, creamy base',
    image: 'https://images.unsplash.com/photo-1596040694635-d18c6ba70b3e?w=400&q=80',
    upcharge: 0,
    included: false,
  },
]

export const bowlToppings: BowlOption[] = [
  {
    id: 'top-cucumber',
    name: 'Cucumber Salad',
    description: 'Fresh, crisp, cooling',
    image: 'https://images.unsplash.com/photo-1589985620652-a8fd7c4c9c11?w=400&q=80',
    upcharge: 0,
  },
  {
    id: 'top-onion',
    name: 'Red Onions',
    description: 'Sliced, tangy, sharp',
    image: 'https://images.unsplash.com/photo-1599599810694-8a9d45c953b3?w=400&q=80',
    upcharge: 0,
  },
  {
    id: 'top-cilantro',
    name: 'Cilantro',
    description: 'Fresh, fragrant herb',
    image: 'https://images.unsplash.com/photo-1599599810694-8a9d45c953b3?w=400&q=80',
    upcharge: 0,
  },
  {
    id: 'top-lime',
    name: 'Lime',
    description: 'Squeeze of bright acid',
    image: 'https://images.unsplash.com/photo-1599599810694-8a9d45c953b3?w=400&q=80',
    upcharge: 0,
  },
  {
    id: 'top-nuts',
    name: 'Cashew Nuts',
    description: 'Roasted, crunchy, luxurious',
    image: 'https://images.unsplash.com/photo-1599599810694-8a9d45c953b3?w=400&q=80',
    upcharge: 1.0,
  },
  {
    id: 'top-egg',
    name: 'Boiled Egg',
    description: 'Halved, protein-rich',
    image: 'https://images.unsplash.com/photo-1585238341710-4b39bd41d025?w=400&q=80',
    upcharge: 0.99,
  },
]

/* -------------------------------------------------------------------------- */
/*  Menu Items                                                                 */
/* -------------------------------------------------------------------------- */

export const menuItems: MenuItem[] = [
  // BOWL
  {
    id: 'menu-chicken-bowl',
    category: 'bowl',
    name: 'The Chicken Bowl',
    description: 'Basmati rice, tender chicken, mint chutney, tamarind glaze, cucumber, cilantro. Complete protein, perfectly balanced.',
    price: 14.98,
    image: 'https://images.unsplash.com/photo-1609501676725-7186f017a4b8?w=600&q=80',
    badges: ['popular'],
  },
  {
    id: 'menu-veggie-bowl',
    category: 'bowl',
    name: 'Veggie Stack Bowl',
    description: 'Seasonal vegetables, paneer, cumin rice, yogurt raita, fresh herbs. Plant-forward and satisfying.',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80',
    badges: ['veg'],
  },

  // STREET FUSION
  {
    id: 'menu-tikka-taco',
    category: 'street',
    name: 'Chicken Tikka Taco',
    description: 'Charred chicken, soft flour tortilla, mint chutney, crispy onion, lime. Two tacos per order.',
    price: 10.99,
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&q=80',
    badges: ['new'],
  },
  {
    id: 'menu-samosa-fries',
    category: 'street',
    name: 'Samosa Fries',
    description: 'Crispy potato wedges dusted with chaat masala, served with mint chutney and tamarind sauce.',
    price: 8.99,
    image: 'https://images.unsplash.com/photo-1599599810694-8a9d45c953b3?w=600&q=80',
    badges: ['veg'],
  },

  // GRILL & TANDOORI
  {
    id: 'menu-tandoori-chicken',
    category: 'grill',
    name: 'Tandoori Chicken',
    description: 'Half chicken, yogurt and spice marinade, charred in the tandoor. Served with basmati and salad.',
    price: 16.99,
    image: 'https://images.unsplash.com/photo-1606787613009-3651a3a01f4b?w=600&q=80',
    badges: ['popular'],
  },
  {
    id: 'menu-paneer-tikka',
    category: 'grill',
    name: 'Paneer Tikka',
    description: 'Cubed paneer, bell pepper, onion. Grilled to char on a skewer. Served with mint chutney.',
    price: 13.99,
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cda687?w=600&q=80',
    badges: ['veg'],
  },

  // BIRYANI
  {
    id: 'menu-chicken-biryani',
    category: 'biryani',
    name: 'Chicken Biryani',
    description: 'Slow-cooked chicken and basmati with aromatic spices. Sealed, steamed, perfection. A complete meal.',
    price: 15.99,
    image: 'https://images.unsplash.com/photo-1631449249649-644f3a42d8e4?w=600&q=80',
    badges: ['popular', 'chef'],
  },
  {
    id: 'menu-lamb-biryani',
    category: 'biryani',
    name: 'Lamb Biryani',
    description: 'Premium lamb, dum-cooked with basmati, complex spicing. Restaurant favorite.',
    price: 17.99,
    image: 'https://images.unsplash.com/photo-1631449249649-644f3a42d8e4?w=600&q=80',
    badges: ['chef'],
  },

  // SNACKS
  {
    id: 'menu-samosas',
    category: 'snacks',
    name: 'Samosas',
    description: 'Crispy pastry pockets, spiced potato and peas. Served with mint chutney. Two per order.',
    price: 5.99,
    image: 'https://images.unsplash.com/photo-1618164436241-92473ba40e8d?w=600&q=80',
    badges: ['veg'],
  },
  {
    id: 'menu-pakora',
    category: 'snacks',
    name: 'Onion Pakora',
    description: 'Crispy fritters made with chickpea batter and fresh onions. Served with chutney.',
    price: 6.99,
    image: 'https://images.unsplash.com/photo-1618164436241-92473ba40e8d?w=600&q=80',
    badges: ['veg'],
  },

  // DRINKS
  {
    id: 'menu-mango-lassi',
    category: 'drinks',
    name: 'Mango Lassi',
    description: 'Yogurt blended with fresh mango, cardamom, a touch of honey. Cool and creamy.',
    price: 4.99,
    image: 'https://images.unsplash.com/photo-1597318972826-5a9bfb91a4b8?w=600&q=80',
  },
  {
    id: 'menu-masala-chai',
    category: 'drinks',
    name: 'Masala Chai',
    description: 'Spiced tea brewed with fresh milk, cinnamon, cardamom, ginger. Warm comfort.',
    price: 3.99,
    image: 'https://images.unsplash.com/photo-1597318972826-5a9bfb91a4b8?w=600&q=80',
  },
]

/* -------------------------------------------------------------------------- */
/*  Restaurant Metadata                                                        */
/* -------------------------------------------------------------------------- */

export const RESTAURANT = {
  name: 'Bombay Box',
  tagline: 'Premium Indian Fast Casual',
  location: '194 Rt 17 N, Rochelle Park, NJ 07602',
  inside: 'Inside Subzi Bazar',
  phone: '201-546-1558',
  taxRate: 0.06625,
  currency: 'USD',
} as const

/* -------------------------------------------------------------------------- */
/*  Utilities                                                                  */
/* -------------------------------------------------------------------------- */

export function formatPrice(n: number): string {
  return `$${n.toFixed(2)}`
}

export function getMenuItemById(id: string): MenuItem | undefined {
  return menuItems.find((item) => item.id === id)
}

export function itemsByCategory(cat: Category): MenuItem[] {
  return menuItems.filter((item) => item.category === cat)
}

export function bowlBasePrice(proteinId: string): number {
  const protein = bowlProteins.find((p) => p.id === proteinId)
  return protein ? protein.upcharge : 0
}

export const EXTRA_SAUCE_PRICE = 1.5

export function getBadgeLabel(b: BadgeKey): { label: string; emoji: string } {
  switch (b) {
    case 'popular': return { label: 'Most Popular', emoji: '⭐' }
    case 'new':     return { label: 'New & Trending', emoji: '✨' }
    case 'chef':    return { label: "Chef's Pick", emoji: '👨‍🍳' }
    case 'veg':     return { label: 'Vegetarian', emoji: '🌿' }
    case 'nonveg':  return { label: 'Non-Veg', emoji: '🥩' }
    case 'staff':   return { label: 'Staff Favorite', emoji: '🔥' }
  }
}
