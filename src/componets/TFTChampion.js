import { useEffect, useRef } from "react"
import styled from "styled-components"

const Card = styled.div`
    width: 105px;
    height: 105px;
    position: relative;
    overflow: visible; 
    &:hover>div{
        opacity: 1;
        pointer-events: all;
    }
    img{
        width: 100px;
        height: 100px;
    }
`

const InfosChamp = styled.div`
    overflow: none;
    display: flex;
    flex-direction: column;
    height: 100px;
`

const Tooltip = styled.div`
    display: flex;
    flex-direction: column;
    background-color: grey;
    position: fixed;
    z-index: 5;
    opacity: 0;
    transition: .5s;
    pointer-events: none;
    width: 300px;
    height: 300px;
    overflow: auto; 
    border-radius: 30px;
    padding: 10px;
    border 1px solid white;

    div{
        margin-bottom: 30px;
        overflow: auto;
    }
    h2{
        text-shadow: .5px .5px .5px white
    }
`


export default function TFTChampion(props){
    const champ = useRef()
    const tooltip = useRef()

    useEffect(()=>{ 
        champ.current.addEventListener("dragstart", dragStart)
        function dragStart(e){
            e.dataTransfer.setData("text/plain", props.champion.apiName )
        } 

        champ.current.addEventListener('mouseover', ()=>{
            let position = champ.current.getBoundingClientRect()
            if(position.x < props.dimensions.getBoundingClientRect().width/2){
                tooltip.current.style.left = `${position.x}px`
            } else {
                tooltip.current.style.left = `${position.x - 200}px`
            }
            tooltip.current.style.top = `${position.top - 300}px` 
        })
    },[props])

    useEffect(()=>{
        let info = props.champion.ability.desc
        tooltip.current.children[0].innerHTML = ''
        props.champion.traits.forEach(trait=>{
            tooltip.current.children[0].innerHTML += `<h2>${trait}</h2>`
        })
        props.champion.ability.variables.forEach(async (variable)=>{
            info = info.replace(`${variable.name}`, `${variable.value[1].toFixed(2)}/${variable.value[2].toFixed(2)}/${variable.value[3].toFixed(2)}`)
            tooltip.current.children[1].innerHTML = info
                                                    .replaceAll('@', "")
                                                    .replaceAll('Modified', '')
                                                    .replaceAll('<scaleAD>', '')
                                                    .replaceAll('</scaleAD>', '')
                                                    .replaceAll('<TFTKeyword>', '')
                                                    .replaceAll('</TFTKeyword>', '')
        })
        

    },[champ, props])
    

    return(

        <Card 
            id={props.champion.apiName} 
            draggable="true" 
            ref={champ} 
            className={`cost${props.champion.cost}`}
            >
            <img src={`https://raw.communitydragon.org/latest/game/assets/ux/tft/championsplashes/${props.champion.apiName.toLowerCase()}_square.tft_set8.png`} alt=""/>
            <Tooltip ref={tooltip}>
                <InfosChamp></InfosChamp>
                <div></div>
            </Tooltip>
        </Card>

    )    
}