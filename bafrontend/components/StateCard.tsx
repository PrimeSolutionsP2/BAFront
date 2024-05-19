import Color from "color";

interface StateCardProps {
    statusString: string;
    color: string;
    className?:string;
    textClassName?: string;
}
export default function StateCard({ statusString, color,className,textClassName }: StateCardProps) {

    const opaqueColor = Color(color).alpha(0.2).string();

    return (
        <div className={className} style={{backgroundColor:opaqueColor}}>
        <p className={textClassName} style={{color:color}}>
            {statusString}
        </p>
        </div>
        )
}