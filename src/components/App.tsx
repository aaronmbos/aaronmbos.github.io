import React from "react";
import logo from "../logo.svg";
import "../styles/App.css";
import { useQuery, gql } from "@apollo/client";

const GET_LOCATIONS = gql`
  query GetLocations {
    locations {
      id
      name
      description
      photo
    }
  }
`;

function DisplayLocations() {
  const { loading, error, data } = useQuery(GET_LOCATIONS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error 🙁</p>;

  return data.locations.map((location: any) => (
    <div key={location.id}>
      <h3>{location.name}</h3>
      <img
        width="400"
        height="250"
        alt="location-reference"
        src={`${location.photo}`}
      />
      <br />
      <b> About this location:</b>
      <p>{location.description}</p>
      <br />
    </div>
  ));
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>My first Apollo app 🚀</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <DisplayLocations />
    </div>
  );
}

export default App;
