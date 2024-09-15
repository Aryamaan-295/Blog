import { useBlog } from "../hooks"
import BlogView from "../components/BlogView"
import { useParams } from "react-router-dom";

export default function Blog() {
    const { id } = useParams();
    const { loading, blog } = useBlog({
        id: Number(id)
    });

    if(loading) {
        return (
            <>
                Loading........
            </>
        )
    }

    console.log(blog)

    return (
        <div>
            <div>
                <BlogView blog={blog} />
            </div>
        </div>
    )
}
