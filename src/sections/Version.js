import { useState } from "react"
import styled from "styled-components"
import ChampVer from "../componets/ChampVer"
import NavVersion from "../componets/NavVersion"
const Content = styled.div`
width: 100%;
height: 100%;
background-image: url('https://cdn.wallpapersafari.com/54/81/YWO8us.jpg');
display: flex;
justify-content: space-evenly;
align-items: center;
`

const Input = styled.div`
    width: 70%;
    height: 100%;
    background-color: red;
`

const Output = styled.div`
    width: 30%;
    height: 100%;
    background-color: blue;
`
export default function Version(){

    const [champion, setChampeons] = useState()
    

    function search(e){
        let version = e.target?e.target.options[e.target.selectedIndex].value:e
        fetch(`http://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`)
            .then(res=>res.json())
            .then(json=>{
                setChampeons(json)
            })
        }

    return(
        <Content>
            <Input>
                <NavVersion handleVersion={search}></NavVersion>
                <ChampVer champions={champion}></ChampVer>
            </Input>
            <Output >veja aqui o que mudou ao longo dos anos</Output>
        </Content>
    )
}