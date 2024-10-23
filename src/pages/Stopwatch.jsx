import { useState, useEffect, useRef } from 'react'
import Navbar from '../components/Navbar'

const Stopwatch = () => {
    const [IsRunning,setIsRunning] = useState(false);
    const [ElapsedTime,setElapsedTime] = useState(0);
    const IntervalIdRef = useRef(null);
    const StartTimeRef = useRef(0);

    useEffect(() => {
        IntervalIdRef.current = setInterval(() => {
            if (IsRunning) {
                setElapsedTime(Date.now() - StartTimeRef.current)
            }
        }, 10)

        return () => {
            clearInterval(IntervalIdRef.current)
        }
    }, [IsRunning])

    function Start() {
        setIsRunning(true)
        StartTimeRef.current = Date.now() - ElapsedTime
    }
    function Pause() {
        setIsRunning(false);
    }
    function Reset() {
        setIsRunning(false);
        setElapsedTime(0);
    }

    function FormatTime() {

        let Hours =Math.floor(ElapsedTime / (1000 * 60 * 60));
        let Minutes =Math.floor(ElapsedTime / (1000 * 60) % 60);
        let Seconds =Math.floor(ElapsedTime / (1000 ) % 60);
        let Miliseconds =Math.floor((ElapsedTime % 1000) / 10);

        Hours = String(Hours).padStart(2, "0");
        Minutes = String(Minutes).padStart(2, "0");
        Seconds = String(Seconds).padStart(2, "0");
        Miliseconds = String(Miliseconds).padStart(2, "0");
        
        return `${Hours}:${Minutes}:${Seconds}:${Miliseconds}`
    }

    return (
        <div className='bg-gray-900 flex flex-col text-white max-w-screen min-h-screen'>
            <Navbar name="Stopwatch"/>
            <h1 className='text-5xl flex justify-center items-center pt-8'>StopWatch</h1>
            <div className='flex justify-center items-center flex-col flex-1 content-center'>
                <div className='h-[350px] w-[650px] border-2 border-white/[0.2] bg-white/[0.1] flex justify-center items-center rounded-3xl'>
                    <div className='space-y-4'>
                        <h1 className='text-center font-bold text-8xl text-white'>{FormatTime()}</h1>
                        <div className='text-center space-x-2 pt-3'>
                            <button onClick={Start} className='px-4 py-2 rounded-2xl text-white cursor-pointer font-semibold bg-green-500/70 text-3xl scale-[1] hover:scale-[1.03] transition-all ease-out duration-300'>Start</button>
                            <button onClick={Pause}  className='px-4 py-2 rounded-2xl text-white cursor-pointer font-semibold bg-blue-500/70 text-3xl scale-[1] hover:scale-[1.03] transition-all ease-out duration-300'>Pause</button>
                            <button onClick={Reset}  className='px-4 py-2 rounded-2xl text-white cursor-pointer font-semibold bg-red-500/70 text-3xl scale-[1] hover:scale-[1.03] transition-all ease-out duration-300'>Reset</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Stopwatch
