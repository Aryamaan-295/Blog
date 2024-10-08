import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

export interface Blog {
    title: string,
    content: string,
    id: string,
    author: {
        name: string,
        id: string,
    }
    updatedDate: string,
}

export const initBlog:Blog = {
    title: "",
    content: "",
    id: "",
    author: {
        name: "",
        id: "",
    },
    updatedDate: ""
}

export interface User {
    name: string,
    email: string,
    bio: "",
    id: string,
    posts: Blog[],
    followerCount: number,
    followingCount: number, 
    isFollowing: boolean,
}

const initUser:User = {
    name: "",
    email: "",
    bio: "",
    id: "",
    posts: [],
    followerCount: 0,
    followingCount: 0,
    isFollowing: false,
}

export function useUser({ id }: {id:string}) {
    const [loading,setLoading] = useState(true);
    const [user, setUser] = useState<User>(initUser);
    const token = localStorage.getItem("token")

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/user/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            setUser(response.data.user);
            setLoading(false);
        })
    }, [])
    
    return({
        loading,
        user,
    })
}

export function useBlog({id}: {id:string}) {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>(initBlog);
    const token = localStorage.getItem("token")

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                setBlog(response.data.blog);
                setLoading(false);
            })
    },[])

    return({
        loading,
        blog,
    })
}

export function useBlogs() {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const token = localStorage.getItem("token")

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                setBlogs(response.data.blogs);
                setLoading(false);
            })
    },[])

    return({
        loading,
        blogs,
    })
}