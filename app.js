const express = require('express')
const app = express()
//const port = process.env.PORT || 3010
const http = require('http') 
const port = 3010
const fs = require('fs')

let count = 1
const countUpdater = () => {
    if(count === 5) {
        count = 1
    } else {
        count++
    }
}

const readTestData = (file) => {
    //const data = JSON.parse(fs.readFileSync(`./raw_data/${file}.json`, 'utf8'))
    const data = JSON.parse(fs.readFileSync(`./test_data/${file}.json`, 'utf8'))
    //const data = JSON.parse(fs.readFileSync(`./public_data/${file}.json`, 'utf8'))
    console.log('GET ', file)
    return data
}

app.get('/', (request, resource) => {
    resource.send('yes and no but maybe')
})


app.post('/services', (req, res) => res.send(readTestData('Services')))
app.post('/agentprofiles', (req, res) => res.send(readTestData('AgentProfiles')))
app.post('/agents', (req, res) => res.send(readTestData('Agents')))
app.post('/teams', (req, res) => res.send(readTestData('Teams')))
app.post('/generalqueue', (req, res) => res.send(readTestData(`GeneralQueue${count}`)))
app.post('/agentonlinestate', (req, res) => res.send(readTestData(`AgentsOnline${count}`)))
app.post('/inboundreport', (req, res) => res.send(readTestData('InboundReport')))


//app.listen(port, () => console.log(`Listening to port ${port}`))
const server = http.createServer(app) //difference to just app.listen???

server.listen(port, () => {console.log(`Test database server running from port ${port}`)})


setInterval(() => countUpdater(), 6000)