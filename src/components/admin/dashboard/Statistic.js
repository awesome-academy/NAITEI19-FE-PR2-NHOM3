import React from "react";
import serverAPI from "../../../serverAPI";

const StatisticItem = ({icon, color, count, title}) => {
  return (
    <div className="d-flex align-items-center" style={{gap: 10}}>
      <span className={color} style={{fontSize: 'xx-large'}}><i className={icon}/></span>
      <div>
        <h4 className="m-0">{count}</h4>
        <p className="fw-lighter">{title}</p>
      </div>
    </div>
  )
}
const Statistic = () => {
  const [orderCount, setOrderCount] = React.useState(0)
  const [userCount, setUserCount] = React.useState(0)
  const [productCount, setProductCount] = React.useState(0)
  const [profit, setProfit] = React.useState(0)

  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(null)

  React.useEffect(() => {
    (async () => {
      setLoading(true)
      try {
        let res = await serverAPI.head("/orders", {params: {
          "_limit": 99999999999,
        }})
        setOrderCount(res.headers["x-total-count"])
        res = await serverAPI.head("/users", {params: {
          "_limit": 99999999999,
        }})
        setUserCount(res.headers["x-total-count"])
        res = await serverAPI.head("/products", {params: {
          "_limit": 99999999999,
        }})
        setProductCount(res.headers["x-total-count"])
        res = await serverAPI.get("/orders")
        let profit = 0
        for(const o of res.data) {
          profit += o.totalPrice
        }
        setProfit(profit)
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  if(loading) {
    return <div>Loading...</div>
  }

  if(error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div className="rounded border shadow p-5">
      <h2 className="my-3">Statistic</h2>
      <div className="d-flex justify-content-between">
        <StatisticItem 
          icon="fa fa-clock-o"
          color="text-primary"
          count={orderCount}
          title="Đơn đặt hàng"
        />
        <StatisticItem 
          icon="fa fa-user"
          color="text-success"
          count={userCount}
          title="Khách hàng"
        />
        <StatisticItem 
          icon="fa fa-dollar"
          color="text-info"
          count={`$${profit}`}
          title="Lợi nhuận"
        />
        <StatisticItem 
          icon="fa fa-product-hunt"
          color="text-danger"
          count={productCount}
          title="Sản phẩm"
        />
      </div>
    </div>
  );
}

export default Statistic;
