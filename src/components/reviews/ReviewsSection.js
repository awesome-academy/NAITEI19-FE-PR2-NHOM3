import PropTypes from "prop-types";
import React, { useState } from "react";
import { connect } from 'react-redux';
import { useToasts } from "react-toast-notifications";

const Rating = ({ rating }) => {
    return (
        <div className="review-rating">
            <i className="fa fa-star" />
            <i className="fa fa-star" style={{ color: `${rating < 2 ? 'grey' : ''}` }} />
            <i className="fa fa-star" style={{ color: `${rating < 3 ? 'grey' : ''}` }} />
            <i className="fa fa-star" style={{ color: `${rating < 4 ? 'grey' : ''}` }} />
            <i className="fa fa-star" style={{ color: `${rating < 5 ? 'grey' : ''}` }} />
        </div>
    )
}

const ReviewCard = ({ review }) => {
    const { addToast } = useToasts();

    const [open, setOpen] = useState(false);
    const [openForm, setOpenForm] = useState(false)
    const [replyForm, setReplyForm] = useState({
        image: "/assets/img/testimonial/1.jpg",
        comment: "",
        name: ""
    })

    function onChangeText(e) {
        setReplyForm({ ...replyForm, [e.target.name]: e.target.value })
    }
    function onReply(e) {
        e.preventDefault();
        review.reply.push(replyForm)
        setReplyForm({...replyForm, comment: ''})
        addToast('Add successfully', { appearance: 'success', autoDismiss: true });
        setOpenForm(false);
    }

    return (
        <>
            {
                openForm && (
                    <div className="row mb-3 border py-2">
                        <div className="col-md-6">
                            <div className="rating-form-style mb-10">
                                <input type="text" name="name" onChange={onChangeText} placeholder="Your name" value={replyForm.name} />
                            </div>
                        </div>
                        <div className="col-md-6 d-flex justify-content-end">
                            <div className="form-submit">
                                <button type="button" onClick={onReply}>Reply</button>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="form-submit">
                                <textarea
                                    placeholder="Your reply"
                                    name='comment'
                                    onChange={onChangeText}
                                    value={replyForm.comment}
                                />
                            </div>
                        </div>
                    </div>
                )
            }
            <div className="single-review">
                <div className="review-img">
                    <img src={process.env.PUBLIC_URL + review.image} />
                </div>
                <div className="review-content w-100">
                    <div className="review-top-wrap">
                        <div className="review-left">
                            <div className="review-name">
                                <h4>{review.name}</h4>
                            </div>
                            <Rating rating={review.rating} />
                        </div>
                        <div className="review-left">
                            <button onClick={() => setOpen(!open)}>Show {review.reply.length} reply</button>
                            <button onClick={() => setOpenForm(true)}>Reply</button>
                        </div>
                    </div>
                    <div className="review-bottom">
                        <p>{review.comment}</p>
                    </div>
                </div>
            </div>
            {open && review.reply.map((rep, index) => (
                <div className="single-review child-review pb-3" key={index}>
                    <div className="review-img">
                        <img src={process.env.PUBLIC_URL + rep.image} />
                    </div>
                    <div className="review-content">
                        <div className="review-top-wrap">
                            <div className="review-left">
                                <div className="review-name">
                                    <h4>{rep.name}</h4>
                                </div>
                            </div>
                        </div>
                        <div className="review-bottom">
                            <p>{rep.comment}</p>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}

const ReviewsSection = ({ reviews }) => {

    return (
        <div className="col-lg-7">
            {reviews && reviews.map((review, index) => (
                <div className="review-wrapper" key={index}>
                    <ReviewCard review={review} />
                </div>
            ))}
        </div>
    )
}


ReviewsSection.propTypes = {
    reviews: PropTypes.array,
    prodId: PropTypes.any,
};

const mapStateToProps = (state, ownProps) => {
    const prodId = ownProps.prodId
    return {
        reviews: state.reviewsData.reviews.filter(review => review.productId == prodId),
    }
}

export default connect(mapStateToProps)(ReviewsSection);
