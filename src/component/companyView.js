import axios from "axios";
import { useState, useEffect } from "react";
import CompanyCard from "./Card";
import { useNavigate } from "react-router-dom";
const baseURL = "http://13.233.130.209:5000/api/v1/";
const currentURL = baseURL;

function CompanyView({ setTransferObject }) {
  const navigate = useNavigate();
  const [companyData, setCompanyData] = useState([]);

  const callAPI = () => {
    axios.post(currentURL + "company/list").then(({ data }) => {
      setCompanyData(data.data);
    });
  };

  useEffect(() => {
    callAPI();
  }, []);

  const handleClickCompanyCard = (item) => {
    setTransferObject(item);
    navigate("/company/update");
  };

  return (
    <div className="add-page">
      <div className="title">Company List</div>

      <div className="addBtn-container">
        <button
          className="addBtn"
          id="addBtn"
          onClick={() => navigate("/company/add")}
        >
          Add Company
        </button>
      </div>
      {companyData.map((item) => {
        return (
          <CompanyCard
            id={item._id}
            title={item.name}
            key1={"Phone"}
            field1={item.phone}
            key2={"Address"}
            field2={item.address}
            stateFlag={item.salesType}
            clickProp={() => handleClickCompanyCard(item)}
          />
        );
      })}
    </div>
  );
}

export default CompanyView;
