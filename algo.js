class stp {

    constructor(name) {
        this.name = name;
    }



    greeting() {

        return `Hello ${this.name} ! this is Shotest part algo.`
    }

    getDistance() {

        let myObj = {a:1,b:2,c:3}

        let mySecObj = {...myObj,D:4,E:5,F:6}


        let firstArray = [2535,2536,2537]
        let myArray = [...firstArray,2538,2539,2540]

        myArray = myArray.map(x => (x - 543))
        for (let i = 0; i < myArray.length; i++) {
           
            

        }



        console.log(mySecObj)
        console.log("HEllo")

        // while (true){

        // }

        // if ( 1 > 2){
        //     // if True
        // }else{
        //     // if False
        // }

        // return 300
    }


}

module.exports = stp