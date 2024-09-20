"use client";
import React from 'react'
import {
    Button,
    Checkbox,
    FileInput,
    Label,
    Radio,
    RangeSlider,
    Select,
    Textarea,
    TextInput,
    ToggleSwitch,
  } from "flowbite-react";
 

export const SignUp = () => {
  return (
    <form className="flex max-w-md flex-col gap-4">
    <div>
      <div className="mb-2 block">
        <Label htmlFor="firstname" value="First Name" />
      </div>
      <TextInput id="fname" type="text" placeholder="First Name" required />
    </div>
    <div>
      <div className="mb-2 block">
        <Label htmlFor="lastname" value="Last Name" />
      </div>
      <TextInput id="lname" type="text" placeholder="Last Name" required />
    </div>        
    <div>
      <div className="mb-2 block">
        <Label htmlFor="email1" value="Your email" />
      </div>
      <TextInput id="email1" type="email" placeholder="name@flowbite.com" required />
    </div>
    <div>
      <div className="mb-2 block">
        <Label htmlFor="password1" value="Your password"/>
      </div>
      <TextInput id="password1" type="password" placeholder="********" required />
    </div>
    <div className="flex items-center gap-2">
      <Checkbox id="remember" />
      <Label htmlFor="remember">Remember me</Label>
    </div>
    <h2 className="mb-6 text-center text-sm text-gray-600">
      Already have an account? 
      <a href="/login" class="text-indigo-600 hover:text-indigo-500 font-medium">{" "}
        Login
      </a>
    </h2>
    <Button type="submit" color="warning">Submit</Button>
  </form>
  )
}
