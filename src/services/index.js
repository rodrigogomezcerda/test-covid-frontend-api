const getByCountry = (country, fromDate, toDate) => {
    return `${country}/status/confirmed?from=${fromDate}&to=${toDate}`;
};

const getCountries = () => {
    return conexionApiCountries.get(`all`);
};

export default {
    getByCountry,
    getCountries,
};
