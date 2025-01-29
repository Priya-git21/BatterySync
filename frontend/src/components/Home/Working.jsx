import React from "react";
import { MdOutlineEvStation, MdBatteryChargingFull, MdNotificationsActive } from "react-icons/md";

const Working = () => {
    return (
        <section id="how-it-works" className="how-it-works">
            <h2>How It Works</h2>
            <div className="timeline">
                <div className="timeline-item">
                    <div className="timeline-icon">
                        <MdOutlineEvStation size={30} />
                    </div>
                    <div className="timeline-content">
                        <h3>Step 1: Connect Your EV</h3>
                        <p>Plug in your EV to the platform and start monitoring your battery performance effortlessly.</p>
                    </div>
                </div>
                <div className="timeline-item">
                    <div className="timeline-icon">
                        <MdBatteryChargingFull size={30} />
                    </div>
                    <div className="timeline-content">
                        <h3>Step 2: Monitor Your Battery Health</h3>
                        <p>View detailed insights into your battery's health metrics to ensure optimal performance.</p>
                    </div>
                </div>
                <div className="timeline-item">
                    <div className="timeline-icon">
                        <MdNotificationsActive size={30} />
                    </div>
                    <div className="timeline-content">
                        <h3>Step 3: Receive Alerts & Optimize Usage</h3>
                        <p>Get real-time notifications and tips for energy optimization and maintenance.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Working;