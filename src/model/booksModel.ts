import { DataTypes, Model } from 'sequelize';
import db from '../config/database.config';

interface BooksAttribute {
    id: string,
    title: string,
    author: string,
    datePublished: string,
    description: string,
    pageCount: number,
    genre: string,
    bookId: number,
    publisher: string,
    image: string
}


export class BooksInstance extends Model<BooksAttribute> {}

BooksInstance.init({
 id: {
  type: DataTypes.UUIDV4,
  primaryKey: true,
  allowNull: false
 },
 title: {
    type: DataTypes.STRING,
    allowNull: false
},
author: {
    type: DataTypes.STRING,
    allowNull: false
},
datePublished: {
    type: DataTypes.STRING,
    allowNull: false
},
description: {
    type: DataTypes.STRING,
    allowNull: false
},
pageCount: {
    type: DataTypes.NUMBER,
    allowNull: false
},
genre: {
    type: DataTypes.STRING,
    allowNull: false
},
bookId: {
    type: DataTypes.NUMBER,
    allowNull: false
},
publisher: {
    type: DataTypes.STRING,
    allowNull: false
},
image: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: "https://images.pexels.com/photos/762686/pexels-photo-762686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
}
}, {
    sequelize: db,
    tableName: 'Books'
});
