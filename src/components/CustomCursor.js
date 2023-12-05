import React, { useState, useEffect } from 'react';
import './CustomCursor.css';

const CustomCursor = () => {
    const [sprinkles, setSprinkles] = useState([]);
    const [position, setPosition] = useState({ x: -100, y: -100 }); // Off-screen initially

    const addSprinkle = (x, y) => {
        const randomNumber = Math.random();
        const willReachBottom = randomNumber > 0.7; // Decides if sprinkle will reach the bottom
        const randomFade = Math.floor(randomNumber * 200); // Random disappearance time for fireworks effect (adjust as needed)

        const newSprinkle = {
            id: `sprinkle-${Date.now()}-${Math.random()}`, // Create a unique identifier
            x,
            y,
            willReachBottom,
        };
        setSprinkles((prevSprinkles) => [...prevSprinkles, newSprinkle]);

        if (!newSprinkle.willReachBottom) {
            setTimeout(() => {
                removeSprinkle(newSprinkle.id);
            }, randomFade);
        }
    };

    const removeSprinkle = (id) => {
        setSprinkles((prevSprinkles) =>
            prevSprinkles.filter((sprinkle) => sprinkle.id !== id)
        );
    };

    const debounce = (func, delay) => {
        let timeoutId;
        return function (...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func.apply(this, args);
            }, delay);
        };
    };

    const delayedAddSprinkle = debounce(addSprinkle, 10); // Adjust delay as needed

    const handleMouseMove = (e) => {
        setPosition({ x: e.clientX, y: e.clientY });
        delayedAddSprinkle(e.clientX, e.clientY);
    };

    useEffect(() => {
        document.addEventListener('mousemove', handleMouseMove);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <>
            <div className='cursor-container'>

                {sprinkles.map((sprinkle) => (
                    <div
                        key={sprinkle.id}
                        className="sprinkle"
                        style={{
                            left: sprinkle.x,
                            top: sprinkle.y
                        }}
                        onAnimationEnd={() => removeSprinkle(sprinkle.id)}
                    ></div>
                ))}

                <div className="custom-cursor"
                    style={{
                        left: position.x,
                        top: position.y,
                    }}>
                    {/* Your custom cursor content */}
                    <div className="cursor-image"></div>
                </div>
        </div >
        </>

    );
};

export default CustomCursor;