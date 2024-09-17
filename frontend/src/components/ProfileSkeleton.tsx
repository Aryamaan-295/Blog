import BlogCardSkeleton from "./BlogCardSkeleton";

export default function ProfileSkeleton() {
    return (
        <div role="status" className="w-screen animate-pulse flex flex-col justify-center items-center">
            <div className="grid grid-cols-12">
                <div className="col-start-1 col-end-9 pt-16 pl-40">
                    <div className="text-[48px] font-normal pb-8 border-b border-gray-100">
                        <div className="bg-gray-200 rounded-lg w-96 h-16"></div>
                    </div>
                    <div className="relative right-96">
                        <BlogCardSkeleton />
                        <BlogCardSkeleton />
                        <BlogCardSkeleton />
                    </div>
                </div>
                <div className="col-start-9 col-end-13 h-screen border-l border-gray-100 sticky top-0 pt-16 pl-8">
                    <div className="mb-4">
                        <div className="bg-gray-200 rounded-full w-20 aspect-square"></div>
                    </div>
                    <div>
                        <div className="my-2 mb-3">
                            <div className="bg-gray-200 rounded-lg w-20 h-6"></div>
                        </div>
                        <div className="mb-8">
                            <div className="bg-gray-200 rounded-lg w-20 h-5"></div>
                        </div>
                            <div className="bg-gray-200 rounded-full w-16 h-6"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}