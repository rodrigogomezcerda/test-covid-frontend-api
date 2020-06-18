import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import { useForm } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Autocomplete, TextFieldWidgetDateRange } from "../components";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright © "}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function Home() {
    const classes = useStyles();
    const [clearRangeState, setClearRangeState] = useState(false);
    const [beginRangeState, setBeginRangeState] = useState(false);
    const [endRangeState, setEndRangeState] = useState(false);
    const { handleSubmit, register, errors, getValues, reset } = useForm();

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LocalHospitalIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Covid-19
                </Typography>
                <form className={classes.form} noValidate>
                    <Autocomplete />
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <TextFieldWidgetDateRange
                            value={[]}
                            name="period"
                            emptyLabel={clearRangeState}
                            labeltext="Período Inasistencia"
                            register={register}
                            errors={errors.period}
                            placeholder="Seleccione rango de fechas"
                            format="dd/MM/yyyy"
                            onChange={(values) => {
                                setBeginRangeState(values.begin);
                                setEndRangeState(values.end);
                            }}
                        />
                    </MuiPickersUtilsProvider>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
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
