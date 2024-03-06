import "./rotation_spinner.css";

export default function RotationLoading({width, height}: {width: string|number, height: string|number}) {
    const style = {
        width: width,
        height: height
    }
    return (
        <div className={"flex justify-center items-center"}>
            <div className="spinner"></div>
        </div>
    )
}