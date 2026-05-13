import dishPizza from "@/assets/dish-pizza.jpg";
import dishSushi from "@/assets/dish-sushi.jpg";
import dishAcai from "@/assets/dish-acai.jpg";
import dishBurger from "@/assets/dish-burger.jpg";
import dishPoke from "@/assets/dish-poke.jpg";
import dishPasta from "@/assets/dish-pasta.jpg";
import dishFeijoada from "@/assets/dish-feijoada.jpg";
import dishChurrasco from "@/assets/dish-churrasco.jpg";
import restBurger from "@/assets/rest-burger.jpg";
import restPizza from "@/assets/rest-pizza.jpg";
import restSushi from "@/assets/rest-sushi.jpg";

export type Category = {
  slug: string;
  name: string;
  emoji: string;
};

export const categories: Category[] = [
  { slug: "brasileira", name: "Brasileira", emoji: "🇧🇷" },
  { slug: "massas", name: "Massas", emoji: "🍝" },
  { slug: "oriental", name: "Oriental", emoji: "🍣" },
  { slug: "burgers", name: "Hambúrgueres", emoji: "🍔" },
  { slug: "pizza", name: "Pizza", emoji: "🍕" },
  { slug: "churrasco", name: "Churrasco", emoji: "🥩" },
  { slug: "fitness", name: "Fitness", emoji: "🥗" },
  { slug: "sobremesas", name: "Sobremesas", emoji: "🍰" },
  { slug: "acai", name: "Açaí", emoji: "🥣" },
  { slug: "bebidas", name: "Bebidas", emoji: "🥤" },
];

export type Dish = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  section: string;
};

export type Restaurant = {
  id: string;
  slug: string;
  name: string;
  banner: string;
  logoEmoji: string;
  rating: number;
  reviews: number;
  deliveryMin: number;
  deliveryMax: number;
  deliveryFee: number;
  open: boolean;
  categorySlug: string;
  categoryLabel: string;
  distanceKm: number;
  promo?: string;
  menu: Dish[];
};

