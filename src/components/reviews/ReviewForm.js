import PropTypes from "prop-types";
import React, { useState } from "react";
import { connect } from 'react-redux';
import { useDispatch } from "react-redux";
import { addReviews } from "../../redux/actions/reviewsAction";
import { useToasts } from "react-toast-notifications";

const ReviewForm = ({ prodId, reviews }) => {
    const dispatch = useDispatch();
    const { addToast } = useToasts();

    const [reviewForm, setReviewForm] = useState({
        id: 0,
        productId: prodId,
        name: '',
        image: "/assets/img/testimonial/1.jpg",
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
    function onSubmit(e) {
        e.preventDefault();
        const newReviews = reviews.push(reviewForm);
        dispatch(addReviews(reviews))
        addToast('Add successfully', { appearance: 'success', autoDismiss: true });
    }
    return (
        <div className="col-lg-5">
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
                                    <input type="text" name="name" onChange={onChangeText} value={reviewForm.name} placeholder="Your name" />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="rating-form-style mb-10">
                                    <input placeholder="Email" type="email" />
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
        </div>
    )
}

ReviewForm.propTypes = {
    prodId: PropTypes.any,
    reviews: PropTypes.array
};

const mapStateToProps = state => {
    return {
        reviews: state.reviewsData.reviews,
    }
}

export default connect(mapStateToProps)(ReviewForm);
