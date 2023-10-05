import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, { PaginationListStandalone, PaginationProvider, SizePerPageDropdownStandalone } from 'react-bootstrap-table2-paginator';

import { Button } from "react-bootstrap";
import AdminLayout from "../../components/admin/Layout";
import serverAPI from "../../serverAPI";

const RemotePagination = ({ columns, data, expandRow, noDataIndication, page, sizePerPage, onTableChange, totalSize }) => (
  <div>
    <PaginationProvider
      pagination={
        paginationFactory({
          custom: true,
          page,
          sizePerPage,
          sizePerPageList: [{
            text: '5', value: 5
          }, {
            text: '10', value: 10
          }],
          sizePerPageRenderer: ({
            options,
            currSizePerPage,
            onSizePerPageChange
          }) => (
            <div className="btn-group" role="group">
              {
                options.map((option) => {
                  const isSelect = currSizePerPage === `${option.page}`;
                  return (
                    <button
                      key={option.text}
                      type="button"
                      onClick={() => onSizePerPageChange(option.page)}
                      className={`btn ${isSelect ? 'btn-secondary' : 'btn-warning'}`}
                    >
                      {option.text}
                    </button>
                  );
                })
              }
            </div>
          ),
          totalSize
        })
      }
    >
      {
        ({
          paginationProps,
          paginationTableProps
        }) => (
          <div>
            <BootstrapTable
              remote
              keyField="id"
              data={data}
              columns={columns}
              expandRow={expandRow}
              noDataIndication={noDataIndication}
              onTableChange={onTableChange}
              {...paginationTableProps}
            />
            <div className="d-flex justify-content-between">
              <SizePerPageDropdownStandalone
                {...paginationProps}
              />
              <PaginationListStandalone
                {...paginationProps}
              />
            </div>
          </div>
        )
      }
    </PaginationProvider>
  </div>
);

const OrderInfoRenderer = ({ order }) => (
  <div className="container-fluid mb-5">
    <div className="row">
      <div className="col-3">
        {/* <img src={user.avatar} alt="avatar" className="img-fluid" width={90} height={90} /> */}
      </div>
      <div className="col-9">
        <div className="row">
          <p><strong>ID Đơn Hàng:</strong> {order.id}</p>
          <p><strong>Họ:</strong> {order.FirstName}</p>
          <p><strong>Tên:</strong> {order.LastName}</p>
          <p><strong>Số Điện Thoại:</strong> {order.Phone}</p>
          <p><strong>Email:</strong> {order.Email}</p>
          <p><strong>Ngày Đặt Hàng:</strong> {order.orderDate}</p>
          <p><strong>Ngày Giao Hàng:</strong> {order.deliveryDate}</p>
          <p><strong>Tổng Tiền:</strong> {order.totalPrice}</p>
          <p><strong>Trạng Thái:</strong> {order.status}</p>
          {/* <div className="col-12">
            <strong>Address:</strong>
            {user.addresses ? (
              <ul>
                {user.addresses.map((address, index) => (
                  <li key={index}>{`${address.name}, ${address.street}, ${address.ward}, ${address.district}, ${address.city}`}</li>
                ))}
              </ul>
            ) : 'N/A'}
          </div>
          <p className="col-6"><strong>Role:</strong> {user.role}</p> */}
        </div>
      </div>
    </div>
  </div>
);

const ManageOrder = () => {
  const [total, setTotal] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [paginationSize, setPaginationSize] = React.useState(5);

  const [orders, setOrders] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  const [searchText, setSearchText] = React.useState('');

  React.useEffect(() => {
    setLoading(true);
    serverAPI.get(`/orders`).then((res) => {
        setOrders(res.data);
      });
    serverAPI.get(`/orders?_page=${currentPage}&_limit=${paginationSize}&mail_like=${searchText}`)
      .then(res => {
        setTotal(res.headers['x-total-count']);
        setOrders(res.data);
      })
      .catch(err => {
        setError(err);
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [currentPage, paginationSize, searchText]);

  const columns = [
    {
      dataField: "id",
      text: "ID Đơn Hàng",
    },
    {
      dataField: "FirstName",
      text: "Họ",
    },
    {
      dataField: "LastName",
      text: "Tên",
    },
    {
      dataField: "Phone",
      text: "Số Điện Thoại",
    },
    {
      dataField: "Email",
      text: "Email",
    },
    {
      dataField: "orderDate",
      text: "Ngày Đặt Hàng",
    },
    {
      dataField: "deliveryDate",
      text: "Ngày Giao Hàng",
    },
    {
      dataField: "totalPrice",
      text: "Tổng Tiền",
    },
    {
      dataField: "status",
      text: "Trạng Thái",
    },{
    text: 'Action',
    dataField: '',
    formatter: (row, cell) => {
      console.log(cell)
      return (
        <div className="d-flex" style={{ gap: 2 }}>
          <Button variant="danger">
            <i className="fa fa-trash fs-5"></i>
          </Button>
        </div>
      )
    }
  }];

  return (
    <AdminLayout>
      <h1>Manage Order</h1>
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
      <RemotePagination
        columns={columns}
        data={orders}
        page={currentPage}
        sizePerPage={paginationSize}
        totalSize={total}
        expandRow={{
          onlyOneExpanding: true,
          renderer: row => <OrderInfoRenderer order={row} />
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

export default ManageOrder;
