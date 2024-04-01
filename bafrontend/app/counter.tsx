"use client";
import { useState } from "react"

export default function Counter({initialState=0,}:{initialState?:number}){

    const [actualState, setState] = useState(initialState);
    return <div>

        <button onClick={() => {
            setState(actualState-1)
        }}>-</button>
        <button onClick={() => {
            setState(actualState+1)
        }}>+</button>

        <span>{actualState}</span>
    </div>;
}