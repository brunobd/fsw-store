import { Badge } from "@/components/ui/badge"
import { authOptions } from "@/lib/auth"
import { prismaClient } from "@/lib/prisma"
import { ShoppingBasketIcon, ShoppingCartIcon } from "lucide-react"
import { getServerSession } from "next-auth"
import OrderItem from "./components/order-item"

const OrderPage = async () => {
  const user = getServerSession(authOptions)
  if (!user) {
    return
  }

  const orders = await prismaClient.order.findMany({
    where: {
      userId: (user as any).id
    },
    include: {
      orderProducts: {
        include: {
          product: true
        }
      }
    }
  })
  return (
    <div className="p-5">
      <Badge className="w-fit gap-1 text-base uppercase border-2 border-primary px-3 py-[0.365rem]" variant="outline">
        <ShoppingBasketIcon size={16} />
        Meus pedidos
      </Badge>

      {orders.map(order => (
        <div className="flex flex-col mt-5" key={order.id}>
          <OrderItem order={order} />
        </div>
      ))
      }
    </div>
  )
}

export default OrderPage