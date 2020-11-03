import React, { useEffect, useState } from "react";
import { getAllCities } from "../auth/index";

const Home = () => {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    getAllCities()
      .then((cities) => {
        setCities(cities);
      })
      .catch((err) => {
        console.log("ERROR", err);
      });
  });

  return (
    <div className="jumbotron">
      <h2>Home</h2>

      <p className="lead">Welcome to this!</p>

      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">State</th>
          </tr>
        </thead>

        <tbody>
          {cities.map((ele, i) => {
            return (
              <tr key={ele.id}>
                <td scope="row">{ele.id}</td>
                <td>{ele.name}</td>
                <td>{ele.state}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
