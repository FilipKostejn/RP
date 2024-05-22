
//nastavení proměnných prostředí
require('dotenv').config();

//import frameworku pro tvorbu webových aplikací
const express = require('express');
//import modulu pro práci s cestami ke složkám a souborům
const path = require('path');
//import modulu pro možnost zobrazení zpráv v klinstské části aplikace
const flash = require('express-flash');
//import modulu, který pomocí cookies dovolí autorizovat uživatele
const session = require('express-session');
//import třídy implementující metody pro práci s databází
const Model = require('./models/model-mysql.js');
//import třídy jejíž instance propojuje model se zobrazením
const Constroller = require('./controllers/controller.js');

//vytvoření nového modelu
const model = new Model();
//vytvoření nového "ovladače" - argumentem při vytváření je model, který bude ovladač používat - v případě, že by bylo třeba používat jinou databázi, stačí vytvořit nový model, ale ovladač zůstane stejný
const controller = new Constroller(model);
//vytvoření nové aplikace express
const app = express();

//nastavení zobrazovacího enginu - díky tomu je možné klientovy zobrazovat personalizovaná data
app.set('view-engine', 'ejs');

//používání middlewaru 
//middleware pro parsování data zaslaných od klienta - req.body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//middleware pro zasílání zpráv klientovy
app.use(flash());
//ukládání dat klienta - hodnota v atributu secret by měla být výrazně silnějším heslem a aktuální hodnotu jsem zvolil pouze proto, že je aplikace použita čistě pro demostraci - běžně se používají náhodné textové řetězce
app.use(session({ secret: process.env.SECRET, resave: false, saveUninitialized: false }));
//použití controlleru
app.use(...controller.handlers);
//použití cesty k souborům
app.use(express.static(path.join(__dirname, 'views')));
//spuštění aplikace na portu 7707 - aplikaci je následně možné otevřít přes prohlížeč na adrese http://localhost:7707
app.listen(process.env.APP_PORT);



