const express = require('express');
const cors = require('cors');
const Algo = require("./algo")
const app = express();


const fnName2 = () => console.log("FN2")


app.use(cors());


app.get('/', (req, res) => {
    res.status(200).json({ msg: "Hello API" })
})

app.get("/api/test", (req, res) => { 
 

    // ตัวอย่างข้อมูลสถานที่ //
    let listNode = [
        { nName : "Wat Phu min" ,geo :"18.774691818941534, 100.77159643605694" },
        { nName : "Wat Phra That Chang Kham Worawihan" ,geo :"18.776317086438006, 100.77197730974746" },
        { nName : "Wat Ming Muang" ,geo :"18.774844188447187, 100.76911141527825" },
        { nName : "Wat Sri Panton" ,geo :"18.776067448377397, 100.7657283881316" },
        { nName : "Wat Hua Khuang" ,geo :"18.777204395862995, 100.77110720641383" }
    ]
    const current = "18.77519790559999, 100.77440202590455" //เริ่มที่ ส.ภ. น่าน
    ///////////////////

    let STP = new Algo()
    STP.getpath(listNode,current).then((data) => {
        res.status(200).json(data)
    })
    
    

})

app.listen(3080, () => {
    console.log("Running on Port 3080 !")
    console.log("http://localhost:3080")
})