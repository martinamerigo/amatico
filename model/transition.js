const mongoose = require ('mongoose');

//Membuat schema
const transitionschema = new mongoose.Schema({
    "trans": {
        type: String,
        required:true, 
    },
    "from": {
        type: String,
        required:true, 
    },
    "to": {
        type: String,
        required:true, 
    },
    "distance": {
        type: Number,
        required:true, 
    },

    "indicatoroptional1":{
        type:Number,
        required:true,
    },

    "indicatoroptional2":{
        type:Number,
        required:true,
    }
})

//11 -> gaada opsi
//12 -> ada opsi, opsi pertama
//22 -> opsi kedua
const Transition = mongoose.model ('transition',transitionschema)
console.log('database transition connected');

module.exports = Transition;
