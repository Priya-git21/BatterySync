import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthPage from "./components/Authentication/AuthPage";
import ForgetPass from "./components/Authentication/ForgetPass";
import VerifyOtp from "./components/Authentication/Verify_Otp";
import UpdatePass from "./components/Authentication/UpdatePass";
import Home from "./components/Home/Home";
import Dashboard from "./components/UserDashboard/Dashboard";
import Payment from "./components/Payment/Payment";
import Logout from "./components/Authentication/Logout";

function App() {
    return (
        <Router>
            <Routes>
                {/* Home Page */}
                <Route path="/" element={<Home />} />

                {/* Authentication Pages */}
                <Route path="/login" element={<AuthPage isSignup={false} />} />
                <Route path="/signup" element={<AuthPage isSignup={true} />} />
                <Route path="/forgetPass" element={<ForgetPass />} />
                <Route path="/verifyotp" element={<VerifyOtp />} />
                <Route path="/updatePass" element={<UpdatePass />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/plans" element={<Payment />} />
                <Route path="/logout" element={<Logout />} />

                {/* Error Handler */}
                <Route path="*" element={<h1>Error 404: Page Not Found</h1>} />
            </Routes>
            <ToastContainer />
        </Router>
    );
}

export default App;
