import { useEffect, useRef } from "react"
import styled from "styled-components"

const Content = styled.div`
    width: 100%;
    height: 95%;
    overflow: auto;
    .champion{
        height: 100px;
        display: flex;
        background-color: grey;
        border: 1px solid black;
        margin-bottom: 3px;
        box-shadow: 0px 1px 3px white;
        padding: 3px;
    }
    .champion>img{
        width: 94px;
    }   
    .infos{
        width: 30% !important;
    }
    .champion>div{
        display: flex;
        align-items: center;
        flex-direction: column;
        width: 60%;
        
    }
    .champion p{
        overflow: auto;
        height: 100px;
    }
    .champion ul{
        display: grid;
        height: 50px;
        grid-template-columns: 1fr 1fr;
    }
    .champion ul>li{
        display: flex;
        align-items: center;
    }
 
`

export default function ChampVer(props){

    const list = useRef()
    const show = useRef()
    
    useEffect(()=>{
        if(props.show){
            show.current.style.display = "block"
        } else {
            show.current.style.display = "none"
        }
        if(props.champions){
            list.current.innerHTML = ""
            Object.keys(props.champions.data).forEach((champion)=>{ 
                let stats = props.champions.data[champion].stats
                list.current.innerHTML += `
                <li class="champion">
                    <div>
                        <img src="http://ddragon.leagueoflegends.com/cdn/${props.champions.version}/img/champion/${champion}.png"/>
                        <button class="btn">+</button>
                    </div>
                    <div class="infos">
                        <h1>${champion}</h1>
                        <ul>
                            <li><img src="https://raw.communitydragon.org/latest/game/assets/perks/statmods/statmodshealthscalingicon.png"/>${stats.hp}</li>
                            <li><img src="https://raw.communitydragon.org/latest/game/assets/perks/statmods/statmodsarmoricon.png"/>${stats.armor}</li>
                            <li><img src="https://raw.communitydragon.org/latest/game/assets/perks/statmods/statmodsmagicresicon.magicresist_fix.png"/>${stats.spellblock}</li>
                            <li><img src="https://raw.communitydragon.org/latest/game/assets/perks/statmods/statmodsattackspeedicon.png"/>${stats.attackspeed?(stats.attackspeed).toFixed(2):(1 + stats.attackspeedoffset).toFixed(2)}</li>
                        </ul>
                    </div>
                    <div>
                        <p>${props.champions.data[champion].blurb}</p>
                    </div>
                </li>`
            })
            for(let i = 0; i<list.current.children.length;i++)
            list.current.children[i].addEventListener('click', props.handleClickItem)
        }
    },[props])
    return(
        <Content ref={show}>
            <ul ref={list}>
            </ul>
        </Content>
    )
}