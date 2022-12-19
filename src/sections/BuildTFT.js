import { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import TFTChampion from "../componets/TFTChampion"
import TraitComp from "../componets/TraitComp"
const Content = styled.div`
width: 100%;
height: 100%;
background-image: url('https://cdn.wallpapersafari.com/54/81/YWO8us.jpg');
display: flex;
justify-content: space-evenly;
align-items: center;
flex-direction:column;
`

const Build = styled.div`
    width: 100%;
    height: 70%; 
    display: flex
`

const Traits = styled.div`
    width: 20%;
    height: 100%;
    background-color: grey;
    overflow: auto;

`

const Table = styled.div`
    width: 80%;
    height: 100%;
    table{
        width: 100%;
        height: 100%;        
        background-color: black;
    }

    tbody{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        
    }
    tr{
        width: 800px;
        height: 100px;
        display: flex;
        background-image: url('https://cdn.wallpapersafari.com/54/81/YWO8us.jpg');
        overflow: visible;
        justify-content: space-between;
        background-position: center top;
    }

    tr:nth-child(2n){
        margin-left: 120px
    }


    td{
        width: 100px;
        height: 100px;
        background-color: tranparent;
        background-position: center center;
        background-size: cover;
        display: flex;
        align-items: center;
        border: 1px solid black;
        box-shadow: 17px 0px 0px black
    }

    div{
        width: 100px;
        height: 60px;
        background-color: transparent;
        position: relative;
        overflow: visible;
    }
    div:after{
        content: "";
        position: absolute;
        bottom: -20px;
        left: 0;
        width: 0;
        height: 0;
        border-left: 50px solid black;
        border-right: 50px solid black;
        border-top: 20px solid transparent;        
    }
    div:before{
        content: "";
        position: absolute;
        top: -20px;
        left: 0;
        width: 0;
        height: 0;
        border-left: 50px solid black;
        border-right: 50px solid black;
        border-bottom: 20px solid transparent;
    }

`

const DivChampions = styled.div`
    width: 100%;
    height: 40%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 10px;
    overflow-y: visible;

    .cost1{
        border 3px solid #BBB;
    }
    .cost2{
        border 3px solid green;
    }
    .cost3{
        border 3px solid blue;
    }
    .cost4{
        border 3px solid #DE0EBD;
    }
    .cost5{
        border 3px solid #FFC430;
    }


`



export default function BuildTFT(props){

    const [champions, setChampions] = useState([])
    const [traits, setTraits] = useState([])
    const table = useRef() 
    const [traitsCurrent, setTraitsCurrent] = useState({})
    const [team] = useState({})

    useEffect(()=>{
        let arrayTemp =[]
        fetch("https://raw.communitydragon.org/latest/cdragon/tft/pt_br.json")
            .then(res=>res.json())
            .then(json=>{
                json.sets[8].champions.splice(51, 1)
                json.sets[8].champions.splice(62, 1)
                json.sets[8].champions.splice(63, 1)
                json.sets[8].champions.splice(63, 1)
                json.sets[8].champions.splice(53, 1)
                json.sets[8].champions.splice(54, 1)
                json.sets[8].champions.splice(60, 1)
                json.sets[8].champions.splice(16, 1)
                let arrayChamp = json.sets[8].champions
                arrayChamp.sort((a,b)=>{
                    if(a.cost>b.cost) return 1
                    if(a.cost<b.cost) return -1

                    return 0
                })
                arrayTemp = json.sets[8].champions
                setChampions(json.sets[8].champions)
                setTraits(json.sets[8].traits)
                initTalbe()
            }
        )  
    
        function initTalbe(){
            let htmlTable = "<table>"
            for(let h = 0; h < 4; h++){
                htmlTable += "<tr>"

                for(let w = 0; w < 7; w++){
                    htmlTable += `<td><div id='${h}-${w}'></div></td>`
                }
                
                htmlTable += "</tr>"

            }
            htmlTable += "</table>"
            table.current.innerHTML = htmlTable
            let row = table.current.children[0].children[0].children
            for (var r = 0; r < row.length; r++) {
                let colum = row[r].children; 
                for (var c = 0; c < colum.length; c++){
                    colum[c].addEventListener("drop", getChampion);
                    colum[c].addEventListener("dragover", dragOver);
                    colum[c].addEventListener("click", removeChampion);
                }
            }

        
        }

        function dragOver(e){
            e.preventDefault()
        }

        function removeChampion(e){
            let traitsAny = {}
            delete team[e.target.id]
            e.target.parentNode.style.backgroundImage = ""
            let arrayTeam = []
            Object.keys(team).forEach((id)=>{
                if(arrayTeam.indexOf(team[id].name) === -1){
                    arrayTeam.push(team[id].name)
                    team[id].traits.forEach(trait=>{
                        if(traitsAny[trait]){
                            traitsAny[trait]++
                        } else {
                            traitsAny[trait] = 1
                        }
                    })
                }
            })   
            setTraitsCurrent(traitsAny)
        }

        function getChampion(e){
            e.preventDefault()
            arrayTemp.forEach((champ, i)=>{
                if(champ.apiName === e.dataTransfer.getData('text')){
                    let traitsAny = {}
                    setTraitsCurrent({})
                    if(team[e.target.id]){
                        team[e.target.id] = champ
                        e.target.parentNode.style.backgroundImage = `url('https://raw.communitydragon.org/latest/game/assets/ux/tft/championsplashes/${champ.apiName.toLowerCase()}_square.tft_set8.png')`
                    } else {
                        if(Object.keys(team).length < 9){
                            team[e.target.id] = champ
                            e.target.parentNode.style.backgroundImage = `url('https://raw.communitydragon.org/latest/game/assets/ux/tft/championsplashes/${champ.apiName.toLowerCase()}_square.tft_set8.png')`
                        }
                    }
                    let arrayTeam = []
                    Object.keys(team).forEach((id)=>{   
                        if(arrayTeam.indexOf(team[id].name) === -1){
                            arrayTeam.push(team[id].name)
                            team[id].traits.forEach(trait=>{
                                if(traitsAny[trait]){
                                    traitsAny[trait]++
                                } else {
                                    traitsAny[trait] = 1
                                }
                            })
                        }
                        
                        setTraitsCurrent(traitsAny)
                    })   
                }
            })
        }    
    },[team])


    return(
        <Content>
            <Build>
                <Traits><TraitComp current={traitsCurrent} traits={traits}></TraitComp></Traits>
                <Table ref={table}></Table>
            </Build>
            <DivChampions>
                {champions.map((champion, i)=><TFTChampion champion={champion} key={i}/>)}
            </DivChampions>
        </Content>
    )
}