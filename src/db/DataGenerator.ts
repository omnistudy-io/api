import { query } from ".";
import { faker } from "@faker-js/faker";

export async function generateUsers() {
    for(let i = 0; i < 25; i++) {
        // Create a new user
        let firstName = faker.person.firstName();
        let lastName = faker.person.lastName();
        let name = `${firstName} ${lastName}`;
        let username = `${firstName}.${lastName}${faker.number.int(1000)}`.slice(0, 24);
        let email = `${firstName}.${lastName}@${faker.internet.domainName()}`;
        let phone = faker.phone.number().slice(0, 12);
        let date = (new Date()).toISOString().replace('T', ' ').replace('Z', '');

        const user_sql = `
            INSERT INTO users (
                first_name,
                last_name,
                name,
                username,
                email,
                password,
                phone,
                created_at,
                online
            ) VALUES (
                '${firstName}',
                '${lastName}',
                '${name}',
                '${username}',
                '${email}',
                '${faker.internet.password()}',
                '${phone}',
                '${date}',
                '${faker.number.binary()}'
            );
        `;

        const result = await query(user_sql);
        console.log(result);

        // Create a new user profile
        const profile_sql = `
            INSERT INTO user_profiles (
                user_id,
                address1,
                address2,
                city,
                state,
                country,
                zip,
                school,
                year,
                image_url,
                bio,
                birth_month,
                birth_date,
                birth_year,
                age
            ) VALUES (
                ${result.insertId},
                "${faker.location.streetAddress()}",
                "${faker.location.secondaryAddress()}",
                "${faker.location.city()}",
                "${faker.location.state()}",
                "${faker.location.country()}",
                "${faker.location.zipCode('#####')}",
                "${faker.company.name()}",
                "${["Freshman", "Sophomore", "Junior", "Senior"][faker.number.int(3)]}",
                "${faker.image.avatar()}",
                "${faker.person.bio()}",
                ${faker.number.int(12)},
                ${faker.number.int(31)},
                ${faker.number.int({ min: 1970, max: 2023 })},
                ${faker.number.int(25)}
            );
        `;

        const profile_result = await query(profile_sql);
        console.log(profile_result);

        // Create a new user plan
        const plan_sql = `
            INSERT INTO user_plans (
                user_id,
                plan_id,
                start_date,
                renew_date,
                active,
                total_spent
            ) VALUES (
                ${result.insertId},
                ${faker.number.int({ min: 1, max: 3 })},
                "${(new Date()).toISOString().replace('T', ' ').replace('Z', '')}",
                "${(new Date()).toISOString().replace('T', ' ').replace('Z', '')}",
                ${faker.number.binary()},
                0.00
            );
        `;
        const plan_result = await query(plan_sql);
        console.log(plan_result);
    }
}

generateUsers();