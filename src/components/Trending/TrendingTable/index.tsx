import ResultDisplay from "@/components/NextOrderPanel/NextOrderResult/NextOrderResultDisplay";

interface ITableItem {
    orderID: string;
    // timeLeft: number;
    result: number;
}

interface TrendingTableProps {
    data: ITableItem[];
}

const TableItem = ({orderID, result}: ITableItem) => {
    return (
        <div className={"flex flex-row "}>
            <div className={"flex flex-row justify-center items-center p-2 border border-gray-400 border-t-0 border-r-1 h-[50px] w-[150px]"}>
                <div className={"text-xs font-bold mr-2 text-[#68878E] py-2 h-[]"}>{orderID}</div>
            </div>
            <div className={"border border-gray-400 border-l-0 border-t-0 text-[#68878E] h-[50px] w-full"}>
                <ResultDisplay result={String(result).split("")}/>
            </div>
        </div>
    )
}

const TableBody = ({data}: TrendingTableProps) => {
    return (
        <>
            {
                data.map((item, index) => (
                    <TableItem key={"table-item-" + index} orderID={item.orderID} result={item.result}/>
                ))
            }
        </>
    )
}

export default function TrendingTable({
    data
}: TrendingTableProps) {
    return (
        <div className={"m-2"}>
            <div className={"w-full"}>
                <div>
                    <div className={"flex flex-row w-full"}>
                        <div className={"text-center text-xs font-bold text-white bg-gray-800 p-2 w-[150px] border border-gray-400 border-b-[1px] border-r-0"}>Số đơn</div>
                        <div className={"text-center text-xs font-bold text-white bg-gray-800 p-2 border border-gray-400 border-b-[1px] w-full"}>Kết quả</div>
                    </div>
                </div>
                <div>
                    <TableBody data={data}/>
                </div>
            </div>
        </div>
    )
}