export interface User {
  id: string;
  username: string;
  email: string;
  avatar: string;
  createdAt: string;
  favorites: string[]; 
}

export interface Game {
  id: string;
  name: string;
  logo: string;
}

export interface Skin {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  rarity: string;
  game: Game;
  type: string;
  float?: number; // Для CS2
  pattern?: string; // Для CS2
  hero?: string; // Для Dota 2
  available: boolean;
  discount?: number;
}

export interface CartItem {
  skin: Skin;
  quantity: number;
}