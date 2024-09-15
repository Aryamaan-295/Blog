import { Link } from "react-router-dom";
import Avatar from "./Avatar";

interface BlogCardProps {
    authorName: string;
    title: string;
    content: string;
    updatedDate: string;
    id:number;
}

export default function BlogCard({
    authorName,
    title,
    content,
    updatedDate,
    id,
}: BlogCardProps) {
    return (
        <Link to={`/blog/${id}`}>
            <div className="w-full flex flex-col justify-center items-center rounded-lg hover:cursor-pointer hover:bg-gray-100">
            <div className="p-8 flex flex-col justify-center items-center">
                <div>
                    <div className="text-gray-600 mb-2">
                        <Avatar authorName={ authorName } /> <span className="font-extralight text-sm pl-2">{ authorName } <b>•</b> { `${updatedDate.substring(0,10)}` } </span>
                    </div>
                    <div className="text-xl font-semibold mb-1">
                        { title }
                    </div>
                    <div className="text-md font-light mb-3 max-h-10 overflow-hidden leading-5">
                        { content.slice(0,150) + '...' }
                    </div>
                    <div className="text-gray-500 text-sm">
                        {`${Math.ceil(content.length/500)} min read`}
                    </div>
                </div>
            </div>
            <hr className="border-gray-400 w-4/5 h-[1px]" />
        </div>
        </Link>
    )
}