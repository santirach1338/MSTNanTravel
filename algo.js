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

        
        await this.getDistance(tripList, curLoc).then((data) => {
            
            this.todoList = data
            let place = this.minNode (data)
            this.setVisited(place)
            this.removeItem(place)
            console.log(this.todoList)

            
        })
        
        for (let i = 0; i < tripList.length - 1; i++) {

            await this.getDistance(this.todoList, this.currentlocation).then((data) => {
            
                this.todoList = data
                let place = this.minNode (data)
                this.setVisited(place)
                this.removeItem(place)
                // console.log(this.todoList)
                
            })

        }


        return new Promise((resolve,reject) =>{
            resolve(this.TraveLingPath)
        })
        
    }
    
    removeItem (place){
        let index = this.todoList.indexOf(place)
        this.todoList.splice(index,1)
        // console.log(index)
    }

    //รับค่า Node
    setVisited (Node) {
        this.visited.push(Node.nName)
        this.TraveLingPath.push({nName:Node.nName,geo:Node.geo})
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

        let pathData = []
        let isDone = false

        for (let i = 0; i < Nodelist.length; i++) {
            await Direct.getDistance(curLoc, Nodelist[i].geo).then((data) => {

                let obj = { ...Nodelist[i], distance: data.value }
                pathData.push(obj)

                if (pathData.length == Nodelist.length) {
                    isDone = true
                }

            })
        }
        return new Promise((resolve, reject) => {

            if (isDone) {
                resolve(pathData)
            }
        })

    }

}

module.exports = stp