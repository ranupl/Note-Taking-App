import React, { useEffect, useState } from 'react';
import { InputForm } from '../component/InputForm';
import CardComponent from '../component/Card';

const Home = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('isDarkMode');
    if (savedTheme) {
      setIsDarkMode(JSON.parse(savedTheme));
    }
  }, []);

  return (
    <div className={`flex flex-col sm:flex-row w-full ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
      <div className={`bg-white p-6 rounded-lg shadow-2xl w-96 h-70 mt-20 ml-4 ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`}>
        <h2 className="font-semibold mb-6 text-center">Add Note</h2>
        <InputForm />
      </div>

      <div className="block mt-20">
        <h1 className="font-semibold mb-6 text-center">All Notes</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mt-10 ml-5 mr-5">
          {Array.from({ length: 12 }).map((_, index) => (
            <CardComponent key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
