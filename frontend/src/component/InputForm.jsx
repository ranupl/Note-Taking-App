"use client";
import React from 'react'
import { Label, TextInput, Textarea , Button} from "flowbite-react"; // Import Textarea

export const InputForm = () => {
  return (
    <div className="flex max-w-md flex-col gap-4">
     <form>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="title" value="Title" />
        </div>
        <TextInput id="title" type="text" sizing="sm" placeholder="Title"/>
      </div>
      <div className="max-w-md">
        <div className="mb-2 block">
          <Label htmlFor="description" value="Description" />
        </div>
        <Textarea id="description" placeholder="Type here..." required rows={4} />
      </div>
      <Button color="warning" type="submit" className='mt-4'>Add</Button>
      </form>
    </div>
  )
}
