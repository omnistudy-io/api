export default function getFileExt(filename: string) {
    return filename.split('.').pop();
}