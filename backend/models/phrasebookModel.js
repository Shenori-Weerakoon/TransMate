/*const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const phrasebookSchema = new Schema({
    phrase: {
        type: String,
        required: [true, 'Phrase is required'],
    },
    translation: {
        type: String,
        required: [true, 'Translation is required'],
    },
    language: {
        type: String,
        required: [true, 'Language is required'],
    },
    Id: {
        type: String,
        required: true,
      },
    // user: { // Reference to the User model
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User',
    //     required: true,
    // },
    

}, { timestamps: true });

const Phrasebook = mongoose.model('Phrasebook', phrasebookSchema);

module.exports = Phrasebook;
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Phrasebook schema definition
const phrasebookSchema = new Schema({
    phrase: {
        type: String,
        required: [true, 'Phrase is required'],
    },
    translation: {
        type: String,
        required: [true, 'Translation is required'],
    },
    language: {
        type: String,
        required: [true, 'Language is required'],
    },
    user: { // Reference to the User model
        // type: mongoose.Schema.Types.ObjectId,
        // ref: 'User', // Reference to the User model
        // required: true, // Make it required if every phrasebook must belong to a user
        type: String,
        required:true,
    },
    
}, { timestamps: true });

const Phrasebook = mongoose.model('Phrasebook', phrasebookSchema);

module.exports = Phrasebook;

