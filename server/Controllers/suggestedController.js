var db = require('../modals/index.js');
const Category = db.categoryModel;
const SubCategory = db.subcategoryModel;
const Course = db.courseModel;
const Lecture = db.lectureModel;
const Video = db.videoModel;
const FAQ = db.faqModel;
const User = db.faqModel;
const SuggestedFAQ = db.suggestedfaqModel;
const emailController = require("../Controllers/emailController");
const  {ApiResponse} = require("../utils/ApiResponse.js");  
const suggestedFaqController = {
  /**
   * Create a new suggested FAQ
   */
  createSuggestion: async (req, res) => {
    try {
      const { question, answer } = req.body;
      console.log("req.body",req.body)
      const userId = req.user?.id || null; // Assumes `req.user` contains authenticated user info

      if (!question) {
        return res.status(400).json({ error: 'Question is required.' });
      }

      const suggestion = await SuggestedFAQ.create({
        ...req.body, userId
      });
      let sfaq=suggestion.dataValues;
//       if(userId){
//       const user= await User.findByPk(userId)

// // Email payload preparation for suggested FAQ
// const emailPayload = {
//   userEmail: user.email, 
//   userFirstName: user.fullname, 
//   suggestedQuestion: suggestion.question, 
//   suggestedAnswer: suggestion.answer, 
//   references: suggestion.references, 
// }
// const sendEmailOnSuggestedFAQ = await emailController.sendEmailOnSuggestedFAQ(emailPayload);
// console.log("sendEmailOnSuggestedFAQ",sendEmailOnSuggestedFAQ);
// };

// Send email to admin for suggested FAQ
      return res.status(201).json({ message: 'Suggestion submitted successfully.', sfaq});
    } catch (error) {
      return res.status(500).json({ error: 'An error occurred while submitting the suggestion.', details: error.message });
    }
  },

  /**
   * Get all suggested FAQs
   */
  getAllSuggestions: async (req, res) => {
    try {
      const suggestions = await SuggestedFAQ.findAll({
        where: { approved: false },
        order: [['createdAt', 'DESC']],
        raw:true
      });

      return res.status(200).json(suggestions);
    } catch (error) {
      return res.status(500).json({ error: 'An error occurred while fetching suggestions.', details: error.message });
    }
  },

  /**
   * Approve a suggested FAQ
   */
  approveSuggestion: async (req, res) => {
    try {
      const  id  = req.query.faqId; 
      const adminId = req.user?.id; 
      const suggestion = await SuggestedFAQ.findByPk(id);
      if (!suggestion) {
        return res.status(404).json({ error: 'Suggestion not found.' });
      }
      if (suggestion.approved) {
        return res.status(400).json({ error: 'This suggestion is already approved.' });
      }
      suggestion.approved = true;
      suggestion.approvedByAdminId = adminId;
      await suggestion.save();

      return res.status(200).json({ message: 'Suggestion approved successfully.', suggestion });
    } catch (error) {
      return res.status(500).json({ error: 'An error occurred while approving the suggestion.', details: error.message });
    }
  },
  /**
   * Promote an approved suggestion to the FAQ table
   */
  promoteSuggestion: async (req, res) => {
    try {
      const { id } = req.params; // ID of the suggested FAQ

      const suggestion = await SuggestedFAQ.findByPk(id);

      if (!suggestion) {
        return res.status(404).json({ error: 'Suggestion not found.' });
      }

      if (!suggestion.approved) {
        return res.status(400).json({ error: 'Suggestion must be approved before promotion.' });
      }

      if (suggestion.promotedToFAQ) {
        return res.status(400).json({ error: 'This suggestion has already been promoted to the FAQ.' });
      }

      // Promote to FAQ
      await suggestion.promoteToFAQ(FAQ);

      return res.status(200).json({ message: 'Suggestion promoted to FAQ successfully.', suggestion });
    } catch (error) {
      return res.status(500).json({ error: 'An error occurred while promoting the suggestion.', details: error.message });
    }
  },
  /**
   * Get all approved and promoted suggestions
   */
  getPromotedSuggestions: async (req, res) => {
    try {
      const suggestions = await SuggestedFAQ.findAll({
        where: { approved: true, promotedToFAQ: true },
        order: [['createdAt', 'DESC']],
      });

      return res.status(200).json({ suggestions });
    } catch (error) {
      return res.status(500).json({ error: 'An error occurred while fetching promoted suggestions.', details: error.message });
    }
  },
  updateSuggestion: async (req, res) => {
    try {
      const  id  = req.query.faqId; // ID of the suggested FAQ
      const { question, answer } = req.body; // Fields to update
  console.log("suggested id",req.query)
      const suggestion = await SuggestedFAQ.findByPk(id);
  console.log("suggestion",suggestion) 
      if (!suggestion) {
        return res.status(404).json({ error: 'Suggestion not found.' });
      }
  
      // Update fields if provided
      suggestion.question = question || suggestion.question;
      suggestion.answer = answer || suggestion.answer;
  
      await suggestion.save();
  
      return res.status(200).json({
        message: 'Suggestion updated successfully.',
        suggestion,
      });
    } catch (error) {
      return res.status(500).json({
        error: 'An error occurred while updating the suggestion.',
        details: error.message,
      });
    }
  }
  ,
  getSuggestionById :async (req, res) => {
    try {
      const  id  = req.query.faqId; // ID of the suggested FAQ
      const suggestion = await SuggestedFAQ.findByPk(id);
      if (!suggestion) {
        return res.status(404).json(new ApiResponse(404, null, "Suggestion not found"));
      }
      return res.status(200).json(
        new ApiResponse(200, suggestion.dataValues, "Suggestion fetched successfully")
      );
    } catch (error) {
      return res.status(500).json(
        new ApiResponse(500, null, "An error occurred while fetching the suggestion", error.message)
      );
    }
  }
};
module.exports = suggestedFaqController;
