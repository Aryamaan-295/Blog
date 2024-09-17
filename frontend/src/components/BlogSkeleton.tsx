export default function BlogSkeleton() {
    return (
        <div role="status" className="w-screen animate-pulse">
            <div className="grid grid-cols-12 px-16 pt-14 w-full">
                <div className="col-start-1 col-end-9">
                    <div className="mb-2">
                        <div className="bg-gray-200 rounded-lg w-2/3 h-10"></div>
                    </div>
                    <div className="mb-4 ml-3">
                        <div className="bg-gray-200 rounded-lg w-20 h-5"></div>
                    </div>
                    <div className="px-2 mt-5">
                        <div className="h-5 bg-gray-200 rounded-full mb-5 w-2/3"></div>
                        <div className="h-5 bg-gray-200 rounded-full mb-5 w-2/3"></div>
                        <div className="h-5 bg-gray-200 rounded-full mb-5 w-2/3"></div>
                        <div className="h-5 bg-gray-200 rounded-full mb-5 w-2/3"></div>
                    </div>
                </div>
                <div className="col-start-9 col-end-13 px-10 border-l border-gray-400">
                    <div className="relative top-20 border rounded-lg p-4">
                        <div className="font-bold text-md text-gray-500 mb-2">
                            Author
                        </div>
                        <div className="flex">
                            <div className="flex justify-center items-center w-fit">
                                <div className="w-8 aspect-square bg-gray-200 rounded-full "></div>
                            </div>
                            <div className="pl-4 flex-1">
                                <div className="my-2">
                                    <div className="bg-gray-200 rounded-full w-8 h-4"></div>
                                </div>
                                <div className="mt-3">
                                    <div className="h-2 bg-gray-200 rounded-full mb-4 w-1/3"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}