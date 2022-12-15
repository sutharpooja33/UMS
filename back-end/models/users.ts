import { Sequelize, Model, DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';

export enum USER_TYPES {
    USER = 'user',   
    ADMIN = 'admin',    
}
export class User extends Model {
    
    public id!: number;
    public email!: string;
    public name!: string;
    public password!: string;
    public type!: string;
    

    public static initialize(sequelize: Sequelize) {
        return this.init({
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isEmail: true
                }
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                set(password: string) {
                    const trimPassword = password ? password.trim() : '';
                    if (trimPassword) {
                        const passwordHash = bcrypt.hashSync(trimPassword, 8);
                        this.setDataValue('password', passwordHash);
                    }
                }
            },
            type: {
                type: DataTypes.ENUM(...Object.values(USER_TYPES)),
                allowNull: true,
                defaultValue: 'user'
            }
        }, {
            sequelize,
            tableName: 'Users',
            timestamps: false
        });
    }

    public static associate() {

    }
}

