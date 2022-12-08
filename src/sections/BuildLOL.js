import { useEffect, useState } from "react"
import styled, { createGlobalStyle } from "styled-components"
import Card from "../componets/Card"
import NavSelectLOL from "../componets/NavSelectLOL"

const Content = styled.div`
width: 100%;
background-image: url('https://cdn.wallpapersafari.com/54/81/YWO8us.jpg');
display: flex;
justify-content: space-evenly;
align-items: center;
flex-direction: column;
`

const DivInput = styled.div`

`

const Main = styled.div`
    width: 70vw;
    height: calc(100vh - 150px);
    background-color: rgba(128, 128, 128, 0.2);
    overflow: auto;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    padding: 20px;
    gap: 20px;
    
    img{
        width: 120px;
    }
`

const GlobalStyle = createGlobalStyle`
    .card{
        width: 120px;
        height: 120px
    }
`


export default function BuildLOL(){

    const [map, setMap] = useState(11)
    const [isItems, setIsItems] = useState(false)
    const [itemsArrey, setItemsArrey] = useState([])


    useEffect(()=>{
        searchChampion()
    },[])

    function searchChampion(){
        setIsItems(false)
        fetch(`http://ddragon.leagueoflegends.com/cdn/12.22.1/data/en_US/champion.json`)
            .then(res=>res.json())
            .then(async json=>{
                let iArrey = []
                Object.keys(json.data).forEach((champion, i)=>{
                    iArrey.push([json.data[champion], "champion"])
                })
                setItemsArrey(iArrey)
        })
    }

    async function updateMap(e){
        setMap(e.target.options[e.target.options.selectedIndex].value)
        if(isItems){
            setTimeout(() => {
                searchItems(e.target.options[e.target.options.selectedIndex].value)
            }, 2000);
            
        }
    }

    function searchItems(iMap){
        setIsItems(true)
        fetch(`http://ddragon.leagueoflegends.com/cdn/12.22.1/data/en_US/item.json`)
            .then(res=>res.json())
            .then(json=>{
                let iArrey = []
                Object.keys(json.data).forEach((item, i)=>{
                    if(json.data[item].inStore !== false){
                        if(json.data[item].maps[iMap.type!=="click"?iMap:map]){
                            iArrey.push([json.data[item], "item", item])
                        }
                    }
                })
                setItemsArrey(iArrey)
            })
    }


    return(
        <Content>
            <DivInput>
                <NavSelectLOL handleChampions={searchChampion} handleItems={searchItems} handleMap={updateMap}></NavSelectLOL>
                <Main>
                    <GlobalStyle/>
                    {itemsArrey.map((item,i)=><Card type={item[1]} id={item[0].id?item[0].id:item[2]} key={i}></Card>)}
                </Main>
            </DivInput>
        <section>
            <img src="" alt="" id="champIcon"/>
            <div></div>
            <div id="itemsOfBuild"></div>
        </section>
        </Content>
    )
}