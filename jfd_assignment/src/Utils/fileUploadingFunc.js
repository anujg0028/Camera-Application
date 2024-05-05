import { toast } from 'react-toastify';
import moment from 'moment';

export const currentDateTime = () => {
    try {
        const now = new Date();
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const year = now.getFullYear().toString().slice(-2);
        const hour = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        const formattedDateTime = `${day}/${month}/${year} ${hour}:${minutes}:${seconds}`;
        return formattedDateTime;
    }
    catch (e) {
        console.log(e);
        return "";
    }
}

export const handleFileSelect = (event,photosList,setPhotoList) => {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
        if (!file.type.match('image/.*')) {
            toast.error("Please select an image file (JPG, PNG, etc.)");
            return;
        }
        handleImageChange(file,photosList,setPhotoList);
    }
};

const handleImageChange = (file,photosList,setPhotoList) => {
    try {
        const dateTime = currentDateTime();
        const date = moment();
        const monthYear = date.format('MMMM YYYY');

        if (photosList.length > 0 && photosList[0].month === monthYear) {
            if (photosList[0].photos[0].date === date.format('DD MMMM')) {
                const newPhotoList = [...photosList];
                newPhotoList[0].photos[0].images.push({ time: dateTime, src: URL.createObjectURL(file), aspectRatio: 1 });
                setPhotoList(newPhotoList);
            }
            else {
                const newPhotoList = [...photosList];
                newPhotoList[0].photos = [{ date: date.format('DD MMMM'), images: [{ time: dateTime, src: URL.createObjectURL(file), aspectRatio: 1 }] }, ...newPhotoList[0].photos]
                setPhotoList(newPhotoList);
            }
        }
        else {
            let newObj = {
                month: monthYear,
                photos: [{ date: date.format('DD MMMM'), images: [{ time: dateTime, src: URL.createObjectURL(file), aspectRatio: 1 }] }]
            };
            setPhotoList([newObj, ...photosList]);
        }
        toast.success("Image upload successfully!")
    }
    catch (e) {
        toast.error("Something went wrong please try after sometime!");
        console.log(e);
    }
};