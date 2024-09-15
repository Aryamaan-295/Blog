import { Link } from "react-router-dom";
import Avatar from "./Avatar";

export default function AppBar() {
    
    return (
        <div className="border-b border-gray-200 w-screen h-[1px] flex justify-between items-center px-10 py-8 mb-2">
            <Link to={"/blogs"} className="font-semibold text-2xl cursor-pointer">
                Medium
            </Link>
            <div>
                <Avatar authorName="ary" size={8} />
            </div>
        </div>
    )
}