const express = require('express');
const suggestedFaqController = require('../Controllers/suggestedController.js');
const router = express.Router();

// Routes
router.post('/creation', suggestedFaqController.createSuggestion); 
router.get('/getAllsfaqs', suggestedFaqController.getAllSuggestions); 
router.patch('/approve', suggestedFaqController.approveSuggestion); 
router.put('/update', suggestedFaqController.updateSuggestion);
router.get('/getsuggestionbyid', suggestedFaqController.getSuggestionById);
router.post('/suggestions/:id/promote', suggestedFaqController.promoteSuggestion); 
router.get('/suggestions/promoted', suggestedFaqController.getPromotedSuggestions); 

module.exports = router;
