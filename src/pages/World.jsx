import { useState,useEffect} from "react";
import Navbar from '../components/Navbar'

import times from '../times.js'

const World = () => {
    const [time,setTime]=useState("");
    const [world, setWorld]=useState([]);
    useEffect(()=>{
        const api = async () => {
            try{
                const response =await fetch(`https://timeapi.io/api/time/current/zone?timeZone=${time}`);
    
                if(!response.ok){
                    throw new Error("Could'nt fetch the resource");
                }
                const data = await response.json();
                setWorld(() => {
                    return data;
                });
                console.log(world);
            }
            catch(error){
                console.error(error);
            }
        }
        api();
    }, [time]);

    const handleChange = (e)=>{
        setTime(e.target.value);
        console.log() 
    }

    return (
        <div className='bg-gray-900 max-w-screen flex flex-col min-h-screen text-white'>
            <Navbar name="World Clock"/>
            <h1 className='text-5xl flex justify-center items-center pt-8'>World Clock</h1>
            <div className="flex w-full justify-center items-center flex-1 flex-col">
                <select value={time} onChange={handleChange} className="text-white text-xl p-4 rounded-lg bg-white/[0.1] border-white/[0.2] border-2">
                    <option className="text-black">Select Timezones</option>
                    {times.map(zones => (
                        <option key={zones} value={zones} className="text-black" >
                            {zones}
                        </option>
                    ))}
                </select>
                <div className="flex space-x-36 w-fit text-white border-solid border-[2px] rounded-lg p-4 mt-11">
                    <div>
                        <p className="text-3xl">{world.timeZone ?  world.timeZone : "Loading..."}</p>
                        <p>Today</p>
                    </div>
                    <p className="text-6xl">{world.time ? world.time : "00:00"}</p>
                </div>
            </div>
        </div>
    )
}

export default World