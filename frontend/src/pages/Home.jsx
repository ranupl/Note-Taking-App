import React, { useEffect, useState } from 'react';
import { InputForm } from '../component/InputForm';
import CardComponent from '../component/Card';
import { useDispatch, useSelector } from "react-redux";
import { fetchNotes } from "../redux/slice/note/list.note.slice";

const Home = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes); 

  useEffect(() => {
    const savedTheme = localStorage.getItem('isDarkMode');
    if (savedTheme) {
      setIsDarkMode(JSON.parse(savedTheme));
    }

    dispatch(fetchNotes());
  }, [dispatch]);

  // Filter notes based on the search term
  const filteredNotes = notes.data?.filter((note) =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  console.log(filteredNotes, "filete")

  return (
    <div className={`flex flex-col sm:flex-row w-full ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} mb-5`}>
      <div className={`bg-white p-6 rounded-lg shadow-2xl w-96 h-70 mt-20 ml-4 ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`}>
        <h2 className="font-semibold mb-6 text-center">Add Note</h2>
        <InputForm />
      </div>

      <div className="block mt-20 w-full ">
        <div className="flex justify-between items-center mb-6 ml-5 mr-5">
          <h1 className="font-semibold text-center underline">All Notes</h1>
          <input
            type="text"
            placeholder="Search notes"
            className="border border-gray-300 rounded-lg px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mt-10 ml-5 mr-5">
          {filteredNotes && filteredNotes.length > 0 ? (
            filteredNotes.map((note) => (
              <CardComponent
                key={note.id} 
                user={note.user}
                title={note.title}
                description={note.description}
                id={note.id} 
              />
            ))
          ) : (
            <p>No notes available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
