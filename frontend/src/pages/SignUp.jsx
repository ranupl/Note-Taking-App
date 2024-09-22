import React, { useState, useEffect } from "react";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { firebaseAuth } from "../utils/firebase.config";
import { onAuthStateChanged } from "firebase/auth";
import { Create_with_Email_Password } from "../utils/firebase.service";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setCredentials } from "../redux/slice/auth/auth.slice";
import { useNavigate } from "react-router-dom";

const SignPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, async (user) => {
      if (user) {
        setCurrentUser(user);
        dispatch(setCredentials({ token, email: user.email, userid }));
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    try {
      await Create_with_Email_Password(email, password);
      const user = firebaseAuth.currentUser; // Get the current user after sign-up
      const token = await user.getIdToken();
      const userid = user.uid;

      // Store in local storage
      localStorage.setItem('token', token);
      localStorage.setItem('userid', userid);
      localStorage.setItem('email', user.email);

      setCurrentUser(user);
      
      dispatch(setCredentials({ token, email: user.email, userid }));

      toast.success("SignUp successful");
      navigate("/");
    } catch (error) {
      console.error("SignUp failed:", error.message);
      toast.error("SignUp Failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-2xl w-96">
        <h2 className="font-semibold mb-6 text-center">Sign Up</h2>
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
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SignPage;
