export const getFileTypeFromExtension = (fileName: string): string => {
    const extension = fileName.split('.').pop()?.toLowerCase() || '';
    console.log(">?>>>>>extension",extension);
    switch (extension) {
        case 'pdf':
            return 'application/pdf';
        case 'jpg':
        case 'jpeg':
            return 'image/jpeg';
        case 'png':
            return 'image/png';
        case 'txt':
            return 'TXT';
        default:
            return 'application/octet-stream';
    }
};
