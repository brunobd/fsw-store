"use client"
import Image from "next/image"
import { useState } from "react"

interface ProductImagesProps {
  name: string,
  imageUrls: string[]
}
const ProductImages = ({ imageUrls, name }: ProductImagesProps) => {
  const [currentImage, setCurrentImage] = useState(imageUrls[0])
  const handleImageClick = (imageUrl: string)=>{
    setCurrentImage(imageUrl)
  }

  return (
    <div className="flex flex-col">

      <div className="bg-accent h-[380px] w-full items-center flex justify-center" >
        <Image src={currentImage} alt={name}
          height={0}
          width={0}
          sizes="100vw"
          className="h-auto w-auto max-h-[70%] max-w-[80%]"
          style={{
            objectFit: "contain"
          }}
        />
      </div>
      <div className="mt-8 px-5 grid grid-cols-4 gap-4">
        {imageUrls.map(imageUrl => (
          <button 
            key={imageUrl} 
            className={`h-[100px] bg-accent rounded-lg flex justify-center items-center
              ${imageUrl === currentImage && 'border-2 border-primary border-solid'}
            `}
            onClick={()=>handleImageClick(imageUrl)}
            >

            <Image src={imageUrl} alt={name}
              height={0}
              width={0}
              sizes="100vw"
              className="h-auto w-auto max-h-[70%] max-w-[80%]"
              style={{
                objectFit: "contain"
              }}
            />
          </button>
        ))}
      </div>
    </div>
  )
}

export default ProductImages