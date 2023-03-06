const express = require('express')
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');

//Route1: get all the notes:'api/notes/fetchallnotes

router.get('/fetchallnotes', fetchuser, async (req, res) => {
   try {


      const notes = await Notes.find({ user: req.user.id });
      res.json(notes);
   }
   catch (error) {
      console.error(error.message);
      res.status(500).send("Some Error Occured");
   }
})


//Route 2: Add a new post using post method:api/notes/addnote Login required, 
router.post('/addnote', [
   body('title', 'Enter a valid title min length 3').isLength({ min: 3 }),

   body('description', 'description must be at least 5 character').isLength({ min: 8 }),
], fetchuser, async (req, res) => {
   try {
      async (req, res) => {
         const errors = validationResult(req);
         if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });

         }
      }

      const { title, description, tag } = req.body;
      const note = new Notes({
         title, description, tag, user: req.user.id
      })
      const savenote = await note.save();



      res.json(savenote);
   } catch (error) {
      console.error(error.message);
      res.status(500).send("Some Error Occured");
   }
})
//Route 3: Add a new post using post method updatenote:api/notes/updatenote/:id' Login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
   try {
      
   
   const { title, description, tag } = req.body;
   //create a new note
   const newnote = {};
   if (title) { newnote.title = title };
   if (description) { newnote.description = description };
   if (tag) { newnote.tag = tag };

   // find a note to update it
   let note = await Notes.findById(req.params.id);
   if (!note) { return res.status(404).send("Not found") }
   if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
   }
   note = await Notes.findByIdAndUpdate(req.params.id, { $set: newnote }, { new: true })
   res.json(note);
} catch (error) {
   return res.status(404).json({error:"Not Updated , Some error occured"})
}
})

//Route 4: Add a new post using post method updatenote:api/notes/delete/:id' Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
   let note = await Notes.findById(req.params.id);
   /// if note is not exist
   if (!note) { return res.status(404).send(" Not Exist Note") }
   /// if user is not validate
   if (note.user.toString() !== req.user.id) {
      return res.status(401).send(" You are not allowed to delete this note");
   }
   try {
      note = await Notes.findByIdAndDelete(req.params.id);
      return res.send(note);
      
   } catch (error) {
      return res.status(404).json({error:"Not deleted , Some error occured"})
     
   }
   
}
)
module.exports = router;