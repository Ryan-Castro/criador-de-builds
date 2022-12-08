

export default function Card(props){
    return(
        <div id={props.id} className="card" onClick={()=>props.handleClick(props.type, props.id, props.num)}>
            <img src={`http://ddragon.leagueoflegends.com/cdn/12.22.1/img/${props.type}/${props.id}.png`} alt="asdf"/>
        </div>
    )
}