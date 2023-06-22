var zadani1 = '';  // proměnná držící hodnotu prvního zadaného čísla v binární soustavě
var zadani2 = '';  // proměnná držící hodnotu druhého zadaného čísla v binární soustavě
var hodnota1 = 0;  // proměnná držící hodnotu prvního zadaného čísla v dekadické soustavě
var hodnota2 = 0;  // proměnná držící hodnotu druhého zadaného čísla v dekadické soustavě        
var hodnota_vysledku = 0;  //proměnná která drží správnou hodnotu výsledku v dekadické soustavě
var vysledek_bin = '';     // proměnná držící správnou výslednou hodnotu výsledku v binární soustavě
var j = 7; //pomocná proměnná pro převod na dekadické číslo (prvního čísla)
var x = 7; //pomocná proměnná pro převod na dekadické číslo (druhého čísla)
var y = -1; //pomocná proměnná pro kontrolu 1 nebo 0 na "y" pozici "vysledek_bin"
var vysledek_zapis_pom = '';
var spravne = 0;
var spatne = 0;
var delka = 1;
var operace = 0;  //pomocná proměnná pro rozlišení, jakou operaci uživatel vybral (pro druhý a další příklady)
var data = [];      //proměnná pro uložení informací, které jsou exportovány do CSV souboru
var sekundy = 0;    //proměnná držící čas řešení příkladu
var date = '';      //proměnná držící datum ukončení příkladu




document.getElementById('btn_scitani').addEventListener('click', function scitani() { 
    zacatek();
    vytvoreni_zadani(8,8);
    hodnota_vysledku=hodnota1+hodnota2;
    vysledek_bin=hodnota_vysledku.toString(2);
    y += vysledek_bin.length;       //nastaví y na hodnotu délky výsledku (-1 + "vysledek_bin.legth") (-1 kvůli pozici 0 stringu)
    operace = 1;
    document.getElementById('text_header').textContent = "Sčítání";
})
document.getElementById('btn_odcitani').addEventListener('click', function odcitani() { 
    zacatek();
    vytvoreni_zadani(8,7);
    hodnota_vysledku=hodnota1-hodnota2;
    vysledek_bin=hodnota_vysledku.toString(2);
    y += vysledek_bin.length;       //nastaví y na hodnotu délky výsledku (-1 + "vysledek_bin.legth") (-1 kvůli pozici 0 stringu)
    operace = 2;
    document.getElementById('text_header').textContent = "Odčítání";
})
document.getElementById('btn_deleni').addEventListener('click', function deleni() { 
    zacatek();
    vytvoreni_zadani(8,4);
    hodnota_vysledku=Math.floor(hodnota1/hodnota2);
    vysledek_bin=hodnota_vysledku.toString(2);
    y += vysledek_bin.length;       //nastaví y na hodnotu délky výsledku (-1 + "vysledek_bin.legth") (-1 kvůli pozici 0 stringu)
    operace = 3;
    document.getElementById('text_header').textContent = "Dělení";
})
document.getElementById('btn_nasobeni').addEventListener('click', function nasobeni() { 
    zacatek();
    vytvoreni_zadani(5,5);
    hodnota_vysledku=hodnota1*hodnota2;
    vysledek_bin=hodnota_vysledku.toString(2);
    y += vysledek_bin.length;       //nastaví y na hodnotu délky výsledku (-1 + "vysledek_bin.legth") (-1 kvůli pozici 0 stringu)
    operace = 4;
    document.getElementById('text_header').textContent = "Násobení";
})

//FUNKCE
function zacatek() {
    document.getElementById('detaily').style.display = 'flex';
    document.getElementById('priklady').style.display = 'flex';
    document.getElementById('vyber_okno').style.display = 'none';
    document.getElementById('buttony01').style.display = 'flex';
    document.getElementById('zpet').style.display = 'block';
    document.getElementById('downloadCsv').style.display = 'block';
    setInterval(casInc, 100);
}

function funkce_0nebo1() {   //funkce na vytvoření náhodného čísla od 0 do 1
    return Math.round(Math.random()); 
};

function vytvoreni_zadani(delka_cisla1, delka_cisla2) {

    while ((hodnota2 > hodnota1) || (hodnota1==0) || (hodnota2==0)) {          // while loop pro kontrolu, aby 2. číslo nebylo větší než 1. nebo aby se číslo nerovnalo 0
        hodnota1=0;
        hodnota2=0;
        zadani1='';
        zadani2='';
        j=7;
        x=7;
        for (let index = 0; index < delka_cisla1; index++) {   // generace prvního zadaného čísla
            zadani1 += funkce_0nebo1();   
        }

        for (let index = 0; index < delka_cisla2; index++) {   // generace druhého zadaného čísla
            zadani2 += funkce_0nebo1();   
        }
        hodnota1 = parseInt(zadani1, 2);        //převod 1. čísla na dekadické
        hodnota2 = parseInt(zadani2, 2);        // převod 2. čísla na dekadické
    } 
    document.getElementById('priklad1').textContent=zadani1;
    document.getElementById('priklad2').textContent= zadani2;
}

