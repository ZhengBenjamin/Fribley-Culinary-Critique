import axios from "axios"; 

const url = 'http://localhost:5000/api/suggestions/';

class SuggestionsService {
  //Get Suggestions
  static getSuggestions() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(url);
        const data = res.data;
        resolve (
          data.map(suggestion => ({
            ...suggestion,
            createdAt: new Date(suggestion.createdAt)
          }))
        );
      } catch(err) {
        reject(err);
      }
    })
  }

  //Create Suggestion
  static insertSuggestion(stationName, description, comments) {
    return axios.post(url, {
      stationName: stationName,
      description: description,
      comments: comments
    });
  }

  //Delete Suggestion
  static deleteSuggestion(id) {
    return axios.delete(`${url}${id}`)
  }
}

export default SuggestionsService; 