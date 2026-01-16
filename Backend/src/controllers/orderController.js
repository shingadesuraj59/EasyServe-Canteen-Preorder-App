import { Order } from "../models/orderModel.js";
import {User}from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// placing user order for frontend
const placeOrder = async (req, res) => {
       
     const frontend_URL=process.env.FRONTEND_URL
     console.log(frontend_URL)

     
    try {
        const newOrder = new Order({
            canteenId: req.body.canteenId,
            userId: req.body.userId,
            items: req.body.orderData.items,
            amount: req.body.orderData.amount,
            address: req.body.orderData.address,
            timeSlot:req.body.orderData.address.timeSlot
        })
        await newOrder.save();
        await User.findByIdAndUpdate(req.body.userId, { cartData: {} });

        const line_items = req.body.orderData.items.map((item) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100 
            },
            quantity: item.quantity
        }))

        line_items.push({
            price_data: {
                currency: "inr",
                product_data: {
                    name: "Delivery Charge"
                },
                unit_amount: 2* 100
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            success_url: `${frontend_URL}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_URL}/verify?success=false&orderId=${newOrder._id}`,
            line_items: line_items,
            mode: 'payment',
        });

        res.json({ success: true, session_url: session.url });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

    const verifyOrder = async (req, res) => {
       const { orderId, success } = req.body;

    try {
        if(success === "true") {
            await Order.findByIdAndUpdate(orderId, { payment: true });
            return res.status(200).json({ success: true, message: "Paid" });
        }else{
            await Order.findByIdAndDelete(orderId);
            return res.status(400).json({ success: false, message: "Not Paid" });
        }
    }catch (error) {
        console.error("Error verifying order:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

//user orders for frontend
 const userOrders=async(req,res)=>{    
        try{
            const orders = await Order.find({userId:req.body.userId});
            res.json({success:true,data:orders})
                                
        }catch(error){
            console.log(error);
            res.json({success:false,meassage:"Error"});
        }
 }

// Listing orders for admin panel

const listOrders=async(req,res)=>{
    try{
        const canteenId = req.user?.canteenId; 
        const orders = await Order.find({canteenId});
        res.json({success:true,data:orders});

    }catch(error){
        console.log(error);
        res.json({success:false,message:"Error"});
    }
}

// api for updating order status

const updateStatus = async(req,res)=>{
     
     try {
        await Order.findByIdAndUpdate(req.body.orderId,{status:req.body.status});
        res.json({success:true,message:"Status Updated"});
     } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"});
     }
}

export {placeOrder,verifyOrder,userOrders,listOrders,updateStatus}