import { useEffect, useRef} from "react"
import styled from "styled-components"

const Content = styled.div`
    width: 100%;
    height: 95%;
    overflow: auto;
    display: flex;
    flex-wrap: wrap;
    
    &>div{
        width: 200px;
        height: 250px;
        background-color: grey;
        display: flex;
        flex-direction: column;
        overflow: auto;
        margin: 20px;
        align-items: center;
        padding: 20px 10px;
        border-radius: 10px;
        box-shadow: 1px 1px 2px white
    }

    img{
        width: 50px;
        height: 50px;
        margin-bottom: 10px
    }

    div>div{
        width: 90%;
        height: 70%;
        overflow-y: auto
    }
 
`

export default function ChampVer(props){
    const show = useRef()
    useEffect(()=>{
        if(props.show){
            show.current.style.display = "flex"
        } else {
            show.current.style.display = "none"
        }
        if(props.items){
        show.current.innerHTML = ""
        Object.keys(props.items.data).forEach((item)=>{
            if(props.items.data[item].inStore !== false)
            show.current.innerHTML += `<div><img src="https://ddragon.leagueoflegends.com/cdn/${props.items.version}/img/item/${item}.png" alt=""/><div>${props.items.data[item].description}</div></div>`
        })
        }
    },[props])
    return(
        <Content ref={show}>
        </Content>
    )
}