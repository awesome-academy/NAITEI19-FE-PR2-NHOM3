import React from "react";
import Sidebar from "./Sidebar";
import AdminHeader from "./Navbar";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

function AdminLayout(props) {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  const history = useHistory();
  if (!props.authData.currentUser || props.authData.currentUser.role !== 'ADMIN') {
    history.replace('/');
    return null;
  }

  return (
    <div className="container-fluid min-vh-100 admin">
      <div className="row">
        {sidebarOpen && (<div className="sidebar vh-100">
          <Sidebar/>
        </div>)}
        <div 
          className="main"
          style={(!sidebarOpen) ? ({
            flex: 1,
            maxWidth: "100%",
          }) : {}}
        >
          <AdminHeader toggleSidebar={() => setSidebarOpen(!sidebarOpen)}/>
          <div className="body">
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
}

AdminLayout.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(AdminLayout);
