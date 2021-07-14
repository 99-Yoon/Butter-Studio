import dotenv from "dotenv";
import { sequelize } from "./db/index.js";
import app from "./app.js";
import appConfig from "./config/app.config.js";

dotenv.config({
    path: `${process.env.NODE_ENV === "production" ? ".env" : ".env.development"
        }`,
});

sequelize
    .sync({ force: false })
    .then(async () => {
        // await Promise.all(
        //     Object.keys(ROLE_NAME).map((name) => {
        //         return Role.create({ name });
        //     })
        // );

        // const adminRole = await Role.findOne({ where: { name: "admin" } });

        // await User.create({
        //     name: "admin",
        //     email: "admin@example.com",
        //     password: "admin!",
        //     isMember: true,
        //     roleId: adminRole?.id,
        // });

        app.listen(appConfig.port, () => {
            console.log(`Server is running on port ${appConfig.port}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });
