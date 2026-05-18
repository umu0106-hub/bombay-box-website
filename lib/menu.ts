/**
 * BOMBAY BOX · MENU DATA
 * Single source of truth. All prices and copy from official menu.
 */

export type Category = 'bowl' | 'rice' | 'bread' | 'sides' | 'drinks' | 'dessert' | 'combo'
export type Protein = 'chicken' | 'lamb' | 'paneer' | 'goat' | 'shrimp'
export type Sauce = 'butter' | 'tikka' | 'masala' | 'vindaloo' | 'korma'

export const categories: Category[] = [
  'bowl',
  'rice',
  'bread',
  'sides',
  'drinks',
  'dessert',
  'combo',
]

export interface MenuItem {
  id: string
  name: string
  price: number
  category: Category
  description: string
  vegetarian: boolean
  spiceLevel: 1 | 2 | 3 | 4 | 5
  image?: string
}

export const itemsByCategory: Record<Category, MenuItem[]> = {
  bowl: [
    {
      id: 'bowl-chicken-tikka',
      name: 'Chicken Tikka Bowl',
      price: 12.99,
      category: 'bowl',
      description: 'Grilled chicken tikka with rice, vegetables & sauce',
      vegetarian: false,
      spiceLevel: 2,
    },
    {
      id: 'bowl-lamb-masala',
      name: 'Lamb Masala Bowl',
      price: 14.99,
      category: 'bowl',
      description: 'Tender lamb in creamy masala sauce',
      vegetarian: false,
      spiceLevel: 3,
    },
    {
      id: 'bowl-paneer-tikka',
      name: 'Paneer Tikka Bowl',
      price: 11.99,
      category: 'bowl',
      description: 'Crispy paneer tikka, rice & greens',
      vegetarian: true,
      spiceLevel: 2,
    },
    {
      id: 'bowl-goat-vindaloo',
      name: 'Goat Vindaloo Bowl',
      price: 15.99,
      category: 'bowl',
      description: 'Spicy goat curry for the brave',
      vegetarian: false,
      spiceLevel: 5,
    },
    {
      id: 'bowl-shrimp-korma',
      name: 'Shrimp Korma Bowl',
      price: 13.99,
      category: 'bowl',
      description: 'Tender shrimp in mild coconut korma',
      vegetarian: false,
      spiceLevel: 1,
    },
  ],
  rice: [
    {
      id: 'rice-basmati',
      name: 'Basmati Rice',
      price: 2.99,
      category: 'rice',
      description: 'Fluffy basmati, steamed to perfection',
      vegetarian: true,
      spiceLevel: 1,
    },
    {
      id: 'rice-biryani',
      name: 'Vegetable Biryani',
      price: 10.99,
      category: 'rice',
      description: 'Fragrant rice layered with spiced vegetables',
      vegetarian: true,
      spiceLevel: 2,
    },
  ],
  bread: [
    {
      id: 'bread-naan',
      name: 'Plain Naan',
      price: 3.99,
      category: 'bread',
      description: 'Soft, pillowy naan bread',
      vegetarian: true,
      spiceLevel: 1,
    },
    {
      id: 'bread-garlic-naan',
      name: 'Garlic Naan',
      price: 4.49,
      category: 'bread',
      description: 'Naan with fresh garlic & butter',
      vegetarian: true,
      spiceLevel: 1,
    },
    {
      id: 'bread-roti',
      name: 'Whole Wheat Roti',
      price: 2.49,
      category: 'bread',
      description: 'Healthier alternative to naan',
      vegetarian: true,
      spiceLevel: 1,
    },
  ],
  sides: [
    {
      id: 'sides-raita',
      name: 'Cooling Raita',
      price: 2.99,
      category: 'sides',
      description: 'Yogurt, cucumber & spices',
      vegetarian: true,
      spiceLevel: 1,
    },
    {
      id: 'sides-mango-pickle',
      name: 'Mango Pickle',
      price: 1.99,
      category: 'sides',
      description: 'Tangy mango pickle condiment',
      vegetarian: true,
      spiceLevel: 3,
    },
    {
      id: 'sides-samosa',
      name: 'Samosa (2)',
      price: 4.99,
      category: 'sides',
      description: 'Crispy fried pastry with spiced potato',
      vegetarian: true,
      spiceLevel: 2,
    },
  ],
  drinks: [
    {
      id: 'drinks-lassi',
      name: 'Mango Lassi',
      price: 4.99,
      category: 'drinks',
      description: 'Sweet yogurt drink with fresh mango',
      vegetarian: true,
      spiceLevel: 1,
    },
    {
      id: 'drinks-chai',
      name: 'Masala Chai',
      price: 3.49,
      category: 'drinks',
      description: 'Spiced tea with milk',
      vegetarian: true,
      spiceLevel: 1,
    },
    {
      id: 'drinks-mango-juice',
      name: 'Fresh Mango Juice',
      price: 4.49,
      category: 'drinks',
      description: 'Pure fresh mango',
      vegetarian: true,
      spiceLevel: 1,
    },
  ],
  dessert: [
    {
      id: 'dessert-gulab-jamun',
      name: 'Gulab Jamun',
      price: 5.99,
      category: 'dessert',
      description: 'Soft milk solids in syrup (2 pieces)',
      vegetarian: true,
      spiceLevel: 1,
    },
    {
      id: 'dessert-kheer',
      name: 'Kheer',
      price: 4.99,
      category: 'dessert',
      description: 'Rice pudding with cardamom & nuts',
      vegetarian: true,
      spiceLevel: 1,
    },
  ],
  combo: [
    {
      id: 'combo-feast',
      name: 'Bombay Feast',
      price: 29.99,
      category: 'combo',
      description: '2 bowls, rice, naan, samosa, drink & dessert',
      vegetarian: false,
      spiceLevel: 2,
    },
    {
      id: 'combo-veggie',
      name: 'Veggie Delight',
      price: 24.99,
      category: 'combo',
      description: 'Paneer bowl, rice, naan, sides, drink & dessert',
      vegetarian: true,
      spiceLevel: 2,
    },
  ],
}

export const proteins: Protein[] = ['chicken', 'lamb', 'paneer', 'goat', 'shrimp']
export const sauces: Sauce[] = ['butter', 'tikka', 'masala', 'vindaloo', 'korma']
export const proteinNames: Record<Protein, string> = {
  chicken: 'Chicken',
  lamb: 'Lamb',
  paneer: 'Paneer',
  goat: 'Goat',
  shrimp: 'Shrimp',
}
export const sauceNames: Record<Sauce, string> = {
  butter: 'Butter Sauce',
  tikka: 'Tikka',
  masala: 'Masala',
  vindaloo: 'Vindaloo',
  korma: 'Korma',
}

export const saucePrices: Record<Sauce, number> = {
  butter: 0,
  tikka: 0.5,
  masala: 1,
  vindaloo: 1.5,
  korma: 0.75,
}

export const proteinPrices: Record<Protein, number> = {
  chicken: 0,
  lamb: 3,
  paneer: 2,
  goat: 4,
  shrimp: 2.5,
}
