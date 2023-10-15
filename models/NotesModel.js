const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
    noteTitle: { type: String, require: true },
    noteDescription: { type: String, require: true },
    priority: { type: String, require: true, enum: ["HIGH", "LOW", "MEDIUM"] },
    dateAdded: { type: Date, require: true, default: new Date(Date.now()) },
    dateUpdated: { type: Date, default: null }
});
const NoteModel = mongoose.model("notes", noteSchema);

module.exports = { NoteModel };