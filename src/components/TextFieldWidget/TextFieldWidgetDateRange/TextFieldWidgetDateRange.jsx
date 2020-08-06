import React, { useState, useEffect } from "react";
import esLocale from "date-fns/locale/en-US";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DatePicker, useUtils } from "@material-ui/pickers";
// import withStyles from "@material-ui/core/styles/withStyles";
import clsx from "clsx";
import { IsDesktopHandler } from "../../../helpers";
import classes from "./TextFieldWidgetDateRange.module.scss";
import errorMessage from "../../../common/errorMessages.json";
import { Controller } from "react-hook-form";

const TextFieldWidgetDateRange = (props) => {
    const {
        control,
        errors,
        register,
        // classes,
        labeltext,
        value,
        onChange,
        labelFunc,
        format,
        emptyLabel,
        autoOk,
        onOpen,
        onClose,
        open: openForward,
        ...others
    } = props;
    const esLocaleDate = esLocale;
    const [begin, setBegin] = useState(value[0]);
    const [end, setEnd] = useState(value[1]);
    const [stateMessage, setStateMessage] = useState("");
    const [stateError, setStateError] = useState(false);
    const [prevBegin, setPrevBegin] = useState(undefined);
    const [prevEnd, setPrevEnd] = useState(undefined);
    const [hasClicked, setHasClicked] = useState(false);

    const [hover, setHover] = useState(undefined);
    const [accepted, setAccepted] = useState(false);
    const utils = useUtils();

    const min = Math.min(begin, end || hover);
    const max = Math.max(begin, end || hover);

    const [open, setOpen] = useState(false);

    const isOpen = openForward !== undefined ? openForward : open;

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
                default:
                    break;
            }
            setStateError(true);
        } else {
            setStateMessage("");
            setStateError(false);
        }
    }, [errors]);

    useEffect(() => {
        // Only way to get to this state is is openForward is used
        if (isOpen && accepted && !prevBegin && !prevEnd) {
            setAccepted(false);
            setPrevBegin(begin);
            setPrevEnd(end);
            return;
        }
        // Closed without accepting, reset to prev state, don't find onChange
        if (!isOpen && !accepted) {
            setBegin(prevBegin);
            setEnd(prevEnd);
            setHover(undefined);
            setHasClicked(false);
        }
        // Auto ok and hasn't been accepted, but has all the items set, accept and close.
        // This will also triger the on change event by setting isOpen to false
        if (isOpen && autoOk && !accepted && begin && end && hasClicked) {
            setAccepted(true);
            onClose ? onClose() : setOpen(false);
        }
        if (accepted && begin && end && !isOpen && hasClicked) {
            setHasClicked(false);
            onChange({ begin, end });
            onClose ? onClose() : setOpen(false);
        }
        if (emptyLabel) {
            setEnd(undefined);
            setBegin(undefined);
        }
    }, [
        begin,
        end,
        autoOk,
        accepted,
        isOpen,
        prevBegin,
        hasClicked,
        prevEnd,
        onClose,
        onChange,
        emptyLabel,
    ]);

    function renderDay(day, selectedDate, dayInCurrentMonth, dayComponent) {
        return React.cloneElement(dayComponent, {
            onClick: (e) => {
                setHasClicked(true);
                e.stopPropagation();
                if (!begin) setBegin(day);
                else if (!end) {
                    if (utils.isBeforeDay(day, begin)) {
                        setEnd(begin);
                        setBegin(day);
                    } else {
                        setEnd(day);
                    }
                    if (autoOk) {
                        setPrevBegin(undefined);
                        setPrevEnd(undefined);
                    }
                } else {
                    setBegin(day);
                    setEnd(undefined);
                }
            },
            onMouseEnter: () => requestAnimationFrame(() => setHover(day)),
            onFocus: () => requestAnimationFrame(() => setHover(day)),
            className: clsx(classes.day, {
                [classes.hidden]: dayComponent.props.hidden,
                [classes.current]: dayComponent.props.current,
                [classes.isDisabled]: dayComponent.props.disabled,
                [classes.focusedRange]:
                    (utils.isAfterDay(day, min) && utils.isBeforeDay(day, max)) ||
                    (utils.isSameDay(day, min) && !utils.isSameDay(day, max)) ||
                    (utils.isSameDay(day, max) && !utils.isSameDay(day, min)),
                [classes.focusedFirst]: utils.isSameDay(day, min) && !utils.isSameDay(day, max),
                [classes.focusedLast]: utils.isSameDay(day, max) && !utils.isSameDay(day, min),
                [classes.beginCap]: utils.isSameDay(day, min),
                [classes.endCap]: utils.isSameDay(day, max),
            }),
        });
    }

    const formatDate = (date) => utils.format(date, format || utils.dateFormat);

    let labelText = null;
    const isDesktop = IsDesktopHandler("sm");
    if (!isDesktop) {
        labelText = null;
    } else {
        labelText = null;
    }

    return (
        <div className={classes.inputContainerStyle}>
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocaleDate}>
                <Controller
                    as={
                        <DatePicker
                            {...others}
                            label={labelText}
                            variant="outlined"
                            inputVariant="outlined"
                            fullWidth
                            margin="dense"
                            value={begin}
                            renderDay={renderDay}
                            open={isOpen}
                            error={stateError}
                            helperText={stateMessage}
                            onOpen={() => {
                                setAccepted(false);
                                setPrevBegin(begin);
                                setPrevEnd(end);
                                onOpen ? onOpen() : setOpen(true);
                            }}
                            onAccept={() => {
                                if (!begin || !end) {
                                    if (hover && utils.isBeforeDay(begin, hover)) {
                                        setEnd(hover);
                                    } else {
                                        setEnd(begin);
                                        setBegin(hover);
                                    }
                                }
                                setPrevBegin(undefined);
                                setPrevEnd(undefined);
                                // if (!autoOk) {
                                setAccepted(true);
                                // }
                            }}
                            onClose={() => {
                                onClose ? onClose() : setOpen(false);
                            }}
                            onChange={() => {}}
                            labelFunc={(date, invalid) => {
                                if (!isOpen) {
                                    if (date && begin && end && !emptyLabel) {
                                        return `${formatDate(begin)} - ${formatDate(end)}`;
                                    }
                                    return "";
                                }
                            }}
                            // labelFunc={(date, invalid) =>
                            // 	!isOpen
                            // 		? labelFunc
                            // 			? labelFunc([begin, end], invalid)
                            // 			: date && begin && end
                            // 			? `${formatDate(begin)} - ${formatDate(end)}`
                            // 			: emptyLabel || ""
                            // 		: prevBegin && prevEnd
                            // 		? labelFunc
                            // 			? labelFunc([prevBegin, prevEnd], invalid)
                            // 			: `${formatDate(prevBegin)} - ${formatDate(prevEnd)}`
                            // 		: emptyLabel || ""
                            // }
                            DialogProps={{ className: classes.dateRangePickerDialog }}
                        />
                    }
                    name="period"
                    rules={{ required: true }}
                    control={control}
                />
            </MuiPickersUtilsProvider>
        </div>
    );
};
export default TextFieldWidgetDateRange;
