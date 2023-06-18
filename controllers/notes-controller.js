const Notes = require("../models/notes");
const User = require("../models/user");


exports.getAllnotes = async (req, res, next) => {
  let notes;
  try {
    notes = await Notes.find();
  } catch (err) {
    console.log(err);
  }
  if (!notes) {
    return res.status(404).json({ message: "No Notes Found" });
  }
  return res.status(200).json({ notes });
}

exports.addnotes = async (req, res, next) => {
  const { title, description, user } = req.body;

  const notes = new Notes({
    title,
    description,
    user
  });
  try {
    await notes.save();
  } catch (error) {
    console.log(error);


  }
  return res.status(201).json({ notes });
}

exports.getnotByuserId = async (req, res, next) => {
  const user = req.params.id;


  let notes = await Notes.find({ user:user });


  return res.status(200).json({ notes });
}