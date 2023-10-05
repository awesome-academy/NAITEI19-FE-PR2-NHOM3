// get products
export const getProducts = (products, category, type, limit) => {
  const finalProducts = category
    ? products.filter(
        (product) => product.category.filter((single) => single === category)[0]
      )
    : products;

  if (type && type === "new") {
    const newProducts = finalProducts.filter((single) => single.new);
    return newProducts.slice(0, limit ? limit : newProducts.length);
  }
  if (type && type === "bestSeller") {
    return finalProducts
      .sort((a, b) => {
        return b.saleCount - a.saleCount;
      })
      .slice(0, limit ? limit : finalProducts.length);
  }
  if (type && type === "saleItems") {
    const saleItems = finalProducts.filter(
      (single) => single.discount && single.discount > 0
    );
    return saleItems.slice(0, limit ? limit : saleItems.length);
  }
  return finalProducts.slice(0, limit ? limit : finalProducts.length);
};

// get product discount price
export const getDiscountPrice = (price, discount) => {
  return discount && discount > 0 ? price - price * (discount / 100) : null;
};

// get product cart quantity
export const getProductCartQuantity = (cartItems, product, color, size) => {
  let productInCart = cartItems.filter(
    (single) =>
      single.id === product.id &&
      (single.selectedProductColor
        ? single.selectedProductColor === color
        : true) &&
      (single.selectedProductSize ? single.selectedProductSize === size : true)
  )[0];
  if (cartItems.length >= 1 && productInCart) {
    if (product.variation) {
      return cartItems.filter(
        (single) =>
          single.id === product.id &&
          single.selectedProductColor === color &&
          single.selectedProductSize === size
      )[0].quantity;
    } else {
      return cartItems.filter((single) => product.id === single.id)[0].quantity;
    }
  } else {
    return 0;
  }
};

//get products based on category
export const getSortedProducts = (products, sortType, sortValue) => {
  if (products) {
    let tempProducts = [...products];
    if (sortType.search) {
      tempProducts = tempProducts.filter((product) =>
        product.name.toLowerCase().includes(sortValue.search.toLowerCase())
      );
    }
    if (sortType.category) {
      tempProducts = tempProducts.filter(
        (product) =>
          product.category.filter((single) => single === sortValue.category)[0]
      );
    }
    if (sortType.tag) {
      tempProducts = tempProducts.filter(
        (product) => product.tag.filter((single) => single === sortValue.tag)[0]
      );
    }
    if (sortType.color) {
      tempProducts = tempProducts.filter(
        (product) =>
          product.variation &&
          product.variation.filter(
            (single) => single.color === sortValue.color
          )[0]
      );
    }

    if (sortType.price) {
      tempProducts = tempProducts.filter(
        (product) =>
          product.price >= sortValue.price[0] &&
          product.price <= sortValue.price[1]
      );
    }

    if (sortType.sort) {
      let sortProducts = [...tempProducts];
      if (sortValue.sort === "default") {
        return sortProducts;
      }
      if (sortValue.sort === "priceHighToLow") {
        return sortProducts.sort((a, b) => {
          return b.price - a.price;
        });
      }
      if (sortValue.sort === "priceLowToHigh") {
        return sortProducts.sort((a, b) => {
          return a.price - b.price;
        });
      }
    }
    return tempProducts;
  } else return products;
};

// get individual element
const getIndividualItemArray = (array) => {
  let individualItemArray = array.filter(function (v, i, self) {
    return i === self.indexOf(v);
  });
  return individualItemArray;
};

// get individual categories
export const getIndividualCategories = (products) => {
  let productCategories = [];
  products &&
    products.map((product) => {
      return (
        product.category &&
        product.category.map((single) => {
          return productCategories.push(single);
        })
      );
    });
  const individualProductCategories = getIndividualItemArray(productCategories);
  return individualProductCategories;
};

// get individual tags
export const getIndividualTags = (products) => {
  let productTags = [];
  products &&
    products.map((product) => {
      return (
        product.tag &&
        product.tag.map((single) => {
          return productTags.push(single);
        })
      );
    });
  const individualProductTags = getIndividualItemArray(productTags);
  return individualProductTags;
};

// get individual colors
export const getIndividualColors = (products) => {
  let productColors = [];
  products &&
    products.map((product) => {
      return (
        product.variation &&
        product.variation.map((single) => {
          return productColors.push(single.color);
        })
      );
    });
  const individualProductColors = getIndividualItemArray(productColors);
  return individualProductColors;
};

// get individual sizes
export const getProductsIndividualSizes = (products) => {
  let productSizes = [];
  products &&
    products.map((product) => {
      return (
        product.variation &&
        product.variation.map((single) => {
          return single.size.map((single) => {
            return productSizes.push(single.name);
          });
        })
      );
    });
  const individualProductSizes = getIndividualItemArray(productSizes);
  return individualProductSizes;
};

// get product individual sizes
export const getIndividualSizes = (product) => {
  let productSizes = [];
  product.variation &&
    product.variation.map((singleVariation) => {
      return (
        singleVariation.size &&
        singleVariation.size.map((singleSize) => {
          return productSizes.push(singleSize.name);
        })
      );
    });
  const individualSizes = getIndividualItemArray(productSizes);
  return individualSizes;
};

export const setActiveSort = (filterParams) => {
  console.log(
    "🚀 ~ file: product.js:209 ~ setActiveSort ~ filterParams:",
    filterParams
  );
  const filterButtons = document.querySelectorAll(
    ".sidebar-widget-list-left button, .sidebar-widget-tag button, .product-filter button"
  );
  filterButtons.forEach((item) => {
    if (item.getAttribute("category-id")) {
      if (
        parseInt(item.getAttribute("category-id")) === filterParams.category
      ) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    } else if (item.getAttribute("color-value")) {
      if (item.getAttribute("color-value") === filterParams.color) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    } else if (item.getAttribute("tag-value")) {
      if (item.getAttribute("tag-value") === filterParams.tag) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    } else if (item.getAttribute("price-value")) {
      if (
        parseInt(item.getAttribute("price-value")) === filterParams.price[0]
      ) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    } else {
      item.classList.remove("active");
    }
  });
};

export const setActiveLayout = (e) => {
  const gridSwitchBtn = document.querySelectorAll(".shop-tab button");
  gridSwitchBtn.forEach((item) => {
    item.classList.remove("active");
  });
  e.currentTarget.classList.add("active");
};

export const toggleShopTopFilter = (e) => {
  const shopTopFilterWrapper = document.querySelector(
    "#product-filter-wrapper"
  );
  shopTopFilterWrapper.classList.toggle("active");
  if (shopTopFilterWrapper.style.height) {
    shopTopFilterWrapper.style.height = null;
  } else {
    shopTopFilterWrapper.style.height =
      shopTopFilterWrapper.scrollHeight + "px";
  }
  e.currentTarget.classList.toggle("active");
};
