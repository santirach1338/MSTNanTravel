const direction = require('./Direction')
const cfg = require('./configs');
const Direction = require('./Direction');
const myAPIKey = cfg.API_KEY;
const Direct = new direction(myAPIKey);


class mst {

    currentlocation = ""
    visited = []
    TraveLingPath = []  //เก็บลำดับสถานที่ที่จะไปท่องเที่ยว
    todoList = []
    distances = []

    constructor() {
    }

    async getpath(tripList, curLoc) {

        // Initial //
        this.currentlocation = curLoc
        await this.getDistance(tripList, this.currentlocation).then((data) => {
            this.todoList = data
            let place = this.minNode(data)
            this.setVisited(place)

        })

        for (let i = 0; i < tripList.length - 1; i++) {

            // console.log(this.visited)
            await this.getDistance(this.todoList, this.currentlocation).then((data) => {

                this.todoList = data
                let place = this.minNode(data)
                this.setVisited(place)

            })

        }


        return new Promise((resolve, reject) => {
            const obj = {
                path: this.TraveLingPath,
                totalDistance: this.distances.reduce((partialSum, a) => partialSum + a, 0)
            }

            resolve(obj)
        })

    }

    removeItem(place) {
        let index = this.todoList.indexOf(place)
        this.todoList.splice(index, 1)
        // console.log(index)
    }

    //รับค่า Node
    setVisited(Node) {

        // console.log(Node)
        this.visited.push(Node.nName)
        this.TraveLingPath.push({ nName: Node.nName, geo: Node.geo, distance: Node.distance })
        this.currentlocation = Node.geo  //set ที่อยู่ปัจจุบัน 
        this.distances.push(Node.distance)
        this.removeItem(Node) // ลบสภานที่ ที่ไปแล้วออกจาก List    
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

                let obj = { nName: Nodelist[i].nName, geo: Nodelist[i].geo, distance: data.value }
                pathData.push(obj)

                if (pathData.length == Nodelist.length) {
                    isDone = true
                }

            })
        }
        return new Promise((resolve, reject) => {

            if (isDone) {
                // console.log(pathData)
                resolve(pathData)
            }
        })



    }

}

module.exports = mst