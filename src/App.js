import React, { useState, useEffect, useMemo } from "react";
import "./App.css";
import Header from "./components/Header";
import InputForm from "./components/InputForm";
import axios from "axios";

export const FormContext = React.createContext();

const API_KEY = "Pvlu5bAwb2qRszxF4aqdmMnDh9yYuEZ2RO8RSMjB";

function App() {
  const [exchangeRates, setExchangeRates] = useState({});
  const [formData, setFormData] = useState({
    firstValue: "",
    secondValue: "",
    firstCurrency: "",
    secondCurrency: "",
  });

  // useEffect(() => {
  //   setExchangeRates({ USD: 30, EUR: 35 });
  // }, []);

  const providerValue = React.useMemo(
    () => ({
      exchangeRates,
      setExchangeRates,
      formData,
      setFormData,
    }),
    [exchangeRates, formData]
  );

  useEffect(() => {
    axios
      .get(
        `https://api.currencyapi.com/v3/latest/?apikey=${API_KEY}&base_currency=UAH&currencies=EUR,USD`
      )
      .then((res) => {
        console.log();
        let result = res.data.data;
        setExchangeRates({
          USD: (1 / result.USD.value).toFixed(5),
          EUR: (1 / result.EUR.value).toFixed(5),
        });
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <FormContext.Provider value={providerValue}>
      <div className="App">
        <Header></Header>
        <InputForm></InputForm>
      </div>
    </FormContext.Provider>
  );
}

export default App;
