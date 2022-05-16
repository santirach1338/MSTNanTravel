const express = require('express');
const cors = require('cors');
const Algo = require("./algo")
const app = express();


app.use(cors());


app.get('/', (req, res) => {
    res.status(200).json({ msg: "Hello API" })
})

app.get("/api/test", (req, res) => {
    
})

app.use('/api/shortestpath', (req, res) => {
    if (req.method == "GET") {
        res.status(400).json({ statusCode: 400, text: "This API not allow method 'GET' " })
    }
    else if (req.method == "POST") {

        const processTimeout = setTimeout(() => {
            res.status(500).json({ statusCode: 500, text: "Something is wrong !" })
        }, 30000); // 30 s.

        const stopTimeout = () => {
            clearTimeout(processTimeout);
        }

        // // ตัวอย่างข้อมูลสถานที่ //
        // let listNode = [
        //     { nName: "Wat Phu min", geo: "18.77461439997241,100.77163198179782" },
        //     { nName: "Wat Phra That Chang Kham Worawihan", geo: "18.776243109724568,100.77198188145837" },
        //     { nName: "Wat Ming Muang", geo: "18.774720233920483,100.7691170465981" },
        //     { nName: "Wat Sri Panton", geo: "18.77583810590887,100.7657209960688" },
        //     { nName: "Wat Hua Khuang", geo: "18.777246890574332,100.77124599581259" }
        // ]
        // const current = "18.77519790559999, 100.77440202590455" //เริ่มที่ ส.ภ. น่าน
        // ///////////////////

        // let STP = new Algo()
        // STP.getpath(listNode, current).then((data) => {
        //     stopTimeout()
        //     res.status(200).json(data)
        // })

        console.log(req.body)
        res.status(200).json(req.body)


    }
    console.log(req.method)
})

app.listen(3080, () => {
    console.log("Running on Port 3080 !")
    console.log("http://localhost:3080")
})