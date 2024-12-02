
// The library which allow us to write data to mongo-db dataBase
// The model will hold the "document" which is stored in the mongo-db dataBase
// A "document" is a kind of json object, fields and values 
const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const snippetSchema = new mongoose.Schema({
    title: { type: String },
    description: { type: String },
    code: { type: String },
    user: {type: ObjectId, required: true}
}, {
    timestamps: true 
});


const Snippet = new mongoose.model("snippet", snippetSchema);


module.exports = Snippet;
