const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = process.env.PORT || 3050
const http = require('http')

const fs = require('fs')

app.use(bodyParser.json())

let count = 1
const countUpdater = () => {
    if (count === 5) {
        count = 1
    } else {
        count++
    }
}

const readTestData = (file) => {
    const data = JSON.parse(fs.readFileSync(`./test_data/${file}.json`, 'utf8'))
    console.log('GET ', file)
    return data
}

app.get('/', (request, resource) => {
    console.log('fasfaf')
    resource.send('yes and no but maybe')
})


app.post('/services', (req, res) => res.send(readTestData('Services')))
app.post('/agentprofiles', (req, res) => res.send(readTestData('AgentProfiles')))
app.post('/agents', (req, res) => res.send(readTestData('Agents')))
app.post('/teams', (req, res) => res.send(readTestData('Teams')))
app.post('/generalqueue', (req, res) => res.send(readTestData(`GeneralQueue${count}`)))
app.post('/agentonlinestate', (req, res) => res.send(readTestData(`AgentsOnline${count}`)))
app.post('/inboundreport', (req, res) => { //body-parser needed for this
    const type = req.body.ContactTypes
    switch (type) {
        case 'email':
            res.send(readTestData(`InboundReportEmail${count}`))
            break;
        case 'PBX':
            res.send(readTestData(`InboundReportPBX${count}`))
            break;
        default:
            res.status(404).send(`check params ${body}`)
    }
})


const server = http.createServer(app)
server.listen(port, () => { console.log(`Test database server running from port ${port}`) })

setInterval(() => countUpdater(), 6000)