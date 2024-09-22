"use client";
import React, { useState } from 'react';
import { Label, TextInput, Textarea, Button } from "flowbite-react"; 
import { useDispatch } from "react-redux";
import { addNote } from "../redux/slice/note/create.note.slice";
import { fetchNotes } from "../redux/slice/note/list.note.slice";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const InputForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!token) {
      toast.error("Please log in to add notes");
      navigate('/login'); 
      return;
    }

    dispatch(addNote({ title, description }));
    dispatch(fetchNotes());
    toast.success("Note added");
    setTitle('');
    setDescription('');
  };

  return (
    <div className="flex max-w-md flex-col gap-4">
      <form onSubmit={handleSubmit}>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="title" value="Title" />
          </div>
          <TextInput 
            id="title" 
            type="text" 
            sizing="sm" 
            placeholder="Title" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
          />
        </div>
        <div className="max-w-md">
          <div className="mb-2 block">
            <Label htmlFor="description" value="Description" />
          </div>
          <Textarea 
            id="description" 
            placeholder="Type here..." 
            required 
            rows={4} 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <Button color="warning" type="submit" className='mt-4'>Add</Button>
      </form>
    </div>
  );
};
