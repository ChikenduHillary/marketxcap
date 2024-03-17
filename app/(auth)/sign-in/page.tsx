"use client";

import { FunctionComponent, useState } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { IoLockOpenOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useSignInMutation } from "@/api/authApi";
import Link from "next/link";

interface PageProps {}

const Page: FunctionComponent<PageProps> = () => {
  const [signIn] = useSignInMutation();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  type Inputs = {
    username: string;
    password: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (userData) => {
    console.log("working");
    const { username, password } = userData;
    try {
      setLoading(true);
      const result = await signIn({
        username,
        password,
      });
      console.log(result);
      router.push("/market");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="p-10">
      <div className="border-[1px] border-slate-500 rounded-3xl p-16 w-[90%] max-w-[30em] mx-auto">
        <div className="">
          <p className="text-2xl font-bold">Sign In</p>
          <p className="text-sm text-slate-500">
            If you dont have an account register
            <br />
            You can{" "}
            <Link href="/sign-up">
              <span className="text-green font-semibold">Register here !</span>
            </Link>
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-20 max-w-[40em] space-y-5"
        >
          <div className="text-sm border-b-[1px] border-slate-400 py-2">
            <p className="mb-2">User Name</p>
            <div className="flex items-center space-x-2">
              <HiOutlineMail />
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

          <div className="w-full flex items-center justify-center">
            <button className="text-white font-semibold shadow-xl mt-7 bg-[#559B32] p-4 w-[20em] rounded-full">
              {loading ? "Logging In..." : "Log In"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Page;
