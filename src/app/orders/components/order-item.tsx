import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card } from "@/components/ui/card"
import { Prisma } from "@prisma/client"
import OrderProductItem from "./order-product-item"
import { Separator } from "@/components/ui/separator"
import { useMemo } from "react"
import { computeProductFinalPrice } from "@/helpers/product"
import { getOrderStatus } from "../helpers/status"

interface OrderItemProps {
  order: Prisma.OrderGetPayload<{
    include: {
      orderProducts: {
        include: { product: true }
      }
    }
  }>
}
const OrderItem = ({ order }: OrderItemProps) => {
  const orderSubtotalPrice = useMemo(() => {
    return order.orderProducts.reduce((acc, orderProduct) => {
      return acc + Number(orderProduct.product.basePrice) * orderProduct.quantity
    }, 0)
  }, [order.orderProducts])

  const orderTotalPrice = useMemo(() => {
    return order.orderProducts.reduce((acc, orderProduct) => {
      const productWithFinalPrice = computeProductFinalPrice(orderProduct.product)
      return acc + productWithFinalPrice.finalPrice * orderProduct.quantity
    }, 0)
  }, [order.orderProducts])

  const orderTotalDiscount = orderTotalPrice - orderSubtotalPrice

  return (
    <Card className="px-3" >
      <Accordion type="single" className="w-full p-5" collapsible>
        <AccordionItem value={order.id}>
          <AccordionTrigger>
            <div className="flex flex-col gap-1 text-left">
              <p className="uppercase font-bold">Pedido com {order.orderProducts.length} produto(s)</p>
              <span className="text-xs opacity-60">Feito em {order.createdAt.toLocaleDateString("pt-br")}</span>
            </div>
          </AccordionTrigger>

          <AccordionContent>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div >
                  <p className="font-bold" >Status</p>
                  <p className=" text-[#8162FF]">{getOrderStatus(order.status)}</p>
                </div>
                <div >
                  <p className="font-bold" >Data</p>
                  <p className="opacity-60">{order.createdAt.toLocaleDateString("pt-br")}</p>
                </div>
                <div >
                  <p className="font-bold" >Pagamento</p>
                  <p className="opacity-60">Cartão</p>
                </div>
              </div>
              {order.orderProducts.map((orderProduct) => (
                <OrderProductItem key={orderProduct.id} orderProduct={orderProduct} />
              ))}
              <div className="flex flex-col gap-3">
                <Separator />

                <div className="flex items-center justify-between">
                  <p>Subtotal</p>
                  <p>{orderSubtotalPrice.toLocaleString('pt-BR', { style: "currency", currency: "BRL" })}</p>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <p>Entrega</p>
                  <p className="uppercase">Grátis</p>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <p>Descontos</p>
                  <p>{orderTotalDiscount.toLocaleString('pt-BR', { style: "currency", currency: "BRL" })}</p>
                </div>

                <Separator />

                <div className="flex items-center justify-between font-bold">
                  <p>Total</p>
                  <p>{orderTotalPrice.toLocaleString('pt-BR', { style: "currency", currency: "BRL" })}</p>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  )
}

export default OrderItem 