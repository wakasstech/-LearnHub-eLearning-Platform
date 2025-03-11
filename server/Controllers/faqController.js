var db = require('../modals/index.js');
const Category = db.categoryModel;
const SubCategory = db.subcategoryModel;
const Course = db.courseModel;
const Lecture = db.lectureModel;
const Video = db.videoModel;
const FAQ = db.faqModel;
const { Op, Sequelize } = require('sequelize');
const fs = require('fs'); 
const readXlsxFile = require("read-excel-file/node");
const  {asyncHandler} = require("../utils/asyncHandler.js");
const  {ApiResponse} = require("../utils/ApiResponse.js");
const createFAQ = asyncHandler(async (req, res) => {
  const { question, answer, references } = req.body;
  console.log("Start creation of Faq and req.body",req.body)
  if (!question || !answer) {
    return res.status(400).json(new ApiResponse(400, null,"Question and answer are required"));
  }
  const faq = await FAQ.create({
    question,
    answer,
    references: references || [], // Default to an empty array if not provided
  });
console.log("FAQ",faq)
  return res.status(201).json(new ApiResponse(201, faq.dataValues, "FAQ created successfully"));
});
// const getAllFAQs = asyncHandler(async (req, res) => {
//  // const faqs = await FAQ.findAll({raw:true});
//  const activeFAQs = await FAQ.findAll({
//     where: { deleted: false },
//     raw: true
//   });
  
//   return res.status(200).json(new ApiResponse(200, activeFAQs, "FAQs fetched successfully"));
// });
const getAllFAQs = asyncHandler(async (req, res) => {
  const { page = 1, limit = 1000 } = req.query; // Default page is 1 and limit is 10
  
  // Parse page and limit to ensure they are numbers
  const pageNumber = parseInt(page, 10);
  const limitNumber = parseInt(limit, 10);
  // Calculate offset
  const offset = (pageNumber - 1) * limitNumber;

  // Fetch FAQs with pagination
  const { rows: activeFAQs, count: totalCount } = await FAQ.findAndCountAll({
    where: { deleted: false },
    raw: true,
    offset, // Skip this many items
    limit: limitNumber // Fetch this many items
  });

  // Calculate total pages
  const totalPages = Math.ceil(totalCount / limitNumber);

  return res.status(200).json(new ApiResponse(200, {
    faqs: activeFAQs,
    totalPages,
    currentPage: pageNumber,
    totalCount
  }, "FAQs fetched successfully"));
});
const getArchivedFAQs = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query; // Default page is 1 and limit is 10
  
  // Parse page and limit to ensure they are numbers
  const pageNumber = parseInt(page, 10);
  const limitNumber = parseInt(limit, 10);

  // Calculate offset
  const offset = (pageNumber - 1) * limitNumber;

  // Fetch archived FAQs with pagination
  const { rows: archivedFAQs, count: totalCount } = await FAQ.findAndCountAll({
    where: { deleted: true }, // Fetch only archived FAQs
    raw: true,
    offset, // Skip this many items
    limit: limitNumber // Fetch this many items
  });

  // Calculate total pages
  const totalPages = Math.ceil(totalCount / limitNumber);

  return res.status(200).json(new ApiResponse(200, {
    faqs: archivedFAQs,
    totalPages,
    currentPage: pageNumber,
    totalCount
  }, "Archived FAQs fetched successfully"));
});

const getFAQById = asyncHandler(async (req, res) => {
  const { id } = req.query;
  const faq = await FAQ.findByPk(id, { raw: true });
  console.log("FAQ",faq)
  if (!faq) {
    return res.status(404).json(new ApiResponse(404, null, "FAQ not found"));
  }
  return res.status(200).json(new ApiResponse(200, faq, "FAQ fetched successfully"));
});

