import Image from 'next/image'
import React, {useEffect, useRef} from "react";

const Marker = () => {
    return (
        <div className={"relative z-10 top-10"}>
            <Image src={"/images/marker.png"} alt={"marker wheel"} width={50} height={50} />
        </div>
    )
}

const RunWheelButton = ({handle}: {handle: () => void}) => {
    return (
        <div className={""}>
            <button className={"bg-[#FF622D] text-white font-bold text-lg px-4 py-2 rounded-md mt-4"} onClick={handle}>Quay ngay</button>
        </div>
    )
}

export default function SpinningWheel() {

    return (
        <div className={"w-full h-full flex flex-col justify-center items-center mb-4 "}>
            {/*<Marker />*/}
            <div className={"w-1/2 h-1/2 flex justify-center items-center relative z-2 wheel__spin"}>
                <Image src={"/images/11zon_cropped.png"} alt={"Rotation wheel"} width={120} height={120} className={"wheel"}/>
            </div>
            {/*<RunWheelButton handle={() => {*/}
            {/*    setIsSpinning(false);*/}
            {/*    // let rotation = 0;*/}
            {/*    // let spinSpeed = 500; // 2 vòng mỗi giây (1000 milliseconds / 2)*/}
            {/*    // let startTime = performance.now();*/}
            {/*    // requestAnimationFrame(spin);*/}
            {/*    spinWheel();*/}
            {/*}} />*/}
        </div>
    )
}