import axios from "axios";
import { useEffect, useState } from "react";
import { BackendUrl } from "../config";
interface BlogProps {
    title: string;
    content: string;
    id: string;
    publishDate: string;
    auther: {
        name: string;
    };
}

export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<BlogProps[]>([]);

    useEffect(() => {
        const getblogs = async () => {
            try {
                const res = await axios.get(`${BackendUrl}/api/v1/blog/bulk`, {
                    headers: {
                        Authorization: localStorage.getItem("session"),
                    },
                });
                setBlog(res.data);
                console.log(res.data)

                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        getblogs();
    }, []);

    return {
        loading,
        blog,
    };
};
