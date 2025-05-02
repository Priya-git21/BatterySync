import React, { useState } from "react";
import axios from "axios";
import PageTransitionWrapper from "../../PageTransitionWrapper";
import Navbar from "../Navbar/Navbar";
import "./Payment.css";

const Payment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    amount: 500,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const orderResponse = await axios.post("/api/create-order", {
        amount: formData.amount * 100,
        currency: "INR",
      });

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: orderResponse.data.amount,
        currency: orderResponse.data.currency,
        name: "Your Company Name",
        description: "Premium Membership",
        order_id: orderResponse.data.id,
        handler: async function (response) {
          await axios.post("/api/verify-payment", {
            payment_id: response.razorpay_payment_id,
            order_id: response.razorpay_order_id,
            signature: response.razorpay_signature,
          });

          // Activate membership
          await axios.post("/api/activate-membership", {
            name: formData.name,
            email: formData.email,
          });

          alert("Payment Successful! Membership Activated");
        },
        prefill: {
          name: formData.name,
          email: formData.email,
        },
        theme: {
          color: "#F37254",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      setError(err.response?.data?.message || "Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransitionWrapper>
      <div className="payment-wrapper">
        <Navbar />
        <div className="payment-container">
          <h2 className="payment-title">Upgrade to Premium</h2>
          <form className="payment-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                type="text"
                required
                placeholder="Your name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                required
                placeholder="Your email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label>Amount (INR)</label>
              <div className="amount-box">₹{formData.amount}</div>
            </div>

            {error && <div className="form-error">{error}</div>}

            <button
              type="submit"
              className="btn-primary"
              disabled={loading}
            >
              {loading ? "Processing..." : "Pay ₹" + formData.amount}
            </button>
          </form>
        </div>
      </div>
    </PageTransitionWrapper>
  );
};

export default Payment;