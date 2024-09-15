import axios from "axios";
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";

export default function WriteBlog() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token')
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    async function sendRequest(title:string, content:string) {
        const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
            title,
            content,
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        const id = response.data.id;
        navigate(`/blog/${id}`)
    }

    return (
        <div className="flex flex-col items-center w-screen px-80 pt-8">
            <div className="flex flex-col w-full">
                <textarea name="title" id="title" placeholder="Title" rows={1} className="mb-8 pb-2 border-b-[1px] border-gray-400 text-5xl focus:outline-none font-light resize-none placeholder:font-light" 
                    onChange={(e) => {
                        setTitle(e.target.value)
                    }}
                />
                <textarea name="content" id="content" placeholder="Tell your story..." rows={15} className="text-3xl focus:outline-none resize-none font-light placeholder:font-light" 
                    onChange={(e) => {
                        setContent(e.target.value)
                    }}
                />
            </div>
            <div>
                <button onClick={() => sendRequest(title, content)} className="px-4 py-2 border rounded-full text-white bg-blue-600 hover:bg-blue-500">
                    Publish
                </button>
            </div>
        </div>
    )
}
