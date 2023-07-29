import "./App.css";
import CompanyAdd from "./component/companyAdd";
import CompanyView from "./component/companyView";
import CompanyUpdate from "./component/companyUpdate";
import ProductUpdate from "./component/productUpdate";
import ProductAdd from "./component/productAdd";
import ProductView from "./component/productView";
import { Routes, Route, useNavigate } from "react-router-dom";
import { AiFillFile, AiFillDollarCircle } from "react-icons/ai";
import { SiProducthunt } from "react-icons/si";
import { useState } from "react";

function App() {
  const navigate = useNavigate();
  let [navBarClassName, setNavBarClassName] = useState("menuBtn-container");
  let [transferObject, setTransferObject] = useState({});
  const navMenu = () => {
    if (navBarClassName == "menuBtn-container") {
      setNavBarClassName("menuBtn-container menuBtn-change");
    } else {
      setNavBarClassName("menuBtn-container");
    }
  };

  return (
    <div className="App">
      <div className="nav-bar">
        <div
          className={navBarClassName}
          onClick={() => {
            navMenu();
          }}
        >
          <div className="bar1"></div>
          <div className="bar2"></div>
          <div className="bar3"></div>
        </div>
        <ul>
          <li onClick={() => navigate("/company")}>
            <AiFillFile /> Company
          </li>
          <li onClick={() => navigate("/product")}>
            <SiProducthunt /> Products
          </li>
          <li onClick={() => navigate("/order")}>
            <AiFillDollarCircle /> Order
          </li>
        </ul>
      </div>
      <Routes>
        <Route
          path="/company"
          element={<CompanyView setTransferObject={setTransferObject} />}
        />
        <Route path="/company/add" element={<CompanyAdd />} />
        <Route
          path="/company/update"
          element={<CompanyUpdate transferObject={transferObject} />}
        />
        <Route
          path="/product"
          element={<ProductView setTransferObject={setTransferObject} />}
        />
        <Route path="/product/add" element={<ProductAdd />} />
        <Route
          path="/product/update"
          element={<ProductUpdate transferObject={transferObject} />}
        />
      </Routes>
    </div>
  );
}

export default App;
