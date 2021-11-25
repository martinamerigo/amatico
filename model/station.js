const mongoose = require ('mongoose');

//Membuat schema
const Stationschema = new mongoose.Schema({
    "name": {
        type: String,
        required:true, 
    },
    "routes": {
        type: Number,
        required:true, 
    },
    "sta": {
        type: Number,
        required:true, 
    }

})


const Station = mongoose.model ('station',Stationschema)
console.log('database station connected');

module.exports = Station;
