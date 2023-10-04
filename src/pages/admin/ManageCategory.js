import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationListStandalone,
  PaginationProvider,
  SizePerPageDropdownStandalone,
} from "react-bootstrap-table2-paginator";

import { Button } from "react-bootstrap";
import AdminLayout from "../../components/admin/Layout";
import serverAPI from "../../serverAPI";

const AddForm = ({ categoryList }) => {
  const [formData, setFormData] = React.useState({
    name: "",
  });

  const [parentCategories, setParentCategories] = React.useState([]);

  const renderParentCategoryList = (categoryList) => {
    const parentList = categoryList.filter((category) => !category.parentId);
    setParentCategories(parentList);
  };

  React.useEffect(() => {
    renderParentCategoryList(categoryList);
  }, [categoryList]);

  const handleOnchangeInput = (e) => {
    let tempFormData;
    if (e.target.id === "categoryName") {
      tempFormData = { ...formData };
      tempFormData.name = e.target.value;
    } else if (e.target.id === "parentId") {
      tempFormData = { ...formData };
      tempFormData.parentId = parseInt(e.target.value);
      if (e.target.value === "") {
        delete tempFormData.parentId;
      }
    }
    setFormData(tempFormData);
  };

  const handleSubmit = (e) => {
    serverAPI
      .post(`/categories`, formData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <form style={{ marginBottom: "20px" }}>
      <div class="form-group row">
        <label for="categoryName" class="col-sm-2 col-form-label">
          Name
        </label>
        <div class="col-sm-10">
          <input
            type="text"
            class="form-control"
            id="categoryName"
            onChange={handleOnchangeInput}
          />
        </div>
      </div>
      <div class="form-group row">
        <label for="parentId" class="col-sm-2 col-form-label">
          Parent Category
        </label>
        <div class="col-sm-10">
          <select
            id="parentId"
            class="form-control"
            onChange={handleOnchangeInput}
            style={{ textTransform: "capitalize" }}
          >
            <option value="" selected>
              N/A
            </option>
            {parentCategories.map((category) => {
              return (
                <option
                  value={category.id}
                  key={category.id}
                  style={{ textTransform: "capitalize" }}
                >
                  {category.name}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <button
        type="submit"
        class="btn btn-primary"
        onClick={(e) => handleSubmit(e)}
      >
        Submit
      </button>
    </form>
  );
};

const EditForm = ({ categoryList, category }) => {
  const [formData, setFormData] = React.useState({
    name: category.name,
    parentId: category.parentId,
  });

  const [parentCategories, setParentCategories] = React.useState([]);

  const renderParentCategoryList = (categoryList) => {
    const parentList = categoryList.filter(
      (item) => !item.parentId && item.id !== category.id
    );
    setParentCategories(parentList);
  };

  React.useEffect(() => {
    renderParentCategoryList(categoryList);
  }, [categoryList]);

  const handleOnchangeInput = (e) => {
    let tempFormData;
    if (e.target.id === "categoryName") {
      tempFormData = { ...formData };
      tempFormData.name = e.target.value;
    } else if (e.target.id === "parentId") {
      tempFormData = { ...formData };
      tempFormData.parentId = parseInt(e.target.value);
      if (e.target.value === "") {
        delete tempFormData.parentId;
      }
    }
    setFormData(tempFormData);
  };

  const handleSubmit = () => {
    serverAPI
      .put(`/categories/${category.id}`, formData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <form style={{ marginBottom: "20px" }}>
      <div class="form-group row">
        <label for="categoryName" class="col-sm-2 col-form-label">
          Name
        </label>
        <div class="col-sm-10">
          <input
            type="text"
            class="form-control"
            id="categoryName"
            value={formData.name}
            style={{ textTransform: "capitalize" }}
            onChange={handleOnchangeInput}
          />
        </div>
      </div>
      <div class="form-group row">
        <label for="parentId" class="col-sm-2 col-form-label">
          Parent Category
        </label>
        <div class="col-sm-10">
          <select
            id="parentId"
            class="form-control"
            onChange={handleOnchangeInput}
            style={{ textTransform: "capitalize" }}
          >
            <option value="" selected={!formData.parentId}>
              N/A
            </option>
            {parentCategories.map((category) => {
              return (
                <option
                  selected={formData.parentId === category.id}
                  value={category.id}
                  key={category.id}
                  style={{ textTransform: "capitalize" }}
                >
                  {category.name}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <button
        type="submit"
        class="btn btn-primary"
        onClick={(e) => handleSubmit(e)}
      >
        Submit
      </button>
    </form>
  );
};

const RemotePagination = ({
  columns,
  data,
  expandRow,
  noDataIndication,
  page,
  sizePerPage,
  onTableChange,
  totalSize,
}) => (
  <div>
    <PaginationProvider
      pagination={paginationFactory({
        custom: true,
        page,
        sizePerPage,
        sizePerPageList: [
          {
            text: "5",
            value: 5,
          },
          {
            text: "10",
            value: 10,
          },
        ],
        sizePerPageRenderer: ({
          options,
          currSizePerPage,
          onSizePerPageChange,
        }) => (
          <div className="btn-group" role="group">
            {options.map((option) => {
              const isSelect = currSizePerPage === `${option.page}`;
              return (
                <button
                  key={option.text}
                  type="button"
                  onClick={() => onSizePerPageChange(option.page)}
                  className={`btn ${
                    isSelect ? "btn-secondary" : "btn-warning"
                  }`}
                >
                  {option.text}
                </button>
              );
            })}
          </div>
        ),
        totalSize,
      })}
    >
      {({ paginationProps, paginationTableProps }) => (
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
            <SizePerPageDropdownStandalone {...paginationProps} />
            <PaginationListStandalone {...paginationProps} />
          </div>
        </div>
      )}
    </PaginationProvider>
  </div>
);

const CategoryInfoRenderer = ({
  allCategory,
  categories,
  category,
  isEdit,
}) => {
  return (
    <div className="container-fluid mb-5">
      {!isEdit ? (
        <div className="row">
          <p className="col-12" style={{ textTransform: "capitalize" }}>
            <strong>Category ID:</strong> {category.id}
          </p>
          <p className="col-12" style={{ textTransform: "capitalize" }}>
            <strong>Category Name:</strong> {category.name}
          </p>
          <p className="col-12" style={{ textTransform: "capitalize" }}>
            <strong>Parent Category ID:</strong>{" "}
            {category.parentId ? category.parentId : "N/A"}
          </p>
          <p className="col-12" style={{ textTransform: "capitalize" }}>
            <strong>Category's Parent:</strong>{" "}
            {category.parentId
              ? categories.find((item) => item.id === category.parentId).name
              : "N/A"}
          </p>
        </div>
      ) : (
        <EditForm categoryList={allCategory} category={category} />
      )}
    </div>
  );
};

const ManageCategory = () => {
  const [total, setTotal] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [paginationSize, setPaginationSize] = React.useState(5);

  const [categories, setCategories] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [isEdit, setIsEdit] = React.useState(false);

  const [allCategory, setAllCategory] = React.useState([]);

  const [searchText, setSearchText] = React.useState("");

  const [isOpenForm, setIsOpenForm] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    const callApi = async () => {
      await serverAPI.get(`/categories`).then((res) => {
        console.log(res.data)
        setAllCategory(res.data);
      });
    };
    callApi();
    serverAPI
      .get(
        `/categories?_page=${currentPage}&_limit=${paginationSize}&name_like=${searchText}`
      )
      .then((res) => {
        setTotal(res.headers["x-total-count"]);
        setCategories(res.data);
      })
      .catch((err) => {
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
      text: "ID",
    },
    {
      dataField: "",
      text: "Category Name",
      formatter: (row, cell) => {
        return (
          <p id={cell.id} style={{ textTransform: "capitalize" }}>
            {cell.name}
          </p>
        );
      },
    },
    {
      dataField: "",
      text: "Parent Category",
      formatter: (row, cell) => {
        return (
          <p style={{ textTransform: "capitalize" }} id={cell.id}>
            {cell.parentId
              ? allCategory.find((item) => item.id === cell.parentId)?.name
              : "N/A"}
          </p>
        );
      },
    },
    {
      text: "Action",
      dataField: "",
      formatter: (row, cell) => {
        return (
          <div className="d-flex" style={{ gap: 2 }} id={cell.id}>
            <Button
              variant="primary"
              onClick={() => handleEditCategory(cell.id)}
            >
              <i className="fa fa-edit fs-5"></i>
            </Button>
            <Button variant="danger" onClick={() => handleDeleteCategory(cell)}>
              <i className="fa fa-trash fs-5"></i>
            </Button>
          </div>
        );
      },
    },
  ];

  function handleEditCategory() {
    setIsEdit(() => !isEdit);
  }

  function handleDeleteCategory(category) {
    if (allCategory.find((item) => item.parentId === category.id)) {
      window.alert(
        `Cannot delete this category because it have child category`
      );
      return;
    }
    if (
      window.confirm(`Are you sure to delete category ${category.name}?`) ===
      false
    )
      return;
    serverAPI
      .delete(`/categories/${category.id}`)
      .then((res) => {
        setCategories(categories.filter((item) => item.id !== category.id));
        setCurrentPage(0);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <AdminLayout>
      <h1>Manage Category</h1>
      <hr />
      <div className="my-5">
        <form className="position-relative">
          <input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="bg-white pr-5"
            placeholder="Tìm kiếm Category"
          />
          <i
            className="fa fa-search fs-5 position-absolute"
            style={{
              top: "50%",
              right: "8px",
              transform: "translateY(-50%)",
            }}
          />
        </form>
      </div>

      <Button
        style={{ marginBottom: "20px" }}
        onClick={() => setIsOpenForm(() => !isOpenForm)}
      >
        Add
        <i className="fa fa-plus fs-5" style={{ marginLeft: "10px" }}></i>
      </Button>
      {isOpenForm ? <AddForm categoryList={allCategory} /> : <></>}
      <RemotePagination
        columns={columns}
        data={categories}
        page={currentPage}
        sizePerPage={paginationSize}
        totalSize={total}
        expandRow={{
          onlyOneExpanding: true,
          renderer: (row) => (
            <CategoryInfoRenderer
              allCategory={allCategory}
              categories={categories}
              category={row}
              isEdit={isEdit}
            />
          ),
        }}
        noDataIndication={
          loading
            ? "Đang tải ..."
            : error
            ? `Lỗi: ${error}`
            : "Không có category nào trong hệ thống"
        }
        onTableChange={(type, { page, sizePerPage }) => {
          setCurrentPage(page);
          setPaginationSize(sizePerPage);
        }}
      />
    </AdminLayout>
  );
};

export default ManageCategory;
