import {FaTimes} from "react-icons/fa";
import {LiaTimesSolid} from "react-icons/lia";


const BankingRuleHeading = ({handleClose}: {handleClose: () => void}) => {
    return (
        <div className={"px-[20px] py-[15px] relative border-b-[1px] border-y-gray-300 flex justify-center items-center"}>
            <div>QUY ĐỊNH</div>
            <div className={"absolute right-0 top-[34px] px-4 text-center leading-[40px] mt-[-20px] text-[20px] font-thin cursor-pointer"} onClick={handleClose}>
                <LiaTimesSolid size={25} color={"black"} className={""}/>
            </div>
        </div>
    )
}

const BankingRuleContent = () => {
    return (
        <div
            className={"px-[20px] py-[10px] h-[calc(100%-50px)] overflow-y-auto text-justify text-[16px] text-[#113b49] leading-[26px] font-medium"}>
            <p className={"mb-[15px]"}>
                Mở thưởng theo thứ tự tự từ trái qua phải bắt đầu từ <b>Chục
                Ngàn</b>, <b>Ngàn</b>, <b>Trăm</b>, <b>Chục</b>,
                <b> Đơn vị</b>
            </p>
            <p className={"mb-[15px]"}>
                Để đảm bảo web được hoạt động lâu dài cũng như bắt buộc duy trì các hoạt động đóng thuế
                cho doanh nghiệp, đối với các quý khách nhận được phần quà ngẫu nhiên may mắn từ Web, khi rút điểm cần
                thực
                hiện đóng phí duy trì theo hạn mức rút điểm như sau:
            </p>
            <ul className={"list-disc px-3"}>
                <li>Hạn mức rút tài khoản dưới 200 triệu tương ứng 15% phí</li>
                <li>Hạn mức rút tài khoản dưới 500 triệu tương ứng với 20% phí</li>
                <li>Hạn mức rút tài khoản trên 500 triệu tương ứng với 30% phí</li>
            </ul>
        </div>
    )
}

export default function BankingRuleComponent({closeHandler}: { closeHandler: () => void }) {
    return (
        <div className={"fixed top-0 left-0 right-0 w-full h-full bg-white mx-auto my-0"}>
            <BankingRuleHeading handleClose={closeHandler}/>
            <BankingRuleContent/>
        </div>
    )
}
