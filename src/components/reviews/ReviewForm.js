import PropTypes from "prop-types";
import React, { useState } from "react";
import { connect } from 'react-redux';
import { useDispatch } from "react-redux";
import { addReviews } from "../../redux/actions/reviewsAction";
import { useToasts } from "react-toast-notifications";
import { createReview } from "../../serverAPI";

const ReviewForm = ({ prodId, reviews, user }) => {
    const dispatch = useDispatch();
    const { addToast } = useToasts();

    const [reviewForm, setReviewForm] = useState({
        id: reviews.length + 1,
        productId: prodId,
        name: user ? user.username : '',
        email: user ? user.email : '',
        image: user ? user.avatar : '',
        rating: 5,
        comment: "",
        reply: []
    })

    function onChangeRating(e) {
        setReviewForm({ ...reviewForm, rating: e.target.value })
    }
    function onChangeText(e) {
        setReviewForm({ ...reviewForm, [e.target.name]: e.target.value })
    }
    async function onSubmit(e) {
        e.preventDefault();
        const status = await createReview(reviewForm)
        if (status) {
            const newReviews = reviews.push(reviewForm);
            dispatch(addReviews(reviews))
            addToast('Add successfully', { appearance: 'success', autoDismiss: true });
        } else addToast('Add failed', { appearance: 'error', autoDismiss: true });
    }
    return (
        <div className="col-lg-5">
            {user &&
                <div className="ratting-form-wrapper pl-50">
                    <h3>Add a Review</h3>
                    <div className="ratting-form">
                        <form action="#">
                            <div className="star-box">
                                <span>Your rating:</span>
                                <select name="rating" className="w-25 text-right" onChange={onChangeRating}>
                                    <option value="5">5</option>
                                    <option value="4">4</option>
                                    <option value="3">3</option>
                                    <option value="2">2</option>
                                    <option value="1">1</option>
                                </select>
                                <div className="ratting-star">
                                    <i className="fa fa-star" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="rating-form-style mb-10">
                                        <input type="text" name="name" onChange={onChangeText} value={reviewForm.name} placeholder="Your name" disabled />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="rating-form-style mb-10">
                                        <input placeholder="Email" type="email" value={reviewForm.email} disabled />
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="rating-form-style form-submit">
                                        <textarea
                                            placeholder="Your comment"
                                            name='comment'
                                            onChange={onChangeText}
                                            value={reviewForm.comment}
                                        />
                                        <button type="button" onClick={onSubmit}>Submit</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            }
            {!user &&
                <div className="d-flex justify-content-center">
                    <a href="/login-register">
                        <button type="button" className="btn btn-dark">
                            Login to review this product
                        </button>
                    </a>
                </div>
            }
        </div>
    )
}

ReviewForm.propTypes = {
    prodId: PropTypes.any,
    reviews: PropTypes.array,
    user: PropTypes.any,
};

const mapStateToProps = state => {
    return {
        user: state.authData.currentUser,
        reviews: state.reviewsData.reviews,
    }
}

export default connect(mapStateToProps)(ReviewForm);
