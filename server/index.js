import dotenv from "dotenv";
import { sequelize, User, Role } from "./db/index.js";
import app from "./app.js";
import appConfig from "./config/app.config.js";
import { ROLE_NAME } from './models/role.model.js';

dotenv.config({
    path: `${process.env.NODE_ENV === "production" ? ".env" : ".env.development"
        }`,
});

sequelize
    .sync({ force: true })
    .then(async () => {
        await Promise.all(
            Object.keys(ROLE_NAME).map((name) => {
                return Role.create({ name });
            })
        );

        const adminRole = await Role.findOne({ where: { name: "admin" } });
        // if (!adminRole) {
            await User.create({
                userId: "admin",
                email: "han35799@naver.com",
                nickname: "haha",
                birth: "990926",
                phoneNumber: "01086074580",
                password: "admin!",
                roleId: adminRole?.id,
            });
        // }

        app.listen(appConfig.port, () => {
            console.log(`Server is running on port ${appConfig.port}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });

    export default {}