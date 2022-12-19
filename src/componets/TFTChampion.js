import { useEffect, useRef } from "react"
import styled from "styled-components"

const Card = styled.div`
    width: 105px;
    height: 105px;
    position: relative;
    overflow: visible; 

    div{
        content: attr(aria-label);
        display: flex;
        flex-direction: column;
        background-color: green;
        position: fixed;
        left: 10px;
        z-index: 5;
        opacity: 0;
        transition: .5s;
        pointer-events: none;
        width: 300px;
        height: 200px;
        overflow: auto; 
    }
    &:hover>div{
        opacity: 1;
        pointer-events: all;
    }

  

    img{
        width: 100px;
        height: 100px;
    }



`


export default function TFTChampion(props){
    const champ = useRef()

    useEffect(()=>{ 
        //console.log(props.champion)
        champ.current.addEventListener("dragstart", dragStart)
        function dragStart(e){
            e.dataTransfer.setData("text/plain", props.champion.apiName )
        } 

        champ.current.addEventListener('mouseover', ()=>{
            let position = champ.current.getBoundingClientRect()
            champ.current.children[1].style.left = `${position.x}px`
            champ.current.children[1].style.top = `${position.top - 200}px` 
        })
    },[props])
        
    
    

    useEffect(()=>{
        let info = props.champion.ability.desc
        console.log(props.champion.ability)
        props.champion.ability.variables.forEach(async (variable)=>{
            
            info = info.replace(`${variable.name}`, `${variable.value[1].toFixed(2)}/${variable.value[2].toFixed(2)}/${variable.value[3].toFixed(2)}`)
            champ.current.children[1].innerHTML = info
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
            <div></div>
        </Card>

    )    
}