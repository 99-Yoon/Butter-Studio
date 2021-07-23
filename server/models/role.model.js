import Sequelize from "sequelize";

const { DataTypes } = Sequelize;

export const ROLE_NAME = {
    USER : "user",
    MEMBER : "member",
    ADMIN : "admin",
    ROOT : "root",
}

const RoleModel = (sequelize) => {
    const Role = sequelize.define(
        "role",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: DataTypes.ENUM({
                    values: Object.values(ROLE_NAME),
                }),
                defaultValue: ROLE_NAME.USER,
                set(value) {
                    const lowerCaseName = value.toLowerCase();
                    this.setDataValue("name", lowerCaseName);
                    switch (lowerCaseName) {
                        case ROLE_NAME.USER:
                            this.priority = 1000;
                            break;
                        case ROLE_NAME.MEMBER:
                            this.priority = 500;
                            break;
                        case ROLE_NAME.ADMIN:
                            this.priority = 50;
                            break;
                        case ROLE_NAME.ROOT:
                            this.priority = 1;
                            break;
                        default:
                            this.priority = 1000;
                            break;
                    }
                },
            },
            priority: {
                type: DataTypes.INTEGER,
                defaultValue: 1000,
            },
        },
        {
            timestamps: true,
        }
    );
    return Role;
};

export default RoleModel;