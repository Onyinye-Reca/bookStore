import { DataTypes, Model } from 'sequelize';
import db from '../config/database.config';

interface UserAttribute {
    id: string,
    firstname: string,
    lastname: string,
    email: string,
    password: string
}


export class UserInstance extends Model<UserAttribute> {}

UserInstance.init({
    id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'First name cannot be empty'
            },
            notEmpty: {
                msg: 'Please provide a first name'
            }
        }
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Last name cannot be empty'
            },
            notEmpty: {
                msg: 'Please provide a last name'
            }
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'email cannot be empty'
            },
            isEmail: {
                msg: 'Please provide a valid email'
            }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Password cannot be empty'
            },
            notEmpty: {
                msg: 'Please provide a Password'
            }
        }
    },
}, {
    sequelize: db,
    tableName: 'Users'
})