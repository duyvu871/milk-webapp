import React, {useEffect} from 'react';
import {tw} from "@/ultis/tailwind.ultis";
import { bankingList } from '@/ultis/banking.ultis';
import Image from 'next/image';
import {NormalFieldProps} from "@/components/InputField/InputType";

interface ProfileSelectBankingProps {

};


function NormalField({
                         setFieldValue, placeholder, validate, customChildren, type
                     }: NormalFieldProps) {
    const [value, setValue] = React.useState<string>("");
    const [isAlert, setIsAlert] = React.useState<boolean>(false);
    const [alertMessage, setAlertMessage] = React.useState<string>("");

    useEffect(() => {
        const validateResult = validate;
        if (validateResult?.status === "ALERT") {
            setIsAlert(true);
            setAlertMessage(validateResult.message);
        } else if (validateResult?.status === "SUCCESS") {
            setIsAlert(false);
            setAlertMessage("");
        }
    }, [validate]);

    return (
        <div className={"flex flex-col justify-center items-center  w-full text-black border-gray-200 border-[1px] rounded-[5px]"}>
            <div className={"rounded-full bg-white p-[6px] px-6 w-full flex flex-row"}>
                <input
                    onChange={(e) => {
                        setValue(e.target.value);
                        setFieldValue(e.target.value);
                    }}
                    placeholder={placeholder}
                    className={tw(
                        "w-full outline-none text-black",
                        "text-md ",
                        isAlert ? "text-red-500 italic" : ""
                    )}
                    type={type || "text"}
                />
                {customChildren}
            </div>
            <span className={"text-red-500 text-xs italic"}>{alertMessage}</span>
        </div>
    )
}

const BankingList = ({bankingList, selectBank}: {bankingList: {image: string; bank: string}[]; selectBank:(bank: string) => void}) => {
    return (
            <div className="flex flex-col justify-center items-center">
                <div className="flex flex-col justify-start items-start overflow-y-scroll h-[300px] bg-white w-full">
                    {bankingList.map((bank, index) => {
                        return (
                            <div className="flex flex-row justify-center items-center mx-[2px] gap-3" key={index} onClick={() => {
                                selectBank(bank.bank);
                            }}>
                                <Image src={bank.image} width={10} height={10} alt="" className="w-[15px] h-[15px]"/>
                                <div className="text-md">{bank.bank}</div>
                            </div>
                        )
                    })}
                </div>
            </div>
    )

}

function ProfileSelectBanking({}: ProfileSelectBankingProps) {

    const [bankSelected, setBankSelected] = React.useState<string>("");
    const [showBankingList, setShowBankingList] = React.useState<boolean>(false);
    const [bankOwner, setBankOwner] = React.useState<string>("");
    const [bankNumber, setBankNumber] = React.useState<string>("");

    return (
        <div className={tw(
            "flex flex-col justify-start items-start w-full",
            "bg-white-glassmorphism rounded-lg"
        )}>
            {/*<span>*/}
            {/*    {success ? success : error}*/}
            {/*</span>*/}
            <div className={tw(
                "flex flex-col justify-start items-start w-full gap-4",
                "mt-2 md:mt-4 lg:mt-6"
            )}>
                <div className={"w-full"}>
                    <span className={"pb-4"}>
                        Ngân hàng:
                    </span>
                    <div className={""}>
                        <select id="countries"
                                className="flex flex-col justify-center items-center  w-full text-black border-gray-200 border-[1px] rounded-[5px] px-4 py-2 "
                                onClick={() => {
                                    setShowBankingList(true);
                                }}
                        >
                            <option selected>Chọn ngân hàng</option>
                            {/*<option value="US">United States</option>*/}
                            {/*<option value="CA">Canada</option>*/}
                            {/*<option value="FR">France</option>*/}
                            {/*<option value="DE">Germany</option>*/}
                        </select>
                    </div>
                    <div className={"flex flex-col justify-center items-center absolute"}>
                        {
                            showBankingList ? (
                                <>
                                    <div>
                                        <input className="border border-solid border-[#e2e5ec] w-full box-border leading-[22px] p-1 rounded-[5px] text-[#333]" type="search" autoCorrect="off"
                                               autoCapitalize="none" spellCheck="false" role="searchbox"
                                               aria-autocomplete="list"
                                               autoComplete="off" aria-label="Search"
                                               aria-controls="select2-bank_id-results"/>
                                    </div>
                                    <div>
                                        <BankingList bankingList={bankingList} selectBank={setBankSelected}/>
                                    </div>
                                </>
                            ) : (<div></div>)
                        }
                    </div>
                </div>
                <div className={"w-full"}>
                    <span className={"mb-1"}>
                        Tên chủ tài khoản:
                    </span>
                    <NormalField
                        setFieldValue={setBankOwner}
                        placeholder={""}
                        validate={{
                            status: "SUCCESS",
                            message: ""
                        }}
                        customChildren={null}
                    />
                </div>
                <div className={"w-full"}>
                    <span className={"mb-1"}>
                        Số tài khoản:
                    </span>
                    <NormalField
                        setFieldValue={setBankNumber}
                        placeholder={""}
                        validate={{
                            status: "SUCCESS",
                            message: ""
                        }}
                        customChildren={null}
                    />
                </div>
                <div className="flex flex-row justify-end items-center w-full">
                    <button
                        className={"bg-[#e2e5ec] text-sm uppercase font-semibold cursor-pointer mx-[5px] my-0 px-[15px] py-2.5 rounded-[5px] border-[none]"}
                        onClick={() => {
                            // closeModalHandle(false);
                        }}>
                        Hủy
                    </button>
                    <button
                        className={"bg-[#113b49] text-white text-sm uppercase font-semibold cursor-pointer mx-[5px] my-0 px-[15px] py-2.5 rounded-[5px] border-[none]"}
                        onClick={() => {}}>Xác
                        nhận
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProfileSelectBanking;