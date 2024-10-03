// phrasebookRoutes.js
const express = require("express");
const router = express.Router();
const {
  addPhrase,
  getAllPhrases,
  updatePhrase,
  deletePhrase,
  getPhraseById,
} = require("../controllers/phrasebookController.js");

router.post("/add",  addPhrase);
router.get("/", getAllPhrases);
router.put("/update/:id", updatePhrase);
router.delete("/delete/:id", deletePhrase);
router.get("/get/:id",getPhraseById);

module.exports = router;
