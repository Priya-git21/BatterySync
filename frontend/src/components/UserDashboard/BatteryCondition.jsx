import React, { useState, useEffect } from 'react';
import { fetchRULDataFromLocalStorage, getBatteryColor, getBatteryConditionText } from '../../lib/server_actions/utils';
import BatteryChart from './BatteryChart';
import BatteryDataTable from './BatteryDataTable';

const BatteryCondition = () => {
    const [batteryCondition, setBatteryCondition] = useState('Loading...');
    const [rul, setRul] = useState(0);
    const [batteryColor, setBatteryColor] = useState('grey');
    const [dischargeTime, setDischargeTime] = useState(0);
    const [chargingTime, setChargingTime] = useState(0);
    const [maxVoltageDischarge, setMaxVoltageDischarge] = useState(0);
    const [minVoltageCharge, setMinVoltageCharge] = useState(0);
    const [batteryData, setBatteryData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const updateBatteryData = () => {
        try {
            const data = fetchRULDataFromLocalStorage();
            if (data && data.length > 0) {
                const latestBatteryData = data[0]; // Most recent data
                setBatteryData(data);
                displayBatteryCondition(latestBatteryData);
            } else {
                console.log('No battery data found in localStorage.');
            }
        } catch (error) {
            console.error('Error updating battery data from localStorage:', error);
        }
    };

    useEffect(() => {
        updateBatteryData();
    }, []);

    const displayBatteryCondition = (data) => {
        const predictedRUL = data?.rul;
        if (predictedRUL === undefined || predictedRUL === null) {
            console.error('RUL data is missing or invalid.');
            return;
        }
        const conditionText = getBatteryConditionText(predictedRUL);

        setBatteryCondition(conditionText);
        setBatteryColor(getBatteryColor(predictedRUL));
        setRul(predictedRUL);
        setDischargeTime(data.dischargeTime);
        setChargingTime(data.chargingTime);
        setMaxVoltageDischarge(data.maxVoltageDischarge);
        setMinVoltageCharge(data.minVoltageCharge);
    };

    const handlePagination = (direction) => {
        if (direction === 'next' && batteryData.length > currentPage * 10) {
            setCurrentPage(currentPage + 1);
        } else if (direction === 'prev' && currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const paginatedData = batteryData.slice((currentPage - 1) * 10, currentPage * 10);

    return (
        <div className="graphs battery-container">
            {/* Battery Chart */}
            <BatteryChart
                rul={(rul / 1112) * 100}
                batteryColor={batteryColor}
                batteryCondition={batteryCondition}
            />

            {/* Battery Data Table */}
            <BatteryDataTable
                batteryData={paginatedData}
                handlePagination={handlePagination}
                currentPage={currentPage}
                batteryDataLength={batteryData.length}
            />
        </div>
    );
};

export default BatteryCondition;
