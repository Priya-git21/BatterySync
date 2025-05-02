import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/BatterySync.png";
import "./Navbar.css";
import { isLoggedIn } from "../../lib/server_actions/utils";

const Navbar = () => {
    const [activeItem, setActiveItem] = useState("home");
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const isUserLoggedIn = isLoggedIn();
        setLoggedIn(isUserLoggedIn);
    }, []);

    const handleNavClick = (item) => {
        setActiveItem(item);
    };

    const scrollTo = () => {
        const section = document.getElementById("hero");
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <header className="navbar">
           <div className="logo-container flex justify-start items-center mb-1.5">
                          <Link className="logo flex items-center text-white" to="/">
                              <img src={logo} alt="Company Logo" className="w-56 h-56 mr-4" />
                              <p style={{ fontSize: "24px" }}>
                                  <strong>Battery</strong><span className="lugrasimo-regular">Sync</span>
                              </p>
                          </Link>
                      </div>
            <nav className="navigation">
                <ul>
                    <li
                        className={`list ${activeItem === "home" ? "active" : ""}`}
                        onClick={() => handleNavClick("home")}
                    >
                        <Link to="/">
                            <span className="icon"><ion-icon name="home" /></span>
                            <span className="text" onClick={scrollTo}>Home</span>
                        </Link>
                    </li>
                    <li
                        className={`list ${activeItem === "plans" ? "active" : ""}`}
                        onClick={() => handleNavClick("plans")}
                    >
                        <Link to="/plans">
                            <span className="icon"><ion-icon name="pricetag" /></span>
                            <span className="text">Explore Plans</span>
                        </Link>
                    </li>
                    <li
                        className={`list ${activeItem === "dashboard" ? "active" : ""}`}
                        onClick={() => handleNavClick("dashboard")}
                    >
                        <Link to="/dashboard">
                            <span className="icon"><ion-icon name="speedometer" /></span>
                            <span className="text">Dashboard</span>
                        </Link>
                    </li>
                    {/* <li
                        className={`list ${activeItem === "tripplanner" ? "active" : ""}`}
                        onClick={() => handleNavClick("tripplanner")}
                    >
                        <Link to="/trip-planner">
                            <span className="icon"><ion-icon name="location" /></span>
                            <span className="text">Trip Planner</span>
                        </Link>
                    </li> */}
                    <li
                        className={`list ${activeItem === "chargingstation" ? "active" : ""}`}
                        onClick={() => handleNavClick("chargingstation")}
                    >
                        <Link to="/charging-station">
                            <span className="icon"><ion-icon name="battery-charging" /></span>
                            <span className="text">Charging Station</span>
                        </Link>
                    </li>
                    {/* Conditionally render Sign Up and Login buttons if user is not logged in */}
                    {!loggedIn ? (
                        <>
                            <li
                                className={`list ${activeItem === "signup" ? "active" : ""}`}
                                onClick={() => handleNavClick("signup")}
                            >
                                <Link to="/signup">
                                    <span className="icon"><ion-icon name="arrow-up-circle-sharp" /></span>
                                    <span className="text">Sign Up</span>
                                </Link>
                            </li>
                            <li
                                className={`list ${activeItem === "login" ? "active" : ""}`}
                                onClick={() => handleNavClick("login")}
                            >
                                <Link to="/login">
                                    <span className="icon"><ion-icon name="log-in" /></span>
                                    <span className="text">Login</span>
                                </Link>
                            </li>
                        </>
                    ) : (
                        // Display user icon and additional links when logged in
                        <>
                            <li
                                className={`list ${activeItem === "profile" ? "active" : ""}`}
                                onClick={() => handleNavClick("profile")}
                            >
                                <Link to="/profile">
                                    <span className="icon"><ion-icon name="person-circle" /></span>
                                    <span className="text">Profile</span>
                                </Link>
                            </li>
                            <li
                                className={`list ${activeItem === "logout" ? "active" : ""}`}
                                onClick={() => handleNavClick("logout")}
                            >
                                <Link to="/logout">
                                    <span className="icon"><ion-icon name="log-out" /></span>
                                    <span className="text">Logout</span>
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Navbar;
