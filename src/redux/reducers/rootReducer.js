import authReducer from "./authReducer";
import currencyReducer from "./currencyReducer";
import productReducer from "./productReducer";
import { combineReducers } from "redux";
import { createMultilanguageReducer } from "redux-multilanguage";

const rootReducer = combineReducers({
  multilanguage: createMultilanguageReducer({ currentLanguageCode: "en" }),
  authData: authReducer,
  currencyData: currencyReducer,
  productData: productReducer,
});

export default rootReducer;
