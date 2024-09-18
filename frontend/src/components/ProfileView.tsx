import { Link } from "react-router-dom"
import { User } from "../hooks"
import Avatar from "./Avatar"
import BlogCard from "./BlogCard"

export default function ProfileView({ self=false, user }: {
    self?: boolean,
    user: User
}) {
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
                    <div className="font-light mb-4 text-md text-gray-500">
                        33K followers
                    </div>
                    {!self ? <>
                        <button className="border bg-green-600 font-light text-sm text-white px-4 py-2 rounded-full hover:bg-green-700"
                            onClick={() => console.log("Followed")}>
                            Follow
                        </button>
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