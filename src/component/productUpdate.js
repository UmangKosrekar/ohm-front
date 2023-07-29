import axios from "axios";
import { useEffect, useState } from "react";
import Select from "react-select";
import format from "../format";
import { useNavigate } from "react-router-dom";
const baseURL = "http://13.233.130.209:5000/api/v1/";
const options = [
  { value: "Liter", label: "Liter" },
  { value: "mL", label: "mL" },
  { value: "Caboy", label: "Caboy" },
  { value: "KG", label: "KG" },
  { value: "Gram", label: "Gram" },
];

function ProductUpdate({ transferObject }) {
  const navigate = useNavigate();
  const [reqObj, setReqObj] = useState(transferObject);
  const [commentSection, setCommentSection] = useState("");
  const [commentColor, setCommentColor] = useState("");
  const [defaultSelect, setDefaultSelect] = useState(null);

  useEffect(() => {
    if (transferObject && transferObject.unit) {
      for (let i = 0; i < options.length; i++) {
        if (options[i].value == transferObject.unit) {
          setDefaultSelect(options[i]);
        }
      }
    }
  }, []);

  const onChangeHandler = (e) => {
    setReqObj({ ...reqObj, [e.target.id]: e.target.value });
  };

  const handleSelectChange = (option) => {
    setDefaultSelect(option);
    setReqObj({ ...reqObj, unit: option.value });
  };

  const onClickHandler = async () => {
    console.log("reqObj", reqObj);
    await axios
      .put(baseURL + "product/update", {
        ...reqObj,
        id: reqObj._id,
        _id: undefined,
      })
      .then(({ data }) => {
        setCommentColor("green");
        setCommentSection(format.capitalize(data.msg));
        setReqObj({});
        navigate("/product");
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
              value={reqObj.name}
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
              value={reqObj.hsn}
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
              value={reqObj.gstRate}
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
                value={defaultSelect}
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
            Update Product
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductUpdate;
