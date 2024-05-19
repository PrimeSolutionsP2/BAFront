import { ReactNode } from "react"

interface TitleProps {
    title : string
    children?:ReactNode
}

export default function TitleBar({ title, children } : TitleProps){

    
    return(
        <div className=" flex flex-row justify-between gap-10 shadow-lg p-3">
          <div>
          <span className="text-3xl font-bold">{title}</span>
        </div> 
           {children}
        </div>
    )
}