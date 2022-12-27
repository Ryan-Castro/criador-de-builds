import { useEffect, useRef } from "react"
import styled from "styled-components"

const Content = styled.div``
export default function NavVersion(props){

    const versions = useRef()

    useEffect(()=>{
        fetch('https://ddragon.leagueoflegends.com/api/versions.json')
            .then(res=>res.json())
            .then(json=>{
                props.handleVersion(json[0])
                versions.current.innerHTML = ""
                json.forEach((version)=>{
                    if(!version.includes('lolpatch_')){
                        versions.current.innerHTML += `<option>${version}</option>`
                    }
                })
            })
    },[props])

    return(
        <Content>
            <button>campeoes</button>
            <button>items</button>      
            <select ref={versions} onChange={props.handleVersion}></select>
        </Content>
    )
}