import Appbar from "../components/Appbar";
import BlogCard from "../components/BlogCard";
import Spinner from "../components/Spinner";
import { useBlogs } from "../hooks/useBlog";

function Blogs() {
    const { loading, blog } = useBlogs();
    if (loading || !blog) {
        return <Spinner />;
    }
    // console.log(blog);
    return (
        <div className="w-full flex flex-col justify-center items-center">
            <Appbar />
            <div className="flex flex-col justify-center items-center w-full max-w-screen-xl  py-8 md:px-8 lg:px-16">
                {blog.map((blogItem) => (
                    <BlogCard
                        key={blogItem.id}
                        id={blogItem.id}
                        authorname={blogItem.auther.name || "Anonymous"}
                        title={blogItem.title}
                        content={blogItem.content}
                        publishedDate={
                            blogItem.publishDate ? new Date(blogItem.publishDate).toLocaleDateString():""
                        }
                    />
                ))}
            </div>
        </div>
    );
}

export default Blogs;
