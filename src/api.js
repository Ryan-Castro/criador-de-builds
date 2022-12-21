require('dotenv').config()
const { default: axios } = require('axios');
const cors = require('cors')
const express = require('express');
const champions = {}

const app = express();

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
    res.json(summonerIdResponde.data)
})

app.get('/ranked/:summonerName', async (req,res)=>{
    const {summonerName} = req.params
    const summonerIdResponde = await axios.get(`https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}`, {
        headers: {"X-Riot-Token": process.env.TOKEN_RIOT}
    }).catch(err=>res.status(err.response.status).json(err.responde))
    const {id, profileIconId, summonerLevel, puuid} =  summonerIdResponde.data
    const responseRanked = await axios.get(`https://br1.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}`, {
        headers: {"X-Riot-Token": process.env.TOKEN_RIOT}
    }).catch(err=>res.status(err.response.status).json(err.responde))
    res.json(responseRanked.data)
})

app.get('/mastery/:summonerName', async (req,res)=>{
    const {summonerName} = req.params
    const summonerIdResponde = await axios.get(`https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}`, {
        headers: {"X-Riot-Token": process.env.TOKEN_RIOT}
    }).catch(err=>res.status(err.response.status).json(err.responde))
    const {id, profileIconId, summonerLevel, puuid} =  summonerIdResponde.data
    const responseMastery = await axios.get(`https://br1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${id}`, {
        headers: {"X-Riot-Token": process.env.TOKEN_RIOT}
    }).catch(err=>res.status(err.response.status).json(err.responde))
    res.json(responseMastery.data)
})

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