// Function to save photo to file system
export const savePhotoToFileSystem = async (directoryHandle, photo) => {
    const blob = dataURItoBlob(photo.src);
    const type = photo.src.split(';')[0].split('/')[1];
    await directoryHandle.getFileHandle(`${photo.name}` + `.${type}`, { create: true }).then((fileHandle) => {
        fileHandle.createWritable().then((fileWritable) => {
            fileWritable.write(blob);
            fileWritable.close();
        });
    });
};

// Function to convert data URI to Blob
const dataURItoBlob = (dataURI) => {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
};