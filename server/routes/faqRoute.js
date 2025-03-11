const express = require('express');
const faqController = require('../Controllers/faqController.js'); // Adjust path
const excelUpload = require('../MiddleWares/excelUpload.js')
const router = express.Router();
router.post('/create-faq', faqController.createFAQ);
router.get('/getfaqs', faqController.getAllFAQs);
router.put('/faqAction', faqController.performFAQAction);
router.get('/getdeletedfaqs', faqController.getArchivedFAQs);
router.get('/getfaqbyid', faqController.getFAQById);
router.put('/update-faq', faqController.updateFAQ);
router.delete('/delete-faq', faqController.deleteFAQ);
router.patch('/restore', faqController.restoreArchivedFAQ);
router.post("/import-bulk-faqs", excelUpload.single("file"),faqController.uploadFaqsFromExcel);
router.get('/search-faqs', faqController.searchFAQs);


module.exports = router;
