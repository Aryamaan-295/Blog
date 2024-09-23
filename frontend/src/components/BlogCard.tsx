import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import { Blog } from "../hooks";


export default function BlogCard({
    author,
    title,
    content,
    updatedDate,
    id,
}: Blog) {
    return (
        <Link to={`/blog/${id}`}>
            <div className="w-full flex flex-col justify-center items-center rounded-xl transition-colors hover:cursor-pointer hover:bg-gray-100">
            <div className="py-5 px-8 flex flex-col w-full">
                <div>
                    <div className="text-gray-600 mb-2">
                        <Avatar authorName={ author.name } /> 
                        <span className="font-extralight text-sm pl-2">
                            <Link to={`/profile/${author.id}`} className="hover:underline">
                                { author.name }
                            </Link> 
                            <b> • </b>
                            { `${updatedDate.substring(0,10)}` } 
                        </span>
                    </div>
                    <div className="text-xl font-semibold mb-1">
                        { title }
                    </div>
                    <div className="text-md font-light mb-5 max-h-10 overflow-hidden leading-5">
                        { content.slice(0,150) + '...' }
                    </div>
                    <div className="text-gray-500 text-sm">
                        {`${Math.ceil(content.length/500)} min read`}
                    </div>
                </div>
            </div>
            <hr className="border-gray-200 w-4/5 h-[1px]" />
        </div>
        </Link>
    )
}