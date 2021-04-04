import {transitions, positions } from 'react-alert';

export const getSyncUpdate = (alertHandler) => {
    alertHandler.show("Testing");
}

export const getAlertOptionsObject = {
    position: positions.TOP_CENTER,
    timeout: 6000,
    transition: transitions.FADE
}
