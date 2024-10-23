import { useState } from 'react'
import Navbar from '../components/Navbar'
import AnalogClock from "analog-clock-react"

const Clock = () => {
    let time = new Date().toLocaleTimeString()

    const [cTime, setCTime] = useState(time)
    const UpdateTime=()=>{
        time =  new Date().toLocaleTimeString()
        setCTime(time)
    }
    setInterval(UpdateTime)

    let options = {
        width: "600px",
        border: false,
        baseColor: "#dbe9f4",
        centerColor: "",
        handColors: {
            second: "#e7190c",
            minute: "#50e750",
            hour: "#0d35e8"
        },
    }
    return (
        <div className='bg-gray-900 flex flex-col w-screen h-screen'>
            <Navbar name="Clock" />
            <div className="flex w-full justify-center items-center flex-col flex-1">
                <h1 className='text-[#FFFFFF] text-5xl'>Digilog</h1>
                <div className='flex items-center justify-center flex-col-reverse'>
                    <AnalogClock {...options}/>
                    <div className='relative z-10 top-60'>
                        <p className='relative  text-[#263681] text-8xl'>{cTime}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Clock
