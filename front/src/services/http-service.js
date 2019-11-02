import axios from 'axios';

export default class HttpService  {

  getChatLocations() {

    if  (process.env.MODE == "mockdata") {
        return axios.get('/chat-locations.json');
    }

    return axios.get('/api/chat-locations')
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }
}