export const restaurants: Restaurant[] = [
  {
    id: "r1",
    slug: "big-spinner-burger",
    name: "Big Spinner Burger",
    banner: restBurger,
    logoEmoji: "🍔",
    rating: 4.9,
    reviews: 1284,
    deliveryMin: 20,
    deliveryMax: 35,
    deliveryFee: 0,
    open: true,
    categorySlug: "burgers",
    categoryLabel: "Hambúrgueres",
    distanceKm: 1.2,
    promo: "Frete grátis",
    menu: [
      {
        id: "d1",
        name: "Bacon Smash Burger",
        description:
          "Dois smash patties 100% angus, bacon crocante, cheddar inglês, picles e molho da casa no pão brioche.",
        price: 34.9,
        image: dishBurger,
        section: "Mais pedidos",
      },
      {
        id: "d2",
        name: "Double Cheese Spinner",
        description:
          "Dois patties suculentos com camadas duplas de cheddar, cebola caramelizada e molho cheddar exclusivo.",
        price: 39.9,
        image: dishBurger,
        section: "Mais pedidos",
      },
      {
        id: "d3",
        name: "Combo Spinner Solo",
        description: "Burger + batata rústica + Coca-Cola 350ml.",
        price: 49.9,
        image: dishBurger,
        section: "Combos",
      },
    ],
  },
  {
    id: "r2",
    slug: "forno-e-arte",
    name: "Forno & Arte Pizzaria",
    banner: restPizza,
    logoEmoji: "🍕",
    rating: 4.8,
    reviews: 932,
    deliveryMin: 30,
    deliveryMax: 45,
    deliveryFee: 5.9,
    open: true,
    categorySlug: "pizza",
    categoryLabel: "Pizza",
    distanceKm: 2.4,
    promo: "30% OFF",
    menu: [
      {
        id: "d4",
        name: "Pizza Pepperoni Premium",
        description:
          "Molho de tomate San Marzano, mozzarella di bufala e pepperoni italiano em massa de fermentação natural.",
        price: 59.0,
        image: dishPizza,
        section: "Pizzas Salgadas",
      },
      {
        id: "d5",
        name: "Margherita Clássica",
        description: "Molho artesanal, mozzarella fresca, manjericão e azeite extra virgem.",
        price: 49.0,
        image: dishPizza,
        section: "Pizzas Salgadas",
      },
    ],
  },
  {
    id: "r3",
    slug: "kyoto-sushi-prime",
    name: "Kyoto Sushi Prime",
    banner: restSushi,
    logoEmoji: "🍣",
    rating: 4.7,
    reviews: 540,
    deliveryMin: 45,
    deliveryMax: 60,
    deliveryFee: 12.9,
    open: false,
    categorySlug: "oriental",
    categoryLabel: "Oriental",
    distanceKm: 3.8,
    menu: [
      {
        id: "d6",
        name: "Combinado Premium 24 peças",
        description: "Seleção do chef com niguiris, sashimis e uramakis especiais.",
        price: 119.0,
        image: dishSushi,
        section: "Combinados",
      },
      {
        id: "d7",
        name: "Poke Salmão Fresh",
        description: "Salmão, arroz japonês, edamame, abacate, manga, gergelim e shoyu cítrico.",
        price: 48.9,
        image: dishPoke,
        section: "Poke Bowls",
      },
    ],
  },
  {
    id: "r4",
    slug: "casa-da-feijoada",
    name: "Casa da Feijoada",
    banner: restPizza,
    logoEmoji: "🇧🇷",
    rating: 4.6,
    reviews: 712,
    deliveryMin: 35,
    deliveryMax: 50,
    deliveryFee: 7.9,
    open: true,
    categorySlug: "brasileira",
    categoryLabel: "Brasileira",
    distanceKm: 2.9,
    menu: [
      {
        id: "d8",
        name: "Feijoada Completa",
        description: "Feijão preto com carnes nobres, arroz, couve, farofa e laranja.",
        price: 54.0,
        image: dishFeijoada,
        section: "Pratos",
      },
    ],
  },
  {
    id: "r5",
    slug: "brasa-house",
    name: "Brasa House Steak",
    banner: restBurger,
    logoEmoji: "🥩",
    rating: 4.9,
    reviews: 411,
    deliveryMin: 40,
    deliveryMax: 55,
    deliveryFee: 9.9,
    open: true,
    categorySlug: "churrasco",
    categoryLabel: "Churrasco",
    distanceKm: 4.1,
    promo: "Cupom: BRASA20",
    menu: [
      {
        id: "d9",
        name: "Picanha na Brasa 400g",
        description: "Picanha grelhada na brasa, acompanha arroz, vinagrete, farofa e mandioca.",
        price: 89.0,
        image: dishChurrasco,
        section: "Carnes",
      },
    ],
  },
  {
    id: "r6",
    slug: "trattoria-bella",
    name: "Trattoria Bella Pasta",
    banner: restPizza,
    logoEmoji: "🍝",
    rating: 4.8,
    reviews: 623,
    deliveryMin: 30,
    deliveryMax: 45,
    deliveryFee: 6.9,
    open: true,
    categorySlug: "massas",
    categoryLabel: "Massas",
    distanceKm: 1.8,
    menu: [
      {
        id: "d10",
        name: "Spaghetti Carbonara",
        description: "Massa fresca, guanciale, gema, pecorino e pimenta do reino.",
        price: 46.0,
        image: dishPasta,
        section: "Massas",
      },
    ],
  },
  {
    id: "r7",
    slug: "acai-do-porto",
    name: "Açaí do Porto",
    banner: restSushi,
    logoEmoji: "🥣",
    rating: 4.9,
    reviews: 2104,
    deliveryMin: 15,
    deliveryMax: 25,
    deliveryFee: 3.9,
    open: true,
    categorySlug: "acai",
    categoryLabel: "Açaí",
    distanceKm: 0.8,
    menu: [
      {
        id: "d11",
        name: "Açaí Completo 500ml",
        description: "Açaí cremoso com banana, granola, leite condensado e morango.",
        price: 22.5,
        image: dishAcai,
        section: "Açaí",
      },
    ],
  },
];

export function getRestaurantBySlug(slug: string) {
  return restaurants.find((r) => r.slug === slug);
}

export function getRestaurantsByCategory(slug: string) {
  return restaurants.filter((r) => r.categorySlug === slug);
}

export type FeaturedDish = {
  dish: Dish;
  restaurant: Restaurant;
};

export const mostOrdered: FeaturedDish[] = [
  { dish: restaurants[0].menu[0], restaurant: restaurants[0] },
  { dish: restaurants[1].menu[0], restaurant: restaurants[1] },
  { dish: restaurants[6].menu[0], restaurant: restaurants[6] },
  { dish: restaurants[2].menu[1], restaurant: restaurants[2] },
];

export function brl(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
