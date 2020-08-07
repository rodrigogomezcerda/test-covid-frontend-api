import api from "../config/api";

const getByCountry = (country, fromDate, toDate) => {
    return api.get(`${country}/status/confirmed?from=${fromDate}&to=${toDate}`);
};

export default {
    getByCountry,
};
