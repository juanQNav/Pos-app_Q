const express = require('express');
const cors = require('cors');
const connectDB = require('./database');

class Server {
    constructor() {
        this.port = process.env.PORT; // define port where server will run
        this.app = express(); //instance of express
        this.corsOptions = { //cors options to restrict access to the server
            origin: [
                process.env.FRONTEND_URL
            ]
        }

        //input paths
        this.usersPath = "/api/users";
        this.drinksPath = "/api/drinks";


        this.routes();
        this.middlewares();
        connectDB();
    }


    routes() {
        //main routes
        this.app.use(this.drinksPath, require('../routes/drinks'));
        this.app.use(this.usersPath, require('../routes/users'));

        //errors
        this.app.get('*', function (req, res) {
            res.status(404).json({
                message: "ROUTE NOT FOUND!",
                result: 12345,
            });
        });

        this.app.post("*", function (req, res) {
            res.status(404).json({
                message: "ROUTE NOT FOUND!",
                result: 12345,
            });
        });
    }

    //middlewares to use in the server
    middlewares() { this.app.use(cors(this.corsOptions)); }

    //start server
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }
}

//export server
module.exports = Server;