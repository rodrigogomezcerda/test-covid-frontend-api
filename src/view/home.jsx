import React, { useState } from "react";
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
import { Autocomplete, TextFieldWidgetDateRange } from "../components";

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

export default function Home() {
    const [clearRangeState, setClearRangeState] = useState(false);
    const [beginRangeState, setBeginRangeState] = useState(false);
    const [endRangeState, setEndRangeState] = useState(false);
    const { handleSubmit, register, errors, getValues, reset } = useForm();

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
                <form noValidate>
                    <div className="form-item">
                        <Autocomplete className="item" />
                    </div>
                    <div className="form-item">
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <TextFieldWidgetDateRange
                                value={[]}
                                name="period"
                                emptyLabel={clearRangeState}
                                labeltext="Período Inasistencia"
                                register={register}
                                errors={errors.period}
                                placeholder="Select date"
                                format="dd/MM/yyyy"
                                onChange={(values) => {
                                    setBeginRangeState(values.begin);
                                    setEndRangeState(values.end);
                                }}
                            />
                        </MuiPickersUtilsProvider>
                    </div>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className="form-item"
                    >
                        Search
                    </Button>
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}
