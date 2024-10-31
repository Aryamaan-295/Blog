import { Link } from "react-router-dom"
import { User } from "../hooks"
import Avatar from "./Avatar"
import BlogCard from "./BlogCard"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { useState } from "react"

export default function ProfileView({ self=false, user }: {
    self?: boolean,
    user: User
}) {
    const token = localStorage.getItem("token");
    const [followerCount, setFollowerCount] = useState<number>(user.followerCount);

    const [isFollowing, setIsFollowing] = useState<boolean>(user.isFollowing);

    async function handleFollow() {
        await axios.post(`${BACKEND_URL}/api/v1/user/follow/${user.id}`,{}, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        setFollowerCount(followerCount+1);
        setIsFollowing(true);
    }

    async function handleUnfollow() {
        await axios.delete(`${BACKEND_URL}/api/v1/user/unfollow/${user.id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        setFollowerCount(followerCount-1);
        setIsFollowing(false);
    }

    return (
        <div className="grid grid-cols-12">
            <div className="col-start-1 col-end-9 pt-16 pl-40">
                <div className="text-[48px] font-normal pb-8 border-b border-gray-100">
                    { user.name }
                </div>
                <div className="pt-8 mr-8">
                    {user.posts.map(blog => 
                        <BlogCard 
                        author={{name: user.name, id: user.id}}
                        title={blog.title}
                        content={blog.content}
                        updatedDate={blog.updatedDate}
                        id={blog.id}
                        key={blog.id}
                        />
                    )}
                </div>
            </div>
            <div className="col-start-9 col-end-13 h-screen border-l border-gray-100 sticky top-0 pt-16 pl-8">
                <div>
                    <Avatar authorName={ user.name } size={20} />
                </div>
                <div>
                    <div className="font-normal my-2 text-lg">
                        { user.name }
                    </div>
                    <div className="font-light mb-2 text-md text-gray-500 w-60">
                        { user.bio }
                    </div>
                    <div className="flex">
                        <div className="font-light mb-4 text-md text-gray-500 mr-4 opacity-80">
                            { followerCount } followers
                        </div>
                        <div className="font-light mb-4 text-md text-gray-500 opacity-80">
                            { user.followingCount } following
                        </div>
                    </div>
                    {!self ? <>
                        {isFollowing ? <>
                            <button className="border border-green-600 bg-white font-light text-sm text-green-600 px-4 py-2 rounded-full hover:bg-gray-100"
                                onClick={handleUnfollow}>
                                Unfollow
                            </button>
                        </> : <>
                            <button className="border border-green-600 bg-green-600 font-light text-sm text-white px-4 py-2 rounded-full hover:bg-green-700"
                                onClick={handleFollow}>
                                Follow
                            </button>
                        </>}
                    </> : <>
                        <Link to={"/profile/settings"} className="text-green-600 font-light text-sm pl-1 hover:underline">
                            Edit Profile
                        </Link>
                    </>}
                </div>
            </div>
        </div>
    )
}