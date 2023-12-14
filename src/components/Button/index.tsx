import {tw} from "@/ultis/tailwind.ultis";

interface ButtonDefaultProps {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
}


export default function ButtonDefault({
children, onClick, className
}: ButtonDefaultProps) {
    return (
        <div className={"flex flex-row justify-center items-center"}>
            <button
                type="button"
                className={tw(
                    className||"",
                    "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800",

                )}
                onClick={onClick}
            >
                {children}
            </button>
        </div>)
}