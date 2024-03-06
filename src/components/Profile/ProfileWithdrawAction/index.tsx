import React, { useContext } from "react";
import {UserDataContext} from "@/contexts/UserDataContext";
import {formatCurrency} from "@/ultis/currency-format";
import {tw} from "@/ultis/tailwind.ultis";
import {hideProfileScreen} from "@/redux/action/showPopup";
import store from "@/redux/store";
import RotationLoading from "@/components/Loading/RotationLoading";
import {useToast} from "@/hooks/useToast";
import {timeout} from "@/helper/delayAction";

export default function ProfileWithdrawAction() {
    const {error, success} = useToast();
    const {dispatch} = store;
    const { userData: {balance},
        createOrder,
        updateUserData,
        updateUserWithdrawalHistory,
         } = useContext(UserDataContext);
    const betFormRef = React.useRef<HTMLInputElement>(null);
    const [placeBetValue, setPlaceBetValue] = React.useState<number>(0);
    const [visibleError, setVisibleError] = React.useState<boolean>(false);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const onChangeBetValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (Number(value) > 0) {
            setPlaceBetValue(Number(value));
            //@ts-ignore
            betFormRef.current.value = placeBetValue;
            if (Number(value) > balance) {
                setVisibleError(true);
            } else {
                setVisibleError(false);
            }
            // console.log(Number(value))
        } else if (value === "") {
            setPlaceBetValue(0);
        } else {
            //@ts-ignore
            betFormRef.current.value = placeBetValue;
        }
    }

    const requestWithdrawal = async () => {
        setIsLoading(true);
        createOrder(placeBetValue).then(async (response) => {
            if (response.status === 200) {
                const data = await response.json();
                console.log(data);
                success(data.message);
                updateUserData({balance: data.balance}, 'balance');
                updateUserWithdrawalHistory(data.withdrawData);
                timeout(2000).then(() => {
                    setIsLoading(false);
                });
            }
        }).catch((err) => {
            error("Có lỗi xảy ra");
            timeout(2000).then(() => {
                setIsLoading(false);
            });
        });
    }

    return (
        <div className={"flex flex-col justify-center items-center gap-3 font-normal"}>
            <div className={"text-sm flex justify-start w-full gap-1"}>
                <span>Số tiền hiện có:</span>
                <span className={"font-semibold text-md"}>{balance || 0}</span>
            </div>
            <div className={"flex flex-col justify-center items-start w-full"}>
                <input
                    className={tw(
                        "w-full text-sm leading-[14px] font-semibold m-0 p-2.5 border-solid rounded-[5px] border-[1px] outline-none",
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
                <div className={"text-[#b94644] text-xs"}>
                    {visibleError ? "Số dư không đủ" : ""}
                </div>
            </div>
            <div className="flex flex-row justify-end items-center w-full mt-2">
                <button
                    className={"bg-[#e2e5ec] text-sm uppercase font-semibold cursor-pointer mx-[5px] my-0 px-[15px] py-2.5 rounded-[5px] border-[none]"}
                    onClick={() => {
                        dispatch(hideProfileScreen())
                    }}>Hủy
                </button>
                <button
                    className={"flex flex-row justify-center items-center gap-3 bg-[#e2e5ec] text-sm uppercase font-semibold cursor-pointer mx-[5px] my-0 px-[15px] py-2.5 rounded-[5px] border-[none]"}
                    onClick={requestWithdrawal}
                    disabled={isLoading}
                >
                    {isLoading ? <RotationLoading height={30} width={30}/> : <></>}
                    Xác nhận
                </button>
            </div>
        </div>
    )
}