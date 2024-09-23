import { Dispatch, SetStateAction } from "react"
import { Link } from "react-router-dom"
import { Blog } from "../hooks"

function SearchMenuItem({ setSearchOpen, blog }: {
    blog: Blog
    setSearchOpen: Dispatch<SetStateAction<boolean>>,
}) {
    return (
        <div 
            onClick={() => setSearchOpen(false)} 
            className="px-4 py-2 hover:bg-blue-50 cursor-pointer transition-colors"
        >
            <Link 
                to={`blog/${blog.id}`} 
                className="block text-gray-700 hover:text-blue-600"
            >
                <div className="font-semibold">{blog.title}</div>
                <div className="text-sm text-gray-500">{blog.content.slice(0,20) + ' ...'}</div>
            </Link>
        </div>
    );
}

export default function SearchMenu({ results, setSearchOpen }: {
    results: Blog[];
    setSearchOpen: Dispatch<SetStateAction<boolean>>,
}) {
    return (
        <div className="absolute mt-6 w-56 max-h-40 overflow-scroll left-[128px] bg-white border border-gray-200 shadow-lg z-10">
            {results.length > 0 ? (
                results.map((result) => (
                    <SearchMenuItem key={result.id} setSearchOpen={setSearchOpen} blog={result} />
                ))
            ) : (
                <div className="px-4 py-2 text-gray-500">No results found</div>
            )}
        </div>
    );
}

