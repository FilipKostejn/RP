//import třídy pro vytáření přihlašovací strategie
const Strategy = require('passport-local').Strategy;
//import modulu pro šifrování
const bcrypt = require('bcrypt');

module.exports = class LoginSystem {
    constructor(getUserByUsername) {
        //nastavení funkce pro získání uživatele na základě jeho jména
        this.getUserByUsername = getUserByUsername;
        //import modulu pro přihlašování uživatelů
        this.passport = require('passport');
        //nastavení strategie
        this.passport.use(new Strategy(
            {usernameField: 'username'},
            this.#authenticateUser.bind(this)//propojení funkce s aktuální instancí
        ));
        //nastavení funkce pro získání identifikátoru uživatele - v tomto případě se jedná o jméno uživatele
        this.passport.serializeUser(this.#serializeUser.bind(this));
        //nastavení funkce pro získání uživatele na základě identifikátoru
        this.passport.deserializeUser(this.#deserializeUser.bind(this));
    }

    async #authenticateUser(username, password, done) {
        const user = await this.getUserByUsername(username);//ziskání uživatele z databáze
        try {
            if (!user || !(await bcrypt.compare(password, user.password))) {//porovnání hesla s jeho hashovanou uloženou hodnotou
                return done(null, false, {message: 'wrong username or password'});
            }
            return done(null, user);//uživatel úspěšně ověřen
        } catch (error){
            return done(error);
        }
    }

    async #serializeUser(user, done) {
        return done(null, user.username);
    }

    async #deserializeUser(username, done) {
        const user = await this.getUserByUsername(username);
        return done(null, user);
    }

    authenticate(successRedirect, failureRedirect) {
        return this.passport.authenticate(
            'local',
            {
                successRedirect: successRedirect,
                failureRedirect: failureRedirect,
                failureFlash: true
            }
        );//vrácení funkce, která bude při ověření přesměrovávat na patřičnou adresu
    }
}