import { ShoppingCartIcon } from "lucide-react"
import { Badge } from "./badge"
import { useContext } from "react"
import { CartContext } from "@/providers/cart"
import CartItem from "./cart-item"
import { Separator } from "./separator"
import { ScrollArea } from "./scroll-area"
import { Button } from "./button"

const Cart = () => {
  const { products, cartSubtotalPrice, cartTotalDiscount, cartTotalPrice } = useContext(CartContext)
  return (
    <div className="flex flex-col gap-8 h-full">
      <Badge className="w-fit gap-1 text-base uppercase border-2 border-primary px-3 py-[0.365rem]" variant="outline">
        <ShoppingCartIcon size={16} />
        Carrinho
      </Badge>

      <div className="flex h-full max-h-full flex-col gap-5 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="flex flex-col gap-8 h-full">
            {products.length > 0 ?
              products.map(product => (<CartItem key={product.id} product={product} />))
              : (
                <p className="opacity-75">Seu carrinho está vazio.</p>
              )
            }
          </div>
        </ScrollArea>
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

        <div className="flex items-center justify-between font-bold">
          <p>Total</p>
          <p>{cartTotalPrice.toLocaleString('pt-BR', { style: "currency", currency: "BRL" })}</p>
        </div>
        <Button className="font-bold uppercase mt-7">Finalizar compra</Button>
      </div>
    </div>
  )
}

export default Cart