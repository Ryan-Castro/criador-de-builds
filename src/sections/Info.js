import { useRef, useState } from "react"
import styled from "styled-components"
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
        height: 50%;
        display: flex;
    }
`
const Maestria = styled.div`
    width: 32%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

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
        width: 100%;
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
        top: 50%;
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
    
    &>ul{
        width: 90%;
        height: 90%;
        overflow: auto;
        display: grid;
    }
    &>ul>li{
        width: 100%;
        height: 80px;
        border: 1px solid black;
        background-color: grey;
        display: flex;
        justify-content: space-between;
        padding: 5px
    }
    &>ul>li>img{
        height: 70%;
    }
    div{
        display: flex;
    }
    .team{
        height: 100%;
        display: flex;
        flex-direction: column;
    }
    .team>li{
        height: 20%;
        display: flex;
        align-items: center;
        margin-bottom: 2px
    }

    .team>li>img{
        height: 100%;
    }
`

const Winrate = styled.div`
    background-color: green;
    width: 50%;
    height: 100%;
`

export default function Info(){

    const inputName = useRef()
    const input = useRef()
    const mastery = useRef()
    const elo = useRef()
    const listMatches = useRef()
    let [puuid] = useState()

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
    }

    function searchRanked(ranked){
        elo.current.innerHTML = `
            <img src='./emblemas/${ranked.tier}.png' alt=""/>
            <div>
                <h1>Tier: ${ranked.rank}</h1>
                <h2>Wins / Losses: ${ranked.wins}/${ranked.losses}</h2>
                <h2>PDL: ${ranked.leaguePoints}</h2>
            </div>`
    }

    function searchMetchs(summonerName, queue){
        let queueInput = queue?queue:""
        fetch(`http://localhost:3333/metchs?summonerName=${summonerName}&queue=${queueInput}`)
        .then(res=>res.json())
        .then(json=>{
            listMatches.current.innerHTML=""
            json.forEach((metch, i)=>{
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
                teamA.push({champion: participant.championName, player: participant.summonerName})
            }
            if(participant.teamId === 200){
                teamB.push({champion: participant.championName, player: participant.summonerName})
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
        
        switch (match.info.gameMode) {
            case 'CLASSIC': gameMode = "Normal"; break;
            default: gameMode = match.info.gameMode; break;
        }
        listMatches.current.innerHTML += `
            <li style="order:${i}; background-color:${isWiner?"#28344E":"#59343B"}">
                ${gameMode}
                <img alt="" src="http://ddragon.leagueoflegends.com/cdn/12.23.1/img/champion/${player.championName}.png">
                <div>${player.kills}/${player.deaths}/${player.assists} KDA = ${(player.kills+player.assists)/player.deaths}</div>
                <div>
                    <ul class="team">
                        <li><img src="http://ddragon.leagueoflegends.com/cdn/12.23.1/img/champion/${teamA[0].champion}.png" alt="">${teamA[0].player}</li>
                        <li><img src="http://ddragon.leagueoflegends.com/cdn/12.23.1/img/champion/${teamA[1].champion}.png" alt="">${teamA[1].player}</li>
                        <li><img src="http://ddragon.leagueoflegends.com/cdn/12.23.1/img/champion/${teamA[2].champion}.png" alt="">${teamA[2].player}</li>
                        <li><img src="http://ddragon.leagueoflegends.com/cdn/12.23.1/img/champion/${teamA[3].champion}.png" alt="">${teamA[3].player}</li>
                        <li><img src="http://ddragon.leagueoflegends.com/cdn/12.23.1/img/champion/${teamA[4].champion}.png" alt="">${teamA[4].player}</li>
                    </ul>
                    <ul class="team">
                        <li><img src="http://ddragon.leagueoflegends.com/cdn/12.23.1/img/champion/${teamB[0].champion}.png" alt="">${teamB[0].player}</li>
                        <li><img src="http://ddragon.leagueoflegends.com/cdn/12.23.1/img/champion/${teamB[1].champion}.png" alt="">${teamB[1].player}</li>
                        <li><img src="http://ddragon.leagueoflegends.com/cdn/12.23.1/img/champion/${teamB[2].champion}.png" alt="">${teamB[2].player}</li>
                        <li><img src="http://ddragon.leagueoflegends.com/cdn/12.23.1/img/champion/${teamB[3].champion}.png" alt="">${teamB[3].player}</li>
                        <li><img src="http://ddragon.leagueoflegends.com/cdn/12.23.1/img/champion/${teamB[4].champion}.png" alt="">${teamB[4].player}</li>
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
                <Winrate>
                </Winrate>
            </div>
            
        </Content>
    )
}