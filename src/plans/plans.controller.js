const usersubModel = require("../usersub/usersub.schema");


const paystack = require("paystack-api")(process.env.TEST_SECRET);

const { chargeSuccess, planChargeSuccess, cancelSubscription } = require("../helpers/webhook.helpers");

const createPlan = async (req, res) => {
    try{
        const {name, amount, interval} = req.body;
        console.log(">>|||", name, amount, interval);
        const response = await paystack.plan.create({
            name, amount, interval
        });

        res.status(201).json({
            data: response.data,
            message: response.message,
            status:response.status
        })
    } catch (err){
        res.status(400).send({data:{}, error: `${err}`, status:1} );
    }
};

const getPlans = async (req, res) => {
    try{
        const response = await paystack.plan.list();
        res.status(200).send({
            data: response.data,
            message: response.message,
            status: response.status,

        });
    } catch (err){
        res.status(400).send({data: {}, error: `${err}`, status: 1});
    }
};  

const addWebhook = async (req, res) => {
    try{
        let data = req.body;
        console.log("webhook data: ", data);

        switch (data){
            case (data.event = "invoice.payment_failed"):
               await cancelSubscription(data);
                console.log("Invoice Failed");
                break;
            case(data.event = "Invoice.create"):
               console.log("Invoice created");
               break;
            case(data.event = "invoice.update"):
                data.data.status == "sucess"? await planChargeSuccess(data) : console.log("Update failed");
                break;
            case (data.event = "subscription.not_renewed"):
                console.log ("unrenewed");
                break;
            case(data.event = "subscription.disable"):
               console.log("disable");
               break;
            case (data.event = "transfer.success"):
               console.log("transfer successful");
               break;
            case (data.event = "transfer.failed"):
               console.log("transfer failed");
               break;
            case (data.event = "transfer.reversed"):
                console.log("transfer reversed");
                break;

            default:
                // for success charges
                const obj = data.data.plan;
                console.log("Implementing charges logic...");
                Object.keys(obj).length === 0 && obj.constructor === Object
                ? await chargeSuccess(data)
                : await planChargeSuccess(data);
                console.log("sucess");
                break;


    
        }
    } catch (error){
        res.status(400).send({data: {}, error: `${error}`, status: 1 });
    }
};
module.exports = { createPlan, getPlans, addWebhook };