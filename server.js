const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
const path = require('path')
const app = express()

app.use(bodyParser.json())

app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, 'index.html'))
})
app.get('/api/timestamp/:date',(req, res)=>{
    let urltimestamp = new Date(req.params.date)
    console.log(urltimestamp)
    //let timestamp= `${urltimestamp.getFullYear()}-${urltimestamp.getMonth()}-${urltimestamp.getDate()}`
    //console.log(timestamp)
    
    //let timeString = urltimestamp.toString()
    if(urltimestamp !=='Invalid Date'&& isNaN(req.params.date)){
        let timestamp= {
            unix: Date.parse(urltimestamp),
            utc: urltimestamp.toUTCString()
        }
        console.log(timestamp)
        res.send(timestamp)
    }else if(typeof(req.params.date)!==''){
        let date= req.params.date
        let timestamp = {
            unix: date,
            utc: new Date(Number(req.params.date)*1000)
        }
        res.send(timestamp)

    }else res.send({error: 'invalid'})
 
})

app.get('/api/timestamp', (req, res)=>{

    let urltimestamp=  Date.now()
    let currentDate =  new Date(urltimestamp)
    console.log(currentDate)
    console.log(urltimestamp)
    
    let timestamp= {
        unix: urltimestamp,
        utc: currentDate  
    }
        console.log(timestamp)
        res.send(timestamp)
})
app.listen(7000, ()=>{
    console.log('App is running on port 7000')
})