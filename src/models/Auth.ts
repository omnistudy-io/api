import { IApiResponse, ApiResponse } from "../response";
import { compare, genSalt, hash } from "bcrypt";

export class AuthModel {

    static async hashPassword(password: string, saltRounds: number) {
        const promise = new Promise<string | null>((resolve, _) => {
            // Generate a salt for the password
            genSalt(saltRounds, async (err, salt) => {
                console.log('Salt generated');
                // Handle error
                if(err) 
                    resolve(null);

                // Hash the password given the salt
                hash(password, salt, async (err, hash) => {
                    console.log(hash);
                    if(err)
                        resolve(null);

                    resolve(hash);
                });
            });
        });
        return promise;
    }

}