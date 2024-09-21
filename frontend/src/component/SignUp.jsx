"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../redux/action/auth.action";
import {
  Button,
  Checkbox,
  Label,
  TextInput,
} from "flowbite-react";

export const SignUp = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSignUp = (e) => {
    e.preventDefault();
    dispatch(signUp({ firstname, lastname, email, password }));
  };

  return (
    <form className="flex max-w-md flex-col gap-4" onSubmit={handleSignUp}>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="firstname" value="First Name" />
        </div>
        <TextInput
          id="firstname"
          type="text"
          placeholder="First Name"
          onChange={(e) => setFirstname(e.target.value)}
          required
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="lastname" value="Last Name" />
        </div>
        <TextInput
          id="lastname"
          type="text"
          placeholder="Last Name"
          onChange={(e) => setLastname(e.target.value)}
          required
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="email1" value="Email" />
        </div>
        <TextInput
          id="email1"
          type="email"
          placeholder="name@flowbite.com"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password1" value="Password" />
        </div>
        <TextInput
          id="password1"
          type="password"
          placeholder="********"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="remember" />
        <Label htmlFor="remember">Remember me</Label>
      </div>
      <h2 className="mb-6 text-center text-sm text-gray-600">
        Already have an account?
        <a
          href="/login"
          className="text-indigo-600 hover:text-indigo-500 font-medium"
        >
          {" "}
          Login
        </a>
      </h2>
      <Button type="submit" color="warning">
        {loading ? "Submitting..." : "Submit"}
      </Button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
};
