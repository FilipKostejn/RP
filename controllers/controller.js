const express = require('express');
//import třídy implementující funkce pro autorizaci uživatele
const LoginSystem = require('../login/loginSystem.js');
const bcrypt = require('bcrypt');

module.exports = class Controller{
    //getter pro získání potřebného middlewaru
    get handlers() {
        return [this.loginSystem.passport.initialize(), this.loginSystem.passport.session(), this.router];
    }

    constructor(model) {
        this.model = model;
        this.router = express.Router();//vytvoření routeru
        this.loginSystem = new LoginSystem(
            async (username) => {//funkce pro získání uživatele z databáze
                const user = await model.getUserByUsername(username);
                return user;
            }
        );

        //nastavení funkcí, které se vykonají při dotazu na patřičnou cestu

        //nejprve dojde ke kontrole, zda je uživatel přihlášen, následně je přesměrován buď na hlavní stránku (přihlášen) anebo na stránku pro přihlášení (nepřihlášen)
        this.router.route('/')
        .get(this.checkAuthenticated, this.getMainPage);

        //opět kontrola přihlášení - přihlášen -> hlavní stránka, nepřihlášen -> stránka pro registraci
        this.router.route('/register')
        .get(
            this.checkNotAuthenticated,
            this.getRegisterPage
        )
        .post(//zaslání nového uživatele
            this.checkNotAuthenticated,
            this.registerNewUser.bind(this),//uložení nového uživatele
            this.loginSystem.authenticate('/', '/register')//přihlášení zaregistrovaného uživatele a přesměrování na hlavní stránku
        );
        //přihlášen -> hlavní stránka, nepřihlášen -> stránka pro přihlášení
        this.router.route('/login')
        .get(
            this.checkNotAuthenticated,
            this.getLoginPage
        )
        .post(//přihlášení uživatele
            this.checkNotAuthenticated,
            this.loginSystem.authenticate('/', '/login')
        );

        //odhlášení uživatele
        this.router.route('/logout')
        .delete(this.logOut);

        //zaslání příkladu
        this.router.route('/sendproblem')
        .post(this.saveProblem.bind(this));

        //zobrazení instrukcí pro výpočet operací s čísly v binární soustavě
        this.router.route('/quizinstructions')
        .get(
            this.checkAuthenticated,
            this.getQuizInstructionsPage
        );

        //spuštění testu výpočtu
        this.router.route('/quiz')
        .get(
            this.checkAuthenticated,
            this.getQuizPage
        );

        //zobrazení instrukcí pro výpočet operací s čísly v binární soustavě
        this.router.route('/convertinstructions')
        .get(
            this.checkAuthenticated,
            this.getConvertInstructionsPage
        );
        
        //spuštění testu převodu
        this.router.route('/convert')
        .get(
            this.checkAuthenticated,
            this.getConvertPage
        );
        //zobrazení výsledků daného uživatele
        this.router.route('/results')
        .get(
            this.checkAuthenticated,
            this.getResultsPage.bind(this)
        );
    }

    getMainPage(req, res) {
        res.render('index.ejs', {name: req.user.username});//na hlavní stránce je uživateli zobrazeno jeho jméno, hodnoty jsou do stránky vloženy pomocí zobrazovacího enginu ejs
    }

    getRegisterPage(req, res) {
        res.render('register.ejs');
    }

    getLoginPage(req, res) {
        res.render('login.ejs');
    }

    logOut(req, res) {
        req.logOut((error) => {//při odhlášení dojde k odstranění dat ze session pomocí funkce logOut
            if (error) console.log(error);
            res.redirect('/login');
        });  
    }

    saveProblem(req, res) {
        if (req.isAuthenticated()) {
            req.body.username = req.user.username;//nahrání uživatelského jména do těla - byl jsem líný dělat nový objekt se všemi potřebnými atributy
            this.model.insertProblem(req.body);
        }
    }

    getQuizInstructionsPage(req, res) {
        res.render('quiz_instructions.ejs');
    }

    getQuizPage(req, res) {
        res.render('quiz.ejs');
    }

    getConvertInstructionsPage(req, res) {
        res.render('convert_instructions.ejs');
    }

    getConvertPage(req, res) {
        res.render('convert.ejs');
    }
    
    async getResultsPage(req, res) {
        let data = await this.model.getProblemsByUsername(req.user.username);
        res.render('results.ejs', {data: data, name: req.user.username});
    }

    async registerNewUser(req, res, next) {
        try {
            let {username, password} = req.body;
            if (!this.validName(username) || !this.validPassword(password)) {
                res.render('register.ejs', {messages: {error: "Invalid symbol in username or password."}});
                res.end();
                return;
            }
            let user = await this.loginSystem.getUserByUsername(username);
            if (user) {//pokud nově registrovaný uživatel již existuje, je tato informace zobrazena klientovi a ten je poté nucen zvolit nové jméno 
                res.render('register.ejs', {messages: {error: "User already exists."}});
                res.end();
                return;
            }
            password = await bcrypt.hash(password, 8);//hashování hesla - do databáze není ukládáno zaslané heslo, ale místo toho je uložena pouze jeho hash hodnota - pokud poté dojde k napadení databáze, útočník díky tomu nezíská heslo
            await this.model.insertUser({username, password});
            next();
        } catch(error) {
            console.log(error);
            res.redirect('/register', {messages: {error: error}});
        }
    }

    validName(username) {//základní sanitace zaslaných dat
        return username.match(/(?!((\.)|(\w)))./g) === null;
    }

    validPassword(password) {//základní sanitace zaslaných dat
        return password.match(/(?!((\.)|(\w)|(\,)|(\*)))./g) === null;
    }

    checkAuthenticated(req, res, next) {//metoda pro zjištění, zda je uživatel již příhlášen, pokud není, je přesměrován na stránku pro příhlášení
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect('/login');
    }
      
    checkNotAuthenticated(req, res, next) {//metoda pro zjištění, zda není uživatel přihlášen, pokud je, je přesměrován na hlavní stránku
        if (req.isAuthenticated()) {
            return res.redirect('/');
        }
        next();
    }
}