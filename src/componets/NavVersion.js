import { useEffect, useRef} from "react"
import styled from "styled-components"

const Content = styled.div`
    width: 100%;
    height: 5%;

    button{
        width: 32%;
        height: 100%;
    }
    select{
        width: 36%;
        height: 100%;
    }
`
export default function NavVersion(props){

    const versions = useRef()

    useEffect(()=>{
        fetch('https://ddragon.leagueoflegends.com/api/versions.json')
            .then(res=>res.json())
            .then(json=>{
                versions.current.innerHTML = ""
                let versionsObject = {}
                json.forEach((version)=>{
                    if(!version.includes('lolpatch_')){
                        if(!versionsObject[version.split(".")[0]]){
                            versionsObject[version.split(".")[0]] = version
                            versions.current.innerHTML += `<option value="${version}">season ${version.split(".")[0]}</option>`   
                        }  
                    }
                })
            })
    },[])

    return(
        <Content>
            <button onClick={props.handleContent} value="campeoes">campeoes</button>
            <button onClick={props.handleContent} value="items">items</button>      
            <select ref={versions} onChange={props.handleVersion}></select>
        </Content>
    )
}