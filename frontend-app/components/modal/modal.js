import React, { useState } from 'react';
import axios from 'axios';
import StarRating from '@/components/review/StarRating';
import TextInput from '@/components/review/TextInput';
import TagReviews from '@/components/review/TagReviews';

const Modal = ({ shopId, reviewTags }) => {
  const [modal, setModal] = useState(false);

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [username, setName] = useState('');

  const [checkedReviewTags, setCsheckedReviewTags] = useState(
    reviewTags.map((tag) => {
      return { ...tag, selected: false };
    })
  );

  const handleTagClicked = (tagId, checked) => {
    const updated = checkedReviewTags.map((tag) => {
      if (tagId === tag.id) {
        return { ...tag, selected: checked };
      }
      return { ...tag };
    });
    setCsheckedReviewTags(updated);
  };

  const onReview = () => {
    setModal(true);
  };

  const resetState = () => {
    setRating(0);
    setReview('');
    setName('');

    const resetTags = reviewTags.map((tag) => {
      return { ...tag, selected: false };
    });
    setCsheckedReviewTags(resetTags);
  };

  const onSubmit = async () => {
    const result = await axios.post('http://localhost:1337/api/reviews', {
      data: {
        shopId,
        review,
        username,
        score: rating,
        tags: checkedReviewTags
          .filter((tag) => tag.selected)
          .map((tag) => tag.id)
      }
    });
    setModal(false);
    resetState();
  };

  const onCancel = () => {
    setModal(false);
    resetState();
  };

  return (
    <>
      <button onClick={onReview} className="btn-modal">
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
                        ให้คะแนนและรีวิวร้านนี้
                      </h3>
                      <div className="mt-2">
                        <form action="send-data" method="post">
                          ความพึงพอใจในการซ่อมครั้งนี้
                          <StarRating rating={rating} setRating={setRating} />
                          <TagReviews
                            reviewTags={checkedReviewTags}
                            handleTagClicked={handleTagClicked}
                          />
                          <TextInput
                            title="ให้คะแนนและรีวิวร้านนี้"
                            placeholder="เขียนรีวิวให้ร้านนี้"
                            review={review}
                            setReview={setReview}
                          />
                          <TextInput
                            title="ใส่ชื่อของคุณ"
                            placeholder="ใส่ชื่อของคุณ"
                            review={username}
                            setReview={setName}
                          />
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    onClick={onSubmit}
                    className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Summit
                  </button>
                  <button
                    type="button"
                    onClick={onCancel}
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
