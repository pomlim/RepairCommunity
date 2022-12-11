import React from 'react';

const TextInput = ({ title, placeholder, review, setReview }) => {
  return (
    <label className="block">
      <span
        className="block text-sm font-medium text-slate-700"
        htmlFor="comment"
      >
        {title}
      </span>
      <input
        className="block w-full py-2 pr-3 bg-white border rounded-md shadow-sm placeholder:italic placeholder:text-slate-400 border-slate-300 pl-9 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
        placeholder={placeholder}
        type="text"
        id="comment"
        name="comment"
        value={review}
        onChange={(e) => setReview(e.target.value)}
      />
    </label>
  );
};

export default TextInput;
