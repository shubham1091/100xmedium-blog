import { Link, useNavigate } from "react-router-dom";
import Avatar from "./Avatar";
import Button from "./Button";
import { ToastContainer, toast } from "react-toastify";

function Appbar() {
    const navigate = useNavigate();
    const token = localStorage.getItem("session");
    const name = localStorage.getItem("name") || "anonymous";
    const logout = () => {
        localStorage.clear();
        toast.success("logout successfully!", {
            position: "top-center",
        });
        setTimeout(() => {
            navigate("/");
        }, 1000);
    };
    const login = () => {
        navigate("/signup");
    };

    return (
        <div className=" w-[100%] flex  justify-center border-black   border-b-[0.5px] ">
            <ToastContainer />
            <div className=" flex items-center   w-[100%] max-w-[75rem] h-[4rem] py-4  justify-between px-5 lg:px-9">
                <Link
                    to={token ? "/blogs" : "/"}
                    className=" font-bold text-xl"
                >
                    Medium
                </Link>

                <div className=" space-x-2  flex   justify-center items-center">
                    <Button
                        onPress={token ? logout : login}
                        value={token ? "Logout" : "Sign Up"}
                    />

                    {token && (
                        <div className="space-x-2  flex  justify-center items-center ">
                            {/* <Link
                                to={"/publish"}
                                className=" border-none px-2 rounded-xl text-[12px] bg-green-400 hover:bg-green-500 text-white font-medium py-[3px] "
                            >
                                {" "}
                                Publish{" "}
                            </Link> */}
                            <Button onPress={()=>{navigate("/publish")}} value="Publish"/>
                            <Avatar name={name} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Appbar;
