import axios from "axios";

const API = {
    getAllProductDataByID: (id, type, reviewIndex) => {
    reviewIndex = reviewIndex || 0;
    return axios.get(
      `http://ec2-18-225-6-113.us-east-2.compute.amazonaws.com/api/product/${id}?type=${type}&review=${reviewIndex}`,
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
      `http://localhost:3050/api/helpful/${productID}?id=${feedbackID}&selection=${selection}&category=${category}`,
      { withCredentials: true }
    );
  },

  submitReview : (review, product_id) => {
    return axios.post('http://ec2-18-225-6-113.us-east-2.compute.amazonaws.com/api/review', {...review, product_id }, {withCredentials: true})
  }
};

export default API;
