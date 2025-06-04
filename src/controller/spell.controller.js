const spellCheck = (req, res) => {
    //   const text = "cup";
      const playertext = req.body.text; // works 
      //   const { playertext } = req.body; // works too
      // console.log(text);
      if (
        playertext.charAt(0) === "c" &&
        playertext.charAt(1) === "u" &&
        playertext.charAt(2) === "p"
      ) {
        res.status(200).json({ message: "correct" });
        console.log("correct");
      } else {
        res.status(200).json({ message: "wrong, try again" });
        console.log("try again");
      }
    };
    
    module.exports = { spellCheck };