import signs from "../styles/signs.less";

const messages = {
  title: {
    feedbackDuplicate: "Feedback already given",
    feedbackSubmitted: "Feedback Submitted - Thank you!",
    reportReceived: "Report Received"
  },

  message: {
    feedbackSubmitted: "Thank you for your feedback!",
    feedbackDuplicate:
      "Looks like you've already given feedback to this review. Do you not remember?",
    reportReceived:
      "Thank you for your feedback! One of our team memebers will look into this review as soon as possible!"
  }
};

const helpers = {
  setState: {
    updateProductData: (response, context) => {
      const { data } = response;
      if (data.reviewStats.reviewCount < 10) {
        context.setState({
          ...data,
          reviewCount: data.reviewStats.reviewCount
        });
      } else {
        context.setState({ ...data, reviewCount: 10 });
      }
		},
		
		toggleModal : (type, context, element_ID) => {
			context.setState(state => {return {element_ID, toggleModals: {...state.toggleModals, [type] : !state.toggleModals[type]}}})
		},

    updateCategory: (category, updates, context) => {
      context.setState({
        [category]: updates
      });
    },

    setModalMessage: (title, message, context) => {
			helpers.setState.toggleModal('message', context);
      context.setState({
        message: {
          title,
          message
        }
      });
    },

    moreReviews: (response, context) => {
      const { data } = response;
      context.setState(state => {
        return {
          reviews: [...state.reviews, ...data.reviews]
        };
      });
    },

    setReviewCounter: (context, cb = () => {}) => {
      const totalReviews = context.state.reviewStats.reviewCount;
      const visibleReivews = context.state.reviewCount;
      if (totalReviews - visibleReivews < 10) {
        context.setState(state => {
          return { reviewCount: state.reviewStats.reviewCount };
        });
      } else {
        context.setState(state => {
          return { reviewCount: state.reviewCount + 10 };
        }, cb());
      }
		},
		
		setReviewSortType : (type, context, cb) => {
			context.setState({reviewSortType : type}, cb())
		},

		resetReviewDataBySortType : (response, context, reviewCount) => {
			const {reviews} = response.data;
      reviewCount = reviewCount || reviews.length;
			context.setState({reviews, reviewCount})
		}
  },

  toggleAccordion: sign => {
    if (Array.from(sign.classList).includes(signs.plusSign)) {
      Array.from(document.getElementsByClassName(signs.minusSign)).forEach(
        el => {
          el.classList.remove(signs.minusSign);
          el.classList.add(signs.plusSign);
        }
      );
      sign.classList.remove(signs.plusSign);
      sign.classList.add(signs.minusSign);
    } else {
      sign.classList.remove(signs.minusSign);
      sign.classList.add(signs.plusSign);
    }
  },

  renderFeedbackAndModals: (response, context, args) => {
    const { allow, reported } = response.data;
    const { feedbackID, selection, category } = args;
    const { setModalMessage, updateCategory } = helpers.setState;
    if (allow === true) {
      let updates = [...context.state[category]];
      let itemToChange;
      if (category === "questions") {
        updates.forEach(question =>
          question.answers.forEach(answer =>
            answer._id === feedbackID ? (itemToChange = answer) : null
          )
        );
      } else if (category === "reviews") {
        itemToChange = updates.find(review => review._id === feedbackID);
      }
      if (selection === "yes" || selection === "no") {
        ++itemToChange.helpful[selection];
        updateCategory(category, updates, context);
        setModalMessage(
          messages.title.feedbackSubmitted,
          messages.message.feedbackSubmitted,
          context
        );
      }
    } else if (allow === false) {
      setModalMessage(
        messages.title.feedbackDuplicate,
        messages.message.feedbackDuplicate,
        context
      );
    }
    if (reported) {
      setModalMessage(
        messages.title.reportReceived,
        messages.message.reportReceived,
        context
      );
    }
  }
};

export default helpers;
