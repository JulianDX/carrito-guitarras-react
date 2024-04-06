import { db } from "../data/db";
import { cartState, GuitarT } from "../types/types";
import { GuitarWithQuan } from "../types/types";

const initialCart = (): GuitarWithQuan[] => {
  return JSON.parse(localStorage.getItem("cart")!) || [];
};

export type cartActions =
  | { type: "addToCart"; payload: { guitar: GuitarT } }
  | { type: "editQuantity"; payload: { id: GuitarT["id"]; value: string } }
  | { type: "eliminarGuitarra"; payload: { id: GuitarT["id"] } }
  | { type: "vaciarCarrito" };

export const initialState: cartState = {
  data: db,
  cart: initialCart(),
};

export const formDataReducer = (
  state: typeof initialState,
  action: cartActions
) => {
  switch (action.type) {
    case "addToCart":
      const item = {
        ...action.payload.guitar,
        quantity: 1,
      };
      let cart: GuitarWithQuan[] = [];
      const isAdded = state.cart.find(
        (item: GuitarT) => item.id === action.payload.guitar.id
      );
      if (isAdded) {
        const updatedCart = state.cart.map((item: GuitarWithQuan) => {
          if (item.id === action.payload.guitar.id) {
            return {
              ...item,
              quantity: item.quantity + 1,
            };
          }
          return item;
        });
        cart = updatedCart;
      } else {
        cart = [...state.cart, item];
      }
      return {
        ...state,
        cart,
      };
    case "editQuantity":
      const inCart = state.cart.find(
        (item: GuitarWithQuan) => item.id === action.payload.id
      );
      let newCart: GuitarWithQuan[] = [];
      if (inCart) {
        let updatedCart = state.cart.map((item: GuitarWithQuan) => {
          if (item.id === action.payload.id) {
            if (action.payload.value === "+") {
              return {
                ...item,
                quantity: item.quantity + 1,
              };
            } else {
              if (item.quantity > 1) {
                return {
                  ...item,
                  quantity: item.quantity - 1,
                };
              }
            }
          }
          return item;
        });
        newCart = updatedCart;
      }
      return {
        ...state,
        cart: newCart,
      };
    case "eliminarGuitarra":
      const updatedCart = state.cart.filter(
        (item: GuitarWithQuan) => item.id !== action.payload.id
      );
      return {
        ...state,
        cart: updatedCart,
      };
    case "vaciarCarrito":
      return {
        ...state,
        cart: [],
      };
    default:
      return state;
  }
};
