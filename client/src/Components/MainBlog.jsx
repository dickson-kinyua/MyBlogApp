export const MainBlog = () => {
    return (
        <div className="grid grid-cols-2 gap-6 h-60 mt-10">
            <div className="h-60 w-full">
                <img src="mern.avif" alt="mern image" className="h-full w-full" />
            </div>
            <div className="flex flex-col justify-between">
                <p>
                    {new Date().toLocaleDateString()}
                </p>
                <p className="text-3xl font-semibold">
                    Build an app with Node as the back-end technology, and specifically Express as the server-side framework, with MongoDB as the database, and using React for the front end
                </p>
                <p>
                    A complete guide by Dickson
                </p>
            </div>
        </div>
    );
}