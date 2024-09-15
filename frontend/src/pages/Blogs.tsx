import BlogCard from "../components/BlogCard";
import { useBlogs } from "../hooks";

export default function Blogs() {
    const {loading, blogs} = useBlogs();

    if (loading) {
        return(
            <div>
                Loader
            </div>
        )
    }

    return (
        <div className="flex flex-col items-center">
            <div className="max-w-xl">
                {blogs.map(blog => 
                    <BlogCard 
                    authorName={blog.author.name}
                    title={blog.title}
                    content={blog.content}
                    updatedDate={blog.updatedDate}
                    id={blog.id}
                    key={blog.id}
                    />
                )}
            </div>
        </div>
    )
}