import axios from "axios";
import { useState } from "react";
import Select from "react-select";
import format from "../format";
const baseURL = "http://13.233.130.209:5000/api/v1/";

function ProductAdd() {
  const [reqObj, setReqObj] = useState({});
  const [commentSection, setCommentSection] = useState("");
  const [commentColor, setCommentColor] = useState("");
  const options = [
    { value: "Liter", label: "Liter" },
    { value: "mL", label: "mL" },
    { value: "Caboy", label: "Caboy" },
  ];

  const handleSelectChange = (option) => {
    setReqObj({ ...reqObj, unit: option.value });
  };

  const onChangeHandler = (e) => {
    setReqObj({ ...reqObj, [e.target.id]: e.target.value });
  };

  const onClickHandler = async () => {
    await axios
      .post(baseURL + "product/create", reqObj)
      .then(({ data }) => {
        setCommentColor("green");
        setCommentSection(format.capitalize(data.msg));
        setReqObj({});
        const inputsDOMs = document.getElementsByTagName("input");
        for (let i = 0; i < inputsDOMs.length; ++i) {
          inputsDOMs[i].value = "";
        }
      })
      .catch(({ response }) => {
        setCommentColor("red");
        setCommentSection(format.capitalize(response.data.msg));
      });
  };

  return (
    <div className="add-page">
      <div className="title">Product Add</div>
      <div className="form-container">
        <div className="form-cell">
          <div class="group">
            <input
              type="text"
              required
              id="name"
              onChange={(e) => onChangeHandler(e)}
            />
            <span class="highlight"></span>
            <span class="bar"></span>
            <label>Product Name</label>
          </div>
        </div>

        <div className="form-cell">
          <div class="group">
            <input
              type="number"
              required
              id="hsn"
              onChange={(e) => onChangeHandler(e)}
            />
            <span class="highlight"></span>
            <span class="bar"></span>
            <label>HSN No.</label>
          </div>
        </div>

        <div className="form-cell">
          <div class="group">
            <input
              type="number"
              required
              id="gstRate"
              onChange={(e) => onChangeHandler(e)}
            />
            <span class="highlight"></span>
            <span class="bar"></span>
            <label>GST Rate</label>
          </div>
        </div>

        <div className="form-cell-single">
          <div className="form-cell-single">
            <div class="group">
              <Select
                options={options}
                styles={format.customStyles}
                placeholder="Select Unit"
                onChange={handleSelectChange}
              />
            </div>
          </div>
        </div>

        <div className={`comment-section-container`}>
          <div className={`comment-section  ${commentColor}`}>
            {commentSection}
          </div>
        </div>

        <div className="form-btn-container">
          <button className="addBtn" id="addBtn" onClick={onClickHandler}>
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductAdd;