// 4. Update an FAQ
const updateFAQ = asyncHandler(async (req, res) => {
  const { id } = req.query;
  const { question, answer, references } = req.body;

  const faq = await FAQ.findByPk(id);
console.log("FAQ",faq)
  if (!faq) {
    return res.status(404).json(new ApiResponse(404, null, "FAQ not found"));
  }

  // Update fields
  faq.question = question || faq.question;
  faq.answer = answer || faq.answer;
  faq.references = references || faq.references;

  await faq.save();
console.log("FAQ",faq)
  return res.status(200).json(new ApiResponse(200, faq.dataValues, "FAQ updated successfully"));
});
// 5. Delete an FAQ
// const deleteFAQ = asyncHandler(async (req, res) => {
//   const { id } = req.params;
//   const faq = await FAQ.findByPk(id);
//   if (!faq) {
//     return res.status(404).json(new ApiResponse(404, null, "FAQ not found"));
//   }
//   await faq.destroy();
//   return res.status(200).json(new ApiResponse(200, null, "FAQ deleted successfully"));
// });
const deleteFAQ = asyncHandler(async (req, res) => {
    const  id  = req.query.faqId;
    // Find the FAQ by primary key
    const faq = await FAQ.findByPk(id);
    if (!faq) {
      return res.status(404).json(new ApiResponse(404, null, "FAQ not found"));
    }
    if (!faq.deleted) {
      // Perform soft delete
      faq.deleted = true;
      await faq.save();
      return res.status(200).json(new ApiResponse(200, null, "FAQ archived successfully"));
    } else {
      // Perform permanent delete
      await faq.destroy();
      return res.status(200).json(new ApiResponse(200, null, "FAQ permanently deleted"));
    }
  });
  const uploadFaqsFromExcel = async (req, res) => {
    try {
      // Check if file is uploaded
      if (!req.file) {
        return res.status(400).send("Please upload an Excel file!");
      }
      const filePath = req.file.path;
      // Read Excel file
      const rows = await readXlsxFile(filePath);
      // Map rows to FAQs
      const faqs = rows.slice(1).map(row => {
        let references = row[2]; // Assuming 'references' is in the third column (index 2)
  
        // Check if 'references' is a string and parse if it looks like JSON
        if (typeof references === "string" && (references.startsWith("[") || references.startsWith("{"))) {
          try {
            references = JSON.parse(references);
          } catch (error) {
            console.error("Error parsing 'references' JSON:", error.message);
            throw new Error("Invalid JSON format in 'references' column.");
          }
        }
        return {
          question: row[0], 
          answer: row[1],  
          references,
          deleted: false,
          imported: true 
        };
      });
  
      // Bulk create FAQs in the database
      const result = await FAQ.bulkCreate(faqs);
  
      // Format the result to return necessary fields (or modify according to needs)
      const formattedResult = result.map(faq => ({
        id: faq.dataValues.id,
        question: faq.dataValues.question,
        answer: faq.dataValues.answer,
        references: faq.dataValues.references,
        createdAt: faq.dataValues.createdAt,
        updatedAt: faq.dataValues.updatedAt
      }));
      // Delete the file after processing
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log(`File ${filePath} deleted after processing.`);
      }
  
      // Respond with the created FAQs
      res.status(200).json({
        message: "FAQs uploaded and created successfully",
        data: formattedResult
      });
  
    } catch (error) {
      console.error("Upload error:", error.message);
  
      // Clean up file if there was an error
      if (req.file && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
        console.log(`File ${req.file.path} deleted due to error.`);
      }
  
      // Return error response
      res.status(500).json({
        message: `Failed to upload the file: ${req.file ? req.file.originalname : "unknown"}`,
        error: error.message
      });
    }
  };
  const searchFAQs = asyncHandler(async (req, res) => {
    const { query = '', page = 1, limit = 10 } = req.query; 
  
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    const offset = (pageNumber - 1) * limitNumber;
    const { rows: faqs, count: totalCount } = await FAQ.findAndCountAll({
      where: {
        deleted: false, // Only fetch active FAQs
        [Op.or]: [
          { question: { [Op.like]: `%${query}%` } }, // Match query in the question
          { answer: { [Op.like]: `%${query}%` } }    // Match query in the answer
        ]
      },
      raw: true,
      offset, // Pagination: skip these many records
      limit: limitNumber // Fetch only this many records
    });
  
    // Calculate total pages
    const totalPages = Math.ceil(totalCount / limitNumber);
  
    return res.status(200).json(new ApiResponse(200, {
      faqs,
      totalPages,
      currentPage: pageNumber,
      totalCount
    }, "FAQs fetched successfully"));
  });
  const restoreArchivedFAQ = asyncHandler(async (req, res) => {
    const  id  = req.query.faqId; 
    const faq = await FAQ.findByPk(id);
    if (!faq) {
      return res.status(404).json(new ApiResponse(404, null, "FAQ not found"));
    }
    if (!faq.deleted) {
      return res.status(400).json(new ApiResponse(400, null, "FAQ is not archived and cannot be restored"));
    }
    // Restore the FAQ
    faq.deleted = false;
    await faq.save();
    return res.status(200).json(new ApiResponse(200, faq.dataValues, "FAQ restored successfully"));
  });
  // Endpoint to update or delete multiple FAQs
  const performFAQAction = asyncHandler(async (req, res) => {
    var faqIds, action;
   if (req.body.data){
    var {faqIds,action} = req.body.data;
   }else
   {
    var {faqIds,action} = req.body;
   }
    if (!faqIds || !Array.isArray(faqIds)) {
      return res.status(400).json(new ApiResponse(400, null, 'Invalid FAQ IDs format. Must be an array.'));
    }
    if (!['verify', 'delete'].includes(action)) {
      return res.status(400).json(new ApiResponse(400, null, 'Invalid action. Must be "verify" or "delete".'));
    }
    try {
      if (action === 'verify') {
        // Update `verified` to true for selected FAQs
        
       const updatedfaq=  await FAQ.update({ verified: true }, { where: { id: faqIds } });
       console.log(updatedfaq,"updatedfaq")
      } else if (action === 'delete') {
        // Permanently delete the selected FAQs
        await FAQ.destroy({ where: { id: faqIds } });
      }
      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            null,
            `FAQs successfully ${action === 'verify' ? 'verified' : 'deleted'}.`
          )
        );
    } catch (error) {
      console.error('Error updating FAQs:', error);
      return res
        .status(500)
        .json(new ApiResponse(500, null, 'An error occurred while processing the request.'));
    }
  });
// Export the controller methods
module.exports = {
  createFAQ,
  getAllFAQs,
  getArchivedFAQs,
  getFAQById,
  updateFAQ,
  deleteFAQ,
  uploadFaqsFromExcel,
  searchFAQs,
  restoreArchivedFAQ,
  performFAQAction
};
