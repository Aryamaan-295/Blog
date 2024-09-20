import { Link } from "react-router-dom";
import { Blog } from "../hooks";
import Avatar from "./Avatar";

export default function BlogView({ blog }: {blog: Blog}) {
    return (
        <div className="grid grid-cols-12 px-16 pt-14">
            <div className="col-start-1 col-end-9">
                <div className="text-4xl font-extrabold mb-1">
                    { blog.title }
                </div>
                <div className="text-md font-light text-gray-600 mb-4 ml-3">
                    {`Published on ${blog.updatedDate.substring(0,10)}`}
                </div>
                <div className="text-md pl-2 pr-6 ">
                    { blog.content }
                </div>
            </div>
            <div className="col-start-9 col-end-13 px-10 border-l border-gray-400">
                <div className="relative top-20 border rounded-lg p-4">
                    <div className="font-bold text-md text-gray-500 mb-2">
                        Author
                    </div>
                    <Link to={`/profile/${blog.author.id}`} className="flex h-fit rounded-lg p-2 cursor-pointer hover:bg-slate-100">
                        <div className="flex justify-center items-center w-fit">
                            <Avatar authorName={ blog.author.name } size={8} />
                        </div>
                        <div className="pl-4 flex-1">
                            <div className="font-bold text-xl text-gray-800">
                                { blog.author.name }
                            </div>
                            <div className="font-light text-gray-500 text-sm">
                                { "This author is smart "}
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}