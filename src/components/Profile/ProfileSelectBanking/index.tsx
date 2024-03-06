import React, {forwardRef, useCallback, useContext, useEffect, useRef} from 'react';
import {tw} from "@/ultis/tailwind.ultis";
import { bankingList } from '@/ultis/banking.ultis';
import Image from 'next/image';
import {NormalFieldProps} from "@/components/InputField/InputType";
import RotationLoading from "@/components/Loading/RotationLoading";
import {FaCaretDown, FaCaretUp} from "react-icons/fa";
import store from "@/redux/store";
import {hideProfileScreen, hideModal, toggleModal, showProfileScreen} from "@/redux/action/showPopup";
import {useToast} from "@/hooks/useToast";
import {UserDataContext} from "@/contexts/UserDataContext";
import {RootState} from "@/redux/reducers";
import {useSelector} from "react-redux";
import { timeout } from "@/helper/delayAction";

interface ProfileSelectBankingProps {
    bankName?: string;
    bankOwner?: string;
    bankNumber?: string;
};

type Bank = typeof bankingList[0];

type BankInfo = {
    bankName: string;
    accountNumber: string;
    accountName: string;
}

const NormalField = forwardRef(function ({
setFieldValue, placeholder, validate, customChildren, type
}: NormalFieldProps, ref: React.Ref<HTMLInputElement>) {
    const [value, setValue] = React.useState<string>("");
    const [isAlert, setIsAlert] = React.useState<boolean>(false);
    const [alertMessage, setAlertMessage] = React.useState<string>("");

    useEffect(() => {
        const validateResult = validate;
        if (validateResult?.status === "ALERT") {
            timeout(2000).then(() => {
                setIsAlert(false);
                setAlertMessage("");
            })
        } else if (validateResult?.status === "SUCCESS") {
            timeout(2000).then(() => {
                setIsAlert(false);
                setAlertMessage("");
            })
        }
    }, [validate]);

    return (
        <div className={"flex flex-col justify-center items-start  w-full text-black "}>
            <div className={"bg-white p-[6px] px-6 w-full flex flex-row border-gray-200 border-[1px] rounded-[5px]"}>
                <input
                    autoCorrect="off"
                    autoCapitalize="none"
                    spellCheck="false"
                    autoComplete="off"
                    autoSave="off"
                    autoFocus={false}
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
                    ref={ref}
                />
                {customChildren}
            </div>
            <span className={"text-red-500 text-xs italic"}>{alertMessage}</span>
        </div>
    )
})

const BankingList = ({bankingList, selectBank}: {bankingList: Bank[]; selectBank:(bank: string) => void}) => {
    return (
            <div className="flex flex-col justify-center items-center ">
                <div className="flex flex-col justify-start items-start overflow-y-scroll h-[300px] bg-white w-full">
                    {bankingList.map((bank, index) =>
                        <div
                            className="w-full flex flex-row justify-start items-center gap-3 cursor-pointer hover:bg-gray-200"
                            key={index}
                            onClick={() => {
                                selectBank(bank.bank);
                                store.dispatch(hideModal("bankList"));
                            }}
                        >
                            <Image src={bank.image} width={14} height={14} alt="" objectFit={"contain"}/>
                            <div className="text-md">{bank.bank}</div>
                        </div>
                    )}
                </div>
            </div>
    )
}

