"use client";

import { StarIcon } from '@/assets/icons';
import { useState } from 'react';
import toast from 'react-hot-toast';

const AddReviews = ({ productID, reviews, setReviews }: any) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const [state, setState] = useState({
    comment: '',
    name: '',
    email: '',
    productID,
    ratings: rating,
  });

  const handleChange = (e: any) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (state.comment === '' || state.name === '' || state.email === '') {
      toast.error('Please fill all the fields');
      return;
    }

    const data = await fetch('/api/review/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...state, ratings: rating }),
    });

    const res: any = await data.json();
    setReviews([...reviews, res.review]);
    setState({
      comment: '',
      name: '',
      email: '',
      productID: 0,
      ratings: 0,
    });
  };

  return (
    <div className="max-w-[550px] w-full">
      <form onSubmit={handleSubmit}>
        <h2 className="font-medium text-2xl text-dark mb-3.5">Add a Review</h2>

        <p className="mb-6">
          Your email address will not be published. Required fields are marked *
        </p>

        <div className="flex items-center gap-3 mb-7.5">
          <span>Your Rating*</span>

          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, index) => {
              index += 1;
              return (
                <button
                  type="button"
                  key={index}
                  onClick={() => setRating(index)}
                  onMouseEnter={() => setHover(index)}
                  onMouseLeave={() => setHover(rating)}
                >
                  <span
                    className={`cursor-pointer ${
                      index <= (hover || rating)
                        ? 'text-[#FBB040]'
                        : 'text-gray-5'
                    }`}
                  >
                    <StarIcon />
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="rounded-xl bg-white shadow-1 p-4 sm:p-6">
          <div className="mb-5">
            <label htmlFor="comment" className="block mb-2.5">
              Comment
            </label>

            <textarea
              onChange={handleChange}
              value={state.comment}
              name="comment"
              id="comment"
              rows={5}
              required
              placeholder="Your review"
              className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full p-5 outline-hidden duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
            ></textarea>

            <span className="flex items-center justify-between mt-2.5">
              <span className="text-custom-sm text-dark-4">Maximum</span>
              <span className="text-custom-sm text-dark-4">0/250</span>
            </span>
          </div>

          <div className="flex flex-col lg:flex-row gap-5 sm:gap-7.5 mb-5.5">
            <div>
              <label htmlFor="name" className="block mb-2.5">
                Name
              </label>

              <input
                onChange={handleChange}
                type="text"
                name="name"
                id="name"
                placeholder="Your name"
                required
                value={state.name}
                className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-hidden duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
              />
            </div>

            <div>
              <label htmlFor="email" className="block mb-2.5">
                Email
              </label>

              <input
                onChange={handleChange}
                type="email"
                name="email"
                id="email"
                placeholder="Your email"
                value={state.email}
                required
                className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-hidden duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
              />
            </div>
          </div>

          <button
            type="submit"
            className="inline-flex font-medium text-white bg-blue py-3 px-7 rounded-md ease-out duration-200 hover:bg-blue-dark"
          >
            Submit Reviews
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddReviews;
