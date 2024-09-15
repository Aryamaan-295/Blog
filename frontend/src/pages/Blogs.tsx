import BlogCard from "../components/BlogCard";
import BlogSkeleton from "../components/BlogSkeleton";
import { useBlogs } from "../hooks";

export default function Blogs() {
    const {loading, blogs} = useBlogs();

    if (loading) {
        return(
            <div>
                <BlogSkeleton />
                <BlogSkeleton />
                <BlogSkeleton />
                <BlogSkeleton />
                <BlogSkeleton />
                <BlogSkeleton />
            </div>
        )
    }

    return (
        <div className="flex flex-col items-center">
            <div className="max-w-2xl">
                {blogs.map(blog => 
                    <BlogCard 
                    author={blog.author}
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