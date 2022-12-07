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

const Text = styled.p`
    color: white;
    font-size: 30px;
`

const ConteinerInputs = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-direction: column;
    width: 50vw;
`
const Button = styled.button`
    width: 100%;
    height: 75px;
    background-color: ${props=> props.bgColor};
    color: white;
    border-radius: 50px;
    font-size: 25px;
    text-shadow: 1px 1px 1px black;
` 

const Link = styled.a`
    width: 100%;
` 

export default function Home(props){

    return(
        <Content>
            <Text>olá sumeners</Text>
            <Text>Aqui reunirá algumas informaçoes de League Of Legends</Text>
            <Text>O que você desejá fazer?</Text>
            <ConteinerInputs>
                <Link href="/buildlol"><Button bgColor="red" onClick={props.handleMain} value={0}>Criar Uma build do LOL</Button></Link>
                <Link href="/buildtft"><Button bgColor="black" onClick={props.handleMain} value={1}>Criar uma build do TFT</Button></Link>
                <Link href="/info"><Button bgColor="blue" onClick={props.handleMain} value={2}>Ver suas informações do jogo</Button></Link>
                <Link href="/version"><Button bgColor="green" onClick={props.handleMain} value={3}>Ver as mudanças</Button></Link>
            </ConteinerInputs>
        </Content>
    )
}