require('dotenv').config()
const { default: axios } =  require('axios');
const cors =                require('cors')
const express =             require('express');
const app =                 express();
const champions =           {}
const Response =            {}

app.use(cors())

app.listen(3333)

app.get('/', async(req, res)=>{
    res.send('hello world');
})

app.get('/summoner/:summonerName', async (req,res)=>{
    const {summonerName} = req.params
    const summonerIdResponde = await axios.get(`https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}`, {
        headers: {"X-Riot-Token": process.env.TOKEN_RIOT}
    }).catch(err=>res.status(err.response.status).json(err.responde))
    const {id, profileIconId, summonerLevel, puuid} =  summonerIdResponde.data
    Response['id'] =            id
    Response['profileIconId'] = profileIconId
    Response['summonerLevel'] = summonerLevel
    Response['puuid'] =         puuid
    Response['name'] =          summonerIdResponde.data.name
    await searchRanked(id)
    await searchMastery(id)
    res.json(Response)
})

async function searchRanked(id){
    const responseRanked = await axios.get(`https://br1.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}`, {
        headers: {"X-Riot-Token": process.env.TOKEN_RIOT}
    }).catch(err=>res.status(err.response.status).json(err.responde))
    Response['ranked'] = {          tier: responseRanked.data[0].tier,
                                    rank: responseRanked.data[0].rank,
                                    wins: responseRanked.data[0].wins,
                                    losses: responseRanked.data[0].losses,
                                    leaguePoints: responseRanked.data[0].leaguePoints}
}

async function searchMastery(id){
    const responseMastery = await axios.get(`https://br1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${id}`, {
        headers: {"X-Riot-Token": process.env.TOKEN_RIOT}
    }).catch(err=>res.status(err.response.status).json(err.responde))
    Response['mastery'] = [responseMastery.data[0],responseMastery.data[1],responseMastery.data[2]]
}


app.get('/champions', async (req,res)=>{
    await axios.get(`https://ddragon.leagueoflegends.com/api/versions.json`).then(async (version)=>{
        champions["version"] = version.data[0] 
        await axios.get(`http://ddragon.leagueoflegends.com/cdn/${version.data[0]}/data/en_US/champion.json`).then((championsinput)=>{
            Object.keys(championsinput.data.data).forEach(async champion=>{
                champions[championsinput.data.data[champion].key] = await championsinput.data.data[champion].id
            })
        })
    })  
    res.json(champions)
})

app.get('/metchs', async (req,res)=>{
    const summonerIdResponde = await axios.get(`https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${req.query.summonerName}`, {
        headers: {"X-Riot-Token": process.env.TOKEN_RIOT}
    }).catch(err=>res.status(err.response.status).json(err.responde))
    const {puuid} = summonerIdResponde.data
    const metchs = await axios.get(`https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?queue=${req.query.queue}&start=0&count=20`, {
        headers: {"X-Riot-Token": process.env.TOKEN_RIOT}
    }).catch(err=>res.status(err.response.status).json(err.responde))
    res.json(metchs.data)
})

app.get('/metch/:metchInput', async (req, res)=>{
    const metch = await axios.get(`https://americas.api.riotgames.com/lol/match/v5/matches/${req.params.metchInput}`, {
        headers: {"X-Riot-Token": process.env.TOKEN_RIOT}
        }).catch(err=>res.status(err.response.status).json(err.responde))        
    res.json(metch.data)
})