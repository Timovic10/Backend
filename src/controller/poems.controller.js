const poemschema = require("../models/poem.schema");

 const getPoems = async (req, res) => {
   console.log("Client requested for poem");
   try {
     const poems = await poemschema.find();
     if (!poems)
       return res.status(404).json({
         success: false,
         message: "No poem could be retrieved at the moment!",
       });
     res.status(200).json({ success: true, data: poems });
     console.log(poems);
   } catch (err) {
     res.status(500).json({
       message: err.message,
     });
   }
 };
 
 const getPoem = async (req, res) => {
   try {
     const query = req.query;
     console.log(query);
     if (!query)
       return res.status(404).json({
         success: false,
         message: "No matching poem!",
       });
     const foundPoem = await poemschema.findOne(query);
     if (!foundPoem) {
       return res.status(404).json({ messsage: "Poem not found!" });
     }
     res.status(200).json({ success: true, data: foundPoem });
   } catch (err) {
     res.status(500).json({
       message: err.message,
     });
   }
 };
 
 const updatePoem = async (req, res) => {
   const {id,category, title, body} = req.body
    
   try{
    const updates ={};
    if(title){
      updates.title = title;
    }
    if(body){
      updates.body = body;
    }
    if(category) {
      updates.category = category;
    }
    if(Object.keys(updates).length === 0){
      return res
         .status(400).
         json({
             success: false,
             message: "Bad request, at least on field must be provided",
         });
    }

     if(id){
      console.log("idddddd", id);
      const poem = await poemschema.updateOne(
            {_id: id},
          {$set: updates}
          );
          if(poem.matchedCount === 0){
            return res
            .status(404)
            .json({ success: false, message: "Poem not found"});
        }
        const updatedPoem = await poemschema.findOne({
          _id: id
        })
        res.status(201).json({success: true, data: updatedPoem});

     }


   } catch (err) {
    console.log("Error patching poem:", err.message);
    res
    .status(500)
    .json({ message: "Iternal Server error", eeeror: err.message});
   }
   
 };
 const createPoem = (req, res) => {
   try {
    const image = req.file.filename;
     const { title, body, category } = req.body;
     const { userId } = req.userData;
     const newPoem = new poemschema({
       author: userId,
       title: title,
       body:    body,
       image: image,
       category: category,
     });
     console.log(newPoem);
     newPoem.save();
     res.status(201).json({
       success: true,
       message: "Poem created successfully",
       poem: newPoem,
     });
   } catch (err) {
     res.status(500).json({
       message: err.message,
     });
   }
 };
 
 module.exports = { getPoems, createPoem, getPoem, updatePoem };
 
 