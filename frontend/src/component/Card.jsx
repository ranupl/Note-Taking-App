"use client";
import React, { useState, useEffect } from "react";
import { Card } from "flowbite-react";
import trash from "../assets/trash.svg";
import edit from "../assets/edit.svg";
import share from "../assets/share.svg";
import { useDispatch, useSelector } from "react-redux";
import { deleteNote } from "../redux/slice/note/delete.note.slice";
import { fetchNotes } from "../redux/slice/note/list.note.slice";
import { getSingleNote } from "../redux/slice/note/getbyId.node.slice";
import { editNote } from "../redux/slice/note/update.note.slice";
import { shareNote } from "../redux/slice/note/share.note.slice";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const CardComponent = (props) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({ title: "", description: "" });
  const [shareData, setshareData] = useState({email : "", editAccess : ""});
  const [iseditAccess, setiseditAccess] = useState("true");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(props.user, "user props")
  const email = localStorage.getItem("email");

  useEffect(() => {
    if (props.user && Array.isArray(props.user)) {
      const userEntry = props.user.find(userObj => userObj.email === email);
      if (userEntry) {
        setiseditAccess(userEntry.editAccess);
        console.log(`Edit Access for ${email}: ${userEntry.editAccess}`);
      } else {
        console.log(`No user found with email: ${email}`);
      }
    }
  }, [props.user, email]);

  // Retrieve token from local storage
  const note = useSelector((state) => state.getNoteById.data);
  const token = localStorage.getItem('token');

  // Open edit modal and fetch the single note by ID
  const openEditModal = () => {
    if (!token) {
      toast.error("Please log in to edit the note");
      navigate('/login');
      return;
    }
    setIsEditModalOpen(true);
    dispatch(getSingleNote(props.id));
  };

  // Open share modal
  const openShareModal = () => {
    if (!token) {
      toast.error("Please log in to share the note");
      navigate('/login');
      return;
    }
    setIsShareModalOpen(true);
  };

  // Handle delete
  const handleDelete = () => {
    if (!token) {
      toast.error("Please log in to delete the note");
      navigate('/login');
      return;
    }
    dispatch(deleteNote(props.id));
    toast.success("Note deleted");
    dispatch(fetchNotes());
  };

  // Populate form when note data is available
  useEffect(() => {
    if (note) {
      setEditFormData({
        title: note.title,
        description: note.description,
      });
    }
  }, [note]);

  // Close modals
  const closeEditModal = () => setIsEditModalOpen(false);
  const closeShareModal = () => setIsShareModalOpen(false);

  // Handle input changes for controlled components
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setEditFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Handle edit form submission
  const handleEditSubmit = (e) => {
    e.preventDefault();
    dispatch(editNote({ _id: props.id, formdata: editFormData }));
    dispatch(fetchNotes());
    toast.success("Note updated");
    closeEditModal();
  };

  const handleShareInputChange = (e) => {
    const { id, value } = e.target;
    setshareData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleShareSubmit = (e) => {
    console.log(props.id, shareData, "share data and id");
    e.preventDefault();
    dispatch(shareNote({ id: props.id, data: shareData }));
    setshareData({ email: "", editAccess: "" }); 
    setIsShareModalOpen(false);
    dispatch(fetchNotes());
    closeShareModal();
};

  return (
    <>
      <div className="relative max-w-sm w-full sm:max-w-full">
        <Card>
          <div className="absolute top-4 right-4 flex space-x-6">
            {iseditAccess=="true" ?
            <div className="flex"><img
              src={trash}
              className="h-4 sm:h-4 cursor-pointer px-2"
              alt="trash"
              onClick={handleDelete}
            />
            <img
              src={edit}
              className="h-4 sm:h-4 cursor-pointer px-2"
              alt="edit"
              onClick={openEditModal}
            />
            <img
              src={share}
              className="h-4 sm:h-4 cursor-pointer px-2"
              alt="share"
              onClick={openShareModal}
            />
            </div> : <span className="text-sm text-gray-500">Shared Note</span>}

          </div>

          <div className="border-t border-gray-200 mt-5"></div>

          <h5 className="mb-2 text-xl font-bold text-gray-500 dark:text-white">
            {props.title}
          </h5>

          <p className="mb-5 text-base text-gray-500 dark:text-gray-400 sm:text-sm">
            {props.description}
          </p>
        </Card>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="bg-white p-6 rounded-lg shadow-2xl max-w-md w-full relative z-50">
            <h2 className="text-xl font-semibold mb-4">Edit Note</h2>
            <form onSubmit={handleEditSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Title
                </label>
                <input
                  id="title"
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={editFormData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  rows="4"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={editFormData.description}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="mr-4 text-gray-500 hover:text-gray-700"
                  onClick={closeEditModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-yellow-500 hover:bg-yellow-700 text-white font-semibold py-2 px-4 rounded-xl"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {isShareModalOpen && (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="fixed inset-0 bg-black opacity-50"></div>
        <div className="bg-white p-6 rounded-lg shadow-2xl max-w-md w-full relative z-50">
          <h2 className="text-xl font-semibold mb-4">Share Note</h2>
          <form onSubmit={handleShareSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={shareData.email} 
                onChange={handleShareInputChange} 
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="editAccess"
                className="block text-sm font-medium text-gray-700"
              >
                Edit Access
              </label>
              <select
                id="editAccess"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={shareData.editAccess} 
                onChange={handleShareInputChange} 
                required
              >
                <option value="" disabled>Select an option</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                className="mr-4 text-gray-500 hover:text-gray-700"
                onClick={closeShareModal}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-yellow-500 hover:bg-yellow-700 text-white font-semibold py-2 px-4 rounded-xl"
              >
                Share
              </button>
            </div>
          </form>
        </div>
      </div>
    )}
    </>
  );
};

export default CardComponent;
