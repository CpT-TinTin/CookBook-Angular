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
}