function ProfileSelectBanking({}: ProfileSelectBankingProps) {
    const { userData : {
        bankingInfo: {
            bank: bankName,
            accountNumber: bankNumber,
            accountName: bankOwner
        }
    } , updateBankingMethod } = useContext(UserDataContext);
    // bank list modal state
    const {dispatch} = store;
    const { showModal } = useSelector((state: RootState) => state.modal);
    // Toast message
    const {error, success} = useToast();
    // loading state
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    // bank state
    const [bankSelected, setBankSelected] = React.useState<string>(bankName || "");
    const [bankNumberSelected, setBankNumberSelected] = React.useState<string>(bankNumber || "");
    const [bankOwnerSelected, setBankOwnerSelected] = React.useState<string>(bankOwner || "");
    const bankOwnerRef = useRef<HTMLInputElement>(null);
    const bankNumberRef = useRef<HTMLInputElement>(null);
    const [bankingListStore, setBankingListStore] = React.useState<Bank[]>(bankingList);
    // alert state
    const [bankSelectAlert, setBankSelectAlert] = React.useState<string>("");
    const [bankNumberAlert, setBankNumberAlert] = React.useState<{status: "ALERT" | "SUCCESS"; message: string}>({
        status: "SUCCESS",
        message: ""
    });
    const [bankOwnerAlert, setBankOwnerAlert] = React.useState<{status: "ALERT" | "SUCCESS"; message: string}>({
        status: "SUCCESS",
        message: ""
    });

    const filterBankingList = (bankingList: {image: string; bank: string}[], filter: string) => {
        return bankingList.filter((bank) => {
            return bank.bank.toLowerCase().includes(filter.toLowerCase());
        });
    }
    const handleFilteredBank = (filter: string) => {
        setBankingListStore(filterBankingList(bankingList, filter));
    }
    const validateBankInfoHandler = useCallback(() => {
        let isValid = true;
        const emptyMessage = {
            bankName: "Vui lòng chọn ngân hàng",
            accountNumber: "Vui lòng nhập số tài khoản",
            accountName: "Vui lòng nhập tên chủ tài khoản"
        }
        if (bankOwnerSelected === "") {
            setBankOwnerAlert({status: "ALERT", message: emptyMessage.accountName});
            isValid = false;
        } else setBankOwnerAlert({status: "SUCCESS", message: ""});

        if (bankNumberSelected === "") {
            setBankNumberAlert({status: "ALERT", message: emptyMessage.accountNumber});
            isValid = false;
        } else setBankNumberAlert({status: "SUCCESS", message: ""});
        if (bankSelected === "") {
            setBankSelectAlert(emptyMessage.bankName);
            isValid = false;
        } else setBankSelectAlert("");
        return isValid;
    }, [bankSelected, bankNumberSelected, bankOwnerSelected]);
     const linkedToBank = () => {
        const isValid = validateBankInfoHandler();
        setIsLoading(true);
        if (isValid) {
            updateBankingMethod({
                bank: bankSelected,
                accountNumber: bankNumberSelected,
                accountName: bankOwnerSelected
            }).then(r => {
                success("Thêm thông tin ngân hàng thành công");
                setIsLoading(false);

            }).catch(e => {
                error("Thêm thông tin ngân hàng thất bại");
                setIsLoading(false);
            })
        } else {
            error("Thông tin ngân hàng không hợp lệ");
        }
     }
     useEffect(() => {
         if (bankNumberRef.current) bankNumberRef.current.value = bankNumberSelected;
         if (bankOwnerRef.current) bankOwnerRef.current.value = bankOwnerSelected;
     }, []);

    return (
        <div className={tw(
            "flex flex-col justify-start items-start w-full",
            "bg-white-glassmorphism rounded-lg"
        )}>
            {/*<span>*/}
            {/*    {success ? success : error}*/}
            {/*</span>*/}
            <div className={tw("flex flex-col justify-start items-start w-full ", "mt-2 md:mt-4 lg:mt-6")}>
                <div className={"w-full"}>
                    <span className={"pb-4"}>
                        Ngân hàng:
                    </span>
                    <div className={""}>
                        <div
                            id="countries"
                            className="cursor-pointer flex flex-row justify-between items-center  w-full text-black border-gray-200 border-[1px] rounded-[5px] px-4 py-2 "
                            onClick={() => {
                                dispatch(toggleModal("bankList"));
                            }}
                        >
                            <span>{(bankSelected || "Chọn ngân hàng")}</span>
                            <div className={""}>
                                {showModal ? <FaCaretUp/> : <FaCaretDown/>}
                            </div>
                        </div>
                    </div>
                    {showModal ? (
                        <div
                            className={"flex flex-col justify-center items-center absolute min-w-[451px] p-1 bg-white shadow"}>
                            <div className={"w-full"}>
                                <input
                                    className="outline-none border border-solid border-[#e2e5ec] w-full box-border leading-[22px] p-1 rounded-[5px] text-[#333] mb-1"
                                    type="search"
                                    autoCorrect="off"
                                    autoCapitalize="none"
                                    spellCheck="false"
                                    role="searchbox"
                                    aria-autocomplete="list"
                                    autoComplete="off"
                                    aria-label="Search"
                                    aria-controls="select2-bank_id-results"
                                    onChange={(e) => {
                                        handleFilteredBank(e.target.value);
                                    }}
                                />
                            </div>
                            <div className={"min-w-[451px] w-full"}>
                                <BankingList bankingList={bankingListStore} selectBank={setBankSelected}/>
                            </div>
                        </div>
                    ) : (<div></div>)}
                </div>
                <span className={"text-red-500 text-xs italic"}>{bankSelectAlert}</span>
            </div>
            <div className={"w-full"}>
                    <span className={"mb-1"}>
                        Tên chủ tài khoản:
                    </span>
                    <NormalField
                        setFieldValue={(v) => {setBankOwnerSelected(v)}}
                        placeholder={""}
                        validate={bankOwnerAlert}
                        customChildren={null}
                        ref={bankOwnerRef}
                    />
                </div>
            <div className={"w-full"}>
                    <span className={"mb-1"}>
                        Số tài khoản:
                    </span>
                    <NormalField
                        setFieldValue={(v) => {setBankNumberSelected(v)}}
                        placeholder={""}
                        validate={bankNumberAlert}
                        customChildren={null}
                        ref={bankNumberRef}
                    />
                </div>
            <div className={"w-full"}>
                <span className={"mt-2 mb-1 flex justify-end text-sm"}>
                    Quý khách vui lòng điền đúng thông tin ngân hàng.
                </span>
            </div>
            <div className="flex flex-row justify-end items-center w-full mt-2">
                <button
                    className={"bg-[#e2e5ec] text-sm uppercase font-semibold cursor-pointer mx-[5px] my-0 px-[15px] py-2.5 rounded-[5px] border-[none]"}
                    onClick={() => {
                        dispatch(hideProfileScreen())
                        console.log(store.getState().profileScreen.showModal);
                    }}>Hủy
                </button>
                <button
                    className={"flex flex-row justify-center items-center gap-3 bg-[#113b49] text-white text-sm uppercase font-semibold cursor-pointer mx-[5px] my-0 px-[15px] py-2.5 rounded-[5px] border-[none]"}
                    onClick={linkedToBank}
                    disabled={isLoading}
                >
                    {isLoading ? <RotationLoading height={30} width={30}/> : <></>}
                    Xác nhận
                </button>
            </div>
        </div>
    );
}

export default ProfileSelectBanking;