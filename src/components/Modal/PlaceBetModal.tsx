import React, {useContext} from 'react';
import {FaMinusCircle, FaPlusCircle} from "react-icons/fa";
import {tw} from "@/ultis/tailwind.ultis";
import {isNumber} from "@/ultis/validate.ultis";
import {formatCurrency} from "@/ultis/currency-format";
import {UserDataContext} from "@/contexts/UserDataContext";

// import useAuth from "@/hooks/useAuth";
interface PlaceBetModalProps {
    setOpenPopup: React.Dispatch<React.SetStateAction<boolean>>;
    betTarget: "TH TRUEMILK"|"VINAMILK"|null;
};

const betValueList = [50, 500, 1000, 5000, 10000, 30000, 50000, 100000];

function PlaceBetModal({setOpenPopup, betTarget}: PlaceBetModalProps) {
    const {userData: {balance: userBalance}} = useContext(UserDataContext);
    const [placeBetValue, setPlaceBetValue] = React.useState<number>(1000);
    const betFormRef = React.useRef<HTMLInputElement>(null);
    const [visibleError, setVisibleError] = React.useState<boolean>(false);
    const [selectedBetValue, setSelectedBetValue] = React.useState<number>(1000);
    const separateValue = (value: string|number) => {
        return Math.floor(Number(value) / 2);
    }
    const duplicatedValue = (value: string|number) => {
        return Math.floor(Number(value) * 2);
    }
    const increaseBetValue = () => {
        setPlaceBetValue(prev => {
            if (prev === 0) return 5;
            return duplicatedValue(prev)
        });
    }
    const decreaseBetValue = () => {
        setPlaceBetValue(prev => separateValue(prev));
    }
    const placeBetHandler = () => {
        console.log("place bet into " + betTarget + " with " + placeBetValue + " value");
    }
    const onChangeBetValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (isNumber(value) && Number(value) > 0) {
            setPlaceBetValue(Number(value));
            //@ts-ignore
            betFormRef.current.value = placeBetValue;
            if (Number(value) > userBalance) {
                setVisibleError(true);
            } else {
                setVisibleError(false);
            }
            // console.log(Number(value))
        } else {
            //@ts-ignore
            betFormRef.current.value = placeBetValue;
        }
    }

    const handleSelectBetValue = (value: number) => {
        setSelectedBetValue(value);
        setPlaceBetValue(value);
    }
    const RenderAmount = ({amount}: {amount: number}) => {
        const isSelected = amount === selectedBetValue;
        const tagClassname = 'w-[68px] leading-4 text-center font-semibold border cursor-pointer mb-2.5 px-0 py-[7px] rounded-[3px] border-solid border-[#113b49] hover:bg-[#113b49] hover:text-white';

        return (
            <div
                key={"amount-"+amount}
                className={tw(tagClassname, isSelected ? "bg-[#113b49] text-white" : "")}
                onClick={() => handleSelectBetValue(amount)}
            >
                {formatCurrency(amount.toLocaleString())}
            </div>
        )
    }

    return (
        <div className={"flex flex-col justify-center items-center"}>
            <h1 className={"font-semibold"}>
                SỐ LƯỢNG
            </h1>
            <div className={"flex flex-row justify-center items-center gap-4 mt-4"}>
                <div className={"cursor-pointer"} onClick={decreaseBetValue}>
                    <FaMinusCircle className={"text-[#113b49] text-xl"}/>
                </div>
                <input
                    className={tw(
                        "w-[180px] max-w-[50%] text-center text-sm leading-[14px] font-semibold m-0 p-2.5 rounded-[50px] border-solid border-[red] border-[1px] outline-none",
                        visibleError ? "border-[#b94644] text-[#b94644]" : "border-[#113b49]"
                    )}
                    type={"text"}
                    ref={betFormRef}
                    value={placeBetValue}
                    onChange={onChangeBetValue}
                    onFocus={(e) => {
                        e.target.value = String(placeBetValue)
                    }}
                    onBlur={(e) => {
                        e.target.value = formatCurrency(e.target.value.toLocaleString())
                    }}
                />
                <div className={"cursor-pointer"} onClick={increaseBetValue}>
                    <FaPlusCircle className={"text-[#113b49] text-xl"}/>
                </div>
            </div>
            <div className={"text-[#b94644] text-xs mb-4 mt-2"}>
                {visibleError ? "Số dư không đủ": ""}
            </div>
            <div className={"flex flex-row flex-wrap justify-around items-center gap-3"}>
                {betValueList.map((amount, index) =>
                    <RenderAmount amount={amount} key={"amount-"+index}/>
                )}
            </div>
            <div className={"mt-4 mb-2 flex flex-row justify-center items-center "}>
                <button
                    className={"bg-[#ddd] cursor-pointer text-sm font-semibold uppercase text-[#113b49] mx-[5px] my-0 px-[15px] py-2.5 rounded-[50px] border-[none]"}
                    onClick={() => {
                        setOpenPopup(false);
                    }}
                >HUỶ
                </button>
                <button
                    className={"bg-[#e2e5ec] cursor-pointer text-sm font-semibold uppercase text-[#113b49] mx-[5px] my-0 px-[15px] py-2.5 rounded-[50px] border-[none]"}
                    onClick={() => {
                        placeBetHandler();
                    }}
                >XÁC NHẬN
                </button>
            </div>
        </div>
    );
}

export default PlaceBetModal;