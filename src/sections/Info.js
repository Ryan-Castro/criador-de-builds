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

    async function search(){
        fetch('http://localhost:3333/summoner/muybis').then(res=>res.json()).then(json=>console.log(json))        
    }
    return(
        <Content>
            <div>
                <Inputs>
                    <h2>Digite seu nick</h2>
                    <input></input>
                    <input type="button" value='buscar' onClick={search}/>
                </Inputs>
                <Elo>
                </Elo>
                <Maestria>
                </Maestria>
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