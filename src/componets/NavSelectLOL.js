import styled from "styled-components"

const Nav = styled.div`
    width: 70vw;
    height: 50px;
    background-color: red;
    display: flex;
    
    input{
        width: 35%;
        height: 100%;
        font-size: 30px;
        background-color: black;
        color: white;
        border: 1px solid grey;
    }

    select{
        width: 30%;
        height: 100%;
        font-size: 30px;
        text-align: center;
    }
`

export default function NavSelectLOL(props){

    return(
        <Nav>
            <input type="button" value="Campeões" onClick={props.handleChampions}/>
            <input type="button" value="Itens" onClick={props.handleItems}/>
            <select onChange={props.handleMap}>
                <option value="11">Summoner's Rift</option>
                <option value="12">ARAM</option>
            </select>
        </Nav>
    )
}