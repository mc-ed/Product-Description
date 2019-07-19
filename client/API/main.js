import axios from "axios";


const API = {
  getAllProductDataByID: (id, type, reviewIndex) => {
    reviewIndex = reviewIndex || 0;
    return axios.get(
      `${process.env.HOST}/api/product/${id}?type=${type}&review=${reviewIndex}`,
      { withCredentials: true }
    );
  },

  updateFeedbackForReviewsAndQuestions: (
    productID,
    feedbackID,
    selection,
    category
  ) => {
    return axios.get(
      `${process.env.HOST}/api/helpful/${productID}?id=${feedbackID}&selection=${selection}&category=${category}`,
      { withCredentials: true }
    );
  },

  submitReview : (review, product_id) => {
    return axios.post(`${process.env.HOST}/api/review`, {...review, product_id }, {withCredentials: true})
  }
};

export default API;
