import { Badge } from "@/components/ui/badge"
import { prismaClient } from "@/lib/prisma"
import { ShapesIcon } from "lucide-react"
import CategoryItem from "./components/category-item"

const CatalogPage = async () => {

  const categories = await prismaClient.category.findMany({})
  return (
    <div className="p-5 flex flex-col gap-8">
      <Badge className="w-fit gap-1 text-base uppercase border-2 border-primary px-3 py-[0.365rem]" variant="outline">
        <ShapesIcon size={16} />
        Catálogo
      </Badge>

      <div className="grid grid-cols-2 gap-8">
        {categories.map(category => <CategoryItem category={category} key={category.id} />)}
      </div>


    </div>
  )
}

export default CatalogPage