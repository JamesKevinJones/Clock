import Navbar from '../components/Navbar'
import { useState, useEffect } from 'react';

const CountdownTimer = () => {
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [timeInSeconds, setTimeInSeconds] = useState(0); // Total time in seconds
    const [isActive, setIsActive] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    // Convert hours, minutes, and seconds to total seconds
    useEffect(() => {
        setTimeInSeconds(hours * 3600 + minutes * 60 + seconds);
    }, [hours, minutes, seconds]);

    // Countdown logic
    useEffect(() => {
        let interval = null;

        if (isActive && !isPaused && timeInSeconds > 0) {
            interval = setInterval(() => {
                setTimeInSeconds((prevTime) => prevTime - 1);
            }, 1000);
        } else if (timeInSeconds === 0 && isActive) {
            setIsActive(false);
            alert("Time's up!");
        }

        return () => clearInterval(interval);
    }, [isActive, isPaused, timeInSeconds]);

    // Format time as hh:mm:ss
    const formatTime = () => {
        const hrs = Math.floor(timeInSeconds / 3600);
        const mins = Math.floor((timeInSeconds % 3600) / 60);
        const secs = timeInSeconds % 60;
        return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    // Start the countdown
    const handleStart = () => {
        if (timeInSeconds > 0) {
            setIsActive(true);
            setIsPaused(false);
        }
    };

    // Pause the countdown
    const handlePause = () => {
        setIsPaused(true);
    };

    // Resume the countdown
    const handleResume = () => {
        setIsPaused(false);
    };

    // Reset the countdown
    const handleReset = () => {
        setIsActive(false);
        setIsPaused(false);
        setHours(0);
        setMinutes(0);
        setSeconds(0);
        setTimeInSeconds(0);
    };

    return (
        <div className='text-white bg-gray-900 max-w-screen min-h-screen flex flex-col'>
            <Navbar name="Timer"/>
            <h1 className="text-5xl flex justify-center items-center pt-8">Countdown Timer</h1>
            <div className='flex w-full justify-center items-center flex-1 '>
                <div className="text-black text-3xl p-8 rounded-lg bg-white/[0.1] border-white/[0.2] border-2 w-fit">
                    <div className="flex space-x-16 mb-6  "> 
                        <div>
                            <label className="block text-sm font-medium text-white">Hours</label>
                            <input
                                type="number"
                                min="0"
                                value={hours}
                                onChange={(e) => setHours(Math.max(0, parseInt(e.target.value) || 0))}
                                className="w-20 px-2 py-1 font-poppins text-center border rounded"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-white">Minutes</label>
                            <input
                                type="number"
                                min="0"
                                max="59"
                                value={minutes}
                                onChange={(e) => setMinutes(Math.min(59, Math.max(0, parseInt(e.target.value) || 0)))}
                                className="w-20 px-2 py-1 font-poppins text-center border rounded"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-white">Seconds</label>
                            <input
                                type="number"
                                min="0"
                                max="59"
                                value={seconds}
                                onChange={(e) => setSeconds(Math.min(59, Math.max(0, parseInt(e.target.value) || 0)))}
                                className="w-20 px-2 py-1 font-poppins text-center border rounded"
                            />
                        </div>
                    </div>

                    {/* Display countdown */}
                    <div className="text-5xl font-poppins text-center bg-white px-10 py-4 rounded-lg shadow-md mb-6">
                        {formatTime()}
                    </div>

                    {/* Buttons for control */}
                    <div className="space-x-28">
                        {!isActive && (
                            <button 
                                onClick={handleStart} 
                                className="bg-green-500 hover:bg-green-600  text-white w-32 font-semibold text-2xl py-2 px-4 rounded-2xl"
                            >
                                Start
                            </button>
                        )}
                        {isActive && !isPaused && (
                            <button 
                                onClick={handlePause} 
                                className="bg-yellow-500 hover:bg-yellow-600 text-white w-32 text-2xl font-semibold py-2 px-4 rounded-2xl"
                            >
                                Pause
                            </button>
                        )}
                        {isActive && isPaused && (
                            <button 
                                onClick={handleResume} 
                                className="bg-blue-500 hover:bg-blue-600 text-white text-2xl w-32 font-semibold py-2 px-4 rounded-2xl"
                            >
                                Resume
                            </button>
                        )}
                            <button 
                            onClick={handleReset} 
                            className="bg-red-500 hover:bg-red-600 text-white  text-2xl w-32 font-semibold py-2 px-4 rounded-2xl"
                            >
                                Reset
                            </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CountdownTimer;
