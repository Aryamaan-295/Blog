import { Link, useLocation } from "react-router-dom";
import Avatar from "./Avatar";
import write from "../assets/write-icon.svg";
import { jwtDecode } from "jwt-decode";

export default function AppBar() {
    const route = useLocation();
    const page = route.pathname.split('/')[1];
    const token = localStorage.getItem("token");
    const user = jwtDecode<{id: string}>(token as string);

    return (
        <div className="border-b border-gray-200 w-screen h-[1px] flex justify-between items-center px-10 py-8 mb-2">
            <Link to={"/blogs"} className="font-semibold text-2xl cursor-pointer">
                Medium
            </Link>
            <div className="flex justify-center items-center">
                {(page == "blogs" || page == "blog") && <>
                    <div>
                        <Link to={'/edit'}>
                            <button type="button" className="px-4 py-2 border rounded-full flex hover:bg-gray-100">
                                    <img src={write} alt="" className="mr-1" />
                                    Write
                            </button>
                        </Link>
                    </div>
                </>}
                <Link to={`/profile/${user.id}`}>
                    <span className="ml-4 w-fit h-fit rounded-full"><Avatar authorName="ary" size={8} /></span>
                </Link>
            </div>
        </div>
    )
}