document.getElementById('moznost1').addEventListener('click', function() {
    if (delka == 1) {   //smazání neviditelného znaku na začátku (pro zobrazení řádku pro výsledek)
        document.getElementById('vysledek').textContent='';
        document.getElementById('vysledek').textContent='1' + document.getElementById('vysledek').textContent;
    } else {    
        document.getElementById('vysledek').textContent='1' + document.getElementById('vysledek').textContent;
    }
    if (delka < vysledek_bin.length) {
        switch (vysledek_bin.charAt(y)) {
        case '1':
            spravne++;
            document.getElementById('spravne').textContent=spravne;
            y--;
        break;
        case '0':
            spatne++;
            document.getElementById('spatne').textContent=spatne;
            y--;
        break;
    }
    delka++;
    } else {
        switch (vysledek_bin.charAt(y)) {
            case '1':
                spravne++;
                document.getElementById('spravne').textContent=spravne;
                y--;
            break;
            case '0':
                spatne++;
                document.getElementById('spatne').textContent=spatne;
                y--;
            break;
        }
        delka++;
        dalsi_priklad();
   }})

document.getElementById('moznost2').addEventListener('click', function() {
    if (delka == 1) {   //smazání neviditelného znaku na začátku (pro zobrazení řádku pro výsledek)
        document.getElementById('vysledek').textContent='';
        document.getElementById('vysledek').textContent='0' + document.getElementById('vysledek').textContent;
    } else {    
        document.getElementById('vysledek').textContent='0' + document.getElementById('vysledek').textContent;
    }      
    if (delka < vysledek_bin.length) {
        switch (vysledek_bin.charAt(y)) {
            case '0':
                spravne++;
                document.getElementById('spravne').textContent=spravne;
                y--;
            break;
            case '1':
                spatne++;
                document.getElementById('spatne').textContent=spatne;
                y--;
            break;
        }
        delka++;
        } else {
            switch (vysledek_bin.charAt(y)) {
                case '0':
                    spravne++;
                    document.getElementById('spravne').textContent=spravne;
                    y--;
                break;
                case '1':
                    spatne++;
                    document.getElementById('spatne').textContent=spatne;
                    y--;
                break;
            }
            delka++;
            dalsi_priklad();
        }
    })


function casInc() {
    sekundy+=0.1;
    document.getElementById('cas').textContent = sekundy.toFixed(1) + "s";
}

//nastavení dalšího příkladu (vymázání hodnot pro přepsání)
function dalsi_priklad() {
    date = new Date().toLocaleString('cs-CZ');     //podle https://stackoverflow.com/a/30245911
    data.push({cislo1: zadani1, cislo2: zadani2, vysledek: vysledek_bin, zadano: document.getElementById('vysledek').textContent, spravne: spravne, spatne: spatne, cas: sekundy.toFixed(1) + "s", casUkonceni: date});
    sekundy = 0;
    zadani1 = ''; 
    zadani2 = ''; 
    hodnota1 = 0; 
    hodnota2 = 0;  
    hodnota_vysledku = 0; 
    vysledek_bin = '';     
    j = 7; 
    x = 7; 
    y = -1; 
    vysledek_zapis_pom = '';
    spravne = 0;
    spatne = 0;
    delka = 1;
    document.getElementById('priklad1').textContent='';
    document.getElementById('priklad2').textContent='';
    document.getElementById('vysledek').innerHTML= "&nbsp;"     //v tomto případě nešlo použít ".textContent", musel jsem použít ".innerHTML"
    document.getElementById('spatne').textContent='-';
    document.getElementById('spravne').textContent='-';
    switch (operace) {
        case 1:
            vytvoreni_zadani(8,8);
            hodnota_vysledku=hodnota1+hodnota2;
            vysledek_bin=hodnota_vysledku.toString(2);
            y += vysledek_bin.length;
            break;
        case 2:
            vytvoreni_zadani(8,7);
            hodnota_vysledku=hodnota1-hodnota2;
            vysledek_bin=hodnota_vysledku.toString(2);
            y += vysledek_bin.length;
            break;
        case 3:
            vytvoreni_zadani(8,4);
            hodnota_vysledku=Math.floor(hodnota1/hodnota2);
            vysledek_bin=hodnota_vysledku.toString(2);
            y += vysledek_bin.length;
            break;
        case 4:
            vytvoreni_zadani(5,5);
            hodnota_vysledku=hodnota1*hodnota2;
            vysledek_bin=hodnota_vysledku.toString(2);
            y += vysledek_bin.length;
            break;
    }
}

document.getElementById('zpet').addEventListener('click', function() {
    window.location.reload(); //příkaz na reload stránky
})



//KÓD ZE STRÁNKY https://dcode.domenade.com/tutorials/easiest-way-to-export-csv-file-in-javascript (UPRAVENÝ)
document.getElementById("downloadCsv").addEventListener("click", () => {
    downloadCsv("data.csv", json2csv.parse(data));
});

function downloadCsv(filename, csvData) {
    const element = document.createElement("a");

    element.setAttribute("href", `data:text/csv;charset=utf-8,${csvData}`);
    element.setAttribute("download", filename);
    element.style.display = "none";

    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}
