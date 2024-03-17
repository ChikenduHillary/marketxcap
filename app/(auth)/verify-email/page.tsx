"use client";

import { FunctionComponent, useState } from "react";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useSignUpMutation, useVerifyEmailMutation } from "@/api/authApi";
import { useAppSelector } from "@/redux/hooks";
import { selectAuth } from "@/redux/features/authSlice";

interface PageProps {}

const Page: FunctionComponent<PageProps> = () => {
  const [verifyEmail] = useVerifyEmailMutation();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { signInUser } = useAppSelector(selectAuth);

  type Inputs = {
    code1: string;
    code2: string;
    code3: string;
    code4: string;
    code5: string;
    code6: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (userData) => {
    const codes = Object.values(userData).join("");
    try {
      setLoading(true);
      const result = await verifyEmail({ otp: codes, email: signInUser.email });
      const { error, data }: any = result;

      if (error) {
        toast.error(error.data.message);
        return;
      }

      if (data) {
        toast.success(data.message);
        router.push("/sign-in");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="p-5 md:p-10">
      <div className="border-[1px] border-slate-500 rounded-3xl p-16 max-w-[30em] w-[90%] mx-auto">
        <div className="">
          <p className="text-2xl font-bold">Verify Email</p>
          <p className="text-sm text-slate-500">
            Please enter the code we sent to your email
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-20 max-w-[40em] space-y-5"
        >
          <div className="text-sm flex items-center justify-between flex-wrap mx-auto py-2">
            <input
              type="text"
              {...register("code1", { required: true })}
              className="outline-none border-gray border-[1px] h-10 text-center w-10 rounded-xl"
              maxLength={1}
            />
            <input
              type="text"
              {...register("code2", { required: true })}
              className="outline-none border-gray border-[1px] h-10 text-center w-10 rounded-xl"
              maxLength={1}
            />
            <input
              type="text"
              {...register("code3", { required: true })}
              className="outline-none border-gray border-[1px] h-10 text-center w-10 rounded-xl"
              maxLength={1}
            />
            <input
              type="text"
              {...register("code4", { required: true })}
              className="outline-none border-gray border-[1px] h-10 text-center w-10 rounded-xl"
              maxLength={1}
            />
            <input
              type="text"
              {...register("code5", { required: true })}
              className="outline-none border-gray border-[1px] h-10 text-center w-10 rounded-xl"
              maxLength={1}
            />
            <input
              type="text"
              {...register("code6", { required: true })}
              className="outline-none border-gray border-[1px] h-10 text-center w-10 rounded-xl"
              maxLength={1}
            />
          </div>

          <div className="w-full flex items-center justify-center">
            <button className="text-white font-semibold shadow-xl mt-7 bg-[#559B32] p-4 w-[20em] rounded-full">
              {loading ? "Verifying Email..." : "Verify Email"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Page;
