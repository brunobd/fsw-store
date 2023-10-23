import { Heading1, ShoppingCartIcon } from "lucide-react"
import { Badge } from "./badge"
import { useContext } from "react"
import { CartContext } from "@/providers/cart"
import CartItem from "./cart-item"
import { Separator } from "./separator"

const Cart = () => {
  const { products, cartSubtotalPrice, cartTotalDiscount, cartTotalPrice } = useContext(CartContext)
  return (
    <div className="flex flex-col gap-5">
      <Badge className="w-fit gap-1 text-base uppercase border-2 border-primary px-3 py-[0.365rem]" variant="outline">
        <ShoppingCartIcon size={16} />
        Carrinho
      </Badge>
      {products.length === 0 ? (<p className="opacity-75">Seu carrinho está vazio.</p>)
        : (
          <>
            <div className="flex flex-col gap-5">
              {products.map(product => (<CartItem key={product.id} product={product} />))}
            </div>
            <div className="flex flex-col gap-3">
              <Separator />
              <div className="flex items-center justify-between">
                <p>Subtotal</p>
                <p>{cartSubtotalPrice.toLocaleString('pt-BR', { style: "currency", currency: "BRL" })}</p>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <p>Entrega</p>
                <p className="uppercase">Grátis</p>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <p>Descontos</p>
                <p>{cartTotalDiscount.toLocaleString('pt-BR', { style: "currency", currency: "BRL" })}</p>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <p>Total</p>
                <p>{cartTotalPrice.toLocaleString('pt-BR', { style: "currency", currency: "BRL" })}</p>
              </div>
            </div>
          </>
        )}

    </div>
  )
}

export default Cart