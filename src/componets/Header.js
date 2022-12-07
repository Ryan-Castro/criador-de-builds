import styled from "styled-components"

const Content = styled.div`
    width: 100vw;
    height: 50px;
    background: grey;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 30px;
`

const Logo = styled.h1`

`

const List = styled.ul`
    display: flex;
` 

const Li = styled.li`
    margin-left: 20px;
` 

export default function Header(props){
    return(
        <Content>
            <Logo>Criador de builds</Logo>
            <List>
                <Li>LoL</Li>
                <Li>TFT</Li>
                <Li>Informações</Li>
                <Li>Versões</Li>
            </List>
        </Content>
    )
}