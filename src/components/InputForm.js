import React, { useContext } from "react";
import { FormContext } from "../App";

const InputForm = () => {
  const providerValue = useContext(FormContext);
  const currencies = {
    USD: providerValue.exchangeRates.USD,
    EUR: providerValue.exchangeRates.EUR,
  };

  if (!providerValue)
    return (
      <div>
        <p>Exchange data is not available</p>
      </div>
    );

  const handleFirstInputChange = (e) => {
    const re = /^[0-9.\b]+$/;

    if (e.target.value !== "" && !re.test(e.target.value)) {
      return;
    }

    providerValue.setFormData((prevState) => ({
      ...prevState,
      firstValue: e.target.value,
    }));

    if (
      providerValue.formData.firstCurrency &&
      providerValue.formData.secondCurrency
    ) {
      providerValue.setFormData((prevState) => ({
        ...prevState,
        firstValue: e.target.value,
        secondValue:
          (+e.target.value * currencies[providerValue.formData.firstCurrency]) /
          currencies[providerValue.formData.secondCurrency],
      }));
    } else {
      providerValue.setFormData((prevState) => ({
        ...prevState,
        firstValue: e.target.value,
      }));
    }
  };

  const handleSecondInputChange = (e) => {
    const re = /^[0-9.\b]+$/;

    if (e.target.value !== "" && !re.test(e.target.value)) {
      return;
    }

    providerValue.setFormData((prevState) => ({
      ...prevState,
      secondValue: e.target.value,
    }));

    if (
      providerValue.formData.firstCurrency &&
      providerValue.formData.secondCurrency
    ) {
      providerValue.setFormData((prevState) => ({
        ...prevState,
        secondValue: e.target.value,
        firstValue:
          (+e.target.value *
            currencies[providerValue.formData.secondCurrency]) /
          currencies[providerValue.formData.firstCurrency],
      }));
    } else {
      providerValue.setFormData((prevState) => ({
        ...prevState,
        secondValue: e.target.value,
      }));
    }
  };

  const handleFirstSelectChange = (e) => {
    if (
      providerValue.formData.secondCurrency &&
      providerValue.formData.secondValue
    ) {
      providerValue.setFormData((prevState) => ({
        ...prevState,
        firstCurrency: e.target.value,
        firstValue:
          (+providerValue.formData.secondValue *
            currencies[providerValue.formData.secondCurrency]) /
          currencies[e.target.value],
      }));
    } else {
      providerValue.setFormData((prevState) => ({
        ...prevState,
        firstCurrency: e.target.value,
      }));
    }
  };

  const handleSecondSelectChange = (e) => {
    if (
      providerValue.formData.firstCurrency &&
      providerValue.formData.firstValue
    ) {
      providerValue.setFormData((prevState) => ({
        ...prevState,
        secondCurrency: e.target.value,
        secondValue:
          (+providerValue.formData.firstValue *
            currencies[providerValue.formData.firstCurrency]) /
          currencies[e.target.value],
      }));
    } else {
      providerValue.setFormData((prevState) => ({
        ...prevState,
        secondCurrency: e.target.value,
      }));
    }
  };

  return (
    <div>
      {/* Form 1 */}

      <form className="form-group">
        <label>
          Enter amount:
          <input
            className="form-control"
            type="text"
            value={providerValue.formData.firstValue}
            onChange={handleFirstInputChange}
          />
          <label>
            Choose currency:
            <select
              className="form-control"
              value={providerValue.formData.firstCurrency}
              onChange={handleFirstSelectChange}
            >
              <option></option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="UAH">UAH</option>
            </select>
          </label>
        </label>

        <label>
          Enter amount:
          <input
            className="form-control"
            type="text"
            value={providerValue.formData.secondValue}
            onChange={handleSecondInputChange}
          />
          <label>
            Choose currency:
            <select
              className="form-control"
              value={providerValue.formData.secondCurrency}
              onChange={handleSecondSelectChange}
            >
              <option></option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="UAH">UAH</option>
            </select>
          </label>
        </label>
      </form>

      {/* Form 2 */}
      <form></form>
      <p>{providerValue.formData.firstValue}</p>
    </div>
  );
};

export default InputForm;
