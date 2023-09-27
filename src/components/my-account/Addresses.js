import React from 'react'
import PropTypes from "prop-types";
import { connect } from 'react-redux';

const Addresses = ({ addresses, onDelete }) => {

    return (
        <div className="entries-wrapper">
            {addresses && addresses.map(
                (address, index) => (
                    <div className="row" key={index}>
                        <div className="col-lg-6 col-md-6 d-flex align-items-center justify-content-center">
                            <div className="entries-info text-center">
                                <p>{address.name}</p>
                                <p>{address.street}</p>
                                <p>{address.ward}</p>
                                <p>{address.district}</p>
                                <p>{address.city}</p>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 d-flex align-items-center justify-content-center">
                            <div className="entries-edit-delete text-center">
                                <button onClick={(e) => onDelete(e, address.id)}>Delete</button>
                            </div>
                        </div>
                    </div>
                )
            )}
        </div>
    )

}
Addresses.propTypes = {
    onDelete: PropTypes.func,
    user: PropTypes.array
};


const mapStateToProps = state => {
    return {
        addresses: state.authData.currentUser.addresses
    }
}

export default connect(mapStateToProps)(Addresses);
