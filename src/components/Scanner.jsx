import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Scanner as QrScanner } from '@yudiel/react-qr-scanner';
import { ScanLine, RefreshCcw } from 'lucide-react';
import { motion } from 'framer-motion';

const Scanner = () => {
    const navigate = useNavigate();
    const [enabled, setEnabled] = useState(true);

    const handleScan = (text) => {
        if (text) {
            setEnabled(false); // Stop scanning once found
            // Extract text from the object if needed, yudiel scanner returns array or object
            const scannedData = Array.isArray(text) ? text[0].rawValue : text;
            navigate('/result', { state: { data: scannedData } });
        }
    };

    const handleError = (err) => {
        console.error(err);
    };

    return (
        <div className="scanner-container">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="scanner-wrapper"
            >
                <QrScanner
                    onScan={handleScan}
                    onError={handleError}
                    constraints={{
                        facingMode: 'environment',
                        width: { ideal: 4096 },
                        height: { ideal: 2160 },
                        aspectRatio: { ideal: 1.7777777778 }
                    }}
                    components={{
                        audio: false,
                        onOff: false,
                        torch: false,
                        zoom: false,
                        finder: false
                    }}
                    styles={{
                        container: { width: '100%', height: '100%' },
                        video: { width: '100%', height: '100%', objectFit: 'cover' }
                    }}
                />

                {/* Custom Overlay */}
                <div className="scanner-overlay">
                    <div className="scanner-frame">
                        <div className="corner top-left"></div>
                        <div className="corner top-right"></div>
                        <div className="corner bottom-left"></div>
                        <div className="corner bottom-right"></div>
                        <motion.div
                            className="scan-line"
                            animate={{ top: ['0%', '100%', '0%'] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        />
                    </div>
                    <div className="scanner-text">
                        <ScanLine className="icon-pulse" />
                        <p>Align QR Code within frame</p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Scanner;
