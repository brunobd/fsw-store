import { Badge } from "@/components/ui/badge"
import { authOptions } from "@/lib/auth"
import { prismaClient } from "@/lib/prisma"
import { ShoppingBasketIcon, ShoppingCartIcon } from "lucide-react"
import { getServerSession } from "next-auth"
import OrderItem from "./components/order-item"
import { DefaultSession } from "next-auth";
import { NextResponse } from "next/server"

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

const OrderPage = async () => {
  const session = await getServerSession(authOptions)
  if (!session || !session.user) {
    return(
      <div className="flex h-full flex-col items-center justify-center">
        <h2 className="font-bold">Acesso negado</h2>
        <p className="text-sm opacity-60">Faça login para ver seus pedidos.</p>
      </div>
    )
  }

  const orders = await prismaClient.order.findMany({
    where: {
      userId: session.user.id
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