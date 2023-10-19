
import Image from "next/image";
import Categories from "./components/categories";
import ProductsList from "./components/products-list";
import { prismaClient } from "@/lib/prisma";
import SectionTitle from "./components/section-title";
import PromoBanner from "./components/promo-banner";
import Footer from "@/components/ui/footer";
export default async function Home() {

  const productsOnOffer = await prismaClient.product.findMany({
    where: {
      discountPercentage: {
        gt: 0
      }
    }
  })

  const keyboards = await prismaClient.product.findMany({
    where: {
      category: {
        slug: "keyboards"
      }
    }
  })
  const mouses = await prismaClient.product.findMany({
    where: {
      category: {
        slug: "mouses"
      }
    }
  })

  return (
    <div className="flex flex-col gap-8">
      <PromoBanner src="/banner-home-01.png"
        alt="Até 55% desconto só esse mês" />

      <div className="px-5">
        <Categories />
      </div>

      <div >
        <p className="pl-5 font-bold uppercase mb-3">Ofertas</p>
        <ProductsList products={productsOnOffer} />
      </div>

      <PromoBanner src="/banner-home-02.png"
        alt="Até 55% de desconto em mouses" />

      <div >
        <SectionTitle>Teclados</SectionTitle>
        <ProductsList products={keyboards} />
      </div>

      <PromoBanner src="/banner-home-03.png"
        alt="Até 55% de desconto em fones" />

      <div >
        <SectionTitle>Mouses</SectionTitle>
        <ProductsList products={mouses} />
      </div>
    </div>
  )
}
