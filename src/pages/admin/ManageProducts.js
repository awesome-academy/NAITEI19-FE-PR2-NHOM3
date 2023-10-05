import React from "react";
import PropTypes from "prop-types";
import AdminLayout from "../../components/admin/Layout";
import RemoteConfigTable from "../../components/admin/RemoteConfigTable";
import serverAPI from "../../serverAPI";
import { Badge, Button, Carousel, Modal } from "react-bootstrap";
import { fetchCategories } from "../../redux/actions/productActions";
import { connect } from "react-redux";
import CreateProductForm from "../../components/admin/products/CreateProductForm";

const initialSearchState = {
  name: '',
  category: '',
};

const searchStateReducer = (state, action) => {
  switch (action.type) {
    case "NAME":
      return { ...state, name: action.payload };
    case "CATEGORY":
      return { ...state, category: action.payload };
  }
}

const ViewProduct = ({prod}) => {
  console.log('prod', prod)
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-3">
          {prod.image && (
            <Carousel>
              {prod.image.map((img, index) => (
                <Carousel.Item key={index}>
                  <img src={img} style={{
                    maxHeight: '100%',
                    maxWidth: '100%',
                    objectFit: 'cover',
                  }}/>
                </Carousel.Item>
              ))}
            </Carousel>
          )}
        </div>
        <div className="col-9">
          <p><strong>Tên sản phẩm: </strong>{prod.name}</p>
          <p><strong>Giá:</strong>{prod.price}</p>
          <p><strong>Số lượng trong kho</strong>{prod.stock}</p>
          <p><strong>Mô tả</strong>{prod.fullDescription}</p>
        </div>
      </div>
    </div>
  )
}

const ManageProducts = ({ productData, fetchCategories }) => {
  const [total, setTotal] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [paginationSize, setPaginationSize] = React.useState(5);

  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  const [searchState, dispatchSearchState] = React.useReducer(searchStateReducer, initialSearchState);

  const [showModal, setShowModal] = React.useState(false);

  React.useEffect(() => {
    // if (productData.categories.length > 0) return;
    serverAPI.get("/categories")
      .then(res => {
        fetchCategories(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  React.useEffect(() => {
    setLoading(true);
    serverAPI.get("/products", {
      params: {
        "_page": currentPage,
        "_limit": paginationSize,
        "name_like": searchState.name,
        "category_like": searchState.category,
      }
    })
      .then(res => {
        setTotal(res.headers['x-total-count']);
        setProducts(res.data);
      })
      .catch(err => {
        setError(err);
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [currentPage, paginationSize, searchState]);

  const columns = [{
    dataField: 'name',
    text: 'Sản phẩm',
    formatter: (row, cell) => (
      <div className="d-flex" style={{ gap: 5 }}>
        <img src={cell.image[0]} style={{
          maxHeight: 50,
          maxWidth: 50,
          objectFit: 'contain',
        }} />
        <p>{cell.name}</p>
      </div>
    )
  }, {
    dataField: 'price',
    text: 'Giá',
    formatter: (row, cell) => (<p>{`$${cell.price}`}</p>)
  }, {
    dataField: 'stock',
    text: 'Số lượng',
  }, {
    dataField: 'category',
    text: 'Phân loại',
    formatter: (row, cell) => (
      <div className="d-flex flex-wrap" style={{ gap: 2 }}>
        {cell.category.map((cat, index) => {
          const c = productData.categories.find(c => c.id == cat)
          return c.parentId
            ? (
              <>
                <Badge key={index} className="me-1 text-white bg-primary">{productData.categories.find(_c => _c.id === c.parentId).name}</Badge>
                <Badge key={index} className="me-1 text-white bg-secondary">{c.name}</Badge>
              </>
            ) : null;
        })}
      </div>
    )
  }, {
    dataField: '',
    text: 'Action',
    formatter: (row, cell) => {
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
      <h1>Manage Products</h1>
      <hr />
      <Button variant="primary" onClick={() => setShowModal(true)}>
        Nhập kho
      </Button>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Nhập sản phẩm</Modal.Title>
        </Modal.Header>
        <CreateProductForm setShowModal={setShowModal} />
      </Modal>
      <RemoteConfigTable
        columns={columns}
        data={products}
        page={currentPage}
        sizePerPage={paginationSize}
        totalSize={total}
        expandRow={{
          onlyOneExpanding: true,
          renderer: row => <ViewProduct prod={row}/>
        }}
        noDataIndication={
          loading ? "Đang tải ..." :
            error ? `Lỗi: ${error}` :
              "Không có sản phẩm nào trong hệ thống"
        }
        onTableChange={(type, { page, sizePerPage }) => {
          console.log('table change');
          setCurrentPage(page);
          setPaginationSize(sizePerPage);
        }}
      />
    </AdminLayout>
  );
}

ManageProducts.propTypes = {
  productData: PropTypes.object,
  fetchCategories: PropTypes.func,
};

const mapStateToProps = state => {
  return {
    productData: state.productData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchCategories: (user) => {
      dispatch(fetchCategories(user));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageProducts);
