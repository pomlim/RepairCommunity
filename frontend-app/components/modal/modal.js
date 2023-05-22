import React, { useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import StarRating from '@/components/review/StarRating';
import TextInput from '@/components/review/TextInput';
import TagReviews from '@/components/review/TagReviews';

import ReviewService from '@/services/review';
import { useRouter } from 'next/router';

const Modal = ({ shopId, reviewTags, setModal }) => {
  const router = useRouter();

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [username, setName] = useState('');

  const [checkedReviewTags, setCsheckedReviewTags] = useState(
    reviewTags.map((tag) => {
      return { ...tag, selected: false };
    })
  );

  const [createObjectURLs, setCreateObjectURLs] = useState([]);
  const [uploadedFileNames, setUploadedFileNames] = useState([]);

  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const fileName = event.target.files[0].name.split('.')[0];

      setUploadedFileNames([...uploadedFileNames, fileName]);
      setCreateObjectURLs([
        ...createObjectURLs,
        URL.createObjectURL(event.target.files[0])
      ]);
    }
  };

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

    router.reload(window.location.pathname);
  };

  const onSubmit = async () => {
    const fileId = [];
    if (createObjectURLs.length > 0) {
      const myBlobs = await Promise.all(
        createObjectURLs.map(async (createObjectURL) => {
          const myImage = await fetch(createObjectURL);
          return await myImage.blob();
        })
      );

      const formData = new FormData();
      myBlobs.forEach((myBlob, index) => {
        formData.append('files', myBlob, uploadedFileNames[index]);
      });

      formData.append('ref', 'api::review.review');
      formData.append('field', 'images');
      const data = await ReviewService.UploadImageFiles(formData);
      fileId = data.map((d) => d.id);
    }

    const result = await ReviewService.CreateReview({
      data: {
        images: fileId,
        shop: shopId,
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
                      {/* Upload images */}
                      <div>
                        <div>
                          {createObjectURLs.map((createObjectURL, index) => {
                            return (
                              <Image
                                key={index}
                                loader={() => createObjectURL}
                                src={uploadedFileNames[index]}
                                alt="Picture of the author"
                                width={100}
                                height={100}
                              />
                            );
                          })}
                          <h4>Select Image</h4>
                          <input
                            type="file"
                            name="myImage"
                            onChange={uploadToClient}
                          />
                        </div>
                      </div>
                      {/* Upload images */}
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
    </>
  );
};

export default Modal;
