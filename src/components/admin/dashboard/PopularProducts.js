import React from "react";
import serverAPI from "../../../serverAPI";

function getMostBoughtProducts(orders) {
  const productQuantity = {};
  const products = {};

  orders.forEach((order) => {
    order.cartItems.forEach((item) => {
      const productId = item.id;

      if (!productQuantity[productId]) {
        productQuantity[productId] = 0;
        products[productId] = item;
      }

      productQuantity[productId] += item.quantity;
    });
  });

  const productQuantityArray = Object.keys(productQuantity).map((productId) => ({
    productId,
    quantity: productQuantity[productId],
  }));

  productQuantityArray.sort((a, b) => b.quantity - a.quantity);

  // Get the top 5 most bought products
  const top5Products = productQuantityArray.slice(0, 5);

  return top5Products.map((p) => ({
    ...products[p.productId],
    orderCount: p.quantity,
  }));
}

const PopularProductItem = ({prod}) => {
  return (
    <div className="d-flex align-items-center justify-content-between" style={{gap: 10}}>
      <div className="d-flex align-items-center" style={{gap: 10}}>
        <img src={prod.image[0]} alt="" width="50px" height="50px"/>
        <div>
          <h5 className="m-0">{prod.name}</h5>
          <p className="fw-lighter">${prod.price}</p>
        </div>
      </div>
      <div>
        <div className="fw-medium">{prod.orderCount} đã bán</div>
      </div>
    </div>
  );
}

const PopularProducts = () => {
  const [data, setData] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(null)

  React.useEffect(() => {
    setLoading(true)
    serverAPI.get("/orders")
      .then(res => {
        const mostBoughtProducts = getMostBoughtProducts(res.data)
        setData(mostBoughtProducts)
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
    <div className="rounded border shadow p-5">
      <div className="my-3">
        <h3>Sản phẩm nổi bật</h3>
      </div>
      <div className="d-flex flex-column" style={{gap: 3}}>
        {data.map((prod, index) => (
          <PopularProductItem key={index} prod={prod}/>
        ))}
      </div>
    </div>
  );
}

export default PopularProducts;
