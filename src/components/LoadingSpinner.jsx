// src/components/LoadingSpinner.jsx
import React from 'react';

const LoadingSpinner = () => (
    <div className="flex justify-center items-center p-10">
        <div className="w-12 h-12 border-4 border-t-sky-500 border-slate-700 rounded-full animate-spin"></div>
    </div>
);

export default LoadingSpinner;