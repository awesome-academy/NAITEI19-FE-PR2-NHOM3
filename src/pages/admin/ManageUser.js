import React from "react";

import { Button } from "react-bootstrap";
import AdminLayout from "../../components/admin/Layout";
import RemoteConfigTable from "../../components/admin/RemoteConfigTable";
import serverAPI from "../../serverAPI";

const UserInfoRenderer = ({ user }) => (
  <div className="container-fluid mb-5">
    <div className="row">
      <div className="col-3">
        <img src={user.avatar} alt="avatar" className="img-fluid" width={90} height={90} />
      </div>
      <div className="col-9">
        <div className="row">
          <p className="col-6"><strong>Username:</strong> {user.username}</p>
          <p className="col-6"><strong>Email:</strong> {user.email}</p>
          <p className="col-6"><strong>First name:</strong> {user.firstname}</p>
          <p className="col-6"><strong>Phone:</strong> {user.phone}</p>
          <p className="col-6"><strong>Last name:</strong> {user.lastname}</p>
          <div className="col-12">
            <strong>Address:</strong>
            {user.addresses ? (
              <ul>
                {user.addresses.map((address, index) => (
                  <li key={index}>{`${address.name}, ${address.street}, ${address.ward}, ${address.district}, ${address.city}`}</li>
                ))}
              </ul>
            ) : 'N/A'}
          </div>
          <p className="col-6"><strong>Role:</strong> {user.role}</p>
        </div>
      </div>
    </div>
  </div>
);

const ManageUser = () => {
  const [total, setTotal] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [paginationSize, setPaginationSize] = React.useState(5);

  const [users, setUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  const [searchText, setSearchText] = React.useState('');

  React.useEffect(() => {
    setLoading(true);
    serverAPI.get(`/users?_page=${currentPage}&_limit=${paginationSize}&username_like=${searchText}`)
      .then(res => {
        setTotal(res.headers['x-total-count']);
        setUsers(res.data);
      })
      .catch(err => {
        setError(err);
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [currentPage, paginationSize, searchText]);

  const columns = [{
    dataField: 'username',
    text: 'User Name'
  }, {
    dataField: 'email',
    text: 'Email'
  }, {
    dataField: 'role',
    text: 'Role',
  }, {
    text: 'Action',
    dataField: '',
    formatter: (row, cell) => {
      console.log(cell)
      return (
        <div className="d-flex" style={{ gap: 2 }}>
          <Button variant="danger" onClick={() => handleDeleteUser(cell.id, cell.username)}>
            <i className="fa fa-trash fs-5"></i>
          </Button>
        </div>
      )
    }
  }];

  function handleDeleteUser(id, name) {
    if (window.confirm(`Are you sure to delete user ${name}?`) === false) return;
    serverAPI.delete(`/users/${id}`)
      .then(res => {
        console.log(res);
        setUsers(users.filter(user => user.id !== id));
        setCurrentPage(0);
      })
      .catch(err => {
        console.error(err);
      });
  }

  return (
    <AdminLayout>
      <h1>Manage Users</h1>
      <hr />
      <div className="my-5">
        <form className="position-relative">
          <input
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            className="bg-white pr-5"
            placeholder="Tìm kiếm User"
          />
          <i
            className="fa fa-search fs-5 position-absolute"
            style={{
              top: "50%",
              right: "8px",
              transform: "translateY(-50%)"
            }} />
        </form>
      </div>
      <RemoteConfigTable
        columns={columns}
        data={users}
        page={currentPage}
        sizePerPage={paginationSize}
        totalSize={total}
        expandRow={{
          onlyOneExpanding: true,
          renderer: row => <UserInfoRenderer user={row} />
        }}
        noDataIndication={
          loading ? "Đang tải ..." :
            error ? `Lỗi: ${error}` :
              "Không có user nào trong hệ thống"
        }
        onTableChange={(type, { page, sizePerPage }) => {
          console.log('table change');
          setCurrentPage(page);
          setPaginationSize(sizePerPage);
        }}
      />
    </AdminLayout>
  );
};

export default ManageUser;
