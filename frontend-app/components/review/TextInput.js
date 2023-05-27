import React from 'react';

const TextInput = ({ title, placeholder, review, setReview }) => {
  return (
    <label className="block pb-3">
      <span
        className="block pb-2 text-xs font-medium text-slate-700"
        htmlFor="comment"
      >
        {title}
      </span>
      <input
        className="w-full py-2 pl-3 pr-10 text-sm font-normal border-b-2 rounded-sm placeholder-brown-light bg-butter-light drop-shadow-md border-brown-light focus:outline-none focus:border-brown-default text-brown-default font-kanit"
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
