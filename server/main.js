require('dotenv').config()

const express = require('express')
const cors = require('cors')
const events = require('events');
const emitter = new events.EventEmitter();

const app = express()
app.use(cors())
app.use(express.json())
PORT=process.env.PORT

try {
    app.listen(PORT, () => console.log('Started with ' + PORT));
    app.post('', (req, res) => {
        emitter.emit('newMessage', req.body)
        res.status(200).send('success')
        res.end();
    })

    app.get('', (req, res) => {
        emitter.once('newMessage', message => {
            res.json(message)
            res.end()
        })
    })

} catch (e) {
    console.log(e)
}