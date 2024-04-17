const { Storage: GCStorage } = require("@google-cloud/storage");

export default class Storage {

    // Create a new storage instance
    private static storage = new GCStorage({
        projectId: process.env.PROJECT_ID,
        keyFilename: "staging-service-key.json"
    });

    // Get the storage bucket
    private static bucket = this.storage.bucket(process.env.BUCKET_NAME);

    /**
     * Upload a new file to the storage bucket
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
}