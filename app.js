const express = require('express')
const app = express()
//const port = process.env.PORT || 3010
const port = 3010

app.get('/', (request, resource) => {
    resource.send('yes and no but maybe')
})


//app.listen(port, () => console.log(`Listening to port ${port}`))
const server = http.createServer(app) //difference to just app.listen???

server.listen(port, () => {console.log(`Test database server running from port ${port}`)})
