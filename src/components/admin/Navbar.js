import React from 'react'
import PropTypes from "prop-types";
import { Button, NavDropdown, Navbar } from 'react-bootstrap'
import { removeUser } from '../../redux/actions/authAction';
import { connect } from 'react-redux';

function AdminHeader({ toggleSidebar, authData, removeUser }) {
  return (
    <Navbar expand="lg" className="justify-content-between">
      <Navbar.Brand href="#home">
        <Button variant="outline-secondary" onClick={toggleSidebar}>
          <i className="fa fa-bars"></i>
        </Button>
        Admin Dashboard
      </Navbar.Brand>
      <NavDropdown title={authData.currentUser.username} id="basic-nav-dropdown">
        <NavDropdown.Item href="#action/3.2">
          Profile
        </NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">
          Settings
        </NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4" onClick={(e) => {
          e.preventDefault();
          removeUser();
        }}>
          Logout
        </NavDropdown.Item>
      </NavDropdown>
    </Navbar>
  )
}

AdminHeader.propTypes = {
  toggleSidebar: PropTypes.func,
  authData: PropTypes.object,
  removeUser: PropTypes.func,
};

const mapStateToProps = state => {
  return {
    authData: state.authData
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminHeader);

