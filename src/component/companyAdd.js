import axios from "axios";
import { useState } from "react";
import Select from "react-select";
import format from "../format";
const baseURL = "http://13.233.130.209:5000/api/v1/";

function CompanyAdd() {
  const [reqObj, setReqObj] = useState({});
  const [commentSection, setCommentSection] = useState("");
  const [commentColor, setCommentColor] = useState("");
  const options = [
    { value: "State", label: "State" },
    { value: "Inter-State", label: "Inter-State" },
  ];

  const onChangeHandler = (e) => {
    setReqObj({ ...reqObj, [e.target.id]: e.target.value });
  };

  const handleSelectChange = (option) => {
    setReqObj({ ...reqObj, salesType: option.value });
  };

  const onClickHandler = async () => {
    await axios
      .post(baseURL + "company/create", reqObj)
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

  console.log("reqObj", reqObj);

  return (
    <div className="add-page">
      <div className="title">Company Add</div>
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
            <label>Name</label>
          </div>
          <div class="group">
            <input
              type="number"
              required
              id="phone"
              onChange={(e) => onChangeHandler(e)}
            />
            <span class="highlight"></span>
            <span class="bar"></span>
            <label>Phone</label>
          </div>
        </div>

        <div className="form-cell">
          <div class="group">
            <input
              type="text"
              required
              id="address"
              onChange={(e) => onChangeHandler(e)}
            />
            <span class="highlight"></span>
            <span class="bar"></span>
            <label>Address</label>
          </div>
          <div class="group">
            <input
              type="text"
              required
              id="gst"
              onChange={(e) => onChangeHandler(e)}
            />
            <span class="highlight"></span>
            <span class="bar"></span>
            <label>GST</label>
          </div>
        </div>

        <div className="form-cell-single">
          <div class="group">
            <Select
              options={options}
              styles={format.customStyles}
              placeholder="Select State"
              onChange={handleSelectChange}
            />
          </div>
        </div>

        <div className="form-cell">
          <div class="group">
            <input
              type="text"
              required
              id="contactPersonName"
              onChange={(e) => onChangeHandler(e)}
            />
            <span class="highlight"></span>
            <span class="bar"></span>
            <label>Contact Person Name</label>
          </div>
          <div class="group">
            <input
              type="number"
              required
              id="contactPersonPhone"
              onChange={(e) => onChangeHandler(e)}
            />
            <span class="highlight"></span>
            <span class="bar"></span>
            <label>Phone</label>
          </div>
        </div>

        <div className="form-cell-single">
          <div class="group">
            <input
              type="text"
              required
              id="ReferenceBy"
              onChange={(e) => onChangeHandler(e)}
            />
            <span class="highlight"></span>
            <span class="bar"></span>
            <label>Reference By</label>
          </div>
        </div>

        <div className={`comment-section-container`}>
          <div className={`comment-section  ${commentColor}`}>
            {commentSection}
          </div>
        </div>

        <div className="form-btn-container">
          <button className="addBtn" id="addBtn" onClick={onClickHandler}>
            Add Company
          </button>
        </div>
      </div>
    </div>
  );
}

export default CompanyAdd;
