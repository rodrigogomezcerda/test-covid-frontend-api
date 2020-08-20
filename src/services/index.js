import { conexionApiCovid, conexionApiCountries } from "../config/api";

const getByCountry = (country, fromDate, toDate) => {
    return conexionApiCovid.get(`${country}/status/confirmed?from=${fromDate}&to=${toDate}`);
};

const getCountries = () => {
    return conexionApiCountries.get(`all`);
};

export default {
    getByCountry,
    getCountries,
};
