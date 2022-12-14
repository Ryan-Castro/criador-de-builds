import { useEffect, useRef } from "react"

export default function TFTChampion(props){
    const champ = useRef()
    useEffect(()=>{ 
        
        champ.current.addEventListener("dragstart", dragStart)
        function dragStart(e){
            e.dataTransfer.setData("text/plain", props.champion.apiName )
        }
    },[props])

    return(

        <div id={props.champion.apiName} draggable="true" ref={champ}>
            <img src={`https://raw.communitydragon.org/latest/game/assets/ux/tft/championsplashes/${props.champion.apiName.toLowerCase()}_square.tft_set8.png`} alt=""/>
        </div>

    )    
}