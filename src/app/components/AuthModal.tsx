"use client";
import * as React from "react";
import { useForm } from "react-hook-form";
import { useCookies } from "react-cookie";
import { createUser, loginUser } from "../API";

const AuthModal = (props: any) => {
  let ErrorMessage: string;
  let Password: string;
  let ConfirmPassword: string;
  let CookieName: string;
  CookieName = "user";

  const [password, setPassword] = React.useState<typeof Password | null>(null);
  const [confirmPassword, setConfirmPassword] = React.useState<
    typeof ConfirmPassword | null
  >(null);
  const [error, setError] = React.useState<typeof ErrorMessage | null>(null);
  // eslint-disable-next-line no-unused-vars
  const [cookies, setCookie, removeCookie] = useCookies([CookieName]);

  const { register, handleSubmit } = useForm();

  const handleClick = () => {
    props.setShowAuthModal(false);
  };

  const onSubmit = async (data: any) => {
    try {
      if (props.isSignUp && password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }

      if (props.isSignUp) {
        const created = await createUser(data);

        console.log("From Authmodal:", created);

        setCookie("token", created.token);

        props.setIsSignUp(false);
        props.setShowAuthModal(false);
        window.location.reload();
      }

      if (!props.isSignUp) {
        const loggedIn = await loginUser(data);

        setCookie("token", loggedIn.token);

        props.setShowAuthModal(false);
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="auth-modal">
      <div className="close-icon" onClick={handleClick}>
        ✖
      </div>
      <h2>{props.isSignUp ? "Create Account" : "Please Log In"}</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="entry-form">
        {props.isSignUp && (
          <>
            <label htmlFor="username">Username</label>
            <input {...register("username")} required />
          </>
        )}

        <label htmlFor="email">Email</label>
        <input type="email" {...register("email")} required />

        <label htmlFor="password">Password</label>
        <input
          {...register("password")}
          type="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />

        {props.isSignUp && (
          <>
            <label htmlFor="password-check">Confirm Password</label>
            <input
              type="password"
              id="password-check"
              name="password-check"
              placeholder="Confirm Password"
              required={true}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </>
        )}

        <button>{props.isSignUp ? "Create Account" : "Log in"}</button>
        {error ? <h3 className="error">{error}</h3> : null}
      </form>
    </div>
  );
};

export default AuthModal;
