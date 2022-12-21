import { useRef } from "react"
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

const Inputs = styled.div`
    width: 32%;
    height: 100%;
    background-color: red;
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
    background-color: yellow;
`
const Maestria = styled.div`
    width: 32%;
    height: 100%;
    background-color: purple;
`
const Historico = styled.div`
background-color: blue;
    width: 50%;
    height: 100%;
`

const Winrate = styled.div`
background-color: green;
    width: 50%;
    height: 100%;
`

export default function Info(){

    const inputName = useRef()
    const input = useRef()

    async function search(){
        fetch(`http://localhost:3333/summoner/${inputName.current.value}`)
            .then(res=>res.json())
            .then(json=>{
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
    return(
        <Content>
            <div>   
                <Maestria>
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
                <Elo>
                </Elo>
            
            </div>
            <div> 
                <Historico>
                </Historico>
                <Winrate>
                </Winrate>
            </div>
            
        </Content>
    )
}