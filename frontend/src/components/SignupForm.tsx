import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignupInput } from "@kaviaryamaan/blog-common";
import { LabelledInput } from "./LabelledInput";
import axios from 'axios';
import { BACKEND_URL } from "../config";

export default function SignupForm() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<SignupInput>({
        name: "",
        email: "",
        password: "",
    })

    async function sendRequest() {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/sign/signup`, formData);
            const jwt = response.data.jwt;
            localStorage.setItem("token", jwt);
            navigate("/blogs");
        }
        catch(e) {
            alert(e)
            console.log(e)
        }
    }

    return (
        <div className="flex justify-center items-center flex-col h-screen px-28">
            <div className="font-bold text-3xl">
                Create an Account
            </div>
            <div className="text-gray-400">
                Already have an account?
                <Link to={"/"} className="pl-1 underline underline-offset-2 hover:text-blue-800 hover:cursor-pointer">Login</Link>
            </div>
            <div className="mt-4 flex flex-col justify-center items-center">
                <LabelledInput label="Username" placeholder="johndoe" onChange={(e) => {
                    setFormData(c => ({
                        ...c,
                        name: e.target.value
                    }))
                }} />

                <LabelledInput label="Email" placeholder="johndoe@gmail.com" onChange={(e) => {
                    setFormData(c => ({
                        ...c,
                        email: e.target.value
                    }))
                }} />

                <LabelledInput label="Password" placeholder="123456" type="password" onChange={(e) => {
                    setFormData(c => ({
                        ...c,
                        password: e.target.value
                    }))
                }} />

                <button onClick={sendRequest} type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 hover:cursor-pointer font-medium rounded-lg text-sm w-32 px-5 py-2.5 me-2 my-4">Submit</button>
            </div>
        </div>
    )
}