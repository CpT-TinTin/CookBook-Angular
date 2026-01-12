export interface Recipe {
  id: string;
  title: string;
  description: string;
  ingredients: string[];
  steps: string[];
  cookingTime: number; // in minutes
  imageUrl: string;
  isFavorite?: boolean;
  category?: string;
  ratings?: number[];
  comments?: Comment[];
}

export interface Comment {
  user: string;
  text: string;
  date: Date;
  rating: number;
}
