import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import { useForm } from "react-hook-form";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { Autocomplete, TextFieldWidgetDateRange, Graphic } from "../components";
import Services from "../services";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright © "}
            <Link color="inherit" href="https://material-ui.com/">
                WE
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}
const defaultValues = {
    country: null,
};
export default function Home() {
    const [covid, setCovid] = useState([]);
    const [clearRangeState, setClearRangeState] = useState(false);
    const [beginRangeState, setBeginRangeState] = useState(false);
    const [endRangeState, setEndRangeState] = useState(false);
    const { handleSubmit, register, reset, control, errors } = useForm({
        defaultValues,
    });
    const onSubmit = (data) => console.log(data);
    useEffect(() => {
        getCovid();
    }, []);
    const getCovid = () => {
        Services.getAll()
            .then((response) => {
                //setCovid(response.data);
                console.log(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    };
    return (
        <Container component="main" maxWidth="xs" className="container">
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
                                onChange={(values) => {
                                    setBeginRangeState(values.begin);
                                    setEndRangeState(values.end);
                                }}
                            />
                        </MuiPickersUtilsProvider>
                    </div>
                    <div className="form-item">
                        <Button type="submit" fullWidth variant="contained" color="primary">
                            Search
                        </Button>
                    </div>
                </form>
                <Graphic />
            </div>
            <Box mt={1}>
                <Copyright />
            </Box>
        </Container>
    );
}
