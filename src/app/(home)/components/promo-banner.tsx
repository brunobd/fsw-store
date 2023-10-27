import Image, { ImageProps } from "next/image"

const PromoBanner = ({src, alt}:ImageProps) => {
  return (
      <Image src={src}
        width={400}
        height={400}
        className="h-auto w-full px-5 mt-8 object-contain"
        alt={alt} />
  )
}

export default PromoBanner