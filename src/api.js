const { default: axios } = require('axios');
const cors = require('cors')
const express = require('express');

const app = express();

app.use(cors())

app.listen(3333)

app.get('/', async(req, res)=>{
    res.send('hello world');
})

app.get('/summoner/:summonerName', async (req,res)=>{
    const {summonerName} = req.params
    const summonerIdResponde = await axios.get(`https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}`, {
        headers: {"X-Riot-Token": "RGAPI-8d7768cd-bd04-446e-b156-b87dbc0b14cc"}
    }).catch(err=>res.status(err.response.status).json(err.responde))
    const {id, profileIconId, summonerLevel, puuid} =  summonerIdResponde.data
    res.json(summonerIdResponde.data)
})

app.get('/ranked/:summonerName', async (req,res)=>{
    const {summonerName} = req.params
    const summonerIdResponde = await axios.get(`https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}`, {
        headers: {"X-Riot-Token": "RGAPI-8d7768cd-bd04-446e-b156-b87dbc0b14cc"}
    }).catch(err=>res.status(err.response.status).json(err.responde))
    const {id, profileIconId, summonerLevel, puuid} =  summonerIdResponde.data
    const responseRanked = await axios.get(`https://br1.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}`, {
        headers: {"X-Riot-Token": "RGAPI-8d7768cd-bd04-446e-b156-b87dbc0b14cc"}
    }).catch(err=>res.status(err.response.status).json(err.responde))
    res.json(responseRanked.data)
})

app.get('/mastery/:summonerName', async (req,res)=>{
    const {summonerName} = req.params
    const summonerIdResponde = await axios.get(`https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}`, {
        headers: {"X-Riot-Token": "RGAPI-8d7768cd-bd04-446e-b156-b87dbc0b14cc"}
    }).catch(err=>res.status(err.response.status).json(err.responde))
    const {id, profileIconId, summonerLevel, puuid} =  summonerIdResponde.data
    const responseMastery = await axios.get(`https://br1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${id}`, {
        headers: {"X-Riot-Token": "RGAPI-8d7768cd-bd04-446e-b156-b87dbc0b14cc"}
    }).catch(err=>res.status(err.response.status).json(err.responde))
    res.json(responseMastery.data)
})