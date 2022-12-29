import styled from "styled-components"

const Conteiner = styled.div`
width: 30%;
height: 100%;
background-color: blue;

&>div{
    width: 90%;
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

.description{
    width: 100%;
    height: 70%;
    overflow-y: auto
}
`
export default function Output(props){

    return(
        <Conteiner>
            <div><button onClick={props.handleDelet1}>x</button><div dangerouslySetInnerHTML={{__html: props.divs[0]}}></div></div>
            <div><button onClick={props.handleDelet2}>x</button><div dangerouslySetInnerHTML={{__html: props.divs[1]}}></div></div>
        </Conteiner>
    )
}