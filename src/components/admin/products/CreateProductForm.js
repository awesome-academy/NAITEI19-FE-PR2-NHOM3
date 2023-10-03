import React from "react";
import PropTypes from "prop-types";
import serverAPI from "../../../serverAPI";
import { connect } from "react-redux";
import { fetchCategories } from "../../../redux/actions/productActions";
import { Badge, Button, Modal } from "react-bootstrap";
import { useToasts } from "react-toast-notifications";

const initialInputState = {
  name: '',
  price: 0,
  discount: 0,
  stock: 0,
  category: [],
  tag: [],
  image: [],
  shortDescription: '',
  fullDescription: '',
}

const inputStateReducer = (state, action) => {
  switch (action.type) {
    case "SET_NAME":
      return {
        ...state,
        name: action.payload,
      }
    case "SET_PRICE":
      return {
        ...state,
        price: action.payload,
      }
    case "SET_DISCOUNT":
      return {
        ...state,
        discount: action.payload,
      }
    case "SET_STOCK":
      return {
        ...state,
        stock: action.payload,
      }
    case "SET_PCAT":
      return {
        ...state,
        category: [
          action.payload,
        ],
      }
    case "SET_SCAT":
      return {
        ...state,
        category: [
          state.category[0],
          action.payload,
        ],
      }
    case "REMOVE_CAT":
      return {
        ...state,
        category: state.category.filter(c => c !== action.payload),
      }
    case "ADD_TAG":
      return {
        ...state,
        tag: [
          ...state.tag,
          action.payload,
        ],
      }
    case "REMOVE_TAG":
      return {
        ...state,
        tag: [
          ...state.tag.slice(0, action.payload),
          ...state.tag.slice(action.payload + 1),
        ],
      }
    case "ADD_IMG":
      return {
        ...state,
        image: [
          ...state.image,
          action.payload,
        ],
      }
    case "REMOVE_IMG":
      return {
        ...state,
        image: [
          ...state.image.slice(0, action.payload),
          ...state.image.slice(action.payload + 1),
        ],
      }
    case "SET_SDESC":
      return {
        ...state,
        shortDescription: action.payload,
      }
    case "SET_DESC":
      return {
        ...state,
        fullDescription: action.payload,
      }
  }
}

