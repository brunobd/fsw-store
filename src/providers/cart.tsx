"use client"

import { Product } from "@prisma/client";
import { ReactNode, createContext } from "react";

interface CartProduct extends Product {
  quantity: number
}

interface ICarContext {
  products: CartProduct[]
  total: number,
  subtotal: number,
  discount: number
}

const CartContext = createContext<ICarContext>({
  products: [],
  total: 0,
  subtotal: 0,
  discount: 0
})

const CartProvider = ({ children }: { children: ReactNode }) => {
  return (
    <CartContext.Provider
      value={{
        products: [],
        total: 0,
        subtotal: 0,
        discount: 0
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider