// import logo from './logo.svg';
// import './App.css';

import { useEffect, useState } from "react";

function App() {
  const [country, setCountry] = useState([]);
  const [state, setState] = useState([]);
  const [city, setCity] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    fetch("https://crio-location-selector.onrender.com/countries")
      .then((res) => res.json())
      .then((data) => setCountry(data))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    setSelectedCity("");
    setSelectedState("");
    setCity([]);
    fetch(
      `https://crio-location-selector.onrender.com/country=${selectedCountry}/states`
    )
      .then((res) => res.json())
      .then((data) => {
        setState(data);
      })
      .catch((error) => console.error(error));
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedState) {
      setSelectedCity("");
      fetch(
        `https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`
      )
        .then((res) => res.json())
        .then((data) => {
          setCity(data);
        })
        .catch((error) => console.error(error));
    }
  }, [selectedState]);

  return (
    <div
      style={{
        display: " flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "20px",
      }}
    >
      <h1>Select Location</h1>
      <div>
        <select
          name="country"
          id="country"
          style={{ width: "300px", height: "25px", margin: "10px" }}
          value={selectedCountry}
          onChange={(event) => setSelectedCountry(event.target.value)}
        >
          <option value="" disabled>
            Select a Country
          </option>
          {country.map((ele) => (
            <option key={ele} value={ele}>
              {ele}
            </option>
          ))}
        </select>

        <select
          name="states"
          id="states"
          style={{ width: "200px", height: "25px", margin: "10px" }}
          disabled={!selectedCountry}
          value={selectedState}
          onChange={(event) => setSelectedState(event.target.value)}
        >
          <option value="" disabled>
            Select a State
          </option>
          {state.map((ele) => (
            <option key={ele} value={ele}>
              {ele}
            </option>
          ))}
        </select>

        <select
          name="city"
          id="city"
          style={{ width: "100px", height: "25px", margin: "10px" }}
          disabled={!selectedState}
          value={selectedCity}
          onChange={(event) => setSelectedCity(event.target.value)}
        >
          <option value="" disabled>
            Select a City
          </option>
          {city.map((ele) => (
            <option key={ele} value={ele}>
              {ele}
            </option>
          ))}
        </select>
      </div>
      <div>
        {selectedCountry && selectedState && selectedCity && (
          <p>
            You selected {selectedCity}, {selectedState}, {selectedCountry}
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
