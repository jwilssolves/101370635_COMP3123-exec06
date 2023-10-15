const { NoteModel } = require('../models/NotesModel');
const express = require("express");

const noteRoute = express.Router();

//TODO - Create a new Note
//http://mongoosejs.com/docs/api.html#document_Document-save
noteRoute.post('/notes', async (req, res) => {
    // Validate request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }
    //TODO - Write your code here to save the note
    try {
        const nnote = new NoteModel(req.body.content);
        await nnote.save();

        return res.status(201).send({ status: true, message: "Note created successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ status: false, message: "There was a problem." });
    }
});

//TODO - Retrieve all Notes
//http://mongoosejs.com/docs/api.html#find_find
noteRoute.get('/notes', async (req, res) => {
    try {
        return res.status(200).send(await NoteModel.find());
    } catch (error) {
        console.error(error);
        return res.status(500).send({ status: false, message: "There was a problem." });
    }
    //TODO - Write your code here to returns all note
});

//TODO - Retrieve a single Note with noteId
//http://mongoosejs.com/docs/api.html#findbyid_findById
noteRoute.get('/notes/:noteId', async (req, res) => {
    //TODO - Write your code here to return onlt one note using noteid
    try {
        const note = await NoteModel.findOne({ _id: req.params.noteId });
        return res.status(200).send(note);
    } catch (error) {
        console.error(error);
        return res.status(500).send({ status: false, message: "There was a problem." });
    }
});

//TODO - Update a Note with noteId
//http://mongoosejs.com/docs/api.html#findbyidandupdate_findByIdAndUpdate
noteRoute.put('/notes/:noteId', async (req, res) => {
    // Validate request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }
    //TODO - Write your code here to update the note using noteid
    try {
        const note_val = new NoteModel(req.body.content);
        const val = note_val.validateSync();
        if (!!val) throw val;

        const obj = {
            noteTitle: req.body.content.noteTitle, 
            noteDescription: req.body.content.noteDescription,
            priority: req.body.content.priority,
        };
        const result = await NoteModel.updateOne({ _id: req.params.noteId }, {
            $set: { ...obj, dateUpdated: new Date(Date.now()) }
        });
        return res.status(200).send(result);
    } catch (error) {
        console.error(error);
        return res.status(500).send({ status: false, message: "There was a problem." });
    }
});

//TODO - Delete a Note with noteId
//http://mongoosejs.com/docs/api.html#findbyidandremove_findByIdAndRemove
noteRoute.delete('/notes/:noteId', async (req, res) => {
    //TODO - Write your code here to delete the note using noteid
    try {
        const result = await NoteModel.deleteOne({ _id: req.params.noteId });
        return res.status(200).send(result);
    } catch (error) {
        console.error(error);
        return res.status(500).send({ status: false, message: "There was a problem." });
    }
});


module.exports = { noteRoute };