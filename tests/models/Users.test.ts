import { UsersModel } from "../../src/models/Users";
import { UserSchema } from "../../src/schema";

describe('UsersModel.get', () => {
    it('Get all users', async () => {
        const result = await UsersModel.get();
        expect(result).not.toBeNull();
        expect(result.code).toBe(200);
        expect(result.rows.length).toBeGreaterThan(0);
    });

    it('Get a user that exists', async () => {
        const result = await UsersModel.get(1);
        expect(result).not.toBeNull();
        expect(result.code).toBe(200);
        expect(result.rows.length).toBe(1);

        const user: UserSchema = result.rows[0];
        expect(user.id).toBe(1);
        expect(user.name).toBe('Jamison Grudem');
        expect(user.username).toBe('admin');
    });

    it('Get a user that does not exist', async () => {
        const result = await UsersModel.get(0);
        expect(result).not.toBeNull();
        expect(result.code).toBe(404);
        expect(result.rows.length).toBe(0);
    });

    it('Get a user by a null/undefined id (should return all users)', async () => {
        let result = await UsersModel.get(null);
        expect(result).not.toBeNull();
        expect(result.code).toBe(200);
        expect(result.rows.length).toBeGreaterThan(0);
    });
});