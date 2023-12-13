

interface NextOrderBannerProps {
    orderID: string;
    timeLeft: number;
    result: number | string;
}

export default function NextOrderBanner({}: NextOrderBannerProps) {
    return (
        <div className={"px-6 py-2 flex justify-center items-center bg-[#103A49]"}>
            <div className={"flex flex-col justify-center items-center border-white border-4 bg-[#FF622D] font-bold text-white px-2"}>
                NUTIFOOD - TH TRUEMILK - VINAMILK
            </div>
        </div>
    )
}