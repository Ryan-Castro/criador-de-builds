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

const Link = styled.a`
    color: black;
    text-decoration: none;
` 

export default function Header(props){
    return(
        <Content>
            <Link href="/"><Logo>Criador de builds</Logo></Link>
            <List>
                <Link href="/buildlol"><Li onClick={props.handleMain} value="0">LoL</Li></Link>
                <Link href="/buildtft"><Li onClick={props.handleMain} value="1">TFT</Li></Link>
                <Link href="/info"><Li onClick={props.handleMain} value="2">Informações</Li></Link>
                <Link href="/version"><Li onClick={props.handleMain} value="3">Versões</Li></Link>
            </List>
        </Content>
    )
}