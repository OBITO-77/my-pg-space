import React from "react";
import "../../styles/PGDetailsStyles/PGHeader.css";
import ImageSlider from "./ImageSlider";
import axios from "axios";
const UPLOADS_URL = import.meta.env.VITE_UPLOADS_URL;



const PGHeader = ({ pg }) => {

  const checkoutHandler = async (amount) => {

    const { data: { key } } = await axios.get("http://www.localhost:5000/api/payment/getkey")

    const { data: { order } } = await axios.post("http://localhost:5000/api/payment/checkout", {
        amount
    })

    const options = {
        key,
        amount: order.amount,
        currency: "INR",
        name: "6 Pack Programmer",
        description: "Tutorial of RazorPay",
        image: "https://avatars.githubusercontent.com/u/25058652?v=4",
        order_id: order.id,
        callback_url: "http://localhost:5000/api/payment/paymentverification",
        prefill: {
            name: "Gaurav Kumar",
            email: "gaurav.kumar@example.com",
            contact: "9999999999"
        },
        notes: {
            "address": "Razorpay Corporate Office"
        },
        theme: {
            "color": "#121212"
        }
    };
    const razor = new window.Razorpay(options);
    razor.open();
}

  
  return (
    <div className="pg-header">
      <ImageSlider images={pg.images.map((url) => `${UPLOADS_URL}${url}`)} />
      <div className="pg-info">
        <h1>{pg.name}</h1>
        <p>{pg.address}</p>
        <p>Starts from ₹{pg.price}/mo</p>
        <div className="pg-actions">
          <button className="schedule-visit-btn">Schedule a Visit</button>
          <button className="request-callback-btn">Request a Callback</button>
          <button className="request-payment-btn" onClick={()=>checkoutHandler(1000)}>Do payment(₹1000)</button>
        
        </div>
      </div>
    </div>
  );
};

export default PGHeader;
