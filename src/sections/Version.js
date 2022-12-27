import { useEffect } from "react"
import styled from "styled-components"
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

    useEffect(()=>{
        fetch('https://ddragon.leagueoflegends.com/api/versions.json')
            .then(res=>res.json())
            .then(json=>{
                console.log(json)
            })
    },[])
    return(
        <Content>
            <Input>
                <NavVersion></NavVersion>
            </Input>
            <Output>veja aqui o que mudou ao longo dos anos</Output>
        </Content>
    )
}