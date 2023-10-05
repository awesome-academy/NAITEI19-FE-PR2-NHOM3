import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import serverAPI from "../../../serverAPI";

function calculateMonthlyRevenue(orders) {
  const monthlyRevenue = {};

  // Iterate through the orders
  orders.forEach((order) => {
    const orderDate = new Date(order.orderDate);
    const year = orderDate.getFullYear();
    const month = orderDate.getMonth();

    // Calculate a unique key for the month and year, e.g., "2023-10"
    const monthKey = `${year}-${(month + 1).toString().padStart(2, '0')}`;

    // Initialize the monthly revenue if it doesn't exist
    if (!monthlyRevenue[monthKey]) {
      monthlyRevenue[monthKey] = 0;
    }

    // Add the total price of the order to the corresponding month's revenue
    monthlyRevenue[monthKey] += order.totalPrice;
  });

  // Convert the object of monthly revenue into an array of objects
  const monthlyRevenueArray = Object.keys(monthlyRevenue).map((key) => ({
    month: key,
    revenue: monthlyRevenue[key],
  }));

  return monthlyRevenueArray.sort((a, b) => {
    // Convert month strings to Date objects for comparison
    const dateA = new Date(a.month);
    const dateB = new Date(b.month);
    return dateA - dateB;
  });
}

const RevenueChart = () => {
  const [data, setData] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(null)

  React.useEffect(() => {
    setLoading(true)
    serverAPI.get("/orders")
      .then(res => {
        setData(calculateMonthlyRevenue(res.data))
      })
      .catch(err => {
        setError(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])
  
  if(loading) {
    return <div>Loading...</div>
  }

  if(error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div className="rounded border shadow p-5" style={{height: 422}}>
      <div className="my-3">
        <h3>Doanh thu</h3>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={270}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="revenue" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default RevenueChart;
