import React from "react";

export default function Sidebar({}) {
  return (
    <div className="p-2">
      <div className="m-2">
        <a href="/">
          <img src="/assets/img/logo/logo.png"/>
        </a>
      </div>
      <hr className="text-dark"/>
      <div className="list-group list-group-flush">
        <a href="/admin" className="list-group-item list-group-item-action py-2 sidebar-item">
          <span className="d-inline-block mr-2"><i className="fa fa-home fs-5"></i></span>
          <span className="fs-5">Dashboard</span>
        </a>
        <a href="/admin/users" className="list-group-item list-group-item-action py-2 sidebar-item">
          <span className="d-inline-block mr-2"><i className="fa fa-user fs-5"></i></span>
          <span className="fs-5">Users</span>
        </a>
        <a href="/admin/products" className="list-group-item list-group-item-action py-2 sidebar-item">
          <span className="d-inline-block mr-2"><i className="fa fa-book fs-5"></i></span>
          <span className="fs-5">Products</span>
        </a>
        <a href="/admin/categories" className="list-group-item list-group-item-action py-2 sidebar-item">
          <span className="d-inline-block mr-2"><i className="fa fa-tag fs-5"></i></span>
          <span className="fs-5">Categories</span>
        </a>
        <a to="/admin/orders" className="list-group-item list-group-item-action py-2 sidebar-item">
          <span className="d-inline-block mr-2"><i className="fa fa-tag fs-5"></i></span>
          <span className="fs-5">Orders</span>
        </a>
      </div>
    </div>
  );
}
