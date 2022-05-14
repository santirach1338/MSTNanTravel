

const axios = require('axios')

class Direction {

    API_URL= "https://maps.googleapis.com/maps/api/directions/json?"
    API_Key;
    constructor(apiKey){
        this.API_Key = apiKey;
    }


    async getDistance(origin,destination) {
        let query = `${this.API_URL}origin=${origin}&destination=${destination}&key=${this.API_Key}&mode=driving`;
        let {data} = await axios.get(query)
        const {legs} = data.routes[0]
        const {distance} = legs[0]

        return new Promise((resolve,reject) => { 
            resolve(distance)
        })
       
    }



}



module.exports = Direction;