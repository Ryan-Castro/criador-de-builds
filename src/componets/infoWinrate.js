import { useEffect, useRef } from "react"
import styled from "styled-components"

const Winratediv = styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    opacity: 0;
    transition: 1s;
    &>h1{
        height: 20%;
    }

`

const ChampionsDiv = styled.div`
    height: 100%;
    overflow: auto;
    margin-top: 40px;
    .list{
        gap: 10px;
        display: flex;
        flex-wrap: wrap;
    }
    .list>div{
        width: 18%;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 10px;
        border-radius: 20px;
        background-color: grey;
        border: 1px solid black;
        box-shadow: 1px 1px .5px white;
    }
    img{
        width: 50%;
    }
`

const Geral = styled.div`
    display: flex;
    width: 100%;
    height: 30%;
    justify-content: space-evenly;
    margin-top: 20px;
`

export default function Winrate(props){

    const championsDiv = useRef()
    const summoner = useRef()
    useEffect(()=>{
        let summonerObj = {}
        let championScore = {}
        let partidas = 0
        props.score.forEach((metch)=>{
            if(!metch.surrender){
                championScore[metch.champion] ={
                    pickrate: (championScore[metch.champion]?championScore[metch.champion].pickrate:0) + 1,
                    kills: (championScore[metch.champion]?championScore[metch.champion].kills:0) + metch.kills,
                    deaths: (championScore[metch.champion]?championScore[metch.champion].deaths:0) + metch.deaths ,
                    assists: (championScore[metch.champion]?championScore[metch.champion].assists:0) + metch.assists,
                    winrate: (championScore[metch.champion]?championScore[metch.champion].winrate:0) + metch.result,
                }
                summonerObj = {
                    kills: (summonerObj["kills"]?summonerObj["kills"]:0) + metch.kills,
                    deaths: (summonerObj["deaths"]?summonerObj["deaths"]:0) + metch.deaths ,
                    assists: (summonerObj["assists"]?summonerObj["assists"]:0) + metch.assists, 
                    winrate: (summonerObj["winrate"]?summonerObj["winrate"]:0) + metch.result 
            }
            summoner.current.parentNode.style.opacity = 1
            partidas++
            }
        })
        
        summoner.current.innerHTML = `
            <div>
                <h3>${(summonerObj.kills/partidas).toFixed(1)} / ${(summonerObj.deaths/partidas).toFixed(1)} / ${(summonerObj.assists/partidas).toFixed(1)} </h3>
                <h3>KDA = ${((summonerObj.kills/partidas + summonerObj.assists/partidas) /(summonerObj.deaths/partidas)).toFixed(2)} </h3>
            </div>
            <div>
                <h3>WinRate: ${(summonerObj.winrate/partidas)*100}%</h3>
                <h3>kills/P: ${(( summonerObj.kills/partidas / (summonerObj.kills/partidas + summonerObj.assists/partidas))*100).toFixed(2)}%</h3>
            
            </div>`
        championsDiv.current.innerHTML = "" 
        Object.keys(championScore).forEach((champion)=>{
            championsDiv.current.innerHTML += `
            <div class="champion">
                <img alt="" src="http://ddragon.leagueoflegends.com/cdn/12.23.1/img/champion/${champion==="FiddleSticks"?"Fiddlesticks":champion}.png">
                <h4>${(championScore[champion].pickrate/20)*100}%</h4>
                <h4>KDA: ${((championScore[champion].kills/championScore[champion].pickrate + championScore[champion].assists/championScore[champion].pickrate) / championScore[champion].deaths/championScore[champion].pickrate).toFixed(2)}</h4>
                <h4>${championScore[champion].kills/20} / ${championScore[champion].deaths/20} / ${championScore[champion].assists/20}</h4>
                <h4>WinRate: ${(championScore[champion].winrate/championScore[champion].pickrate)*100}%</h4>
            </div>`
        })
        
},[props])
    
    return(
        <Winratediv>
            <h1>Estatisticas da ultimas 20 partidas</h1>
            <Geral ref={summoner}>Visão geral</Geral>
            <ChampionsDiv>Cada campeção<div ref={championsDiv} className="list"></div></ChampionsDiv>
        </Winratediv>
    )
}