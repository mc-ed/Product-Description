import React from "react";
import uuidv4 from "uuid/v4";

function ReviewItem(props) {
  let recommendedStatus = props.review.recommended === true ? (
    <div data="recommended data">
      <span className="checkMark" />
      <small>Recommended</small>
    </div>
  ) : props.review.recommended === false ? (
    <div data="recommended data">
      <span className="crossMark" />
      <small>Not Recommended</small>
    </div>
  ) : (
        <div />
      );

  function handleExpand() {
    if (readMoreRef.innerText === "Read More") {
      textRef.classList.remove("fadeout");
      textRef.style.overflow = "visible";
      textRef.style.height = "auto";
      readMoreRef.innerText = "Read Less";
    } else {
      textRef.classList.add("fadeout");
      textRef.style.overflow = "hidden";
      textRef.style.height = "100px";
      readMoreRef.innerText = "Read More";
    }
  }

  function handleModal(select) {
    modalRef.getElementsByClassName('thumbnailIMG')[select].classList.add('thumbnailIMGselected');
    modalRef.getElementsByClassName('fullIMG')[select].classList.add('show');
    $(modalRef).on('hidden.bs.modal', () => {
      Array.from(modalRef.getElementsByClassName('thumbnailIMG')).forEach(image => {
        image.classList.remove('thumbnailIMGselected');
      })
      Array.from(modalRef.getElementsByClassName('fullIMG')).forEach(image => {
        image.classList.remove('show');
      })
    })
  }

  function handleChange(select) {
    Array.from(modalRef.getElementsByClassName('thumbnailIMG')).forEach(image => {
      image.classList.remove('thumbnailIMGselected');
    })
    Array.from(modalRef.getElementsByClassName('fullIMG')).forEach(image => {
      image.classList.remove('show');
    })
    modalRef.getElementsByClassName('thumbnailIMG')[select].classList.add('thumbnailIMGselected');
    modalRef.getElementsByClassName('fullIMG')[select].classList.add('show');
  }

  const { title, rating, date, text, author, helpful, verifiedPurchaser, sweepstakesEntry, images } = props.review;
  let textRef = null;
  let readMoreRef = null;
  let modalRef = null;
  let id = uuidv4()
  return (
    <div className="row" style={{ padding: "40px" }}>
      <div className="col-7 border-right">
        <h4>{title}</h4>
        <div data="star data">
          <span className={`stars${rating}`} />
          <small style={{ paddingLeft: "10px" }}>{`Reviewed on ${date}`}</small>
        </div>
        {recommendedStatus}
        <div
          className={text.length > 200 ? "fadeout" : ""}
          style={{ height: "100px", marginTop: "16px", overflow: "hidden" }}
          ref={input => {
            textRef = input;
          }}
        >
          <p className="text-muted">{text}</p>
          {images ? (
            <>
              {images.map((image, index) => {
                return (
                  <>
                    <span key={uuidv4()}>
                      <img onClick={() => { handleModal(index.toString()) }} data-toggle="modal" data-target={`#modal-${id}`} data-select={index.toString()} className='thumbnailIMG' src={`https://lowesproject.s3.amazonaws.com/userReviewPics/${image.smallName}.jpg`} large-id={image.largeName} alt="oops" />
                    </span>
                  </>
                )
              })}
              <div class="modal fade" id={`modal-${id}`} tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true" ref={input => { modalRef = input; }}>
                <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLongTitle">{title}</h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">
                      <div className="row">
                        <div className="col-2 border-right">
                          {images.map((image, index) => {
                            return (
                              <div>
                                <img onClick={() => { handleChange(index.toString()) }} className='thumbnailIMG' src={`https://lowesproject.s3.amazonaws.com/userReviewPics/${image.smallName}.jpg`} alt="oops" />
                              </div>
                            )
                          })}
                        </div>
                        <div className="col-10">
                          {images.map((image, index) => {
                            return (
                              <div>
                                <img onClick={() => { handleChange(index.toString()) }} className='fullIMG' src={`https://lowesproject.s3.amazonaws.com/userReviewPics/${image.largeName}.jpg`} alt="oops" />
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (<></>)}
        </div>

        {text.length > 200 ? (
          <div className="text-primary font-weight-bold text-center">
            <u
              onClick={() => {
                handleExpand();
              }}
              ref={input => {
                readMoreRef = input;
              }}
              style={{ cursor: "pointer" }}
            >
              Read More
            </u>
          </div>
        ) : (
            <div />
          )}
      </div>
      <div className="col-5" style={{ marginTop: '36px' }}>
        <p className="font-weight-bold" >{author}</p>
        {verifiedPurchaser ? (<div>
          <span className="checkMark" />
          <small>Verfied Pruchaser</small>
        </div>) : (<></>)}
        {sweepstakesEntry ? (<div>
          <span className="checkMark" />
          <small>Sweepstakes Entry</small>
        </div>) : (<></>)}
        {helpful ? (
          <>
            <p>Was this review helpful?</p>
            <div className="row">
              <div className="col-3 text-center lowesButton" style={{ marginLeft: '8px' }}>
                Yes({helpful.yes})
              </div>
              <div
                className="col-3 text-center lowesButton"
                style={{ marginLeft: "8px" }}
              >
                No({helpful.no})
              </div>
              <div>
                <a>
                  <span className="flag" style={{ marginLeft: "16px" }} />
                  <span> Report</span>
                </a>
              </div>
            </div>{" "}
          </>
        ) : (
            <></>
          )}
      </div>
    </div>
  );
}

export default ReviewItem;
