import BlogCard from "../components/BlogCard";
import BlogCardSkeleton from "../components/BlogCardSkeleton";
import { useBlogs } from "../hooks";

export default function Blogs() {
    const {loading, blogs} = useBlogs();

    if (loading) {
        return(
            <div>
                <BlogCardSkeleton />
                <BlogCardSkeleton />
                <BlogCardSkeleton />
                <BlogCardSkeleton />
                <BlogCardSkeleton />
                <BlogCardSkeleton />
            </div>
        )
    }

    return (
        <div className="flex flex-col items-center">
            <div className="max-w-2xl pt-5 mx-6">
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