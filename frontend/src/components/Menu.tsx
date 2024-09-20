import { Dispatch, SetStateAction } from "react";
import profile from "../assets/profile-icon.svg";
import settings from "../assets/settings-icon.svg";
import signout from "../assets/signout-icon.svg"
import { Link } from "react-router-dom"

function MenuItem({ logo, item, link, setOpen }: {
    logo: JSX.Element,
    item: string,
    link: string,
    setOpen: Dispatch<SetStateAction<boolean>>,
}) {

    return (
        <Link to={ link } className="flex flex-row m-3 p-2 rounded-md items-center opacity-60 hover:opacity-100 hover:bg-gray-100" 
        onClick={() => {
            setOpen(false);
            if (link == "") {
                localStorage.removeItem("token");
            }
        }}>
            <div className="mr-2 w-8 aspect-square flex justify-center items-center">{ logo }</div>
            <div className="font-light text-sm flex-1">{ item }</div>
        </Link>
    )
}

export default function Menu({ user, setOpen }: {
    user: {
        id: string, 
    },
    setOpen: Dispatch<SetStateAction<boolean>>,
}) {
    return (
        <div className="absolute w-60 top-14 right-6 border-[1px] border-gray-200 shadow-md drop-shadow-md z-10 bg-opacity-100 ">
            <MenuItem logo={<img src={ profile } alt="" className="w-7 aspect-square" />} item="Profile" link={`/profile/${user.id}`} setOpen={ setOpen }/>
            <MenuItem logo={<img src={ settings } alt="" className="w-7 aspect-square" />} item="Settings" link={`/profile/settings`} setOpen={ setOpen }/>
            <MenuItem logo={<img src={ signout } alt="" className="w-7 aspect-square" />} item="Sign out" link={``} setOpen={ setOpen }/>
        </div>
    )
}