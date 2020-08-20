/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Controller } from "react-hook-form";
import errorMessage from "../../common/errorMessages.json";

export default function ComboBox(props) {
    const { control, errors } = props;
    const [stateMessage, setStateMessage] = useState("");
    const [stateError, setStateError] = useState(false);
    useEffect(() => {
        if (errors) {
            switch (errors.type) {
                case "required":
                    setStateMessage(
                        errorMessage.message[errors.ref.name].required
                            ? errorMessage.message[errors.ref.name].required
                            : errorMessage.message[errors.ref.name],
                    );
                    break;
                case "minLength":
                    setStateMessage(errorMessage.message[errors.ref.name].minLength);
                    break;
                default:
                    break;
            }
            setStateError(true);
        } else {
            setStateMessage("");
            setStateError(false);
        }
    }, [errors]);

    return (
        <Controller
            as={
                <Autocomplete
                    id="countryAutocomplete"
                    options={countries}
                    getOptionLabel={(option) => option.label}
                    renderOption={(option) => (
                        <span>
                            {countryToFlag(option.code)} {option.label}
                        </span>
                    )}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Choose a country"
                            variant="outlined"
                            error={stateError}
                            helperText={stateMessage}
                        />
                    )}
                />
            }
            onChange={([, data]) => data}
            name="country"
            rules={{ required: true }}
            control={control}
            defaultValue={{ code: "AF", label: "Afghanistan", phone: "93" }}
        />
    );
}

function countryToFlag(isoCode) {
    return typeof String.fromCodePoint !== "undefined"
        ? isoCode
              .toUpperCase()
              .replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + 127397))
        : isoCode;
}

const countries = [
    { code: "AD", label: "Andorra", phone: "376" },
    { code: "AE", label: "United Arab Emirates", phone: "971" },
    { code: "AF", label: "Afghanistan", phone: "93" },
];
