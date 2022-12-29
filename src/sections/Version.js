import { useEffect, useState } from "react"
import styled from "styled-components"
import ChampVer from "../componets/ChampVer"
import NavVersion from "../componets/NavVersion"
import ItemsVer from "../componets/ItemsVer"
import Output from "../componets/OutputVer"
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

export default function Version(){

    const [champion, setChampeons] = useState()
    const [items, setItems] = useState()
    const [ShowChampions, serShowChampions] = useState(false)
    const [ShowItems, serShowItems] = useState(true)
    const [arreyDiv] = useState([])
    const [update, setUpdate] = useState(false)

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

    function updatePage(){
        if(update){
            setUpdate(false)
        } else {
            setUpdate(true)
        }
    }

    function clickItem(e){
        if(e.target.className==="btn"){
            if(!arreyDiv[0]){
                arreyDiv[0] = `${e.path[1].innerHTML}`
                updatePage()
            } else {
                if(!arreyDiv[1]){
                    arreyDiv[1] = `${e.path[1].innerHTML}` 
                    updatePage()
                }
            }
        } 
    }
    function clickChampion(e){
        if(e.target.className==="btn"){
            if(!arreyDiv[0]){
                console.log(e)
                arreyDiv[0] = `${e.path[2].innerHTML}`
                updatePage()
            } else {
                if(!arreyDiv[1]){
                    arreyDiv[1] = `${e.path[2].innerHTML}` 
                    updatePage()
                }
            }
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

    function delet1(){
        arreyDiv[0] = ''
        updatePage()
    }
    function delet2(){
        arreyDiv[1] = ''
        updatePage()
    }

    return(
        <Content>
            <Input>
                <NavVersion handleVersion={search} handleContent={showContent}></NavVersion>
                <ChampVer champions={champion} show={ShowChampions} handleClickItem={clickChampion}></ChampVer>
                <ItemsVer items={items} show={ShowItems} handleClickItem={clickItem}></ItemsVer>
            </Input>
            <Output update={update} divs={arreyDiv} handleDelet1={delet1} handleDelet2={delet2}></Output>
        </Content>
    )
}