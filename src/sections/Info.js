import { useRef, useState } from "react"
import styled from "styled-components"
import Winrate from "../componets/infoWinrate"
const Content = styled.div`
    width: 100%;
    height: 100%;
    background-image: url('https://cdn.wallpapersafari.com/54/81/YWO8us.jpg');
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-direction: column;
    color: white;

    &>div{
        width: 100%;
        height: 40%;
        display: flex;
    }
`
const Maestria = styled.div`
    width: 32%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 50px;
    opacity: 0;
    transition: 1s;

    &>div{
        width: 32%;
        height: 70%;
        display: flex;
        flex-direction: column;
        align-items: center;
        border: 1px solid white;
        box-shadow: 2px 2px 2px white;
        justify-content: space-between;
        background-color: grey;
        
    }
    img{
        height: 50%;
        border-radius: 50%;
    }
    #mono{
        order: 2
    }
    #main1{
        order: 1;
        transform: scale(70%);
    }
    #main2{
        order: 3;
        transform: scale(70%);
    }
`
const Inputs = styled.div`
    width: 32%;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;

    div{
        width: 100%;
        height: 70%;
    }

    #imgBorder{
        height: 65%;
        position: absolute;
        left: 0px;
        right: 0px;
        margin: auto;
        z-index: 2;
    }
    div::after{
        content: attr(aria-label);
        position: absolute;
        left: 50%;
        top: 49%;
        transform: translateX(-50%);
        z-index: 2;
    }
    #imgIcon{
        height: 42%;
        top: 10%;
        left: 0px;
        right: 0px;
        margin: auto;
        border-radius: 100px;
        position: absolute;
    }

    input{
        width: 200px;
        text-align: center;
    }
`

const Elo = styled.div`
    width: 36%;
    height: 100%;
    display: flex;
    align-items: center;
    opacity: 0;
    transition: 1s;
    img{
        height: 60%;
    }
    div{
        white-space: nowrap;
        background-color: grey;
        padding: 30px;
        border-radius: 50px
    }
`

const Historico = styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: 1s;

    h1{
        width:25%;
    }
    
    &>ul{
        width: 90%;
        height: 90%;
        overflow: auto;
        display: grid;
        transform: scale(85%);
    }
    .win, .loser, .remake{
        width: 100%;
        height: 80px;
        border: 1px solid black;
        background-color: grey;
        display: flex;
        justify-content: space-between;
        padding: 5px;
        margin-bottom: 5px;
    }
    .win>img, .loser>img, .remake>img{
        height: 100%;
        border-radius: 50%;
    }
    .win{
        background-color: #28344E;
        border: 1px solid #000096;
        box-shadow: 0px 2px 5px blue;
    }
    .loser{
        background-color: #59343B;
        border: 1px solid #dd3051;
        box-shadow: 0px 2px 5px red;
    }
    .score{
        display: flex;
        flex-direction:column;
    }
    .teams{
        display: flex;      
        flex-direction: column;
        width: 30%;
        overflow: visible;
    }
    .team{
        height: 50%;
        display: flex;
        justify-content: space-between;
        overflow: visible;
    }
    .team>li{
        height: 90%;
        display: flex;
        align-items: center;
        margin-bottom: 2px;
        margin-left: 2px;
        position: relative;
        overflow: visible;
        &::after{
            content: attr(arial-label);
            background-color: grey;
            position: absolute;
            opacity: 0;
            transition: .5s;
            white-space: nowrap;
            height: 20px;
            border-radius: 30px;
            right:100%;
            z-index: 9;
            pointer-events: none;
            padding: 10px;
        }
        &:hover::after{
            opacity: 1;
        }
    }
    .team>li>img{
        height: 100%;
    }
