import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card } from "@/components/ui/card"
import { Prisma } from "@prisma/client"

interface OrderItemProps {
  order: Prisma.OrderGetPayload<{
    include: {
      orderProducts: true
    }
  }>
}
const OrderItem = ({ order }: OrderItemProps) => {
  return (
    <Card className="px-3" >
      <Accordion type="single" className="w-full p-5" collapsible>
        <AccordionItem value={order.id}>
          <AccordionTrigger>
            <div className="flex flex-col gap-1 text-left">
              <p>Pedido com {order.orderProducts.length} produto(s)</p>
            </div>
          </AccordionTrigger>

          <AccordionContent>
            <div className="flex flex-col">
              <div className="flex items-center justify-between">
                <div >
                  <p className="font-bold" >Status</p>
                  <p className=" text-[#8162FF]">{order.status}</p>
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
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  )
}

export default OrderItem 