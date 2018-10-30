import * as React from 'react';

export const Debug = (props: any)=>{
    return <div>{
        Object.keys(props)
        .map((e: string, index:number)=>(<div key={index}><span>{e}</span>{props[e]}</div>))
    }</div>
}
