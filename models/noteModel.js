const mongoose = require("mongoose");

let Schema = mongoose.Schema;

// child model with author name
let authorModel = new Schema( {
    name: {type: String}
});

// parent model, connected to (possibly) multiple authorss
let noteModel = new Schema(
    {
        title: {type: String},
        body: {type: String},
        author: [authorModel]
    }
);

module.exports = [mongoose.model('Note', noteModel), mongoose.model('Author', authorModel)];