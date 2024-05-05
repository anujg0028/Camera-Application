export const hanldePhotoSelected = (photosList,tickBtnPlace,singleTickBtn) => {
    if (tickBtnPlace.length === 0) return 0;
    let total = singleTickBtn.length > 0 ? singleTickBtn.length : 0;
    for (let obj of tickBtnPlace) {
        total += findMonthDatePhotos(photosList, obj.month, obj.date).dateVal.TotImages;
    }
    return total;
}

export const findMonthDatePhotos = (array, monthStr, dateStr) => {
    let obj = {};
    for (let i in array) {
        if (array[i].month === monthStr) {
            obj['monthIndex'] = i;
            obj['dateVal'] = objectExistsInArray(array[i].photos, dateStr);
            break;
        }
    }
    return obj;
}

function objectExistsInArray(array, date) {
    if (Array.isArray(array)) {
        let newVal = {};
        for (let i in array) {
            if (array[i].date === date) {
                newVal['dateIndex'] = i;
                newVal['TotImages'] = array[i].images.length;
                break;
            }
        }
        return newVal;
    } else {
        console.error("The provided array is not a valid array.");
        return false;
    }
}

export const hanldleSingleImageSearch = (array, monthStr, dateStr, index) => {
    let obj = {};
    for (let i in array) {
        if (array[i].month === monthStr) {
            for (let j in array[i].photos) {
                if (array[i].photos[j].date === dateStr) {
                    for (let k in array[i].photos[j].images) {
                        if (array[i].photos[j].images[k].time === index) {
                            obj['monthIndex'] = i;
                            obj['dateIndex'] = j;
                            obj['photoIndex'] = k;
                            break;
                        }
                    }
                }
            }
        }
    }
    return obj;
}
