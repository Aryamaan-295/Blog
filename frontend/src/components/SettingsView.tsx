import { useState } from "react"
import { UpdateUserInput } from "@kaviaryamaan/blog-common";
import Avatar from "./Avatar";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { jwtDecode } from "jwt-decode";
import { useUser } from "../hooks";
import { useNavigate } from "react-router-dom";

export default function SettingsView() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const info = jwtDecode<{id: string}>(token as string);
    const [sending, setSending] = useState(false);
    const [formData, setFormData] = useState<UpdateUserInput>({})

    const isFormValid = !!formData.name || !!formData.email || !!formData.password || !!formData.bio;

    const { loading, user } = useUser({
        id: info.id
    })

    async function sendRequest() {
        setSending(true);
        const response = await axios.post(`${BACKEND_URL}/api/v1/user/update`,formData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        setSending(false);
        navigate(`/profile/${info.id}`)
    }

    if (loading) {
        return (
            <div role="status" className="grid grid-cols-12 animate-pulse">
                <div className="col-start-1 col-end-9 pt-16 pl-40">
                    <div className="text-[40px] text-gray-800 font-semibold pb-0 border-b border-gray-100">
                        Settings
                        <div className="text-sm font-light w-fit mt-8 pb-1 underline underline-offset-[9px] ">
                            Account
                        </div>
                    </div>
                    <div className="pt-7 mr-8 flex font-light text-base justify-between">
                        <div className="h-7 bg-gray-200 rounded-lg w-40"></div>
                        <div className="h-7 bg-gray-200 rounded-lg w-28 mr-5"></div>
                    </div>
                    <div className="pt-7 mr-8 flex font-light text-base justify-between">
                        <div className="h-7 bg-gray-200 rounded-lg w-40"></div>
                        <div className="h-7 bg-gray-200 rounded-lg w-32 mr-5"></div>
                    </div>
                    <div className="pt-7 mr-8 flex font-light text-base justify-between">
                        <div className="h-7 bg-gray-200 rounded-lg w-40"></div>
                        <div className="h-7 bg-gray-200 rounded-lg w-24 mr-5"></div>
                    </div>
                    <div className="pt-7 mr-8 flex font-light text-base justify-between">
                        <div className="h-7 bg-gray-200 rounded-lg w-40"></div>
                        <div className="h-7 bg-gray-200 rounded-lg w-24 mr-5"></div>
                    </div>
                    <div className="pt-8 mr-8 flex font-light text-base justify-between">
                        <div className="h-7 bg-gray-200 rounded-lg w-40"></div>
                        <div className="h-10 bg-gray-200 rounded-full w-10 mr-10"></div>
                    </div>
                </div>
                <div className="col-start-9 col-end-13 h-screen border-l border-gray-100 sticky top-0 pt-16 pl-8">
                </div>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-12">
            <div className="col-start-1 col-end-9 pt-16 pl-40">
                <div className="text-[40px] text-gray-800 font-semibold pb-0 border-b border-gray-100">
                    Settings
                    <div className="text-sm font-light w-fit mt-8 pb-1 underline underline-offset-[9px] ">
                        Account
                    </div>
                </div>
                <div className="pt-7 mr-8 flex font-light text-base justify-between">
                    <label htmlFor="email" className="flex-1 cursor-pointer">
                        Email
                    </label>
                    <div>
                        <input id="email" type="text" placeholder={user.email} value={formData.email || ""} className="focus:outline-none w-52 h-7 focus:border-b focus:border-gray-200"
                        onChange={(e) => setFormData(c => ({
                            ...c,
                            email: e.target.value,
                        }))} />
                    </div>
                </div>
                <div className="pt-7 mr-8 flex font-light text-base justify-between">
                    <label htmlFor="name" className="flex-1 cursor-pointer">
                        Username
                    </label>
                    <div>
                        <input id="name" type="text" placeholder={user.name} value={formData.name || ""} className="focus:outline-none w-52 h-7 focus:border-b focus:border-gray-200"
                        onChange={(e) => setFormData(c => ({
                            ...c,
                            name: e.target.value,
                        }))} />
                    </div>
                </div>
                <div className="pt-7 mr-8 flex font-light text-base justify-between">
                    <label htmlFor="pass" className="flex-1 cursor-pointer">
                        Password
                    </label>
                    <div>
                        <input id="pass" type="text" placeholder={"123456"} value={formData.password || ""} className="focus:outline-none w-52 h-7 focus:border-b focus:border-gray-200"
                        onChange={(e) => setFormData(c => ({
                            ...c,
                            password: e.target.value,
                        }))} />
                    </div>
                </div>
                <div className="pt-7 mr-8 flex font-light text-base justify-between">
                    <label htmlFor="bio" className="flex-1 cursor-pointer">
                        Bio
                    </label>
                    <div>
                        <textarea id="bio" placeholder={"Bio here..."} value={formData.bio || ""} className="resize-none focus:outline-none w-52 h-7 focus:border-b focus:border-gray-200"
                        onChange={(e) => setFormData(c => ({
                            ...c,
                            bio: e.target.value,
                        }))} />
                    </div>
                </div>
                <div className="pt-8 mr-8 flex font-light text-base justify-between">
                    <label htmlFor="pic" className="flex-1 cursor-pointer">
                        Photo
                    </label>
                    <div className="mr-20">
                        <Avatar authorName={user.name} size={10}/>
                    </div>
                </div>
                <div className="flex justify-center mt-16">
                    <div className="w-fit mr-6">
                        <button className="border border-green-700 rounded-full px-4 py-2 text-green-700 font-light text-sm hover:bg-gray-50"
                        onClick={() => {
                            setFormData({})
                        }}>
                            Cancel
                        </button>
                    </div>
                    <div className="w-fit">
                        <button disabled={loading} onClick={() => {
                            if (isFormValid) {
                                console.log(formData)
                                sendRequest()
                            } else {
                                alert("Required")
                            }
                        }} className="border border-green-700 rounded-full px-4 py-2 bg-green-700 text-white font-light text-sm hover:bg-green-800">
                            {!sending ? "Save" : <>
                                <svg className="animate-spin mx-[17px] my-[2px] h-5 w-5 border-2 border-white rounded-full border-b-0 border-r-0" viewBox="0 0 24 24" />
                            </>}
                        </button>
                    </div>
                </div>
            </div>
            <div className="col-start-9 col-end-13 h-screen border-l border-gray-100 sticky top-0 pt-16 pl-8">
            </div>
        </div>
    )
}