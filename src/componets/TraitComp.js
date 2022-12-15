import { useEffect, useRef } from "react"
import styled from "styled-components"

const Ul = styled.ul`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 20px;
    overflow: auto;

    li{
        width: 90%;
        height: 50px;
        border: 1px solid black;
        display: flex;
        margin-bottom: 10px;
        border-radius: 15px;
    }

    .active{
        text-shadow: 1px 1px 0px yellow;
    }
    .divActive{
        order: -1;
        box-shadow: 0px 0px 5px yellow;
        border: 1px solid yellow;
    }
`

export default function TraitComp(props){

    const list = useRef()
    useEffect(()=>{
        list.current.innerHTML = ""
        Object.keys(props.traits).forEach((trait, i)=>{   
            Object.keys(props.current).forEach((traitcurrent, i)=>{
                if(props.traits[trait].name === traitcurrent){
                    let active = false
                    let effects = ""
                    props.traits[trait].effects.forEach(effect=>{
                        if(props.current[traitcurrent] >= effect.minUnits && props.current[traitcurrent] <= effect.maxUnits){
                            effects += `<span class="active">/ ${effect.minUnits} </span>`
                            active = true
                        } else {
                            effects += `<span>/ ${effect.minUnits} </span>`
                        }
                    })
                    list.current.innerHTML += `
                        <li key=${i} class=${active?"divActive":""}>
                            <img src="https://raw.communitydragon.org/latest/game/${props.traits[trait].icon.toLowerCase().replace("tex", "png")}" alt=""/><div><h2>${traitcurrent}</h2> ${effects.replace("/", "")}</div></li>`
                }
        })
        })

 
    },[props])

    return(
        <Ul ref={list}>
        </Ul>
    )
}