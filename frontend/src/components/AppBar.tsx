import { Link, useLocation } from "react-router-dom";
import Avatar from "./Avatar";
import write from "../assets/write-icon.svg";
import search from "../assets/search-icon.svg"
import { jwtDecode } from "jwt-decode";
import { useEffect, useRef, useState } from "react";
import Menu from "./Menu";
import axios from "axios";
import { BACKEND_URL } from "../config";
import SearchMenu from "./SearchMenu";
import { Blog, initBlog } from "../hooks";

export default function AppBar() {
    const route = useLocation();
    const page = route.pathname.split('/')[1];
    const token = localStorage.getItem("token");
    const user = jwtDecode<{id: string}>(token as string);
    const [username, setUsername] = useState<string>();
    const [open, setOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [queryParam, setQueryParam] = useState<string>("");
    const [results, setResults] = useState<Blog[] | undefined>()

    const menuRef = useRef<HTMLDivElement>(null);
    const searchRef = useRef<HTMLDivElement>(null)

    function handleOutsideClick(event: any) {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setOpen(false);
        };

        if (searchRef.current && !searchRef.current.contains(event.target)) {
            setSearchOpen(false);
        }
    }

    async function handleSearch(query: string) {
        setQueryParam(query);

        const results = await axios.post(`${BACKEND_URL}/api/v1/blog/search`,{}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                t: queryParam,
            }
        })

        setResults(results.data.results);
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
        document.addEventListener('scroll', handleOutsideClick);
        setQueryParam("")

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
            document.removeEventListener('scroll', handleOutsideClick);
        };
    },[])

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/user/${user.id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            setUsername(response.data.user.name);
        })
    }, [token])

    return (
        <div className="border-b border-gray-200 w-full h-[1px] flex justify-between items-center px-8 sm:px-10 py-7 bg-white">
            <div className="flex justify-center items-center">
                <Link to={"/blogs"} className="font-semibold text-2xl cursor-pointer">
                    Medium
                </Link>
                <div className="ml-4 bg-gray-100 px-2 py-1 rounded-full justify-center items-center hidden sm:flex">
                    <div className="opacity-50">
                        <img src={ search } alt="" className="h-7" />
                    </div>
                    <input type="text" value={ queryParam } placeholder="Search" className="h-8 w-36 bg-gray-100 mr-1 text-md font-light text-opacity-50 placeholder:text-black placeholder:opacity-50 placeholder:font-light focus:outline-none" 
                    onChange={(e) => {
                        setSearchOpen(true);
                        handleSearch(e.target.value);
                    }}/>
                    {searchOpen && <>
                        <div ref={ searchRef }>
                            <SearchMenu results={ results || [initBlog] } setSearchOpen={ setSearchOpen } />
                        </div>
                    </>}
                </div>
            </div>
            <div className="flex justify-center items-center">
                <button disabled className="block mx-1 px-1 py-1 opacity-60 border border-gray-300 rounded-full sm:hidden">
                    <img src={ search } alt="" />
                </button>
                {!(page == "edit") && <>
                    <div>
                        <Link to={'/edit'}>
                            <button type="button" className="px-4 py-2 border rounded-full flex hover:bg-gray-100">
                                <img src={write} alt="" className="mr-1" />
                                Write
                            </button>
                        </Link>
                    </div>
                </>}
                <button onClick={() => setOpen(!open)} className="ml-4 w-fit h-fit rounded-full">
                    <Avatar authorName={ username } size={8} hover={true} />
                </button>
                {open && <>
                    <div ref={ menuRef }>
                        <Menu user={ user } setOpen={ setOpen } />
                    </div>
                </>}
            </div>
        </div>
    )
}
