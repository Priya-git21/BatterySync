import React, { useEffect, useState, useRef } from "react";

const Plans = () => {
    const [isVisible, setIsVisible] = useState(false);
    const planRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.3 }
        );
        if (planRef.current) {
            observer.observe(planRef.current);
        }
        return () => {
            if (planRef.current) {
                observer.unobserve(planRef.current);
            }
        };
    }, []);

    return (
        <section className={`pricing ${isVisible ? "visible" : ""}`} ref={planRef}>
            <h2>PRICING PLANS</h2>
            <div className="pricing-tiers">
                <div className="plan free">
                    <h3>Free</h3>
                    <ul>
                        <li>✔ Basic Battery Health Monitoring</li>
                        <li>✔ Limited Maintenance Alerts</li>
                    </ul>
                    <button onClick={() => window.location.href = "/signup"}>Sign Up</button>
                </div>
                <div className="plan premium">
                    <h3>Premium</h3>
                    <p className="price">₹500/month</p>
                    <ul>
                        <li>🔌 Access to Charging Station Locator</li>
                        <li>📢 Real-time Predictive Alerts</li>
                        <li>📞 24/7 Priority Support</li>
                    </ul>
                    <button onClick={() => window.location.href = "/plans"}>Subscribe</button>
                </div>
            </div>
        </section>
    );
};

export default Plans;