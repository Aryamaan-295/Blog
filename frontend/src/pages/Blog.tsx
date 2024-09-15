import { useBlog } from "../hooks"
import BlogView from "../components/BlogView"
import { useParams } from "react-router-dom";

export default function Blog() {
    const { id } = useParams();
    const { loading, blog } = useBlog({
        id: id || ""
    });

    if(loading) {
        return (
            <>
                Loading........
            </>
        )
    }

    return (
        <div>
            <div>
                <BlogView blog={blog} />
            </div>
        </div>
    )
}
