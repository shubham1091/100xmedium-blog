import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { BackendUrl } from "../config";
import FullBlog from "../components/FullBlog";
import Spinner from "../components/Spinner";

interface Blog {
    title: string;
    content: string;
    id: string;
    auther: {
        name: string;
    };
}

function Blog() {
    const { id } = useParams();
    const [blog, setBlog] = useState<Blog>({
        auther: { name: "" },
        content: "",
        id: "",
        title: "",
    }); // Define initial state as undefined
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const getBlog = async () => {
        try {
            const response = await axios.get(`${BackendUrl}/api/v1/blog`, {
                headers: {
                    Authorization: localStorage.getItem("session"),
                },
                params: {
                    id: id,
                },
            });
            // console.log("getblog", response.data);
            setBlog(response.data);
            
            setLoading(false);
        } catch (error) {
            console.log(error);
            setError("Failed to fetch blog. Please try again.");
            setLoading(false); // Set loading to false even in case of error
        }
    };
    useEffect(() => {
        getBlog();
    }, [id]);

    if (loading || !blog) {
        return <Spinner />;
    }

    if (error) {
        return <div>{error}</div>; // Display error message
    }
    console.log("blog:", blog);
    return <div>{blog && <FullBlog blog={blog} />}</div>;
}

export default Blog;
