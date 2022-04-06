import React from "react";

const FormElement = (props) => {
  return (
    <div>
      <label>
        Enter amount:
        <input
          className="form-control"
          type="text"
          value={props.value}
          onChange={props.onInputChange}
        />
        <label>
          Choose currency:
          <select
            className="form-control"
            value={props.currency}
            onChange={props.onSelectChange}
          >
            <option></option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="UAH">UAH</option>
          </select>
        </label>
      </label>
    </div>
  );
};

export default FormElement;
