import React from "react";
import StationService from "./StationService";
import "./App.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { Component, useState, useEffect } from "react";

function Ratings() {
  const [stations, setStations] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const data = await StationService.getStations();
        setStations(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchStations();
  }, []);

  return (
    <div>
      <div id="carousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src={require("./images/insidetop.jpeg")}
              className="d-block w-100"
              alt="..."
            />
          </div>
        </div>
      </div>
      <div className="bg-dark text-light">
        <div className="headings">
          <h3>View the Stations</h3>
        </div>
      </div>

      <div
        className="web-body"
        style={{ paddingTop: "50px", paddingBottom: "50px" }}
      >
        <div className="row">
          <div className="col-md-6">
            <h3>These are the stations available to rate.</h3>
            <p style={{ margin: 0 }}>
              Click on the "Rate" button to leave a review.
            </p>
          </div>
          <div className="col-md-6">
            <div className="text-end" style={{ padding: 0 }}>
              <button className="btn btn-dark">
                <Link to="/suggest" className="nav-link">
                  To suggest a missing station, Click Here!
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="web-body">
        {error && <p className="error">{error}</p>}
        {stations.map((station) => (
          <Items key={station._id} params={station} />
        ))}
      </div>
    </div>
  );
}

function Items(props) {
  const [params, setParams] = useState(props.params);
  const [rateButtonPressed, setButtonPressed] = useState(false);
  const [viewButtonPressed, setViewPressed] = useState(false);
  const [averageRating, setAverageRating] = useState(0);
  const [comments, setComments] = useState(params.comments);

  let station = params.station;
  let description = params.description;
  let rating = params.ratings;
  let stationImage = params.image;
  let id = params._id;

  useEffect(() => {
    setAverageRating(ratingAverage());
  }, [params.ratings]);

  function toggleButtonPressed() {
    setButtonPressed(!rateButtonPressed);
  }

  function toggleViewPressed() {
    setViewPressed(!viewButtonPressed);
  } 

  function updateComments(newComment) {
    setComments([...comments, newComment]);
  }

  function updateRating(userRating) {
    let sum = 0;

    for (let i = 0; i < rating.length; i++) {
      sum += rating[i];
    }

    sum += Number(userRating);

    let average = sum / (rating.length + 1);
    setAverageRating(average.toFixed(1));
    toggleButtonPressed();
  }

  function ratingAverage() {
    let sum = 0;
    for (let i = 0; i < rating.length; i++) {
      sum += rating[i];
    }
    let average = sum / rating.length;

    if (isNaN(average)) {
      return "No ratings yet";
    } else {
      return average.toFixed(1);
    }
  }

  return (
    <div className="card mb-3">
      <div className="station-image">
        <img
          className="card-img-top"
          src={require(`${stationImage}`)}
          alt="Station"
        />
      </div>

      <div className="card-body">
        <h5 className="card-title">{station}</h5>
        <p className="card-text">{description}</p>
        <p className="card-text"> Rating: {averageRating}</p>
        <div className="btn-toolbar">
          <button className="btn btn-dark ratings-buttons" onClick={toggleButtonPressed} style={{marginRight: 20, paddingLeft: 30, paddingRight: 30}}>
            Rate
          </button>
          <br />
          <button className="btn btn-dark" onClick={toggleViewPressed}>
            Comments
          </button>
        </div>
      </div>
      <Rate
        trigger={rateButtonPressed}
        toggleAddButtonPressed={() => toggleButtonPressed()}
        station={station}
        onClose={(rating) => updateRating(rating)}
        onComment={(comment) => updateComments(comment)}
        stationId={id}
      />
      <View 
        trigger={viewButtonPressed} 
        onClose={() => toggleViewPressed()}
        station={station} 
        comments={comments} />
    </div>
  );
}

function Rate(props) {
  const [userRating, setUserRating] = useState(0);
  const [commentText, setCommentText] = useState("");

  const handleRatingChange = (e) => {
    setUserRating(e.target.value);
  };

  const handleCommentChange = (e) => {
    setCommentText(e.target.value);
  };

  const handleSubmit = () => {
    handleSubmitRating(props.stationId, userRating);
    if (commentText.trim() != "") {
      handleSubmitComment(props.stationId, commentText.trim());
      props.onComment(commentText.trim());
    }

    setUserRating(0);
    setCommentText("");
    props.onClose(userRating);
  };

  const handleClose = () => {
    props.toggleAddButtonPressed();
  };

  const handleSubmitRating = async (stationId, ratingValue) => {
    try {
      await StationService.addRatingToStation(stationId, Number(ratingValue));
    } catch (error) {
      console.error("Error adding rating:", error);
    }
  };

  const handleSubmitComment = async () => {
    try {
      await StationService.addCommentToStation(props.stationId, commentText);
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return props.trigger ? (
    <div className="popup">
      <div className="card bg-light text-dark">
        <div className="card-header">Rate {props.station}</div>
        <div className="card-body">
          <h5 className="card-title">What do you think about {props.station}?</h5>
          <label htmlFor="rating" className="form-label">
            Your Rating: {userRating}
          </label>
          <input
            type="range"
            className="form-range"
            min="0"
            max="5"
            defaultValue="0"
            id="rating"
            onChange={handleRatingChange}
          />
          <div className="mb-3">
            <label htmlFor="comments" className="form-label">
              Comments (Optional)
            </label>
            <textarea
              value={commentText}
              onChange={handleCommentChange}
              className="form-control"
              id="comments"
              rows="3"
            ></textarea>
          </div>
          <button className="small-btn btn btn-primary" onClick={handleClose}>
            Close
          </button>
          <button className="small-btn btn btn-success" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  ) : null;
}

function View(props) {

  return props.trigger ? (
    <div className="popup">
      <div className="card bg-light text-dark comment-popup">
        <div className="card-header">Comments for {props.station}:</div>
        <div className="card-body">
        {props.comments.length === 0 ? (
            <p>No comments yet! Be the first to leave a comment!</p>
          ) : (
            <div>
              <h3 className="card-text">Comments:</h3>
              <hr />
              {props.comments.map((comment) => (
                <Comment key={comment} params={comment} />
              ))}
            </div>
          )}
          <button className="small-btn btn btn-primary" onClick={props.onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  ) : null;
}

function Comment(props) {
  return (
    <div>
      <p>{props.params}</p>
      <hr />
    </div>
  );
}

export default Ratings;
