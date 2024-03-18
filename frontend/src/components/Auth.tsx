import { SigninInput, SignupInput } from "@shubham1091/medium-blog-common";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BackendUrl } from "../config";
import LabelInput from "./LabelInput";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Auth = ({ type }: { type: "signup" | "signin" }) => {
    const [signup, setSignup] = useState<SignupInput>({
        name: "",
        password: "",
        email: "",
    });

    const [signin, setSignin] = useState<SigninInput>({
        email: "",
        password: "",
    });
    const navigate = useNavigate();

    const handleSubmit = async () => {
        // console.log("signup:  ", signup);
        // console.log("signin:  ", signin);

        try {
            const { data, status } = await axios.post(
                `${BackendUrl}/api/v1/user/${
                    type === "signup" ? "signup" : "signin"
                }`,
                type === "signup" ? signup : signin
            );

            if (status !== 200) {
                throw new Error(data.error);
            }

            const { token, name } = data;
            localStorage.setItem("session", `Bearer ${token}`);
            localStorage.setItem("name", name);
            toast.success(
                `${type === "signup" ? "Signed up" : "Signed in"} successfully!`
            );
            setTimeout(() => {
                navigate("/blogs");
            }, 1000); //
        } catch (error) {
            console.error(error);
            toast.error(
                `Error ${
                    type === "signup" ? "signing up" : "signing in"
                }. Please try again.`
            );
        }
    };
    return (
        <div className="h-screen flex flex-col justify-center">
            <ToastContainer />
            <div className="flex flex-col justify-center items-center">
                <div className="text-3xl font-extrabold">
                    {type === "signup"
                        ? "Create an account"
                        : "Sign in to account"}
                </div>
                <div className="text-slate-400 mb-2 ">
                    {type === "signin"
                        ? "Don't have an account?"
                        : "Already have an account?"}{" "}
                    <span
                        onClick={() =>
                            navigate(type === "signin" ? "/signup" : "/signin")
                        }
                        className="text-blue-500 cursor-pointer hover:underline"
                    >
                        {type === "signin" ? "Sign up" : "Sign in"}
                    </span>
                </div>
                {type === "signup" && (
                    <LabelInput
                        label="Name"
                        placeholder="Enter your name"
                        type="text"
                        value={signup.name}
                        onChange={(e) =>
                            setSignup((prevState) => ({
                                ...prevState,
                                name: e.target.value,
                            }))
                        }
                    />
                )}
                <LabelInput
                    label="Email"
                    placeholder="example@example.com"
                    type="email"
                    value={type === "signup" ? signup.email : signin.email}
                    onChange={(e) =>
                        type === "signup"
                            ? setSignup((prevState) => ({
                                  ...prevState,
                                  email: e.target.value,
                              }))
                            : setSignin((prevState) => ({
                                  ...prevState,
                                  email: e.target.value,
                              }))
                    }
                />
                <LabelInput
                    label="Password"
                    placeholder="***********"
                    type="password"
                    value={
                        type === "signup" ? signup.password : signin.password
                    }
                    onChange={(e) =>
                        type === "signup"
                            ? setSignup((prevState) => ({
                                  ...prevState,
                                  password: e.target.value,
                              }))
                            : setSignin((prevState) => ({
                                  ...prevState,
                                  password: e.target.value,
                              }))
                    }
                />
                <button
                    className="border bg-black mt-5 border-gray-300 text-white text-md rounded-lg block w-[18rem] p-2.5 "
                    onClick={handleSubmit}
                >
                    {type}
                </button>
            </div>
        </div>
    );
};

export default Auth;
