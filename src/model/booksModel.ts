import mongoose from "mongoose";

const Schema = mongoose.Schema

// import { DataTypes, Model } from 'sequelize';
// import db from '../config/database.config';

interface BooksAttribute {
    id: String
    userId: string,
    title: string,
    author: string,
    datePublished: string,
    description: string,
    pageCount: string,
    genre: string,
    publisher: string,
    image: string
}

const BookSchema = new Schema<BooksAttribute>({
    id: {type: String, required: true},
    userId: {type: String, required: true},
    title: {type: String, required: true},
    author: {type: String, required: true},
    datePublished: {type: String, required: true},
    description: {type: String, required: true},
    pageCount: {type: String, required: true},
    genre: {type: String, required: true},
    publisher: {type: String, required: true},
    image: {type: String}
}, {
    timestamps: true
})

const Book = mongoose.model<BooksAttribute>("Book", BookSchema)

export default Book

// export class BooksInstance extends Model<BooksAttribute> {}

// BooksInstance.init({
//  id: {
//   type: DataTypes.UUIDV4,
//   primaryKey: true,
//   allowNull: false
//  },
//  userId: {
//     type: DataTypes.UUIDV4,
//     primaryKey: true,
//     allowNull: false
//    },
//  title: {
//     type: DataTypes.STRING,
//     allowNull: false
// },
// author: {
//     type: DataTypes.STRING,
//     allowNull: false
// },
// datePublished: {
//     type: DataTypes.STRING,
//     allowNull: false
// },
// description: {
//     type: DataTypes.STRING,
//     allowNull: false
// },
// pageCount: {
//     type: DataTypes.STRING,
//     allowNull: false
// },
// genre: {
//     type: DataTypes.STRING,
//     allowNull: false
// },
// bookId: {
//     type: DataTypes.STRING,
//     allowNull: false
// },
// publisher: {
//     type: DataTypes.STRING,
//     allowNull: false
// },
// image: {
//     type: DataTypes.STRING,
//     allowNull: true,
//     defaultValue: "https://images.pexels.com/photos/762686/pexels-photo-762686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
// }
// }, {
//     sequelize: db,
//     tableName: 'Books'
// });
