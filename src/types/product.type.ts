export interface IProduct {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  forWho: string;
  trending: string;
  rating: number;
  image: string;
  type: string
}

export interface IChangeRating {
  userId: any
  rating: number | null
  productId: string | null
}