import { useEffect, Component, useState } from 'react';
import SuggestionsService from './SuggestionsService';
import { Link } from 'react-router-dom';

const Suggestions = () => {

  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const data = await SuggestionsService.getSuggestions();
        setSuggestions(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchSuggestions();
  }, []);

  const update = async (id) => {
    try {
      await SuggestionsService.deleteSuggestion(id);
      setSuggestions(prevSuggestions => prevSuggestions.filter(suggestion => suggestion._id !== id));
    } catch (err) {
      console.error('Error deleting suggestion:', err);
    }
  }

  return (
    <div>
      <div id="carousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={require("./images/insidesecond.jpeg")} className="d-block w-100" alt="..." />
          </div>
        </div>
      </div>
      <div className="bg-dark text-light">
        <div className="headings">
          <h3>User Suggestions</h3>
        </div>
      </div>

      <div className="web-body">
        <br /> 
        <div className="row">
          <div className="col-md-8">
          <h3>Thank you everyone that contributed to Fribley Culinary Critique</h3>
          <p>Here are all of your suggestions:</p>
          </div>
          <div className="col-md-4">
          <div className="text-end" style={{ padding: 0 }}>
              <button className="btn btn-dark">
                <Link to="/suggest" className="nav-link">
                  Click here to Suggest a Station!
                </Link>
              </button>
            </div>
          </div>
        </div>
        <br />
        {error && <p className="error">{error}</p>}
        {suggestions.map((suggestion) => (
          <SuggestionItem key={suggestion._id} params={suggestion} onClose={(id) => update(id)}/>
        ))}

      </div>
    </div>
  );
}

function SuggestionItem(props) {
  const [suggestion, setSuggestion] = useState(props.params);

  let id = suggestion._id;
  let name = suggestion.stationName;
  let description = suggestion.description;
  let comments = suggestion.comments;
  let date = suggestion.createdAt;

  function handleDelete() {
    props.onClose(id);
  }

  return (
    <div>
      <div className="card">
      <div className="card-body">
        <h5 className="card-title">Suggestion: {name}</h5>
        <p className="card-text" style={{margin: 0}}>Description: {description}</p>
        <p className="card-text">Comments: {comments}</p>
        <button onClick={handleDelete} type="button" className="btn btn-danger">Delete</button>
      </div>
    </div>
    <br />
    </div>
    
  )
}

export default Suggestions;