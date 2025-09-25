
import React from 'react';

interface HeaderProps {
    onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Header: React.FC<HeaderProps> = ({ onFileChange }) => {
  return (
    <header className="bg-gray-800 text-white p-4 shadow-md flex items-center justify-between">
      <div className="flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-3 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2-10.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5-1.5.67-1.5 1.5.67 1.5 1.5 1.5zm4 0c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5-1.5.67-1.5 1.5.67 1.5 1.5 1.5zm-4 6c1.02 0 1.94-.53 2.5-1.34.56.81 1.48 1.34 2.5 1.34 2.21 0 4-2.24 4-5H8c0 2.76 1.79 5 4 5z" opacity=".3"/>
            <path d="M12 4c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8 8-3.59-8-8-8zm0 16c-3.31 0-6-2.69-6-6h12c0 3.31-2.69 6-6 6zm-3.5-7.5c-.83 0-1.5-.67-1.5-1.5S7.67 9.5 8.5 9.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm7 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
        </svg>
        <h1 className="text-2xl font-bold tracking-wider">VisionLab</h1>
      </div>
      <div>
        <label className="px-4 py-2 bg-blue-600 text-white rounded-md cursor-pointer hover:bg-blue-700 transition-colors text-sm font-medium">
            Change Media
            <input type="file" accept="image/*,video/*" className="hidden" onChange={onFileChange} />
        </label>
      </div>
    </header>
  );
};

export default Header;
