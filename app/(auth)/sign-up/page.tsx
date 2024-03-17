"use client";

import { FunctionComponent, useState } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { BsPerson } from "react-icons/bs";
import { IoLockOpenOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useSignUpMutation } from "@/api/authApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setSignInUser } from "@/redux/features/authSlice";

interface PageProps {}

const Page: FunctionComponent<PageProps> = () => {
  const [signUp] = useSignUpMutation();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();

  type Inputs = {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (userData) => {
    const { password, confirmPassword } = userData;
    if (password !== confirmPassword)
      return toast.error("Passwords dont match");

    try {
      setLoading(true);
      const result = await signUp(userData);
      console.log(result);

      const { data, error }: any = result;

      if (error) {
        toast.error(error.data.email);
        return;
      }

      if (data) {
        toast.success(data.message);
        dispatch(setSignInUser(data));
        router.push("/verify-email");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="p-10">
      <div className="border-[1px] border-slate-500 rounded-3xl p-16 max-w-[30em] w-[90%] mx-auto">
        <div className="">
          <p className="text-2xl font-bold">Sign Up</p>
          <p className="text-slate-500">
            If you already have an account register
            <br />
            You can{" "}
            <Link href="/sign-in">
              <span className="text-green">Login here !</span>
            </Link>
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-20 max-w-[40em] space-y-5"
        >
          <div className="text-sm border-b-[1px] border-slate-400 py-2">
            <p className="mb-2">Email</p>
            <div className="flex items-center space-x-2">
              <HiOutlineMail />
              <input
                type="email"
                placeholder="Enter your email address"
                {...register("email", { required: true })}
                className="outline-none"
              />
            </div>
          </div>
          <div className="text-sm border-b-[1px] border-slate-400 py-2">
            <p className="mb-2 ">Username</p>
            <div className="flex items-center space-x-2">
              <BsPerson />
              <input
                type="text"
                placeholder="username"
                {...register("username", { required: true })}
                className="outline-none"
              />
            </div>
          </div>
          <div className="text-sm border-b-[1px] border-slate-400  py-2">
            <p className="mb-2 ">Password</p>
            <div className="flex items-center space-x-2">
              <IoLockOpenOutline />
              <input
                type="password"
                placeholder="password"
                {...register("password", { required: true })}
                className="outline-none"
              />
            </div>
          </div>
          <div className="text-sm border-b-[1px] border-slate-400  py-2">
            <p className="mb-2 ">Confirm Password</p>
            <div className="flex items-center space-x-2">
              <IoLockOpenOutline />
              <input
                type="password"
                placeholder="confirm your password"
                {...register("confirmPassword", { required: true })}
                className="outline-none"
              />
            </div>
          </div>

          <div className="w-full flex items-center justify-center">
            <button className="text-white font-semibold shadow-xl mt-7 bg-[#559B32] p-4 w-[20em] rounded-full">
              {loading ? "Registering..." : "Register"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Page;
