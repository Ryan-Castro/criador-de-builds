import { useEffect, useState } from "react"
import styled from "styled-components"
import ChampVer from "../componets/ChampVer"
import NavVersion from "../componets/NavVersion"
import ItemsVer from "../componets/ItemsVer"
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

`

const Output = styled.div`
    width: 30%;
    height: 100%;
    background-color: blue;
`
export default function Version(){

    const [champion, setChampeons] = useState()
    const [items, setItems] = useState()
    const [ShowChampions, serShowChampions] = useState(false)
    const [ShowItems, serShowItems] = useState(true)

    useEffect(()=>{
        search("12.23.1", false)
    },[])
    

    function search(e, type){
        let version = e.target?e.target.options[e.target.selectedIndex].value:e
        if(type){
            fetch(`http://ddragon.leagueoflegends.com/cdn/${version}/data/pt_BR/champion.json`)
                .then(res=>res.json())
                .then(json=>{
                    setChampeons(json)
                    serShowChampions(true)
                    serShowItems(false)
                })  
        } else {
            fetch(`http://ddragon.leagueoflegends.com/cdn/${version}/data/pt_BR/item.json`)
                .then(res=>res.json())
                .then(json=>{
                    setItems(json)
                    serShowChampions(false)
                    serShowItems(true)
                })  
        }
    }

    function showContent(e){
        let select = e.target.parentNode.children[2]
        if(e.target.value === "items"){
            search(select.options[select.selectedIndex].value, false)
        } else {
            search(select.options[select.selectedIndex].value, true)
        }
    }

    return(
        <Content>
            <Input>
                <NavVersion handleVersion={search} handleContent={showContent}></NavVersion>
                <ChampVer champions={champion} show={ShowChampions}></ChampVer>
                <ItemsVer items={items} show={ShowItems}></ItemsVer>
            </Input>
            <Output >veja aqui o que mudou ao longo dos anos</Output>
        </Content>
    )
}