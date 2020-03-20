const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Question = require('./Question');

const TriviaListSchema = new Schema({
    name: { type: String, required: true },
    token: { type: String, required: false },
    questions: [{type: Schema.ObjectId, ref: 'question'}],
}, { timestamps: true });

// Middleware
TriviaListSchema.pre('find', function() {
    this.populate('questions');
});
TriviaListSchema.pre('remove', function(next){
    try {
        Question.remove({_id: { $in : this.questions }}).exec();
    } catch (err) {
        throw Error("Something went wrong when deleting the questions");
    }
    next();
});

module.exports = TriviaList = mongoose.model('triviaList', TriviaListSchema);