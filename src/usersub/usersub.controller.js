const usersubModel = require("./usersub.schema");
const paystack = require("paystack-api")(process.env.TEST_SECRET);

const createSubscriber = async (req, res) => {
  console.log( req.userData); 
  const {name,email,userId} = req.userData;
  console.log(">>>>>>>>>", name,email,userId);
  try {
    const isExisting = await usersubModel.findOne({ userId});
    if (isExisting) {
      return res
         .status(500)
         .json({success: false, message: "Existing subscriber"});
    }

    const newSubscriber = new usersubModel({
      name,
      userId,
      email,
    });
    console.log(newSubscriber);
    newSubscriber.save();
    res.status(201).json({
      success: true,
      message: "Subscriber added",
      subscriber: userId
    });
  } catch (err) {
    res.status(500).json({message: err.message});
  }

};

const getSubscriber = async (req, res) => {
  try {
    let userId = req.userData.userId;
    const subscriber = await usersubModel.findOne({ userId });
    if (!subscriber) {
      return res
         .status(500)
         .json({success: false, message: "Subscriber not found"});
    }
    res.status(200).json({
      subscriber,
      message: "Found subscriber",
      status: 0,
    });
  } catch (err) {
    res.status(500).send({ data: {}, error: err.message, status: 1 });
  }
};


const initializePayment = async (req, res) => {
  try {
    let userId = req.userData.userId;
    const subscriber = await usersubModel.findOne({ userId });
    if (!subscriber) getSubscriber();
    const id = subscriber._id;

    const { email, amount, plan } = req.body;
    const response = await paystack.transaction.initialize({
      email,
      amount,
      plan,
    });
    const data = {
      paystack_ref: response.data.reference,
    };
    await usersubModel.findOneAndUpdate(id, data);

    res.status(200).json({
      data: response.data,
      message: response.message,
      status: response.status,
    });
  } catch (error) {
    res.status(400).json({ data: {}, error: "${error.message}", status: 1 });
  }
};

const verifyPayment = async (req, res) => {
  try {
    let userId = req.userData.userId;
    const subscriber = await usersubModel.findOne({userId});
    const id = subscriber._id;
    if (subscriber.paystack_ref == "sucess")
      return res.status(401).json({
        data: {},
        message: "Transaction successful",
        status: 1,
      });
    const response = await paystack.transaction.verify({
      reference: subscriber.paystack_ref,
    });
    if (response.data.status == "success") {
      const data = {
        paystack_ref: response.data.status,
        amountSub: response.data.amount,
      };
      await usersubModel.findOneAndUpdate(id, data);

      return res.status(200).json({
        data: response.data,
        message: response.message,
        status: response.status,
      });
    } else {
      return res.status(200).json({
        data: response.data,
        message: response.message,
        status: response.status,
      });
    }
  } catch (error) {
    res.status(400).send({ data: {}, error: "${error.message}", status: 1 });
  }
};

module.exports = {
  createSubscriber,
  getSubscriber,
  initializePayment,
  verifyPayment,
};
