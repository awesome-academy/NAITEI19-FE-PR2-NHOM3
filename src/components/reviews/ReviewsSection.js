import PropTypes from "prop-types";
import React, { useState } from "react";
import { connect } from 'react-redux';
import { useToasts } from "react-toast-notifications";
import { updateReview } from "../../serverAPI";

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

const ReviewCard = ({ review, user }) => {
    const { addToast } = useToasts();

    const [show, setShow] = useState(false);
    const [openForm, setOpenForm] = useState(false)
    const [replyForm, setReplyForm] = useState({
        image: user ? user.avatar : '',
        comment: "",
        name: user ? user.username : ''
    })

    function onChangeText(e) {
        setReplyForm({ ...replyForm, [e.target.name]: e.target.value })
    }
    async function onReply(e) {
        e.preventDefault();
        review.reply.push(replyForm)
        const status = await updateReview(review, review.id)
        if (status) {
            setReplyForm({ ...replyForm, comment: '' })
            addToast('Add successfully', { appearance: 'success', autoDismiss: true });
            setOpenForm(false);
        }
    }

    return (
        <>
            {
                openForm && user && (
                    <div className="row mb-3 border py-2">
                        <div className="col-md-6">
                            <div className="rating-form-style mb-10">
                                <input type="text" name="name" onChange={onChangeText} placeholder="Your name" value={replyForm.name} disabled />
                            </div>
                        </div>
                        <div className="col-md-6 d-flex justify-content-end">
                            <button type="button" className="btn btn-danger mr-2" style={{ height: '45px' }} onClick={() => setOpenForm(false)}>Cancel</button>
                            <button type="button" className="btn btn-info" style={{ height: '45px' }} onClick={onReply}>Reply</button>
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
            {
                openForm && !user && (
                    <div className="d-flex justify-content-center mb-3">
                        <a href="/login-register">
                            <button type="button" className="btn btn-dark">
                                Login to reply
                            </button>
                        </a>
                    </div>
                )
            }
            <div className="single-review">
                <div className="review-img">
                    <img src={process.env.PUBLIC_URL + review.image} style={{ width: '90px', height: '100px', overflow: 'hidden', objectFit: 'cover' }} />
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
                            <button onClick={() => setShow(!show)}>Show {review.reply.length} reply</button>
                            <button onClick={() => setOpenForm(!openForm)}>Reply</button>
                        </div>
                    </div>
                    <div className="review-bottom">
                        <p>{review.comment}</p>
                    </div>
                </div>
            </div>
            {show && review.reply.map((rep, index) => (
                <div className="single-review child-review pb-3" key={index}>
                    <div className="review-img">
                        <img src={process.env.PUBLIC_URL + rep.image} style={{ width: '90px', height: '100px', overflow: 'hidden', objectFit: 'cover' }} />
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

const ReviewsSection = ({ reviews, user }) => {

    return (
        <div className="col-lg-7">
            {reviews && reviews.map((review, index) => (
                <div className="review-wrapper" key={index}>
                    <ReviewCard review={review} user={user} />
                </div>
            ))}
        </div>
    )
}


ReviewsSection.propTypes = {
    reviews: PropTypes.array,
    prodId: PropTypes.any,
    user: PropTypes.any
};

const mapStateToProps = (state, ownProps) => {
    const prodId = ownProps.prodId
    return {
        reviews: state.reviewsData.reviews.filter(review => review.productId == prodId),
        user: state.authData.currentUser
    }
}

export default connect(mapStateToProps)(ReviewsSection);
