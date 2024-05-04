const { Storage: GCStorage } = require("@google-cloud/storage");

export default class Storage {

    // Create a new storage instance
    private static storage = new GCStorage({
        projectId: process.env.PROJECT_ID,
        keyFilename: "src/serviceKey.json"
    });

    // Get the storage bucket
    private static bucket = this.storage.bucket(process.env.BUCKET_NAME);

    /**
     * Upload a new file to the storage bucket from a local file path
     * 
     * @param filepath The local file path, Ex: temp/kc.png
     * @param remotePath The remote file path, Ex: users/1/kc.png
     */
    static async upload(filepath: string, remotePath: string) {
        return await new Promise((resolve, _) => {
            this.bucket.upload(filepath, { 
                    destination: remotePath
                }, (err, file) => {
                    if(err) {
                        console.error(err);
                        resolve({ success: false, data: null });
                    }
                    console.log(`Uploaded ${filepath} to ${remotePath}`);
                    resolve({ success: true, data: file });
                }
            )
        });
    }

    /**
     * Upload a new file to the storage bucket from a buffer
     * 
     * @param file The file object as received from req.files
     * @param remotePath The remote file path, Ex: users/1/documents/testing.pdf
     */
    static async uploadBytes(file: any, remotePath: string): Promise<{
        success: boolean,
        data: any
    }> {
        return await new Promise((resolve, _) => {
            const blob = this.bucket.file(remotePath);
            // Create a write stream
            const blobStream = blob.createWriteStream({
                metadata: {
                    contentType: file.mimetype
                }
            });
            // If there is an error
            blobStream.on('error', (err) => {
                console.error(err);
                resolve({ success: false, data: null });
            });
            // When the upload is complete
            blobStream.on('finish', () => {
                console.log(`Uploaded ${file.name} to ${remotePath}`);
                resolve({ success: true, data: blob });
            });
            // Write the file data to the stream
            blobStream.end(file.data);
        });
    }
}