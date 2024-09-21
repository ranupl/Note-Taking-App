"use client";
import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { login } from "../redux/action/auth.action"; 
import {
    Button,
    Checkbox,
    Label,
    TextInput,
} from "flowbite-react";
import { firebaseAuth } from "./Utils/firebase.config";
import { onAuthStateChanged } from "firebase/auth";
import { Create_with_Email_Password } from "./Utils/firebase.services";

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (currentUser) {
        console.log(currentUser);
      }
    });
  
    const handleLogin = (e) => {
      e.preventDefault();
      Create_with_Email_Password(email, password);
    };
  

  return (
    <form className="flex max-w-md flex-col gap-4" onSubmit={handleLogin}>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="email1" value="Your email" />
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
          <Label htmlFor="password1" value="Your password" />
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
        Don't have an account? 
        <a href="/signUp" className="text-indigo-600 hover:text-indigo-500 font-medium"> Sign Up</a>
      </h2>
      <Button type="submit" color="warning">
        {loading ? "Submitting..." : "Submit"}
      </Button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
};

