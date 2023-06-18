const express = require('express');
const { addnotes, getAllnotes, getnotByuserId } = require('../controllers/notes-controller');
const router = express.Router();

router.route('/getallnotes').get(getAllnotes);
router.route('/addnotes').post(addnotes);
router.route('/findusernotes/:id').get(getnotByuserId);
module.exports = router;
