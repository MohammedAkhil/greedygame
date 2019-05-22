import axios from "axios";

export default {
  games(url) {
    return {
      getAll: () => axios.get(url)
    };
  }
};
