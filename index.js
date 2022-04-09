const express = require('express');
const cors = require('cors');
const myApp = require("./algo")
const app = express();


const fnName2 = () => console.log("FN2")


app.use(cors());


app.get('/', (req, res) => {
    res.status(200).json({ msg: "Hello API" })
})

app.get("/api/test", (req, res) => {
    const algo = new myApp("Korawit")
    const algo2 = new myApp("Zaaz")
    

    console.log(algo.greeting()) 
    console.log(algo2.getDistance()) 

})

const pi = 3.1415


app.listen(3080, () => {
    console.log("Running on Port 3080 !")
    console.log("http://localhost:3080")
})