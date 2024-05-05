import moment from "moment";

export const handleDateShowing = (param) => {
    const date = moment();
    const DateMonth = date.format('DD MMMM');
    const previousDate = moment().subtract(1, 'days').format('DD MMMM');
    if (DateMonth === param.date) return "Today";
    else if (previousDate === param.date) return "Yesterday";
    else return param.date;
}

export function objectExistsInArray(array, targetObject) {
    if (Array.isArray(array)) {
        return array.some(obj => obj.month === targetObject.month && obj.date === targetObject.date);
    } else {
        console.error("The provided array is not a valid array.");
        return false;
    }
}

export function deleteObjectFromArray(array, targetObject) {
    return array.filter(obj => obj.month !== targetObject.month || obj.date !== targetObject.date);
}