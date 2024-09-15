export default function BlogSkeleton() {
    return (
        <div role="status" className="w-screen animate-pulse flex flex-col justify-center items-center">
            <div className="w-max-2xl flex flex-col justify-center items-center">
                <div className="py-5 px-8 flex flex-col w-full justify-center items-center">
                    <div className="w-max-screen-2xl">
                        <div className="mb-2 flex">
                            <div className="w-6 aspect-square bg-gray-200 rounded-full "></div>
                            <span className="pl-2 flex items-center">
                                <div className="bg-gray-200 rounded-full w-8 h-4"></div>
                                <b className="text-gray-200"> • </b>
                                <div className="bg-gray-200 rounded-full w-8 h-4"></div>
                            </span>
                        </div>
                        <div className="h-6 bg-gray-200 rounded-full mb-6 w-[500px]"></div>
                        <div className="h-2 bg-gray-200 rounded-full mb-4 w-[500px]"></div>
                        <div className="h-2 bg-gray-200 rounded-full mb-4 w-[500px]"></div>
                        <div className="h-2 bg-gray-200 rounded-full mb-6 w-[500px]"></div>
                        <div className="h-4 bg-gray-200 rounded-full ml-2 w-10"></div>
                    </div>
                </div>
                <hr className="border-gray-400 w-4/5 h-[1px]" />
            </div>
        </div>
    )
} 