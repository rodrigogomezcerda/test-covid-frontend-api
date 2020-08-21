import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import { useForm } from "react-hook-form";
import Box from "@material-ui/core/Box";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import {
    Autocomplete,
    TextFieldWidgetDateRange,
    Graphic,
    CircularProgressComponent,
} from "../components";
import Services from "../services";
import useLazyFetch from "../hooks";
import { conexionApiCovid, conexionApiCountries } from "../config/api";
import { dateFormatIso8601 } from "../helpers";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary">
            {"Copyright © "}
            WE
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}
const defaultValues = {
    country: null,
};
export default function Home() {
    const [validDate, setValidDate] = useState(false);
    const [clearRangeState] = useState(false);
    const [beginRangeState, setBeginRangeState] = useState({
        date: "",
        dateFormat: "",
    });
    const [endRangeState, setEndRangeState] = useState({
        date: "",
        dateFormat: "",
    });
    const { handleSubmit, control, errors } = useForm({
        defaultValues,
    });

    const {
        execute,
        response: responseCovid,
        error: errorCovid,
        isLoading: isLoadingCovid,
    } = useLazyFetch({
        api: conexionApiCovid,
        method: "get",
        url: "",
    });

    const onSubmit = ({ country }) => {
        const currentDate = new Date();
        if (endRangeState.date < currentDate) {
            getByCountry(country.label, beginRangeState.dateFormat, endRangeState.dateFormat);
            setValidDate(false);
        } else {
            setValidDate(true);
            setData([]);
        }
    };

    const onChangePeriod = ({ begin, end }) => {
        const beginFormat = dateFormatIso8601(begin);
        const endFormat = dateFormatIso8601(end);
        setBeginRangeState({
            date: begin,
            dateFormat: beginFormat,
        });
        setEndRangeState({
            date: end,
            dateFormat: endFormat,
        });
    };
    const getByCountry = (country, fromDate, toDate) => {
        const url = Services.getByCountry(country, fromDate, toDate);
        execute(url);
    };

    return (
        <Container component="main" className="container">
            <CssBaseline />
            <div>
                <div className="avatar">
                    <Avatar className="color-circle">
                        <LocalHospitalIcon fontSize="large" className="color" />
                    </Avatar>
                </div>
                <div className="tipography">
                    <Typography component="h1" variant="h5">
                        Covid-19
                    </Typography>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-item">
                        <Autocomplete control={control} errors={errors.country} />
                    </div>
                    <div className="form-item">
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <TextFieldWidgetDateRange
                                value={[]}
                                name="period"
                                emptyLabel={clearRangeState}
                                labeltext="Período Inasistencia"
                                errors={errors.period}
                                control={control}
                                placeholder="Select date"
                                format="dd/MM/yyyy"
                                onChange={(values) => onChangePeriod(values)}
                            />
                        </MuiPickersUtilsProvider>
                    </div>
                    <div className="form-item">
                        <Button type="submit" fullWidth variant="contained" color="primary">
                            Search
                        </Button>
                    </div>
                </form>

                {responseCovid && responseCovid.length !== 0 ? (
                    <Graphic data={responseCovid} />
                ) : (
                    isLoadingCovid && (
                        <div className="form-item">
                            <CircularProgressComponent />
                        </div>
                    )
                )}
                {validDate && <p>Invalid Date - Max date is today</p>}
            </div>
            <Box mt={1}>
                <Copyright />
            </Box>
        </Container>
    );
}
