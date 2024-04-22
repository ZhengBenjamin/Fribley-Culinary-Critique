import axios from "axios"; 

const url = 'http://localhost:5000/api/stations/';

class StationService {
  //Get Stations
  static getStations() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(url);
        const data = res.data;
        resolve (
          data.map(station => ({
            ...station,
            createdAt: new Date(station.createdAt)
          }))
        );
      } catch(err) {
        
      }
    })
  }

  //Add Rating
  static addRatingToStation(id, rating) {
    return axios.post(`${url}${id}/add-rating`, { rating });
  }

  //Add Comment
  static addCommentToStation(id, comment) {
    return axios.post(`${url}${id}/add-comment`, { comment });
  }

  //Get Comments
  static getCommentsForStation(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(`${url}${id}/comments`);
        const data = res.data;
        resolve (
          data.map(comment => ({
            ...comment,
            createdAt: new Date(comment.createdAt)
          }))
        );
      } catch(err) {
        
      }
    })
  }

  //Create Station
  static insertStation(text) {
    return axios.station(url, {
      text
    })
  }

  //Delete Station
  static deleteStation(id) {
    return axios.delete(`${url}${id}`)
  }
}

export default StationService; 