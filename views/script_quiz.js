var zadani1 = '';  // proměnná držící hodnotu prvního zadaného čísla v binární soustavě
var zadani2 = '';  // proměnná držící hodnotu druhého zadaného čísla v binární soustavě
var hodnota1 = 0;  // proměnná držící hodnotu prvního zadaného čísla v dekadické soustavě
var hodnota2 = 0;  // proměnná držící hodnotu druhého zadaného čísla v dekadické soustavě        
var hodnota_vysledku = 0;  //proměnná která drží správnou hodnotu výsledku v dekadické soustavě
var vysledek_bin = '';     // proměnná držící správnou výslednou hodnotu výsledku v binární soustavě
var y = -1; //pomocná proměnná pro kontrolu 1 nebo 0 na "y" pozici "vysledek_bin"
var spravne = 0;
var spatne = 0;
var delka = 1;
var operace = 0;  //pomocná proměnná pro rozlišení, jakou operaci uživatel vybral (pro druhý a další příklady)
var data = [];      //proměnná pro uložení informací, které jsou exportovány do CSV souboru
var sekundy = 0;    //proměnná držící čas řešení příkladu
var date = '';      //proměnná držící datum ukončení příkladu
var x = 9;
var z = 7;

let duration = 0;

var zadany_vysledek = '';
var index_test = 9;
const cis1Inputs = document.querySelectorAll(".cisla1 input");
const cis2Inputs = document.querySelectorAll(".cisla2 input");
const vysInputs = document.querySelectorAll(".vysledek input");
var dataToExport = [];


function addRow() {
  dataToExport.push([zadani1, zadani2, vysledek_bin, zadany_vysledek, spravne, spatne, sekundy.toFixed(1)+"s", date]);
}

function getInput() {
  let input = "";
  for (let i = 0; i < vysInputs.length; i++) {
      input += vysInputs[i].value;
  }
  return input;
}

function getProblem() {
  function getHours(duration) {
    let hours = Math.floor(duration / 3600000) % 100;
    return hours < 10 ? '0' + hours : hours.toString();
  }
  function getMinutes(duration) {
    let hours = Math.floor(duration / 60000) % 60;
    return hours < 10 ? '0' + hours : hours.toString();
  }
  function getSeconds(duration) {
    let hours = Math.floor(duration / 1000) % 60;
    return hours < 10 ? '0' + hours : hours.toString();
  }
  let operation = operace === 1 ? '+' : operace === 2 ? '-' : operace === 3 ? '/' : '*';
  return {
    value: zadani1 + operation + zadani2,
    duration: `${getHours(duration)}:${getMinutes(duration)}:${getSeconds(duration)}`,
    entered: getInput(),
    result: vysledek_bin,
    wrongcount: spatne,
    correctcount: spravne,
    type: 'BIN'
  }
}

function sendProblem(problem) {
  fetch('sendproblem',
    {
      method: 'POST',
      headers:{
        'content-type' : 'application/json'
      },
      body: JSON.stringify(problem)
    }
  ); 
}

document.getElementById('moznost1').addEventListener('click', function() {
    if (index_test > 0) {
      // Nastavíme hodnotu aktuálního inputu na 1
      vysInputs[index_test].value = "1";
      index_test--;
      
      if (delka < vysledek_bin.length) {
        switch (vysledek_bin.charAt(y)) {
          case '1':
            spravne++;
            document.getElementById('spravne').textContent = spravne;
            vysInputs[index_test+1].style.color = "green";
            vysInputs[index_test+1].style.borderColor = "green";
            y--;
            break;
          case '0':
            spatne++;
            document.getElementById('spatne').textContent = spatne;
            vysInputs[index_test+1].style.color = "red";
            vysInputs[index_test+1].style.borderColor = "red";
            y--;
            break;
        }
        delka++;
      } else {
        switch (vysledek_bin.charAt(y)) {
          case '1':
            spravne++;
            document.getElementById('spravne').textContent = spravne;
            vysInputs[index_test+1].style.color = "green";
            vysInputs[index_test+1].style.borderColor = "green";
            y--;
            break;
          case '0':
            spatne++;
            document.getElementById('spatne').textContent = spatne;
            vysInputs[index_test+1].style.color = "red";
            vysInputs[index_test+1].style.borderColor = "red";
            y--;
            break;
        }
        delka++;
        document.getElementById("next").style.display = 'block';
        document.getElementById('buttony01').style.display = 'none';
        for (let index = 0; index <= 9; index++) {
          zadany_vysledek += vysInputs[index].value;
          
        }
        duration = performance.now() - duration;
        date = new Date().toLocaleString('cs-CZ');     //podle https://stackoverflow.com/a/30245911
        sendProblem(getProblem());
        addRow();
      }
    }
  });
  
    
