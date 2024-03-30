import Color from "color";

interface StateCardProps {
    statusString: string;
    color: string;
    className?:string;
}
export default function StateCard({ statusString, color,className }: StateCardProps) {

    const opaqueColor = Color(color).alpha(0.5).string();

    return (
        <div className={className} style={{backgroundColor:opaqueColor}}>
        <span className="font-semibold w-max text-center p-5" style={{color:color}}>
            {statusString}
        </span>
        </div>
        )
}