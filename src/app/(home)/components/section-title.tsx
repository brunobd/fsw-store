import { ComponentProps } from "react"

const SectionTitle = ({children}:ComponentProps<"p">) =>{
  return (

        <p className="pl-5 font-bold uppercase mb-3">{children}</p>
  )
}

export default SectionTitle