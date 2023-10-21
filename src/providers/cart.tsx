"use client"

import { ProductWithFinalPrice } from "@/helpers/product";
import { Product } from "@prisma/client";
import { ReactNode, createContext, useState } from "react";

export interface CartProduct extends ProductWithFinalPrice {
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
  addProductsToCart: () => { }
})

const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([])

  const addProductsToCart = (product: CartProduct) => {

    const productIsAlreadyOnCart = cartProducts.some(cartProduct => cartProduct.id === product.id)

    if (productIsAlreadyOnCart) {
      setCartProducts((previousState)=> previousState.map(cartProduct =>{
        if(cartProduct.id === product.id){
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + product.quantity
          }
        }
        return cartProduct
      }))
    } else {
      setCartProducts((previousState) => [...previousState, product])
    }

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