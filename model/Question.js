const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
    category: { type: String, required: true },
    data: { type: String, required: true },
    answer: { type: String, required: true },
});

module.exports = Question = mongoose.model('question', QuestionSchema);