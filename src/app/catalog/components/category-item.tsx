import { Category } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"

interface CategoryItemProps {
  category: Category
}
const CategoryItem = ({ category }: CategoryItemProps) => {
  return (
    <Link href={`/category/${category.slug}`} >
      <div className="flex flex-col" >
        <div className="rounded-tl-lg rounded-tr-lg bg-category-item-gradient flex items-center justify-center w-full h-[150px]" >
          <Image
            src={category.imageUrl}
            alt={category.name}
            width={0}
            height={0}
            sizes="100vw"
            className="h-auto w-auto min-w-[50%] min-h-[50%] max-w-[70%] max-h-[70%]"
            style={{
              objectFit: "contain"
            }}
          />
        </div>
        <div className="bg-accent py-2 rounded-bl-lg rounded-br-lg" >
          <p className="text-center  text-sm font-semibold">{category.name}</p>
        </div>
      </div >
    </Link>
  )
}

export default CategoryItem