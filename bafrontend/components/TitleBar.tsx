
interface TitleProps {
    title : string
}

export default function TitleBar({ title } : TitleProps){

    
    return(
        <div className="h-[5%] shadow-lg">
           <span className="pl-8 text-3xl font-bold">{title}</span>
        </div>
    )
}