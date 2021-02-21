export const parseDateStringToEpoch = dateString => {
    return Date.parse(dateString);
};

export const parseEpochToDateString = epoch => {
    return new Date(epoch).toDateString();
};
