"use client";
import React, { useState } from "react";
import { Card } from "flowbite-react";
import trash from "../assets/trash.svg";
import edit from "../assets/edit.svg";
import share from "../assets/share.svg";

const CardComponent = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const openShareModal = () => {
    setIsShareModalOpen(true);
  };

  const closeShareModal = () => {
    setIsShareModalOpen(false);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    // Handle form submission for editing here
    closeEditModal();
  };

  const handleShareSubmit = (e) => {
    e.preventDefault();
    // Handle form submission for sharing here
    closeShareModal();
  };

  return (
    <>
      <div className="relative max-w-sm w-full sm:max-w-full">
        <Card>
          <div className="absolute top-4 right-4 flex space-x-6">
            <img
              src={trash}
              className="h-4 sm:h-4 cursor-pointer"
              alt="trash"
            />
            <img
              src={edit}
              className="h-4 sm:h-4 cursor-pointer"
              alt="edit"
              onClick={openEditModal}
            />
            <img
              src={share}
              className="h-4 sm:h-4 cursor-pointer"
              alt="share"
              onClick={openShareModal}
            />
          </div>

          <div className="border-t border-gray-200 mt-5"></div>

          <h5 className="mb-2 text-xl font-bold text-gray-500 dark:text-white">
            Work fast from anywhere
          </h5>

          <p className="mb-5 text-base text-gray-500 dark:text-gray-400 sm:text-sm">
            Stay up to date and move work forward with Flowbite on iOS & Android.
            Download the app today.
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
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  id="title"
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  id="description"
                  rows="4"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  required
                />
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
