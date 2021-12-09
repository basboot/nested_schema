const express = require("express");

const [Note, Author] = require("../models/noteModel");

let routes = () => {
    let notesRouter = express.Router();

    notesRouter.route("/notes/init")

    // POST /notes/init to create some demo data
    .post((req, res) => {
        try {
        // Cleanup data
        Author.remove({}, function(err) { 
            console.log(`collection removed. Status: ${err}`); 
        });
        Note.remove({}, function(err) { 
            console.log(`collection removed. Status: ${err}`); 
        });

        // Create testdata
        let author1 = new Author({
            name: "Bas"
        });

        let author2 = new Author({
            name: "Erik"
        });

        author1.save();
        author2.save();

        let note1 = new Note({
            title: "This is note 1",
            body: "This is the body of note 1",
            author: [author1]
        });

        let note2 = new Note({
            title: "This is note 2",
            body: "This is the body of note 2",
            author: [author1, author2]
        });

        note1.save();
        note2.save();

        res.status(200).send();

        // something went wrong during delete, create or save
        } catch (err) {
            res.status(500).send(err);
        }
    });

    notesRouter.route("/authors")
    
    .get( (req, res) => { 
        Author.find({}, (err, authors) => {
            if (err) {
                res.status(500).send();
            } else {
                res.send(authors);
            }
        });
        
    } )   

    notesRouter.route("/notes")
    
    .get( (req, res) => { 
        Note.find({}, (err, notes) => {
            if (err) {
                res.status(500).send();
            } else {
                res.send(notes);
            }
        });
        
    } )
    
    return notesRouter;
}
module.exports = routes;