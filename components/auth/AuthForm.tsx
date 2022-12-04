import React, { useState, useRef } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { FloatingInput } from "../Form";
import { AiFillMail, AiFillLock } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
const FormContainer = ({ children }: { children: React.ReactNode }) => (
  <div className="relative m-auto w-1/2 before:bg-opacity-10 before:rounded-md before:transform before:-rotate-6  before:absolute before:bg-white before:inset-0">
    <div className="relative w-full p-5 text-black bg-white border  border-black rounded-md bg-opacity-30 ">{children}</div>
  </div>
);

const FormItem = ({ children }: { children: React.ReactNode }) => <div className="flex flex-row items-center w-1/2 m-auto">{children}</div>;
export const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const signInReply = await signIn("credentials", {
      redirect: false,
      email: email,
      password: password,
    });
    if (!signInReply?.error) {
      router.replace("/");
    }
  };

  return (
    <FormContainer>
      <Image src="/images/TCF-logo-nbg.png" priority={true} width={180} height={80} alt="logo" />
      <h1 className="text-left text-lg md:p-2">Login</h1>
      <form className="w-full text-center" onSubmit={submitHandler}>
        <FormItem>
          <label htmlFor="email" className="px-2.5">
            <AiFillMail />
          </label>
          <input
            required
            className="text-center border rounded-3xl p-2 focus:bg-white focus:outline-none"
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </FormItem>
        <FormItem>
          <label htmlFor="password" className="px-2.5">
            <AiFillLock />
          </label>
          <input
            required
            className="text-center border rounded-3xl p-2 focus:bg-white focus:outline-none "
            id="password"
            type="password"
            placeholder="****"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </FormItem>
        <FormButton>Login</FormButton>
      </form>
    </FormContainer>
  );
};
const FormButton = ({ children }: { children: React.ReactNode }) => (
  <div className="m-auto py-2.5">
    <button className="bg-slate-800 text-white px-3 py-1 border border-slate-800 rounded-3xl">{children}</button>
  </div>
);

export const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const name = useRef<HTMLInputElement>(null);
  const confirmPassword = useRef<HTMLInputElement>(null);

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password === confirmPassword.current?.value) {
      await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, name: name.current?.value }),
      });
    } else {
      //error passwords do not match
    }
  };

  return (
    <FormContainer>
      <div className="flex justify-center">
        <Image src="/images/TCF-logo-nbg.png" priority={true} width={180} height={80} alt="logo" />
      </div>
      <h1 className="text-center text-lg md:p-2">Registration</h1>
      <form className="w-full text-center" onSubmit={submitHandler}>
        <FormItem>
          <label htmlFor="email" className="pr-2.5">
            <AiFillMail />
          </label>
          <input
            required
            className="text-center border rounded-3xl p-2 focus:bg-white focus:outline-none"
            placeholder="Email"
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </FormItem>
        <FormItem>
          <label htmlFor="name" className="pr-2.5">
            <BsFillPersonFill />
          </label>
          <input
            type="text"
            id="name"
            className="text-center border rounded-3xl p-2 focus:bg-white focus:outline-none"
            placeholder="John Doe"
            ref={name}
          />
        </FormItem>
        <FormItem>
          <label htmlFor="password" className="pr-2.5">
            <AiFillLock />
          </label>
          <input
            required
            className="text-center border rounded-3xl p-2 focus:bg-white focus:outline-none"
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </FormItem>
        <FormItem>
          <label htmlFor="confirmPassword" className="pr-2.5">
            <AiFillLock />
          </label>
          <input
            required
            className="text-center border rounded-3xl p-2 focus:bg-white focus:outline-none"
            type="password"
            id="confirmPassword"
            placeholder="Confirm Password"
            ref={confirmPassword}
          />
        </FormItem>
        <FormButton>Signup</FormButton>
      </form>
    </FormContainer>
  );
};