document.getElementById('moznost2').addEventListener('click', function() {
    if (index_test > 0) {
        // Nastavíme hodnotu aktuálního inputu na 1
        vysInputs[index_test].value = "0";
        index_test--;
        
        if (delka < vysledek_bin.length) {
          switch (vysledek_bin.charAt(y)) {
            case '0':
              spravne++;
              document.getElementById('spravne').textContent = spravne;
              vysInputs[index_test+1].style.color = "green";
            vysInputs[index_test+1].style.borderColor = "green";
              y--;
              break;
            case '1':
              spatne++;
              document.getElementById('spatne').textContent = spatne;
              vysInputs[index_test+1].style.color = "red";
            vysInputs[index_test+1].style.borderColor = "red";
              y--;
              break;
          }
          delka++;
        } else {
          switch (vysledek_bin.charAt(y)) {
            case '0':
              spravne++;
              document.getElementById('spravne').textContent = spravne;
              vysInputs[index_test+1].style.color = "green";
            vysInputs[index_test+1].style.borderColor = "green";
              y--;
              break;
            case '1':
              spatne++;
              document.getElementById('spatne').textContent = spatne;
              vysInputs[index_test+1].style.color = "red";
            vysInputs[index_test+1].style.borderColor = "red";
              y--;
              break;
          }
          delka++;
          document.getElementById("next").style.display = 'block';
          document.getElementById('buttony01').style.display = 'none';
          for (let index = 0; index <= 9; index++) {
            zadany_vysledek += vysInputs[index].value;
            
          }
          duration = performance.now() - duration;
          date = new Date().toLocaleString('cs-CZ');     //podle https://stackoverflow.com/a/30245911
          sendProblem(getProblem());
          addRow();
      }

}})



document.getElementById('btn_scitani').addEventListener('click', function scitani() { 
    operace = 1;
    vytvoreni_zadani(8,8);
    zacatek();
    setInterval(casInc, 100);
    vysledek_bin=hodnota_vysledku.toString(2);
    y += vysledek_bin.length;       //nastaví y na hodnotu délky výsledku (-1 + "vysledek_bin.legth") (-1 kvůli pozici 0 stringu)
    

})
document.getElementById('btn_odcitani').addEventListener('click', function odcitani() { 
    operace = 2;
    vytvoreni_zadani(8,7);
    zacatek();
    setInterval(casInc, 100);
    vysledek_bin=hodnota_vysledku.toString(2);
    y += vysledek_bin.length;       //nastaví y na hodnotu délky výsledku (-1 + "vysledek_bin.legth") (-1 kvůli pozici 0 stringu)
})
document.getElementById('btn_deleni').addEventListener('click', function deleni() { 
    operace = 3;
    vytvoreni_zadani(8,4);
    zacatek();
    setInterval(casInc, 100);
    hodnota_vysledku=Math.floor(hodnota1/hodnota2);
    vysledek_bin=hodnota_vysledku.toString(2);
    y += vysledek_bin.length;       //nastaví y na hodnotu délky výsledku (-1 + "vysledek_bin.legth") (-1 kvůli pozici 0 stringu)
})
document.getElementById('btn_nasobeni').addEventListener('click', function nasobeni() { 
    operace = 4;
    vytvoreni_zadani(5,5);
    zacatek();
    setInterval(casInc, 100);
    vysledek_bin=hodnota_vysledku.toString(2);
    y += vysledek_bin.length;       //nastaví y na hodnotu délky výsledku (-1 + "vysledek_bin.legth") (-1 kvůli pozici 0 stringu)
})

//FUNKCE
function zacatek() {
    duration = performance.now();
    document.getElementById('detaily').style.display = 'flex';
    document.getElementById('priklady').style.display = 'flex';
    document.getElementById('vyber_okno').style.display = 'none';
    document.getElementById('uvod').style.display = 'none';
    document.getElementById('domu').style.display = 'none';
    document.getElementById('buttony01').style.display = 'flex';
    document.getElementById('zpet').style.display = 'block';
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
        hodnota_vysledku = 0;
        for (let index = 0; index < delka_cisla1; index++) {   // generace prvního zadaného čísla
            zadani1 += funkce_0nebo1();   
        }

        for (let index = 0; index < delka_cisla2; index++) {   // generace druhého zadaného čísla
            zadani2 += funkce_0nebo1();   
        }
        hodnota1 = parseInt(zadani1, 2);        //převod 1. čísla na dekadické
        hodnota2 = parseInt(zadani2, 2);        // převod 2. čísla na dekadické
    } 

    // Použijeme .padStart(8, '0') k doplnění nul
    binaryNumber1 = zadani1.padStart(8, '0');
    binaryNumber2 = zadani2.padStart(8, '0');

    switch (operace) {
        case 1:
            hodnota_vysledku=hodnota1+hodnota2;
            cis2Inputs[1].value = "+";
            break;
        case 2:
            hodnota_vysledku=hodnota1-hodnota2;
            cis2Inputs[1].value = "-";
            break;
        case 3:
            hodnota_vysledku=Math.floor(hodnota1/hodnota2);
            cis2Inputs[1].value = "÷";
            break;
        case 4:    
            hodnota_vysledku=hodnota1*hodnota2;
            if (hodnota_vysledku > 511) {
              
              hodnota1=0;
              hodnota2=0;
              zadani1='';
              zadani2='';
              j=7;
              x=7;
              hodnota_vysledku = 0;
              vytvoreni_zadani(5,5);
            }
            cis2Inputs[1].value = "·";
            break;

    }


    // Zapisujeme jednotlivé bity binárního čísla do inputů
    for (var i = 2; i < cis1Inputs.length; i++) {
      cis1Inputs[i].value = binaryNumber1[i-2];
    }
    for (var i = 2; i < cis2Inputs.length; i++) {
        cis2Inputs[i].value = binaryNumber2[i-2];
    }
}

