const express = require('express');
const router = express.Router();

// Models
const TriviaList = require('../../model/TriviaList');
const Question = require('../../model/Question');

/**
 * @route GET api/listsd
 * @description Get all lists
 * @access Public
 */
router.get('/', async (req, res) => {
    TriviaList.find()
      .then(items => res.json(items));
});

/**
 * @route POST api/lists
 * @description Create new list
 * @access Public
 */
router.post('/', async (req, res) => {
    // Create and save each question
    const newQuestions = [];
    for (const [index, question] of req.body.questions.entries()){
      let newQuestion = new Question({
        category : question.category,
        data : question.data,
        answer : question.answer,
      });
      try {
        let question = await newQuestion.save();
        if (!question) throw Error(index); // report faulty index 

        newQuestions.push(question);
      } catch (e) {
        res.status(400).json({ msg: e.message });
      }
    }

    // Create and save new list
    const newList = new TriviaList({
      name: req.body.name,
      questions : newQuestions
    });
    try {
      const list = await newList.save();
      if (!list) throw Error('Something went wrong saving the list');
  
      res.status(200).json(list);
    } catch (e) {
      res.status(400).json({ msg: e.message });
    }
});

/**
 * @route DELETE api/lists/:id
 * @description Delete a list
 * @access Public
 */
router.delete('/:id', async (req, res) => {
  try {
    const list = await TriviaList.findById(req.params.id);
    if (!list) throw Error('No list found');
    
    const removed = await list.remove();
    if (!removed)
      throw Error('Something went wrong while trying to delete the list');

    res.status(200).json({ success: true });
  } catch (e) {
    res.status(400).json({ msg: e.message, success: false });
  }
});


module.exports = router;