const CreateProductForm = ({ productData, fetchCategories, setShowModal }) => {
  const [inputState, dispatchInputState] = React.useReducer(inputStateReducer, initialInputState);
  
  const imageInputRef = React.useRef(null);
  const tagInputRef = React.useRef(null);
  
  const { addToast } = useToasts();

  React.useEffect(() => {
    if (productData.categories.length > 0) return;
    serverAPI.get("/categories")
      .then(res => {
        fetchCategories(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  function handleAddImage() {
    const val = imageInputRef.current.value;
    console.log(val);
    dispatchInputState({
      type: 'ADD_IMG',
      payload: val
    });
    imageInputRef.current.value = '';
  }

  function handleAddTag() {
    const val = tagInputRef.current.value;
    console.log(val);
    dispatchInputState({
      type: 'ADD_TAG',
      payload: val
    });
    tagInputRef.current.value = '';
  }

  function handleSubmit() {
    serverAPI.post("/products", inputState)
      .then((res) => {
        addToast('Tạo sản phẩm thành công', { appearance: 'success', autoDismiss: true });
        setShowModal(false);
        window.location.reload();
      })
      .catch((err) => {
        addToast(`Tạo sản phẩm lỗi: ${err}`, { appearance: 'error', autoDismiss: true });
      });
  }

  return (
    <React.Fragment>
      <Modal.Body>
        <form className="form-horizontal" role="form">
          <div className="image-container col-sm-5">

            <div className="form-group">
              <div className="control-label">
                Thêm hình ảnh
              </div>
              <div className="image-upload-preview product-img">
                {inputState.image.map((image, index) => (
                  <div key={index} className="position-relative">
                    <img src={image} style={{
                      width: 100,
                      height: 100,
                      objectFit: 'cover'
                    }} />
                    <button
                      type="button"
                      className="position-absolute fs-5"
                      style={{
                        top: 0,
                        right: 0,
                        border: 'none',
                      }}
                      onClick={() => dispatchInputState({ type: "REMOVE_IMG", payload: index })}
                    >x</button>
                  </div>
                ))}
                {inputState.image.length === 0 && (
                  <div className="main-image-preview ">
                    <h3>+</h3>
                    <p>Thêm hình ảnh cho sản phẩm</p>
                  </div>
                )}
              </div>
              <div className="d-flex">
                <input ref={imageInputRef} type="text" />
                <button type="button" className="fs-5 bg-transparent" onClick={handleAddImage}>+</button>
              </div>
            </div>

            <div className="form-group">
              <div className="control-label">
                Tag
              </div>
              <div className="d-flex flex-wrap" style={{ gap: 2 }}>
                {inputState.tag.map((tag, index) => (
                  <Badge 
                    key={index} 
                    className="bg-info text-light p-2"
                    onClick={() => dispatchInputState({ type: "REMOVE_TAG", payload: index })}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="d-flex">
                <input ref={tagInputRef} type="text" />
                <button type="button" className="fs-5 bg-transparent" onClick={handleAddTag}>+</button>
              </div>
            </div>

            <div className="form-group">
              <div className="control-label">Phân loại</div>
              <div className="d-flex" style={{ gap: 2 }}>
                <div>
                  <select
                    className="form-control"
                    onChange={(e) => dispatchInputState({ type: 'SET_PCAT', payload: e.target.value })}
                  >
                    <option value="" disabled selected>Phân loại lớn</option>
                    {productData.categories.filter(cat => (!cat.parentId)).map((cat, index) => (
                      <option key={index} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <select
                    className="form-control"
                    disabled={inputState.category.length === 0 || !inputState.category[0]}
                    onChange={(e) => dispatchInputState({ type: 'SET_SCAT', payload: e.target.value })}
                  >
                    <option value="" disabled selected>Phân loại nhỏ</option>
                    {productData.categories.filter(cat => (cat.parentId == inputState.category[0])).map((cat, index) => (
                      <option key={index} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="input-container col-sm-7">
            <div className="form-group">
              <label htmlFor="name" className="col-sm-6 control-label">
                Tên sản phẩm
              </label>
              <div className="col-sm-12">
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  id="name"
                  value={inputState.name}
                  onChange={(e) => { dispatchInputState({ type: 'SET_NAME', payload: e.target.value }) }}
                  placeholder="Tên sản phẩm"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="inStockNumber" className="col-sm-3 control-label">
                Số lượng
              </label>
              <div className="col-sm-12">
                <input
                  type="number"
                  min="0"
                  className="form-control"
                  name="inStockNumber"
                  autoComplete="off"
                  value={inputState.stock}
                  onChange={(e) => dispatchInputState({ type: 'SET_STOCK', payload: e.target.valueAsNumber })}
                  placeholder="Số lượng"
                />
              </div>
            </div>

            <div className="form-group group-price">
              <label className="col-sm-12">Giá</label>
              <div className="col-lg-6 col-md-6">
                <div className="">
                  <input
                    type="number"
                    min={0}
                    className="form-control"
                    placeholder="Giá thường"
                    value={inputState.price}
                    onChange={(e) => dispatchInputState({ type: 'SET_PRICE', payload: e.target.valueAsNumber })}
                  />
                  <span className="error">{"regularPrice"}</span>
                </div>
              </div>
              <div className="col-lg-6 col-md-6">
                <div className="">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Giảm giá (%)"
                    value={inputState.discount}
                    onChange={(e) => dispatchInputState({ type: 'SET_DISCOUNT', payload: e.target.valueAsNumber })}
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="description" className="col-sm-3 control-label">
                Mô tả
              </label>
              <div className="col-sm-12">
                <textarea
                  className="form-control"
                  value={inputState.shortDescription}
                  onChange={(e) => dispatchInputState({ type: 'SET_SDESC', payload: e.target.value })}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="fullDescription" className="col-sm-6 control-label">
                Mô tả đầy đủ
              </label>
              <div className="col-sm-12">
                <textarea
                  className="form-control"
                  value={inputState.fullDescription}
                  onChange={(e) => dispatchInputState({ type: 'SET_DESC', payload: e.target.value })}
                />
              </div>
            </div>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button type="button" variant="secondary" onClick={() => setShowModal(false)}>
          Hủy
        </Button>
        <Button type="button" variant="primary" onClick={handleSubmit}>
          Tạo
        </Button>
      </Modal.Footer>
    </React.Fragment>
  );
}

CreateProductForm.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateProductForm);

