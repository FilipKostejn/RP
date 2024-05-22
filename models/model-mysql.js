const Database = require('../database/database-mysql.js');
const path = require('path');
const fs = require('fs');

module.exports = class Model {
    constructor() {
        this.database = new Database({//v souboru .env nastav hodnoty odpovídající Tvé spuštěné databázi
                host: process.env.DATABASE_HOST,//adresa na které databáze běží
                user: process.env.DATABASE_USER,//uživatelské jméno pro přihlášení k databázi
                port: process.env.DATABASE_PORT,//port na kterém databáze běží
                password: process.env.DATABASE_PASSWORD//heslo k databázi
            } ,
            fs.readFileSync(path.join(__dirname, 'initquery.sql'), 'utf-8')//načtení souboru s inicializačními příkazy
        );//vytvoření databáze
    }
    
    async getUserByUsername(username) {
        try{
            const user = await this.database.query(`SELECT * FROM users WHERE users.username = '${username}';`);
            return user[0];
        } catch(error) {
            console.log(error);
            return null;
        }
    }

    async insertUser(user) {
        try{
            await this.database.query(`INSERT INTO users(users.username, users.password) VALUES('${user.username}', '${user.password}');`);
        } catch(error) {
            console.log(`Error when inserting new user. Error: ${error}`);
        }
    }

    async insertProblem(problem) {
        try{
            await this.database.query(`insert into problems(username, problem, duration, entered, result, wrongcount, correctcount, type) values(
                '${problem.username}',
                '${problem.value}',
                '${problem.duration}',
                '${problem.entered}',
                '${problem.result}',
                ${problem.wrongcount},
                ${problem.correctcount},
                '${problem.type}'
              );`);
        } catch(error) {
            console.log(`Error when inserting new problem. Error: ${error}`);
        }      
    }

    async getProblemsByUsername(username) {
        try{
            const problems = await this.database.query(`SELECT * FROM problems WHERE problems.username = '${username}';`);
            return problems;
        } catch(error) {
            console.log(`Error when loading problems. Error: ${error}`);
            return null;
        }
    }
}