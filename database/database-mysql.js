//import modulu pro práci s mysql databází
const mysql = require('mysql2');

module.exports = class MySQLDatabase {
    constructor(connectionOptions, initQuery) {
        console.log("Connecting to mysql server.");
        //připojení k databázi
        this.connection = mysql.createConnection(connectionOptions);
        this.connection.connect(
            (error) => {
                if (error) console.log(error);
                else {
                    console.log("Succesfully connected.");
                    console.log("Initializing database.");
                    this.#init(initQuery);
                }
            }
        )
    }
    //motoda pro vytváření dotazů do databáze
    query(sqlQuery) {
        return new Promise(
            (resolve, reject) => {
                this.connection.query(sqlQuery, (error, data) => {
                    if (error) reject(error);
                    else resolve(data);
                });
            }
        )
    }
    //motoda pro incializaci databáze
    async #init(initQuery) {
        initQuery = initQuery.split(";");
        for (let i = 0; i < initQuery.length - 1; i++) {
            let query = initQuery[i] + ";";
            try{
                await this.query(query);
            } catch(error) {
                console.log(error);
                return;
            }
        }
        console.log("Successfully initialized.");
    }
}