function casInc() {
    sekundy+=0.1;
    document.getElementById('cas').textContent = sekundy.toFixed(1) + "s";
}

//nastavení dalšího příkladu (vymázání hodnot pro přepsání)

document.getElementById('next_btn').addEventListener('click', function() {
  document.getElementById("next").style.display = 'none';
    sekundy = 0;
    zadani1 = ''; 
    zadani2 = ''; 
    hodnota1 = 0; 
    hodnota2 = 0;  
    x = 9;
    z = 9;
    hodnota_vysledku = 0; 
    vysledek_bin = '';     
    y = -1; 
    zadany_vysledek = '';
    spravne = 0;
    spatne = 0;
    delka = 1;
    index_test = 9;
    document.getElementById('spatne').textContent='-';
    document.getElementById('spravne').textContent='-';

    for (let index = 0; index <= 9; index++) {
      vysInputs[index].value = '';
      vysInputs[index].style.color = 'rgba(0, 0, 0, 0.5)';
      vysInputs[index].style.borderColor = 'rgba(0, 0, 0, 0.3)';
    }

    switch (operace) {
      case 1:
        vytvoreni_zadani(8,8);
        zacatek();
        vysledek_bin=hodnota_vysledku.toString(2);
        y += vysledek_bin.length; 
        break;
      case 2:
        vytvoreni_zadani(8,7);
        zacatek();
        vysledek_bin=hodnota_vysledku.toString(2);
        y += vysledek_bin.length;
        break;
      case 3:
        vytvoreni_zadani(8,4);
        zacatek();
        hodnota_vysledku=Math.floor(hodnota1/hodnota2);
        vysledek_bin=hodnota_vysledku.toString(2);
        y += vysledek_bin.length;
        break;
      case 4:
        vytvoreni_zadani(5,5);
        zacatek();
        vysledek_bin=hodnota_vysledku.toString(2);
        y += vysledek_bin.length;
        break;
    }
  })


  document.getElementById('correct').addEventListener('click', function() {
    x = zadany_vysledek.length -1;
    for (let index = 9; index >= 0; index--) {
      vysInputs[index].value = vysledek_bin.charAt(x);
      x--;
      vysInputs[index].style.color = 'blue';
      vysInputs[index].style.borderColor = 'blue';
    }
    for (let index = 0; index <= 9-vysledek_bin.length; index++) {
      vysInputs[index].style.borderColor = 'rgba(0, 0, 0, 0.3)';
      vysInputs[index].style.color = 'rgba(0, 0, 0, 0.5)';
      
    }
    document.getElementById("correct").style.display = 'none';
    document.getElementById("users").style.display = 'inline';
})

document.getElementById('users').addEventListener('click', function() {
  z = zadany_vysledek.length - 1;
  for (let index = 9; index >= 0; index--) {
    vysInputs[index].value = zadany_vysledek.charAt(z);
    if (vysInputs[index].value == vysledek_bin.charAt(z)) {
      vysInputs[index].style.borderColor = "green";
      vysInputs[index].style.color = "green";
    } else {
      vysInputs[index].style.borderColor = "red";
      vysInputs[index].style.color = "red";
    }
    z--;
    for (let index = 0; index <= 9-zadany_vysledek.length; index++) {
      vysInputs[index].style.borderColor = 'rgba(0, 0, 0, 0.3)';
      vysInputs[index].style.color = 'rgba(0, 0, 0, 0.5)';
      
    }
  }
  document.getElementById("correct").style.display = 'inline';
  document.getElementById("users").style.display = 'none';
})

document.getElementById('zpet').addEventListener('click', function() {
    window.location.reload(); //příkaz na reload stránky
})


