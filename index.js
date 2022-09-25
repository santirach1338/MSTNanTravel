const express = require('express');
const cors = require('cors');
const Algo = require("./algo");
const app = express();
const bodyParser = require('body-parser');
const config = require("./configs");


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true
}));

app.get('/', (req, res) => {
    
    res.status(200).json({ msg: "Hello API , By Santirach" })
})

app.use('/api/mst', (req, res) => {
    if (req.method == "GET") {
        res.status(400).json({ statusCode: 400, text: "This API not allow method 'GET' " })
    }
    else if (req.method == "POST") {

        let STP = new Algo()
        let listNode;
        let current;

        const processTimeout = setTimeout(() => {
            res.status(500).json({ statusCode: 500, text: "Something is wrong !" })
        }, 30000); // 30 s.

        const stopTimeout = () => {
            clearTimeout(processTimeout);
        }

        // ตัวอย่าง Post body //
        // {list:[],currentPos:"18.77,100.77",Key:"zz"}
        if (req.body.list == undefined || req.body.currentPos == undefined || req.body.Key == undefined) {
            // Error handle
            stopTimeout()
            res.status(400).json({ statusCode: 400, text: "POST Body is Not Currect !" })

        } else {

            if (req.body.Key === config.stpKEY) {

                listNode = req.body.list
                current = req.body.currentPos
                STP.getpath(listNode, current).then((data) => {
                    stopTimeout()
                    res.status(200).json({ statusCode: 200, text: "Success", data: data })
                })

            } else {
                // Error invalid Key
                stopTimeout();
                res.status(400).json({ statusCode: 400, text: "INVALID KEY !" })
            }


        }


    }
    console.log(req.method)
})

app.listen(config.listenPort, () => {
    console.log(`Running on Port ${config.listenPort} !`)
    console.log(`http://localhost:${config.listenPort}`)
})