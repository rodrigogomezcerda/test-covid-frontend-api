import apiCovid from "../config/api";

const getAll = () => {
    return apiCovid.get("/all");
};

export default {
    getAll,
};
