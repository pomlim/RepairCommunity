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
    if (checked == false) {
      checked = true;
    } else {
      checked = false;
    }
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
        className="relative z-10 w-full"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="fixed inset-0 transition-opacity bg-opacity-75 backdrop-blur-lg"></div>
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-end justify-center min-h-full">
            <div className="relative overflow-hidden text-left bg-butter-default rounded-t-[24px] shadow-md w-full">
              <div className="flex items-start px-5 pt-8">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 px-3 sm:mt-0 sm:ml-4 sm:text-left">
                    <div>
                      <h3
                        className="font-medium leading-6 font-kanit text-brown-mid text-xs"
                        id="modal-title"
                      >
                        ให้คะแนนและรีวิวร้านนี้
                      </h3>
                      <div className="divide-y card divide-dashed">
                        <div className="mt-2 pb-4 text-brown-default font-kanit text-base font-medium">
                          ความพึงพอใจในการซ่อมครั้งนี้
                          <StarRating rating={rating} setRating={setRating} />
                          <TagReviews
                            reviewTags={checkedReviewTags}
                            handleTagClicked={handleTagClicked}
                          />
                        </div>
                        <div className="pt-5 text-brown-mid font-medium font-kanit">
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
                        </div>
                      </div>
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
                          <div className="font-kanit pb-3 text-brown-mid font-medium text-xs">
                            เพิ่มรูป
                          </div>
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
              <div className="flex justify-center w-full px-3 pt-4 pb-8">
                <button
                  type="button"
                  onClick={onSubmit}
                  className="w-80 h-12 text-base font-normal rounded-full btn btn-primary bg-green-default text-brown-default font-kanit"
                >
                  บันทึก
                </button>
                {/* <button
                  type="button"
                  onClick={onCancel}
                  className="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