`



export default function Info(){

    const inputName = useRef()
    const input = useRef()
    const mastery = useRef()
    const elo = useRef()
    const listMatches = useRef()
    let [puuid] = useState()
    let [score, setScore] = useState([])
    let scoreArrey = []

    async function search(){
        fetch(`http://localhost:3333/summoner/${inputName.current.value}`)
            .then(res=>res.json())
            .then(json=>{
                puuid = json.puuid
                searchMastery(json.mastery)
                searchRanked(json.ranked)
                searchMetchs(inputName.current.value)
                input.current.children[0].ariaLabel = json.summonerLevel
                input.current.children[1].innerHTML = json.name
                input.current.children[2].value = ""
                input.current.children[0].children[1].src = `https://ddragon.leagueoflegends.com/cdn/12.23.1/img/profileicon/${json.profileIconId}.png`
                if(json.summonerLevel < 41){input.current.children[0].children[0].src = 'https://vignette.wikia.nocookie.net/leagueoflegends/images/4/40/Level_30_Summoner_Icon_Border.png/revision/latest?cb=20180324105839'} 
                if(json.summonerLevel > 49){input.current.children[0].children[0].src = 'https://vignette.wikia.nocookie.net/leagueoflegends/images/c/c0/Level_50_Summoner_Icon_Border.png/revision/latest?cb=20180324105839'} 
                if(json.summonerLevel > 74){input.current.children[0].children[0].src = 'https://vignette.wikia.nocookie.net/leagueoflegends/images/d/d7/Level_75_Summoner_Icon_Border.png/revision/latest?cb=20180324105840'} 
                if(json.summonerLevel > 99){input.current.children[0].children[0].src = 'https://vignette.wikia.nocookie.net/leagueoflegends/images/9/99/Level_100_Summoner_Icon_Border.png/revision/latest?cb=20180324105841'} 
                if(json.summonerLevel > 124){input.current.children[0].children[0].src = 'https://vignette.wikia.nocookie.net/leagueoflegends/images/e/eb/Level_125_Summoner_Icon_Border.png/revision/latest?cb=20180324105841'} 
                if(json.summonerLevel > 149){input.current.children[0].children[0].src = 'https://vignette.wikia.nocookie.net/leagueoflegends/images/8/8f/Level_150_Summoner_Icon_Border.png/revision/latest?cb=20180324105842'} 
                if(json.summonerLevel > 174){input.current.children[0].children[0].src = 'https://vignette.wikia.nocookie.net/leagueoflegends/images/9/9e/Level_175_Summoner_Icon_Border.png/revision/latest?cb=20180324105842'} 
                if(json.summonerLevel > 199){input.current.children[0].children[0].src = 'https://vignette.wikia.nocookie.net/leagueoflegends/images/1/11/Level_200_Summoner_Icon_Border.png/revision/latest?cb=20180324105843'} 
                if(json.summonerLevel > 224){input.current.children[0].children[0].src = 'https://vignette.wikia.nocookie.net/leagueoflegends/images/e/e6/Level_225_Summoner_Icon_Border.png/revision/latest?cb=20180324105844'} 
                if(json.summonerLevel > 249){input.current.children[0].children[0].src = 'https://vignette.wikia.nocookie.net/leagueoflegends/images/b/bd/Level_250_Summoner_Icon_Border.png/revision/latest?cb=20180324105838'} 
                if(json.summonerLevel > 276){input.current.children[0].children[0].src = 'https://vignette.wikia.nocookie.net/leagueoflegends/images/2/27/Level_275_Summoner_Icon_Border.png/revision/latest?cb=20180324105914'} 
                if(json.summonerLevel > 299){input.current.children[0].children[0].src = 'https://vignette.wikia.nocookie.net/leagueoflegends/images/7/70/Level_300_Summoner_Icon_Border.png/revision/latest?cb=20180324105915'} 
                if(json.summonerLevel > 326){input.current.children[0].children[0].src = 'https://vignette.wikia.nocookie.net/leagueoflegends/images/1/1c/Level_325_Summoner_Icon_Border.png/revision/latest?cb=20180324105916'} 
                if(json.summonerLevel > 349){input.current.children[0].children[0].src = 'https://vignette.wikia.nocookie.net/leagueoflegends/images/b/b4/Level_350_Summoner_Icon_Border.png/revision/latest?cb=20180324105917'} 
                if(json.summonerLevel > 376){input.current.children[0].children[0].src = 'https://vignette.wikia.nocookie.net/leagueoflegends/images/6/6f/Level_375_Summoner_Icon_Border.png/revision/latest?cb=20180324105917'} 
                if(json.summonerLevel > 399){input.current.children[0].children[0].src = 'https://vignette.wikia.nocookie.net/leagueoflegends/images/8/88/Level_400_Summoner_Icon_Border.png/revision/latest?cb=20180406054517'} 
                if(json.summonerLevel > 424){input.current.children[0].children[0].src = 'https://vignette.wikia.nocookie.net/leagueoflegends/images/e/e3/Level_425_Summoner_Icon_Border.png/revision/latest?cb=20180406054642'} 
                if(json.summonerLevel > 449){input.current.children[0].children[0].src = 'https://vignette.wikia.nocookie.net/leagueoflegends/images/a/a9/Level_450_Summoner_Icon_Border.png/revision/latest?cb=20180406054738'} 
                if(json.summonerLevel > 474){input.current.children[0].children[0].src = 'https://vignette.wikia.nocookie.net/leagueoflegends/images/9/9f/Level_475_Summoner_Icon_Border.png/revision/latest?cb=20180406054805'} 
                if(json.summonerLevel > 499){input.current.children[0].children[0].src = 'https://vignette.wikia.nocookie.net/leagueoflegends/images/2/2e/Level_500_Summoner_Icon_Border.png/revision/latest?cb=20180406054832'} 
                
            })        
    }

    function searchMastery(masteryInput){
        fetch(`http://localhost:3333/champions`).then(res=>res.json()).then(champions=>{
            for(let i = 0; i < 3 ; i++){
                mastery.current.children[i].innerHTML = `
                    <img src="http://ddragon.leagueoflegends.com/cdn/12.23.1/img/champion/${champions[masteryInput[i].championId]}.png"/>
                    <div>
                        <h1>${champions[masteryInput[i].championId]}</h1>
                        <h2>${masteryInput[i].championPoints}</h2>
                    </div>    `
            }
        })
        mastery.current.style.opacity = 1
    }

    function searchRanked(ranked){
        elo.current.innerHTML = `
            <img src='./emblemas/${ranked.tier}.png' alt=""/>
            <div>
                <h1>Tier: ${ranked.rank}</h1>
                <h2>Wins / Losses: ${ranked.wins}/${ranked.losses}</h2>
                <h2>PDL: ${ranked.leaguePoints}</h2>
            </div>`
        elo.current.style.opacity = 1
    }

    function searchMetchs(summonerName, queue){
        let queueInput = queue?queue:""
        fetch(`http://localhost:3333/metchs?summonerName=${summonerName}&queue=${queueInput}`)
        .then(res=>res.json())
        .then(async json=>{
            listMatches.current.innerHTML=""
            await json.forEach((metch, i)=>{
                fetch(`http://localhost:3333/metch/${metch}`)
                    .then(res=>res.json())
                    .then(json=>{createHistoc(json,i)})
            })
        })
      
    }

    function createHistoc(match, i){
       
        let gameMode
        let isWiner
        let player
        let teamA = []
        let teamB = [] 
        match.info.participants.forEach(participant=>{
            if(participant.teamId === 100){
                teamA.push({champion: participant.championName==="FiddleSticks"?"Fiddlesticks":participant.championName, player: participant.summonerName})
            }
            if(participant.teamId === 200){
                teamB.push({champion: participant.championName==="FiddleSticks"?"Fiddlesticks":participant.championName, player: participant.summonerName})
            }
            if(participant.puuid === puuid){
                player = participant
                match.info.teams.forEach(team=>{
                    if(team.teamId === participant.teamId){
                        isWiner = team.win
                    }
                }) 
            }
        })
        scoreArrey.push({
            champion: player.championName, 
            kills: player.kills,
            deaths: player.deaths,
            assists: player.assists,
            result: player.win?1:0,
            surrender: player.gameEndedInEarlySurrender
        })
        if(scoreArrey.length === 20){
            setScore(scoreArrey)
            listMatches.current.parentNode.style.opacity = 1
        }
        switch (match.info.queueId) {
            case 400: gameMode = "Normal Game"; break;
            case 420: gameMode = "Ranked Solo"; break;
            case 440: gameMode = "Ranked flex"; break;
            case 450: gameMode = "ARAM"; break;
            case 700: gameMode = "Clash"; break;
            case 76: gameMode = "URF"; break;
            case 1020: gameMode = "Um por todos"; break;
            default: gameMode = "Não encontrado"; break;
        }
        listMatches.current.innerHTML += `
            <li style="order:${i}" class="${player.gameEndedInEarlySurrender?"remake":isWiner?"win":"loser"}">
                <h1>${gameMode}</h1>
                <img alt="" src="http://ddragon.leagueoflegends.com/cdn/12.23.1/img/champion/${player.championName==="FiddleSticks"?"Fiddlesticks":player.championName}.png">
                <div class='score'><h2>KDA = ${((player.kills+player.assists)/(player.deaths===0?1:player.deaths)).toFixed(2)} </h2><h2> ${player.kills}/${player.deaths}/${player.assists} </h2> </div>
                <div class="teams">
                    <ul class="team">
                        <li arial-label="${teamA[0].player}"><img src="http://ddragon.leagueoflegends.com/cdn/12.23.1/img/champion/${teamA[0].champion}.png" alt=""></li>
                        <li arial-label="${teamA[1].player}"><img src="http://ddragon.leagueoflegends.com/cdn/12.23.1/img/champion/${teamA[1].champion}.png" alt=""></li>
                        <li arial-label="${teamA[2].player}"><img src="http://ddragon.leagueoflegends.com/cdn/12.23.1/img/champion/${teamA[2].champion}.png" alt=""></li>
                        <li arial-label="${teamA[3].player}"><img src="http://ddragon.leagueoflegends.com/cdn/12.23.1/img/champion/${teamA[3].champion}.png" alt=""></li>
                        <li arial-label="${teamA[4].player}"><img src="http://ddragon.leagueoflegends.com/cdn/12.23.1/img/champion/${teamA[4].champion}.png" alt=""></li>
                    </ul>
                    <ul class="team">
                        <li arial-label="${teamB[0].player}"><img src="http://ddragon.leagueoflegends.com/cdn/12.23.1/img/champion/${teamB[0].champion}.png" alt=""></li>
                        <li arial-label="${teamB[1].player}"><img src="http://ddragon.leagueoflegends.com/cdn/12.23.1/img/champion/${teamB[1].champion}.png" alt=""></li>
                        <li arial-label="${teamB[2].player}"><img src="http://ddragon.leagueoflegends.com/cdn/12.23.1/img/champion/${teamB[2].champion}.png" alt=""></li>
                        <li arial-label="${teamB[3].player}"><img src="http://ddragon.leagueoflegends.com/cdn/12.23.1/img/champion/${teamB[3].champion}.png" alt=""></li>
                        <li arial-label="${teamB[4].player}"><img src="http://ddragon.leagueoflegends.com/cdn/12.23.1/img/champion/${teamB[4].champion}.png" alt=""></li>
                    </ul>
                </div>
            </li>`
    }
    return(
        <Content>
            <div>   
                <Maestria ref={mastery}>
                    <div id="mono"></div>
                    <div id="main1"></div>
                    <div id="main2"></div>
                </Maestria>
                <Inputs ref={input}>
                    <div aria-label="00">
                        <img src="https://vignette.wikia.nocookie.net/leagueoflegends/images/4/40/Level_30_Summoner_Icon_Border.png/revision/latest?cb=20180324105839" alt='' id="imgBorder" />
                        <img src="" alt='' id="imgIcon"/>    
                    </div>
                    <h2>Seu nick</h2>
                    <input ref={inputName} placeholder="Coloque seu Nick"></input>
                    <input type="button" value='buscar' onClick={search}/>
                </Inputs>
                <Elo ref={elo}>
                </Elo>
            
            </div>
            <div> 
                <Historico>
                    <ul ref={listMatches}>

                    </ul>
                </Historico>
                <Winrate score={score}>    
                </Winrate>
            </div>
            
        </Content>
    )
}