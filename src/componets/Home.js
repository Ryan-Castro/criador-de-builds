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

export default function Home(props){

    return(
        <Content>
            <Text>olá sumeners</Text>
            <Text>Aqui reunirá algumas informaçoes de League Of Legends</Text>
            <Text>O que você desejá fazer?</Text>
            <ConteinerInputs>
                <Button bgColor="red">Criar Uma build do LOL</Button>
                <Button bgColor="black">Criar uma build do TFT</Button>
                <Button bgColor="blue">Ver suas informações do jogo</Button>
                <Button bgColor="green">Ver as mudanças</Button>
            </ConteinerInputs>
        </Content>
    )
}