import { Component, useState } from "react";
import SuggestionsService from "./SuggestionsService";

const Suggest = () => {
  return <SuggestNew />;
};

function SuggestNew() {
  const [stationName, setStationName] = useState("");
  const [description, setDescription] = useState("");
  const [comments, setComments] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const handleStationNameChange = (e) => {
    setStationName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleCommentsChange = (e) => {
    setComments(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await SuggestionsService.insertSuggestion(
        stationName,
        description,
        comments
      );
      setStationName("");
      setDescription("");
      setComments("");
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false); 
      }, 2000);
    } catch (err) {
      console.error("Error submitting suggestion:", err);
    }
  };

  return (
    <div>
      <div id="carousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src={require("./images/outside.jpeg")}
              className="d-block w-100"
              alt="..."
            />
          </div>
        </div>
      </div>
      <div className="bg-dark text-light">
        <div className="headings">
          <h3>Suggest a New Station</h3>
        </div>
      </div>

      <div className="web-body">
        <br />
        <div className="row">
          <div className="col-md-6">
            <div className="web-col-left">
              <h3>Thank you for contributing to Fribley Culinary Critique</h3>
              <p>
                Help us improve our dining hall experience by suggesting a new
                station
              </p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="web-col-right">
              <form className="text-dark" onSubmit={handleSubmit}>
                <div className="form-floating">
                  <input
                    className="form-control"
                    id="station"
                    placeholder="Station Name"
                    required
                    value={stationName}
                    onChange={handleStationNameChange}
                  />
                  <label htmlFor="station">Station Name</label>
                </div>
                <br />
                <div className="form-floating">
                  <input
                    className="form-control"
                    id="description"
                    placeholder="Description"
                    required
                    value={description}
                    onChange={handleDescriptionChange}
                  />
                  <label htmlFor="description">Station Description</label>
                </div>
                <br />
                <div className="form-floating">
                  <input
                    className="form-control"
                    id="comments"
                    placeholder="Description"
                    required
                    value={comments}
                    onChange={handleCommentsChange}
                  />
                  <label htmlFor="comments">Comments</label>
                </div>
                <br />
                <button type="submit" className="btn btn-success">
                  Add
                </button>
              </form>
              {showPopup && <Popup />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


function Popup() {
  return (
    <div className="popup">
    <div className="card text-center">
      <div className="card-body">
        <h5 className="card-title">Suggestion Submitted</h5>
        <p className="card-text">Thank you for your suggestion!</p>
      </div>
    </div>
    </div>
  )
}
export default Suggest;
