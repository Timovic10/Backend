const commentschema = require("../models/comment.schema");

const addComment = async(req, res, next) => {
  try{
    const userId = req.userData.userId;
    const {text} = req.body;
    const poemId = req.params.poemId;
     console.log("userId", userId);
     console.log("commenttext", text);
     console.log("poemId", poemId);
     const comment = await commentschema({
      userId,poemId,text,
     });
     await comment.save();
     
     res.status(201).json({success: true, data: comment});
    } catch (err) {
    res.end("notworking");
    
}};

module.exports = { addComment};