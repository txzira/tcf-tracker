import React, { useState, useRef } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

const FormContainer = ({ children }: { children: React.ReactNode }) => (
  <div className="absolute top-1/2 bg-white border border-black rounded-md ">{children}</div>
);

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const name = useRef<HTMLInputElement>(null);
  const confirmPassword = useRef<HTMLInputElement>(null);
  const [isLogin, setIsLogin] = useState(true);

  const router = useRouter();

  const SignInInput = () => (
    <>
      <div className="flex flex-col">
        <label htmlFor="email">Your Email</label>
        <input required type="email" id="email" value={email} onChange={(event) => setEmail(event.target.value)} />
      </div>
      <div className="">
        <label htmlFor="password">Your Password</label>
        <input required type="password" id="password" value={password} onChange={(event) => setPassword(event.target.value)} />
      </div>
    </>
  );
  const SignUpInput = () => (
    <>
      <div className="flex flex-col">
        <label htmlFor="email">Your Email</label>
        <input required type="email" id="email" value={email} onChange={(event) => setEmail(event.target.value)} />
      </div>
      <div className="flex flex-col">
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={name} />
      </div>
      <div className="">
        <label htmlFor="password">Your Password</label>
        <input required type="password" id="password" value={password} onChange={(event) => setPassword(event.target.value)} />
      </div>
    </>
  );

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isLogin) {
      const signInReply = await signIn("credentials", {
        redirect: false,
        email: email,
        password: password,
      });
      if (!signInReply?.error) {
        router.replace("/");
      }
    } else {
      await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
    }
  };

  return (
    <FormContainer>
      <h1 className="text-center text-lg md:p-2">{isLogin ? "Login" : "Sign Up"}</h1>
      <form className="text-center" onSubmit={submitHandler}>
        <pre>
          {email} : {password}
        </pre>
        {isLogin ? (
          <>
            {" "}
            <div className="flex flex-col">
              <label htmlFor="email">Your Email</label>
              <input
                required
                className="text-center"
                id="email"
                type="email"
                placeholder="email@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="password">Your Password</label>
              <input
                required
                className="text-center"
                id="password"
                type="password"
                placeholder="****"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col">
              <label htmlFor="email">Your Email</label>
              <input
                required
                className="text-center"
                placeholder="email@example.com"
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="name">Your Name</label>
              <input type="text" id="name" className="text-center" placeholder="John Doe" ref={name} />
            </div>
            <div className="flex flex-col">
              <label htmlFor="password">Your Password</label>
              <input
                required
                className="text-center"
                id="password"
                type="password"
                placeholder="****"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="confirmPassword">Re-type Password</label>
              <input required type="password" id="confirmPassword" ref={confirmPassword} />
            </div>
          </>
        )}
        <div className="flex flex-col">
          <button>{isLogin ? "Login" : "Create Account"}</button>
          <button type="button" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </FormContainer>
  );
};

export default AuthForm;
