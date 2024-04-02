import Color from "color";

interface StateCardProps {
    statusString: string;
    color: string;
    className?:string;
}
export default function StateCard({ statusString, color,className }: StateCardProps) {

    const opaqueColor = Color(color).alpha(0.2).string();

    return (
        <div className={className} style={{backgroundColor:opaqueColor}}>
        <p className="font-medium p-3" style={{color:color}}>
            {statusString}
        </p>
        </div>
        )
}