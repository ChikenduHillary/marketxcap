import { RootState } from "@/redux/store";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
const X_CLIENT_ID = JSON.stringify(process.env.X_CLIENT_ID);
const X_CLIENT_SECRET = JSON.stringify(process.env.X_CLIENT_SECRET);

console.log(X_CLIENT_ID);
console.log("hey", X_CLIENT_SECRET);

interface LoginResponse {
  name: string;
  token: string;
}

interface codeRequest {
  otp: string;
  email: string;
}

interface LoginRequest {
  username: string;
  password: string;
}

interface SignUpRequest {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://marketxcap.vercel.app/",
    prepareHeaders: (headers, { getState }) => {
      // const token = (getState() as RootState).auth?.logInUser?.Token;
      // if (token) {
      //   headers.set("authorization", `Bearer ${token}`);
      // }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    signIn: builder.mutation<any, LoginRequest>({
      query: (body) => ({
        url: "/accounts/oauth/token/",
        method: "POST",
        body: {
          ...body,
          client_id: "A3iHTdG5s1u1Pl1oh8PgRtX2YO31oreikBACLhy2",
          client_secret:
            "RW9ZaMgrrWZsYROb1wQ4BptH7S4VdaXBFPYKiwVNNTx11xAmSUhgjtb6A3kHNthS3bz5gaj9eeYr65idOs3mSwIc5csXGr1O0nvyEdOA0HpzZVOrTkl7L15qoKtgX5tb",
          grant_type: "password",
        },
      }),
    }),
    signUp: builder.mutation<any, SignUpRequest>({
      query: (body) => ({
        url: "/accounts/register/",
        method: "POST",
        body,
      }),
    }),
    verifyEmail: builder.mutation<any, codeRequest>({
      query: (body) => ({
        url: "/accounts/verify-email",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useSignInMutation, useSignUpMutation, useVerifyEmailMutation } =
  authApi;

export const fetchData = async (url: string) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.log("Error fetching data:", error);
    return error;
  }
};
