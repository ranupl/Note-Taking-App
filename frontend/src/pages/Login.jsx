import React, { useState, useEffect } from 'react';
import { Button, Checkbox, Label, TextInput } from 'flowbite-react';  
import { firebaseAuth } from '../utils/firebase.config';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { Login_with_Email_Password } from '../utils/firebase.service';
import { toast } from 'react-toastify';
import { setCredentials } from '../redux/slice/auth/auth.slice'; 

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currentUser, setCurrentUser] = useState(null); 
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      setCurrentUser(user); 
    });
    return () => unsubscribe(); 
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Sign out any currently logged-in user
      await firebaseAuth.signOut();
  
      // Login the new user
      await Login_with_Email_Password(email, password);
      const user = firebaseAuth.currentUser; // Get the current user directly from firebaseAuth
      const token = await user.getIdToken(); // Retrieve the token correctly
      const userid = user.uid;
  
      // Store in local storage
      localStorage.setItem('token', token);
      localStorage.setItem('userid', userid);
      localStorage.setItem('email', user.email);
  
      setCurrentUser(user);
     
      dispatch(setCredentials({ token, email: user.email, userid }));
  
      toast.success('Login Successful');
      navigate('/');
    } catch (error) {
      toast.error("Invalid Credentials");
      console.error('Login Error:', error);
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-2xl w-96">
        <h2 className="font-semibold mb-6 text-center">Login</h2>
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
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
