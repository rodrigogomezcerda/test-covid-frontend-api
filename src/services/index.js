const getByCountry = (country, fromDate, toDate) => {
    return `${country}/status/confirmed?from=${fromDate}&to=${toDate}`;
};

const getCountries = () => {
    return "all";
};

export default {
    getByCountry,
    getCountries,
};
