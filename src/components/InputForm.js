import React, { useContext } from "react";
import { FormContext } from "../App";
import FormElement from "./FormElement";

const InputForm = () => {
  const providerValue = useContext(FormContext);
  const currencies = {
    USD: providerValue.exchangeRates.USD,
    EUR: providerValue.exchangeRates.EUR,
    UAH: 1,
  };
  const re = /^[0-9.\b]+$/;

  if (!providerValue)
    return (
      <div>
        <p>Exchange data is not available</p>
      </div>
    );

  const handleFirstInputChange = (e) => {
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
      <form className="form-group">
        <FormElement
          value={providerValue.formData.firstValue}
          onInputChange={handleFirstInputChange}
          currency={providerValue.formData.firstCurrency}
          onSelectChange={handleFirstSelectChange}
        ></FormElement>

        <FormElement
          value={providerValue.formData.secondValue}
          onInputChange={handleSecondInputChange}
          currency={providerValue.formData.secondCurrency}
          onSelectChange={handleSecondSelectChange}
        ></FormElement>
      </form>
    </div>
  );
};

export default InputForm;
