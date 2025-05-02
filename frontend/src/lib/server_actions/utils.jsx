import * as Yup from "yup";
import { jwtDecode } from 'jwt-decode';
import { toast } from "react-toastify";

// Sign Up page
export const signup_initialValues = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    batteryType: "",
    address: "",
    city: "",
    state: "",
    country: "",
    phone: "",
    password: "",
    confirmPassword: "",
};

export const signup_validationSchema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    username: Yup.string().required("Username is required"),
    email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    batteryType: Yup.string().required("Battery type is required"),
    address: Yup.string().required("Address is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    country: Yup.string().required("Country is required"),
    phone: Yup.string()
        .matches(/^\d{10}$/, "Phone number must be 10 digits")
        .required("Phone number is required"),
    password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Password is required"),
});

// login page
export const login_initialValues = {
    email: "",
    password: "",
};

export const login_validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Required"),
});

// forget password page
export const forgetPass_initialValues = {
    email: "",
};

export const forgetPass_validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
});

// verify otp page
export const otp_initialValues = {
    otp: ["", "", "", "", "", ""],
};

export const otpSchema = Yup.object().shape({
    otp: Yup.array()
        .of(Yup.string().matches(/^[0-9]$/, "Must be a single digit"))
        .min(6, "OTP must have 6 digits")
        .max(6, "OTP must have 6 digits"),
});

// Update Password page
export const updatePass_initialValues = {
    password: "",
    confirmPassword: "",
};

export const updatePass_validationSchema = Yup.object({
    password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Password is required"),
});

const token = localStorage.getItem('token');

export const logout = () => {
    localStorage.removeItem(token);
};

export const getToken = () => {
    return localStorage.getItem(token);
};

export const isLoggedIn = () => {
    if (!token)
        return false;

    console.log("Token: ", token);
    try {
        const decodedToken = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000);

        if (decodedToken.exp < currentTime) {
            localStorage.removeItem('token');
            return false;
        }
        return true;
    } catch (error) {
        console.error("Invalid token", error);
        return false;
    }
};

export const predictRul_initialValues = {
    dischargeTime: '',
    decrement: '',
    maxVoltageDischarge: '',
    minVoltageCharge: '',
    timeAt4_15v: '',
    timeConstantCurrent: '',
    chargingTime: '',
};

export const predictRulValidationSchema = Yup.object().shape({
    dischargeTime: Yup.number()
        .required('Discharge Time is required')
        .min(0, 'Discharge Time must be a positive number'),
    decrement: Yup.number()
        .required('Decrement is required')
        .min(0, 'Decrement must be a positive number'),
    maxVoltageDischarge: Yup.number()
        .required('Max Voltage Discharge is required')
        .min(0, 'Max Voltage Discharge must be a positive number'),
    minVoltageCharge: Yup.number()
        .required('Min Voltage Charge is required')
        .min(0, 'Min Voltage Charge must be a positive number'),
    timeAt4_15v: Yup.number()
        .required('Time at 4.15V is required')
        .min(0, 'Time at 4.15V must be a positive number'),
    timeConstantCurrent: Yup.number()
        .required('Time Constant Current is required')
        .min(0, 'Time Constant Current must be a positive number'),
    chargingTime: Yup.number()
        .required('Charging Time is required')
        .min(0, 'Charging Time must be a positive number'),
});

// RULGraph.js functions

// Function to fetch and process data from localStorage

export const fetchRULDataFromLocalStorage = () => {
    try {
        const userData = localStorage.getItem('user');
        if (userData) {
            const parsedUserData = JSON.parse(userData);
            if (parsedUserData.batteryData && Array.isArray(parsedUserData.batteryData)) {
                const sortedData = parsedUserData.batteryData.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
                return sortedData;
            }
        }
        return [];
    } catch (e) {
        toast.dismiss();
        toast.error('Error fetching user data from localStorage', e);
        console.error('Error parsing user data from localStorage:', e);
        return [];
    }
};

export const prepareChartData = (batteryData) => {
    try {
        const labels = batteryData.map((dataPoint) => {
            let date = new Date(dataPoint.timestamp);
            let hours = date.getHours();
            let minutes = date.getMinutes();
            let seconds = date.getSeconds();
            return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        });

        const rulValues = batteryData.map((dataPoint) => dataPoint.rul);
        const datasetLabel = 'Remaining Useful Life';

        return {
            labels,
            datasets: [
                {
                    label: datasetLabel,
                    data: rulValues,
                    borderColor: 'gold',
                    pointBackgroundColor: 'gold',
                    fill: true,
                    tension: 0.1,
                },
            ],
        };
    } catch (e) {
        toast.dismiss();
        toast.error('Error preparing chart data');
        console.error('Error preparing chart data:', e);
        return { labels: [], datasets: [] };
    }
};


export const chartOptions = {
    responsive: true,
    scales: {
        x: {
            ticks: {
                color: 'white',
            },
            grid: {
                display: false,
            },
            border: {
                color: 'white',
                width: 1,
            },
            title: {
                display: true,
                text: 'Time Stamp',
                color: 'white',
                position: 'top',
            },
        },
        y: {
            ticks: {
                color: 'white',
            },
            grid: {
                display: false,
            },
            border: {
                color: 'white',
                width: 1,
            },
            title: {
                display: true,
                text: 'Remaining Useful Life (cycles)',
                color: 'white',
                position: 'top',
            },
        },
    },
    elements: {
        line: {
            borderWidth: 2,
        },
    },
    plugins: {
        legend: {
            position: 'top',
            align: 'end',
            labels: {
                color: 'white',
            },
        },
        tooltip: {
            callbacks: {
                label: (context) => {
                    const label = context.dataset.label || '';
                    const value = context.raw;
                    let condition = 'Good';
                    if (value >= 393 && value <= 715) {
                        condition = 'Moderate';
                    } else if (value < 393) {
                        condition = 'Bad';
                    }
                    return `${label}: ${value} (${condition})`;
                },
            },
        },
        zoom: {
            pan: {
                enabled: true,
                mode: 'xy',
            },
            zoom: {
                enabled: true,
                mode: 'xy',
            },
        },
        annotation: {
            annotations: [
                {
                    type: 'box',
                    yMin: 800,
                    yMax: 1000,
                    backgroundColor: 'rgba(0,255,0,0.2)',
                    borderWidth: 0,
                },
                {
                    type: 'box',
                    yMin: 300,
                    yMax: 800,
                    backgroundColor: 'rgba(0,0,255,0.2)',
                    borderWidth: 0,
                },
                {
                    type: 'box',
                    yMin: 0,
                    yMax: 300,
                    backgroundColor: 'rgba(255,0,0,0.2)',
                    borderWidth: 0,
                }
            ],
        },
    },
};

export const getBatteryColor = (rul) => {
    if (rul > 800) return 'green';
    if (rul > 300) return 'blue';
    if (rul >= 100) return 'orange';
    return 'red';
};

export const getBatteryConditionText = (rul) => {
    if (rul > 800) return 'Battery is in good condition.';
    if (rul > 300) return 'Battery is in fair condition.';
    if (rul >= 100) return 'Battery is in poor condition. Consider maintenance.';
    return 'Battery is in critical condition. Replace immediately.';
};
