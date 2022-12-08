import { useEffect, useRef, useState } from "react"
import styled, { createGlobalStyle } from "styled-components"
import Card from "../componets/Card"
import NavSelectLOL from "../componets/NavSelectLOL"

const Content = styled.div`
width: 100vw;
background-image: url('https://cdn.wallpapersafari.com/54/81/YWO8us.jpg');
display: flex;
justify-content: space-evenly;
align-items: center;
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

const Build = styled.div`
    width: 30vw;
    height: calc(100vh - 100px);
    background-color: yellow;
    float: right;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    #champIcon{
        width: 120px;
        margin-top: 30px;
    }

    #itemsOfBuild{
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        justify-items: center;
        gap: 20px;
    }

    img{
        width: 80px;
    }

`


export default function BuildLOL(){

    const [map, setMap] = useState(11)
    const [isItems, setIsItems] = useState(false)
    const [itemsArrey, setItemsArrey] = useState([])
    const [build, setBuild] = useState([])
    const champion = useRef()


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

    function updateBuild(type, item, index){
        if(type === "champion"){
            champion.current.src = `http://ddragon.leagueoflegends.com/cdn/12.22.1/img/champion/${item}.png`
            champion.current.alt = `${item}`
        }
        if(type === "item"){
            if(build.length<6){
                setBuild([...build, [[itemsArrey[index][0]], "item", item]])
            }
        }
    }

    function removeItem(type, item, index){
        //console.log("foi")
        //setBuild((current)=>{console.log(current)})
    }


    return(
        <Content>
            <DivInput>
                <NavSelectLOL handleChampions={searchChampion} handleItems={searchItems} handleMap={updateMap}></NavSelectLOL>
                <Main>
                    <GlobalStyle/>
                    {itemsArrey.map((item,i)=><Card type={item[1]} id={item[0].id?item[0].id:item[2]} key={i} num={i} handleClick={updateBuild}></Card>)}
                </Main>
            </DivInput>
            <Build>
                <img src="" alt="" id="champIcon" ref={champion}/>
                <div></div>
                <div id="itemsOfBuild">
                    {build.map((item,i)=><Card type={item[1]} id={item[0].id?item[0].id:item[2]} key={i} num={i} handleClick={removeItem}></Card>)}
                    </div>
            </Build>
        </Content>
    )
}