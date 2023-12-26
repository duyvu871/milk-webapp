import Image from 'next/image'
import React, {useEffect, useRef} from "react";

export default function SpinningWheel() {

    const [isSpinning, setIsSpinning] = React.useState<boolean>(false);
    const [totalRotation, setTotalRotation] = React.useState<number>(0);
    let rotation = 0;
    let spinSpeed = 500; // 2 vòng mỗi giây (1000 milliseconds / 2)
    let startTime = performance.now();
    // const container = useRef(null);
    const wheel = useRef<HTMLImageElement>(null);
    // const startButton = useRef(null);
    function chooseResult(finalRotation: number): number {
        let result;
        if (finalRotation >= 45 && finalRotation < 135) {
            result = 3;
        } else if (finalRotation >= 135 && finalRotation < 225) {
            result = 5;
        } else if (finalRotation >= 225 && finalRotation < 315) {
            result = 7;
        } else {
            result = -1; // Không thuộc 3 số 3, 5, 7
        }
        console.log("Result: " + result);
        return result;
    }




    useEffect(() => {

        function spinWheel() {
            if (!isSpinning) {
                // Vô hiệu hóa nút trong quá trình quay
                // startButton.current.style.pointerEvents = 'none';
                setIsSpinning(true);
                // Tính toán góc quay mới giữa 5000 và 10000 độ
                const deg = Math.floor(5000 + Math.random() * 5000);
                // Thiết lập chuyển động trên bánh xe
                wheel.current!.style.transition = 'all 10s ease-out';
                // Quay bánh xe
                wheel.current!.style.transform = `rotate(${deg}deg)`;
                // Áp dụng hiệu ứng mờ
                // wheel.current.classList.add('blur');
                // Đặt một hẹn giờ để đặt lại trạng thái quay sau khi hoàn tất chuyển động
                setTimeout(() => {
                    // Loại bỏ hiệu ứng mờ
                    // wheel.current.classList.remove('blur');
                    // Kích hoạt nút khi quay kết thúc
                    // startButton.current.style.pointerEvents = 'auto';
                    // Cần thiết lập chuyển động về không để quay ngay lập tức
                    wheel.current!.style.transition = 'none';
                    // Tính toán góc thực sự dựa trên 360 độ để có quay "tự nhiên" thực sự
                    // Quan trọng vì chúng ta muốn bắt đầu quay tiếp theo từ góc đó
                    // Sử dụng phép chia dư để có giá trị còn lại từ 360
                    const actualDeg = deg % 360;
                    // Đặt quay thực sự ngay lập tức mà không có hiệu ứng
                    wheel.current!.style.transform = `rotate(${actualDeg}deg)`;
                    // Đặt lại trạng thái quay
                    setIsSpinning(false);
                    // Gọi lại hàm spinWheel để bắt đầu quay mới
                    spinWheel();
                }, 10000); // Điều chỉnh thời gian chờ để khớp với thời lượng chuyển động (10 giây trong trường hợp này)
            }
        }

        if (!isSpinning) {
            setIsSpinning(true);
            // let rotation = 0;
            // let spinSpeed = 500; // 2 vòng mỗi giây (1000 milliseconds / 2)
            // let startTime = performance.now();
            // requestAnimationFrame(spin);
            spinWheel();
        }

        // Gọi spinWheel khi tải trang
        // spinWheel();
    }, []);

    return (
        <div className={"w-full h-full flex flex-col justify-center items-center mb-4 "}>
            {/*<div className={"relative top-10"}>*/}
            {/*    <Image src={"/images/marker.png"} alt={"marker wheel"} width={5} height={5} />*/}
            {/*</div>*/}
            <div className={"w-1/2 h-1/2"}>
                <Image src={"/images/11zon_cropped.png"} alt={"Rotation wheel"} width={300} height={300} className={"wheel"} ref={wheel}/>
            </div>
            {/*<div className={""}>*/}
            {/*    <button className={"bg-[#FF622D] text-white font-bold text-lg px-4 py-2 rounded-md mt-4"}>Quay ngay</button>*/}
            {/*</div>*/}
        </div>
    )
}