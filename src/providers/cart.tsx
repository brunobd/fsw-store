"use client"

import { ProductWithFinalPrice } from "@/helpers/product";
import { ReactNode, createContext, useMemo, useState } from "react";

export interface CartProduct extends ProductWithFinalPrice {
  quantity: number
}

interface ICarContext {
  products: CartProduct[]
  total: number,
  subtotal: number,
  discount: number,
  cartTotalPrice: number,
  cartSubtotalPrice: number,
  cartTotalDiscount: number,
  addProductsToCart: (product: CartProduct) => void,
  decreaseProductQuantity: (productId: string) => void
  increaseProductQuantity: (productId: string) => void
  removeProductFromCart: (productId: string) => void
}

export const CartContext = createContext<ICarContext>({
  products: [],
  total: 0,
  subtotal: 0,
  discount: 0,
  cartTotalPrice: 0,
  cartSubtotalPrice: 0,
  cartTotalDiscount: 0,
  addProductsToCart: () => { },
  decreaseProductQuantity: () => { },
  increaseProductQuantity: () => { },
  removeProductFromCart: () => { }
})

const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([])
  const cartSubtotalPrice = useMemo(() => {
    return cartProducts.reduce((acc, cartProduct) => {
      return acc +  (cartProduct.quantity * Number(cartProduct.basePrice))
    }, 0)
  }, [cartProducts])
  const cartTotalPrice = useMemo(() => {
    return cartProducts.reduce((acc, cartProduct) => {
      return acc + (cartProduct.quantity *Number(cartProduct.finalPrice))
    }, 0)
  }, [cartProducts])

  const cartTotalDiscount = cartTotalPrice - cartSubtotalPrice 

  const addProductsToCart = (product: CartProduct) => {

    const productIsAlreadyOnCart = cartProducts.some(cartProduct => cartProduct.id === product.id)

    if (productIsAlreadyOnCart) {
      setCartProducts((previousState) => previousState.map(cartProduct => {
        if (cartProduct.id === product.id) {
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

  const decreaseProductQuantity = (productId: string) => {
    setCartProducts((previousState) =>
      previousState.map((cartProduct) => {
        if (cartProduct.id === productId) {
          return {
            ...cartProduct,
            quantity: cartProduct.quantity - 1
          }
        }
        return cartProduct
      }).filter((cartProduct) => cartProduct.quantity > 0)
    )
  }

  const increaseProductQuantity = (productId: string) => {
    setCartProducts((previousState) =>
      previousState.map((cartProduct) => {
        if (cartProduct.id === productId) {
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + 1
          }
        }
        return cartProduct
      })
    )
  }

  const removeProductFromCart = (productId: string) => {
    setCartProducts((previousState) =>
      previousState.filter((cartProduct) => {
        cartProduct.id !== productId
      })
    )
  }


  return (
    <CartContext.Provider
      value={{
        products: cartProducts,
        addProductsToCart,
        decreaseProductQuantity,
        increaseProductQuantity,
        removeProductFromCart,
        cartTotalPrice,
        cartSubtotalPrice,
        cartTotalDiscount,
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