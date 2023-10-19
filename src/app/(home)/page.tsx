
import Image from "next/image";
import Categories from "./components/categories";
import ProductsList from "./components/products-list";
import { prismaClient } from "@/lib/prisma";
export default async function Home() {

  const productsOnOffer = await prismaClient.product.findMany({
    where:{
      discountPercentage:{
        gt:0
      }
    }
  })

  return (
    <div >
      <Image src="/banner-home-01.png"
        width={0}
        height={0}
        className="h-auto w-full px-5"
        sizes="100vw"
        alt="Até 55% desconto só esse mês" />
      <div className="mt-8 px-5">
        <Categories />
      </div>
      <div className="mt-8">
      <ProductsList products={productsOnOffer}/>
      </div>
    </div>
  )
}
