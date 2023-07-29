import axios from "axios";
import { useState, useEffect } from "react";
import CompanyCard from "./Card";
import { useNavigate } from "react-router-dom";
const baseURL = "http://13.233.130.209:5000/api/v1/";
const currentURL = baseURL;

function ProductView({ setTransferObject }) {
  const navigate = useNavigate();
  const [companyData, setCompanyData] = useState([]);

  const callAPI = () => {
    axios.post(currentURL + "product/list").then(({ data }) => {
      console.log(data.data);
      setCompanyData(data.data);
    });
  };

  useEffect(() => {
    callAPI();
  }, []);

  const handleClickCompanyCard = (item) => {
    setTransferObject(item);
    navigate("/product/update");
  };

  return (
    <div className="add-page">
      <div className="title">Product List</div>

      <div className="addBtn-container">
        <button
          className="addBtn"
          id="addBtn"
          onClick={() => navigate("/product/add")}
        >
          Add Product
        </button>
      </div>
      {companyData.map((item) => {
        return (
          <CompanyCard
            id={item._id}
            title={item.name}
            key1={"GST Rate"}
            field1={item.gstRate}
            key2={"HSN No."}
            field2={item.hsn}
            stateFlag={item.unit}
            clickProp={() => handleClickCompanyCard(item)}
          />
        );
      })}
    </div>
  );
}

export default ProductView;
