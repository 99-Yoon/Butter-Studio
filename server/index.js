import dotenv from "dotenv";
import app from "./app.js";
import appConfig from "./config/app.config.js";
import { sequelize, User, Role } from "./db/index.js";
import { ROLE_NAME } from './models/role.model.js';

dotenv.config({
    path: `${process.env.NODE_ENV === "production" ? ".env" : ".env.development"
        }`,
});


sequelize
    .sync({ force: false })
    .then(async () => {
        await Promise.all(
            Object.keys(ROLE_NAME).map((name) => {
                return Role.create({ name });
            })
        );

        const adminRole = await Role.findOne({ where: { name: "admin" } })
        await User.findOrCreate({
            where: { userId: "admin" },
            defaults: {
                userId: "admin",
                name: "관리자",
                email: "admin@naver.com",
                nickname: "admin",
                birth: "000000",
                phoneNumber: "01000000000",
                password: "admin!",
                img: "970aaa79673a39331d45d4b55ca05d25",
                roleId: adminRole?.id,
            }
        });

        app.listen(appConfig.port, () => {
            console.log(`Server is running on port ${appConfig.port}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });

export default {}