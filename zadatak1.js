let zanr = ["comedy", "csi-fi", "horror", "romance", "action", "thriller", "drama",
"mistery", "crime", "animation", "adventure", "fantasy", "comedy-romance", "action-comedy", "superhero"];

let loadFromLocalStorage = function (naziv) {
return JSON.parse(localStorage.getItem(naziv));
}
let saveToLocalStorage = function saveToLocalStorage(naziv, objekat) {
localStorage.setItem(naziv, JSON.stringify(objekat));
}

let allActors = loadFromLocalStorage("allActors");

console.log(allActors);

if (allActors == null) allActors = {};

let createOneActor = function () {
let name = document.getElementById("firstname").value;
let lastName = document.getElementById("lastname").value;
let bio = document.getElementById("bio").value;
let birthDate = document.getElementById("birthDate").value;
oneActor = { name, lastName, bio, birthDate };

return oneActor;
};
let addActorToAllActors = function (actorId) {
if (!allActors[actorId]) {
  allActors[actorId] = createOneActor();
  return allActors;
}
else {
  return document.getElementById("prompt").style.display = "block";
}

}
let updateActor = function (actorId, naziv, izmenjenaVrednost) {
allActors[actorId][naziv] = izmenjenaVrednost;
}
let deleteActor = function (actorId) {
delete allActors[actorId];
}
//metod koji crta tabelu
let napraviTabelu = (function () {
let tabela = document.createElement("table");
tabela.setAttribute("border", 1);
tabela.setAttribute("id", "actorsTable");
let caption = document.createElement("caption");
caption.textContent = "Tabela sa glumcima";
tabela.appendChild(caption);
let zaglavlje = document.createElement("thead");
zaglavlje.setAttribute("id", "zaglavlje");
for (let i = 0; i < 4; i++) {
  kolone = document.createElement("th");
  zaglavlje.appendChild(kolone);
}
tabela.appendChild(zaglavlje);

return document.body.appendChild(tabela);
})();
// metod koji popunjava zaglavlje tabele
let popuniZaglavljeTabele = (function () {
let naziviKolona = document.getElementById("zaglavlje").childNodes;
naziviKolona[0].textContent = "ID";
naziviKolona[1].textContent = "Name and Lastname";
naziviKolona[2].textContent = "Bioraphy";
naziviKolona[3].textContent = "Date of birth";
})();
//metod koji popunjava tabelu kada unesemo novog glumca
let popuniTabelu = function (actorId) {
let allActors;
if(actorId!=null){
  allActors={}
  allActors[actorId]=createOneActor();
}else{
  allActors = loadFromLocalStorage("allActors");
}
for (let actorId in allActors) {
  let noviRed = document.createElement("tr");
  document.getElementById("actorsTable").appendChild(noviRed); 
  for (j = 0; j < 4; j++) {
    let novaKolona = document.createElement("td");
    noviRed.appendChild(novaKolona);
  }
  noviRed.childNodes[0].textContent = actorId;
  noviRed.childNodes[1].textContent = allActors[actorId].name + allActors[actorId].lastName;
  noviRed.childNodes[2].textContent = allActors[actorId].bio;
  noviRed.childNodes[3].textContent = allActors[actorId].birthDate;

}
};



document.getElementById("createAct").addEventListener("submit", function (e) {
e.preventDefault();
addActorToAllActors(document.getElementById("idCreate").value);
saveToLocalStorage('allActors', allActors);
popuniTabelu(document.getElementById('idCreate').value);
document.getElementById("createAct").reset();


});

popuniTabelu();
//metod koji brise glumca iz localStorage i tabele
//metod koji brise film iz localStorage i tabele

// metod koji popunjava listu sa zanrovima
let createOptionInSelect = (function (optionList) {

for (let i = 0; i < zanr.length; i++) {
  jedanZanr = zanr[i];
  let opcija = document.createElement("option");
  opcija.setAttribute("value", jedanZanr);
  opcija.textContent = zanr[i];

  document.getElementById("zanr").appendChild(opcija);
}
})(zanr);

// metod koji zove ime i prezime glumca kad upisemo id i kliknemo load...

document.getElementById("load").addEventListener("click", function () {
let id = document.getElementById("actorsList").value;
document.getElementById("actorsList").value = "";
let addActorList = allActors[id].name + " " + allActors[id].lastName;
//console.log(allActors[id].name+" "+allActors[id].lastName);
let newParagraph = document.createElement("p");
newParagraph.textContent = addActorList;
document.getElementById("load").insertAdjacentElement("afterend", newParagraph);

});



/*
//promeni da se ne cuva u ls nego u json fajlu

// cita iz json fajla
let loadFromJSON=(function () {  
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        let jsonString= this.responseText;   
        console.log("jsonString::: ",jsonString);
               
     }
  };
  
  xhttp.open("GET", "baza.json", true);
  xhttp.send();
  
}());

//cuva u json

let student = {  
  name: 'Mike',
  age: 23, 
  gender: 'Male',
  department: 'English',
  car: 'Honda' 
};

let saveToJSON=(function (naziv,objekat){
  const fs = require('fs');
  fs.writeFile("baza.json",JSON.stringify(objekat))
  
}("studenti",student));

//Let's write another file, "student-3.json", using the writeFile function.


'use strict';

const fs = require('fs');

let student = {  
    name: 'Mike',
    age: 23, 
    gender: 'Male',
    department: 'English',
    car: 'Honda' 
};

let data = JSON.stringify(student, null, 2);

fs.writeFile('student-3.json', data, (err) => {  
    if (err) throw err;
    console.log('Data written to file');
});

console.log('This is after the write call');  */