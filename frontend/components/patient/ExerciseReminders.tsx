import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ExerciseReminders: React.FC = () => {
    const scheduleReminder = () => {
        toast.info("Reminder: Your exercise session starts in 1 hour!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    };

    return (
        <button onClick={scheduleReminder} className="bg-green-500 text-white px-4 py-2 rounded-md">
            Schedule Reminder
        </button>
    );
};