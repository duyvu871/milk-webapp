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
        <tr className={""}>
            <td className={"flex flex-row justify-center items-center p-2 border border-gray-400 border-t-0"}>
                <div className={"text-xs font-bold mr-2 text-[#68878E]"}>{orderID}</div>
            </td>
            <td className={"border border-gray-400 border-l-0 text-[#68878E]"}>
                <ResultDisplay result={String(result).split("")}/>
            </td>
        </tr>
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
        <div className={"m-1"}>
            <table className={"w-full"}>
                <thead>
                    <tr className={""}>
                        <th className={"text-center text-xs font-bold text-white bg-gray-800 p-2 w-[30%] border border-gray-400"}>Số đơn</th>
                        <th className={"text-center text-xs font-bold text-white bg-gray-800 p-2 border border-gray-400 border-b-[0px]"}>Kết quả</th>
                    </tr>
                </thead>
                <tbody>
                    <TableBody data={data}/>
                </tbody>
            </table>
        </div>
    )
}