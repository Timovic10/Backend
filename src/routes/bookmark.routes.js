const bookmarkSchema = require("../models/bookmark.schema");
const Poem = require("../models/poem.schema");

const addBookmark = async (req, res) => {
  try {
    const { userId } = req.userData;
    const poemId = req.params.poemId;

    const poemExists = await Poem.findById(poemId);
    if (!poemExists) {
      return res
        .status(404)
        .json({ success: false, message: "Poem not found" });
    }

    const existingBookmark = await bookmarkSchema.findOne({ userId, poemId });
    if (existingBookmark) {
      return res
        .status(409) // conflict
        .json({ success: false, message: "Bookmark already exists" });
    }

    const bookmark = new bookmarkSchema({ userId, poemId });
    await bookmark.save();

    res.status(201).json({
      success: true,
      data: bookmark,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

const getBookmarks = async (req, res) => {
  try {
    const { userId } = req.userData;
    const bookmarks = await bookmarkSchema.find({ userId }).populate("poemId");

    res.status(200).json({ success: true, message: bookmarks });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

const deleteBookmark = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.userData;
    const bookmark = await bookmarkSchema.findOneAndDelete({ _id: id, userId });
    if (!bookmark)
      return res.status(404).json({ message: "Bookmark not found" });
    res.json({ message: "Bookmark deleted" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

module.exports = { addBookmark, getBookmarks, deleteBookmark };


