import React, { useState } from 'react';
import axios from 'axios';
import StarRating from '@/components/StarRating';

const Modal = ({ shopId, reviewTags }) => {
  const [rating, setRating] = useState(0);
  const [modal, setModal] = useState(false);
  const [checkedState, setCheckedState] = useState(
    new Array(reviewTags.length).fill(false)
  );
  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedState(updatedCheckedState);
  };
  const toggleModal = (shopId) => {
    setModal(!modal);
  };

  const addTodo = async (shopId, username, comment, score) => {
    const result = await axios.post('http://localhost:1337/api/reviews', {
      data: {
        shopId: shopId,
        review: comment,
        username: username,
        score: score
      }
    });
    setModal(!modal);
  };

  return (
    <>
      <button onClick={toggleModal} className="btn-modal">
        Review
      </button>
      {modal && (
        <div
          className="relative z-10"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"></div>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex items-end justify-center min-h-full p-4 text-center sm:items-center sm:p-0">
              <div className="relative overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:w-full sm:max-w-lg">
                <div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3
                        className="text-lg font-medium leading-6 text-gray-900"
                        id="modal-title"
                      >
                        Add comment
                      </h3>
                      <div className="mt-2">
                        <form action="send-data" method="post">
                          <label className="block">
                            <span
                              className="block text-sm font-medium text-slate-700"
                              htmlFor="comment"
                            >
                              Comment
                            </span>
                            <input
                              className="block w-full py-2 pr-3 bg-white border rounded-md shadow-sm placeholder:italic placeholder:text-slate-400 border-slate-300 pl-9 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                              placeholder="Comment for anything..."
                              type="text"
                              id="comment"
                              name="comment"
                            />
                          </label>
                          <label className="block">
                            <span
                              className="block text-sm font-medium text-slate-700"
                              htmlFor="comment"
                            >
                              Username
                            </span>
                            <input
                              className="block w-full py-2 pr-3 bg-white border rounded-md shadow-sm placeholder:italic placeholder:text-slate-400 border-slate-300 pl-9 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                              placeholder="Type your username"
                              type="text"
                              id="username"
                              name="username"
                            />
                          </label>
                          <StarRating rating={rating} setRating={setRating} />
                          <label className="text-session" htmlFor="score">
                            score:{' '}
                          </label>{' '}
                          <input type="text" id="score" />
                          <ul className="reviewTag-list">
                            {reviewTags.map((tag, index) => {
                              return (
                                <li key={index}>
                                  <div className="toppings-list-item">
                                    <div className="left-section">
                                      <input
                                        type="checkbox"
                                        id={`custom-checkbox-${index}`}
                                        name={tag.attributes.name}
                                        value={tag.id}
                                        checked={checkedState[index]}
                                        onChange={() => handleOnChange(index)}
                                      />
                                      <label> {tag.attributes.name}</label>
                                    </div>
                                  </div>
                                </li>
                              );
                            })}
                          </ul>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    onClick={() => {
                      addTodo(
                        shopId,
                        username.value,
                        comment.value,
                        score.value
                      );
                    }}
                    className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Summit
                  </button>
                  <button
                    type="button"
                    onClick={toggleModal}
                    className="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
