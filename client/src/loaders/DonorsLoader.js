import axios from "axios";

const DonorsLoader = async () => {
  return await axios
    .get(`${import.meta.env.VITE_API_URL}/users/donors?count=true`)
    .then((response) => response.data);
};

export default DonorsLoader;
