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
    background-image: url("https://c4.wallpaperflare.com/wallpaper/997/549/163/league-of-legends-mastery-7-wallpaper-preview.jpg");
    background-size: cover;
    background-position: center center;
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

const Info = styled.ul`
    width: 100%;
    font-size: 20px;
    padding: 20px;
    background-color: rgba(255, 255, 255 , 0.7);

    ul{
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap:20px;
    }
    li{
        
    }
`

const BuildsBuy = styled.div`
    height: 25%;
    margin-bottom: 25px;
`

const GhostDiv = styled.div`
    display: none;

`


export default function BuildLOL(){

    const [map, setMap] = useState(11)
    const [isItems, setIsItems] = useState(false)
    const [itemsArrey, setItemsArrey] = useState([])
    const [build, setBuild] = useState([])
    const champion = useRef()
    const [championSelect, setChampionSelect] = useState(null)
    const stats = useRef()
    const ghost = useRef()


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

    useEffect(()=>{
        updateStatus()
    })

    function updateBuild(type, item, index){
        if(type === "champion"){
            champion.current.src = `http://ddragon.leagueoflegends.com/cdn/12.22.1/img/champion/${item}.png`
            champion.current.alt = `${item}`
            setChampionSelect(itemsArrey[index][0].stats)
            
        }
        if(type === "item"){
            if(build.length<6){
                setBuild([...build, [[itemsArrey[index][0]], "item", item]])
            }
        }
    }

    function removeItem(type, item, index){
        let array = build
        array.splice(index, 1)
        setBuild([...array])
    }

    function updateStatus(){
        let statsCurrent = {
            hp: 0,
            mp: 0,
            ad: 0,
            ap: 0,
            armor: 0,
            spellblock: 0,
            attackspeed: 0,
            cdr: 0,
            crit: 0,
            movespeed: 0,
        }
        if(championSelect){
            statsCurrent.hp = championSelect.hp + (championSelect.hpperlevel*17)
            statsCurrent.mp = championSelect.mp + (championSelect.mpperlevel*17)
            statsCurrent.ad = championSelect.attackdamage + (championSelect.attackdamageperlevel*17)
            statsCurrent.armor = championSelect.armor + (championSelect.armorperlevel*17)
            statsCurrent.spellblock = championSelect.spellblock + (championSelect.spellblockperlevel*17)
            statsCurrent.attackspeed = championSelect.attackspeed * (1+((championSelect.attackspeedperlevel/100)*17))
            statsCurrent.movespeed = championSelect.movespeed
        }
        let atkSpd = 1

        if(build.length > 0){
            build.forEach((item)=>{
                ghost.current.innerHTML = item[0][0].description
                let attrItem = (ghost.current.children[0].children[0].innerHTML.replaceAll("<attention>", "").split("<br>"))
                attrItem.forEach(attr=>{
                    switch (attr.split("</attention>")[1].replaceAll(" ", "-")) {
                        case "-Health": statsCurrent.hp += Number(attr.split("</attention>")[0]); break;
                        case "-Mana": statsCurrent.mp += Number(attr.split("</attention>")[0]); break;
                        case "-Attack-Damage": statsCurrent.ad += Number(attr.split("</attention>")[0]); break;
                        case "-Ability-Power": statsCurrent.ap += Number(attr.split("</attention>")[0]); break;
                        case "-Armor": statsCurrent.armor += Number(attr.split("</attention>")[0]); break;
                        case "-Magic-Resist": statsCurrent.spellblock += Number(attr.split("</attention>")[0]); break;
                        case "-Attack-Speed": atkSpd += (Number(attr.replaceAll("%", "").split("</attention>")[0]/100)); break;
                        case "-Ability-Haste": statsCurrent.cdr += (Number(attr.split("</attention>")[0])); break;
                        case "-Critical-Strike-Chance": statsCurrent.crit += (Number(attr.replaceAll("%", "").split("</attention>")[0])); break;
                        case "-Move-Speed": statsCurrent.movespeed += (Number(attr.split("</attention>")[0])); break;
                        
                    
                        default:
                            break;
                    }
                    
                })
            })
        }

        statsCurrent.attackspeed = statsCurrent.attackspeed * atkSpd

        stats.current.innerHTML = `
                                    <li>HP: ${statsCurrent.hp}</li>
                                    <li>Mana: ${statsCurrent.mp}</li>
                                    <li>AD: ${statsCurrent.ad.toFixed(0)}</li>
                                    <li>AP: ${statsCurrent.ap.toFixed(0)}</li>
                                    <li>Armor: ${statsCurrent.armor.toFixed(0)}</li>
                                    <li>MR: ${statsCurrent.spellblock.toFixed(0)}</li>
                                    <li>AttackSpeed: ${statsCurrent.attackspeed.toFixed(2)}</li>
                                    <li>CDR: ${statsCurrent.cdr}</li>
                                    <li>Critc: ${statsCurrent.crit}%</li>
                                    <li>Movespeed: ${statsCurrent.movespeed}</li>
                                    `
   
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
                <img src="https://ddragon.leagueoflegends.com/cdn/12.23.1/img/profileicon/0.png" alt="" id="champIcon" ref={champion}/>
                <Info><ul  ref={stats}></ul></Info>
                <BuildsBuy id="itemsOfBuild">
                    {build.map((item,i)=><Card type={item[1]} id={item[0].id?item[0].id:item[2]} key={i} num={i} handleClick={removeItem}></Card>)}
                </BuildsBuy>
            </Build>

            <GhostDiv ref={ghost}></GhostDiv>
        </Content>
    )
}