import React, { useState, useRef } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { FloatingInput } from "../Form";
import { AiFillMail, AiFillLock } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import Link from "next/link";
const FormContainer = ({ children }: { children: React.ReactNode }) => (
  <div className="relative m-auto w-1/2 before:bg-opacity-10 before:rounded-md before:transform before:-rotate-6  before:absolute before:bg-white before:inset-0">
    <div className="relative w-full p-5 text-black bg-white border  border-black rounded-md bg-opacity-30 ">{children}</div>
  </div>
);

const FormItem = ({ children }: { children: React.ReactNode }) => <div className="relative w-1/2 m-auto mb-3">{children}</div>;

const FormIcon = ({ children }: { children: React.ReactNode }) => (
  <span className="absolute opacity-40 top-4 left-7 text-lg">{children}</span>
);

const FormButton = ({ children }: { children: React.ReactNode }) => (
  <FormItem>
    <button className="bg-slate-800  w-full text-white py-3 px-6  rounded-3xl">{children}</button>
  </FormItem>
);

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
      <form className="w-full text-center" onSubmit={submitHandler}>
        <Image src="/images/TCF-logo-nbg.png" priority={true} width={180} height={80} alt="logo" />
        <h1 className="text-white font-semibold text-2xl m-auto md:p-2 font-cycle tracking-wider">Login</h1>
        <FormItem>
          <FormIcon>
            <AiFillMail />
          </FormIcon>
          <input
            required
            className="text-black  w-full rounded-3xl py-3 px-6 pl-14 bg-opacity-40 bg-white focus:bg-white focus:outline-none placeholder:text-black"
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </FormItem>
        <FormItem>
          <FormIcon>
            <AiFillLock />
          </FormIcon>
          <input
            required
            className="text-black w-full rounded-3xl py-3 px-6 pl-14 bg-opacity-40 bg-white focus:bg-white focus:outline-none placeholder:text-black"
            id="password"
            type="password"
            placeholder="****"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </FormItem>
        <FormButton>Login</FormButton>
        <div>
          Don't have an account yet?{" "}
          <Link href="/signup">
            <a className="text-blue-800 underline">Create a free account</a>
          </Link>
          .
        </div>
      </form>
    </FormContainer>
  );
};

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
      <form className="w-full text-center" onSubmit={submitHandler}>
        <Image src="/images/TCF-logo-nbg.png" priority={true} width={180} height={80} alt="logo" />
        <h1 className="text-white font-semibold text-2xl m-auto md:p-2 font-cycle tracking-wider">Registration</h1>
        <FormItem>
          <FormIcon>
            <AiFillMail />
          </FormIcon>
          <input
            required
            className="text-black  w-full rounded-3xl py-3 px-6 pl-14 bg-opacity-40 bg-white focus:bg-white focus:outline-none placeholder:text-black"
            placeholder="Email"
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </FormItem>
        <FormItem>
          <FormIcon>
            <BsFillPersonFill />
          </FormIcon>
          <input
            type="text"
            id="name"
            className="text-black  w-full rounded-3xl py-3 px-6 pl-14 bg-opacity-40 bg-white focus:bg-white focus:outline-none placeholder:text-black"
            placeholder="John Doe"
            ref={name}
          />
        </FormItem>
        <FormItem>
          <FormIcon>
            <AiFillLock />
          </FormIcon>
          <input
            required
            className="text-black  w-full rounded-3xl py-3 px-6 pl-14 bg-opacity-40 bg-white focus:bg-white focus:outline-none placeholder:text-black"
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </FormItem>
        <FormItem>
          <FormIcon>
            <AiFillLock />
          </FormIcon>
          <input
            required
            className="text-black  w-full rounded-3xl py-3 px-6 pl-14 bg-opacity-40 bg-white focus:bg-white focus:outline-none placeholder:text-black"
            type="password"
            id="confirmPassword"
            placeholder="Confirm Password"
            ref={confirmPassword}
          />
        </FormItem>
        <FormButton>Sign Up</FormButton>
        <div>
          Already have an account?{" "}
          <Link href="/login">
            <a className="text-blue-800 underline">Sign In</a>
          </Link>
          .
        </div>
      </form>
    </FormContainer>
  );
};
