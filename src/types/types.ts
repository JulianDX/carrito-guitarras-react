export type GuitarT = {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
};

export type GuitarWithQuan = GuitarT & {
  quantity: number;
};

export type cartState = {
  data: GuitarT[];
  cart: GuitarWithQuan[];
};

