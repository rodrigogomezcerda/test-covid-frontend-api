import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import classes from './CircularProgressComponent.module.scss';

const CircularProgressComponent = () => {
    return (
        <CircularProgress size={24} className={classes.progress} />
    );
};

export default CircularProgressComponent;