import {tw} from "@/ultis/tailwind.ultis";

export default function InlineTag({
    content, className
}: {
    content: string;
    className?: string;
}) {
    return (
        <div className={tw(
            "mx-1 break-normal p-1 px-2 bg-[#103A49] rounded-sm w-fit text-sm text-white",
            className || ""
        )}>
            {content}
        </div>
    )
}