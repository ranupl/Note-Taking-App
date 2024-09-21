"use client";
import React, { useState } from "react";
import {
  Button,
  Checkbox,
  Label,
  TextInput,
} from "flowbite-react";
import { firebaseAuth } from "../utils/firebase.config";
import { onAuthStateChanged } from "firebase/auth";
import { Create_with_Email_Password } from "../utils/firebase.service";
import { toast } from 'react-toastify';


const SignPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) {
      console.log(currentUser, "current user");
    }
  });

  const handleSignUp = (e) => {
    e.preventDefault();
    Create_with_Email_Password(email, password);
    toast.success("SignUp successfull")

  };

  return (
<div className="flex items-center justify-center min-h-screen">
  <div className="bg-white p-6 rounded-lg shadow-2xl w-96">
  <h2 className="font-semibold mb-6 text-center">SignUp</h2>
  <form className="flex max-w-md flex-col gap-4" onSubmit={handleSignUp}>
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
        Submit
        {/* {loading ? "Submitting..." : "Submit"} */}
      </Button>
      {/* {error && <p className="text-red-500">{error}</p>} */}
    </form>
  </div>
</div>
  
  )
}

export default SignPage;