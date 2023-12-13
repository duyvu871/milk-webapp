import Image from 'next/image'

export default function SpinningWheel() {
    return (
        <div className={"w-full h-full flex flex-col justify-center items-center mb-4 "}>
            <div className={"relative top-10"}>
                <Image src={"/images/marker.png"} alt={"marker wheel"} width={50} height={50} />
            </div>
            <div className={"w-1/2 h-1/2"}>
                <Image src={"/images/11zon_cropped.png"} alt={"Rotation wheel"} width={300} height={300} />
            </div>
            <div className={""}>
                <button className={"bg-[#FF622D] text-white font-bold text-lg px-4 py-2 rounded-md mt-4"}>Quay ngay</button>
            </div>
        </div>
    )
}