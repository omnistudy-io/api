import { UsersModel } from "../src/models/Users";
import { compare } from "bcrypt";

describe('bcrypt hashing', () => {
    it('should pass', async () => {
        const result = await UsersModel.get(126);
        const user = result.rows[0];
        compare('testing', user.password, (err, res) => {
            expect(res).toBe(true);
        });
    });

    it('should fail', async () => { 
        const result = await UsersModel.get(126);
        const user = result.rows[0];
        compare('testing1', user.password, (err, res) => {
            expect(res).toBe(false);
        });
    }); 
});