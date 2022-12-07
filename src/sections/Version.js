import styled from "styled-components"
const Content = styled.div`
width: 100%;
height: 100%;
background-image: url('https://cdn.wallpapersafari.com/54/81/YWO8us.jpg');
display: flex;
justify-content: space-evenly;
align-items: center;
flex-direction: column;
`
export default function Version(){
    return(
        <Content>
        <h2>veja aqui o que mudou ao longo dos anos</h2>
        </Content>
    )
}