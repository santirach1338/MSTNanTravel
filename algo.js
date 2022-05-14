const direction = require('./Direction')

const myAPIKey = "AIzaSyDt78c-QEji3m2PtBU8CEJ60euER-j4Nxk";

const Direct = new direction(myAPIKey);


class stp {

    currentlocation = {}
    visited = []
    TraveLingPath = []  //เก็บลำดับสถานที่ที่จะไปท่องเที่ยว
    todoList = []

    constructor() {
    }

    async getpath(tripList, curLoc) {

        this.currentlocation = curLoc
        
        
        let distance = []
        
        await this.getDistance(tripList, curLoc).then((data) => {
            
            this.todoList = data
            let place = this.minNode (data)
            this.setVisited(place)
            this.removeItem()
            console.log(this.todoList)

        })


        for (let i = 0; i < tripList.length; i++) {
            
            for (let j = 0; j < this.todoList.length; j++) {
                

                
            }

        } 


    }
    
    removeItem (index){

        this.todoList.splice(index,1)

    }

    //รับค่า Node
    setVisited (Node) {
        this.visited.push(Node.nName)
        this.currentlocation = Node.geo  //set ที่อยู่ปัจจุบัน 
    }

    //return สถานที่ที่ใกล้ที่สุด
    minNode(Nodelist) {

        let distance = Nodelist.map((x) => (x.distance))
        let min = Math.min(...distance)
        let index = distance.indexOf(min)

        return Nodelist[index]
    }

    async getDistance(Nodelist, curLoc) {
        console.log("getDistance")

        let pathData = []
        let isDone = false



        for (let i = 0; i < Nodelist.length; i++) {
            await Direct.getDistance(curLoc, Nodelist[i].geo).then((data) => {

                let obj = { ...Nodelist[i], distance: data.value }
                pathData.push(obj)

                if (pathData.length == Nodelist.length) {
                    // console.log(pathData)
                    isDone = true
                }

                // console.log(obj)
            })
        }
        return new Promise((resolve, reject) => {


            if (isDone) {

                console.log("resolve")
                resolve(pathData)
            }
        })

    }

}

module.exports = stp