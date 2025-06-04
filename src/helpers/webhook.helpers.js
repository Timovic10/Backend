const { response } = require("express");
const usersubModel = require("../usersub/usersub.schema");
const paystack = require("paystack-api")(process.env.TEST_SECRET);


const chargeSuccess = async(data) => {
    try{
        const output= data.data;
        const reference = output.reference;
        console.log(output);

        const subscriber = await usersubModel.findOne({ paystack_ref: reference});
        const id = subscriber._id;
        console.log("updating charge status");

        if (subscriber.paystack_ref == "sucess")
            return{ 
              data: {},
              message: "Transaction has been verified",
              status: 1,
            };
        const response = await paystack.transaction.verify({
            reference: subscriber.paystack_ref,
        });

        if (response.data.status == "success") {
            const data = {
                paystack_ref: response.data.status,
                amountSub: output.amount,
            };
            await usersubModel.findByIdAndUpdate(id,data);
            console.log("Charge Successful");
        } else {
            console.log("Charge Unsuccessful")
        }




    } catch (err){
        console.log({data: {}, error: `${err}`,status:1 });
    }
};

//successful subscription 

const planChargeSuccess = async(data) => {
    try{
        const output = data.data;
        const reference = output.reference;
        console.log(output);
        const subscriber = await usersubModel.findOne({paystack_ref: reference});
        console.log(subscriber)
        const id = subscriber._id;

        // subscribe for user

        if (subscriber.paystack_ref == "success")
            return {
                data: {},
                message: "Transaction has been verified",
                status: 1,
     };
        const response = await paystack.transaction.verify({
            reference: subscriber.paystack_ref,
        });
        if (response.data.status == "success") {
            await usersubModel.findByIdAndUpdate(id, {
                isSubscribed: true,
                paystack_ref: response.data.status,
                planName: output.plan.name,
                timeSubscribed: response.data.paid_at,
            });
            console.log("Charge Successful");

        } else {
            console.log ("Charge Unsuccessful");
        }

    } catch (error){
        console.log({data: {}, error: `${error}`, status: 1});
    }
};


//invoice Payment failed


const cancelSubscription = async (data) => {
    try{
        const output = data.data;
        const reference = output.reference;


        console.log(output);
        const subscriber = await usersubModel.findOne({paystack_ref: reference});
        console.log(">>>>>><> dkf", subscriber);
        const id = subscriber._id;

        console.log("Cancelling subscription...");

        await usersubModel.findByIdAndUpdate(id, {
            isSubscribed: false,
            paystack_ref: response.data.status,
            planName: "cancelled",
        });
        console.log("User Subscription Cancelled");

    } catch (error) {
        console.log({data: {}, error: `${error}`, status:1 })

    }
};

module.exports = { chargeSuccess, planChargeSuccess, cancelSubscription };