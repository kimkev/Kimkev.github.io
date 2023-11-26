import React, { useState, useEffect } from 'react';
import './CustomCursor.css';

const CustomCursor = () => {
    const [position, setPosition] = useState({ x: -100, y: -100 }); // Off-screen initially

    useEffect(() => {
        const handleMouseMove = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };

        document.addEventListener('mousemove', handleMouseMove);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <div className="custom-cursor" style={{ left: position.x, top: position.y }}>
            {/* Your custom cursor content */}
            <div className="cursor-image"></div>
        </div>
    );
};

export default CustomCursor;