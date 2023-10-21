"use client"

import { Product } from "@prisma/client";
import { ReactNode, createContext, useState } from "react";

interface CartProduct extends Product {
  quantity: number
}

interface ICarContext {
  products: CartProduct[]
  total: number,
  subtotal: number,
  discount: number
  addProductsToCart: (product: CartProduct) => void
}

export const CartContext = createContext<ICarContext>({
  products: [],
  total: 0,
  subtotal: 0,
  discount: 0,
  addProductsToCart:()=>{}
})

const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([])

  const addProductsToCart = (product: CartProduct) => {
    setCartProducts((previousState) => [...previousState, product])
  }

  return (
    <CartContext.Provider
      value={{
        products: cartProducts,
        addProductsToCart,
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