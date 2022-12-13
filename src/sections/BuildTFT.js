import { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import TFTChampion from "../componets/TFTChampion"
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
    height: 60%; 
    display: flex
`

const Traits = styled.div`
    width: 20%;
    height: 100%;
    background-color: red;

`

const Table = styled.div`
    width: 80%;
    height: 100%;
    
    tr{
        
        height: 100px;
        display: flex;
        background-color: transparent;
    }
    td{
        overflow: visible;
        width: 100px;
        height: 55px;
        background-color: blue;
        margin: 10px;
        position: relative;
    }
    td:before {
        content: "";
        position: absolute;
        top: -25px;
        left: 0;
        width: 0;
        height: 0;
        border-left: 50px solid transparent;
        border-right: 50px solid transparent;
        border-bottom: 25px solid blue;
    }


    td:after {
        content: "";
        position: absolute;
        bottom: -25px;
        left: 0;
        width: 0;
        height: 0;
        border-left: 50px solid transparent;
        border-right: 50px solid transparent;
        border-top: 25px solid blue;
    }
`

const DivChampions = styled.div`
width: 100%;
height: 40%;
display: grid;
grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
overflow: auto;

div{
    width: 100px;
    height: 100px;
}
img{
    width: 100px;
    height: 100px;
}
`



export default function BuildTFT(){

    const [champions, setChampions] = useState([])
    const table = useRef()

    useEffect(()=>{    
        fetch("https://raw.communitydragon.org/latest/cdragon/tft/en_us.json")
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
                console.log(json.sets[8])
                let arrayChamp = json.sets[8].champions
                arrayChamp.sort((a,b)=>{
                    if(a.cost>b.cost) return 1
                    if(a.cost<b.cost) return -1

                    return 0
                })
                setChampions(json.sets[8].champions)
                initTalbe()
            }
        )
    },[])

    function initTalbe(){
        let htmlTable = "<table>"
        for(let h = 0; h < 4; h++){
            htmlTable += "<tr>"

            for(let w = 0; w < 7; w++){
                htmlTable += "<td>R</td>"
            }
            
            htmlTable += "</tr>"

        }
        htmlTable += "</table>"
        table.current.innerHTML = htmlTable
    }
    return(
        <Content>
            <Build>
                <Traits></Traits>
                <Table ref={table}></Table>
            </Build>
            <DivChampions>
                {champions.map((champion, i)=><TFTChampion champion={champion} key={i}/>)}
            </DivChampions>
        </Content>
    )
}