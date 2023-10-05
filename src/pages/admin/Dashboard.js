import React from "react";
import AdminLayout from "../../components/admin/Layout";
import Statistic from "../../components/admin/dashboard/Statistic";
import PopularProducts from "../../components/admin/dashboard/PopularProducts";
import RevenueChart from "../../components/admin/dashboard/RevenueChart";

const Dashboard = () => {
  return (
    <AdminLayout>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 my-2">
            <Statistic/>
          </div>
          <div className="col-4 my-2">
            <PopularProducts/>
          </div>
          <div className="col-8 my-2">
            <RevenueChart/>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

export default Dashboard;
