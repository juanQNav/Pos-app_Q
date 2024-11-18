const { error } = require('console');
const mongoose = require('mongoose');

const connectDB = () => {
    mongoose.connect(process.env.CONNECTION_STRING, {
        dbName: process.env.DB_NAME
    }).then(
        () => {
            console.log("Database connected");
        }
    ).catch(
        (error) => {
            console.log("Error connecting to database");
            // console.log(error);
        }
    );
}

module.exports = connectDB;