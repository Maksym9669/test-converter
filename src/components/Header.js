import React, { useContext } from "react";
import { FormContext } from "../App";

const Header = () => {
  const providerValue = useContext(FormContext);
  if (!providerValue)
    return (
      <div>
        <p>Exchange data is not available</p>
      </div>
    );

  return (
    <div>
      <h1>Exchange rates</h1>
      <p>
        {!providerValue ? (
          <p>Exchange data is not available</p>
        ) : (
          <div>
            <p>
              <b>USD:</b> {providerValue.exchangeRates.USD} UAH
            </p>
            <p>
              <b>EUR:</b> {providerValue.exchangeRates.EUR} UAH
            </p>
          </div>
        )}
      </p>
    </div>
  );
};

export default Header;
