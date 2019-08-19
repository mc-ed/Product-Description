import axios from "axios";


const API = {
  /**
 * @param {Number} id - Product ID number.
 * @param {String} type - Sort type.
 * @param {Number} [reviewIndex] - Start index of the review array.
 */
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

  submitReview : (product_id, review) => {
    return axios.post(`${process.env.HOST}/api/review`, {...review, product_id }, {withCredentials: true})
  },

  submitQuestion : (question, id) => {
    return axios.post(`${process.env.HOST}/api/question`, {...question, product_id: id}, {withCredentials: true})
  },

  submitAnswer : (answer, product_id) => {
    return axios.post(`${process.env.HOST}/api/answer`, {...answer, product_id}, {withCredentials: true})
  },

  getSortedQuestions : (id, type) => {
    return axios.get(`${process.env.HOST}/api/questions/${id}?type=${type}`, {withCredentials: true})
  },

  getQuestionSearch : (id, query) => {
    return axios.get(`${process.env.HOST}/api/search?product_id=${id}&type=questions&string=${encodeURI(query)}`)
  }
};

export default API;
