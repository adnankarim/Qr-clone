import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import QRCode from 'react-qr-code';
import { ArrowLeft, Copy, Check } from 'lucide-react';
import { motion } from 'framer-motion';

const Result = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const data = location.state?.data || "No Data Found";
    const [copied, setCopied] = React.useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(data);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleBack = () => {
        navigate('/');
    };

    return (
        <motion.div
            className="result-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
        >
            <div className="result-card">
                <div className="qr-wrapper">
                    <QRCode
                        value={data}
                        size={128}
                        bgColor="#ffffff"
                        fgColor="#000000"
                        level="Q"
                    />
                </div>

                <h2 className="data-preview">
                    {data.length > 30 ? data.substring(0, 30) + '...' : data}
                </h2>

                <div className="action-buttons">
                    <button onClick={handleBack} className="btn-primary">
                        <ArrowLeft size={20} />
                        Generate New / Clone
                    </button>

                    <button onClick={handleCopy} className={`btn-secondary ${copied ? 'copied' : ''}`}>
                        {copied ? <Check size={20} /> : <Copy size={20} />}
                        {copied ? 'Copied!' : 'Copy Data'}
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default Result;
