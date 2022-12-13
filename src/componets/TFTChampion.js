export default function TFTChampion(props){

    return(
        <div id={props.champion.apiName} draggable>
            <img src={`https://raw.communitydragon.org/latest/game/assets/ux/tft/championsplashes/${props.champion.apiName.toLowerCase()}_square.tft_set8.png`} alt=""/>
        </div>

    )    
}