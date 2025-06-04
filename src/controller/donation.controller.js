const donationsMade = (req, res, next) => {
    const { name, amount } = req.body;
    const timestamp = new Date().toLocaleString();
  
    console.log(name, amount, timestamp);
    if (!name || !amount) {
      return res.status(400).json({ message: "Donation failed" });
    }
    res.status(200).json({
      message: "Donation successful",
      data: { name, amount, timestamp },
    });
  };
  
  module.exports = { donationsMade };