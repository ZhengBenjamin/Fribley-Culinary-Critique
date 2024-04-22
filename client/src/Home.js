import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-image d-flex justify-content-center align-items-center bgimg">
      <div className="text-white text-center home-content">
        <h1>Welcome to Fribley Culinary Critique</h1>
        <p>Rate your dining hall experience at Fribley Commons</p>
        <p>Click on "Ratings" to View Ratings</p>
        <p>Click on "Suggest" to Suggest a Staion</p>
        <div className="btn-toolbar">
          <button className="btn btn-dark" style={{marginRight: 20}}>
            <Link to="/ratings" className="text-light nav-link">
              Ratings
            </Link>
          </button>
          <br />
          <button className="btn btn-dark">
            <Link to="/suggest" className="text-light nav-link">
              Suggest
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
