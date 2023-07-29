import axios from "axios";
import { useEffect, useState } from "react";
import Select from "react-select";
import format from "../format";
import { useNavigate } from "react-router-dom";
const baseURL = "http://13.233.130.209:5000/api/v1/";
const options = [
  { value: "State", label: "State" },
  { value: "Inter-State", label: "Inter-State" },
];

function CompanyUpdate({ transferObject }) {
  const navigate = useNavigate();
  const [reqObj, setReqObj] = useState(transferObject);
  const [commentSection, setCommentSection] = useState("");
  const [commentColor, setCommentColor] = useState("");
  const [defaultSelect, setDefaultSelect] = useState(null);

  useEffect(() => {
    if (transferObject && transferObject.salesType) {
      if (transferObject.salesType == "State") {
        setDefaultSelect(options[0]);
      } else {
        setDefaultSelect(options[1]);
      }
    }
  }, []);

  const onChangeHandler = (e) => {
    setReqObj({ ...reqObj, [e.target.id]: e.target.value });
  };

  const handleSelectChange = (option) => {
    setDefaultSelect(option);
    setReqObj({ ...reqObj, salesType: option.value });
  };

  const onClickHandler = async () => {
    console.log("reqObj", reqObj);
    await axios
      .put(baseURL + "company/update", {
        ...reqObj,
        id: reqObj._id,
        _id: undefined,
      })
      .then(({ data }) => {
        setCommentColor("green");
        setCommentSection(format.capitalize(data.msg));
        setReqObj({});
        navigate("/company");
      })
      .catch(({ response }) => {
        setCommentColor("red");
        setCommentSection(format.capitalize(response.data.msg));
      });
  };

  return (
    <div className="add-page">
      <div className="title">Company Update</div>
      <div className="form-container">
        <div className="form-cell">
          <div class="group">
            <input
              type="text"
              required
              id="name"
              value={reqObj.name}
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
              value={reqObj.phone}
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
              value={reqObj.address}
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
              value={reqObj.gst}
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
              value={defaultSelect}
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
              value={reqObj.contactPersonName}
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
              value={reqObj.contactPersonPhone}
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
              value={reqObj.ReferenceBy}
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
            Update Company
          </button>
        </div>
      </div>
    </div>
  );
}

export default CompanyUpdate;
