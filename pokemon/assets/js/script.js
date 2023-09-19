addEventListener("load", allPokemons);
function getEvoPoke(select, unPokemon) {
    // Les evo
    let evo = document.createElement('div');
    let textEvo = document.createElement('span');
    textEvo.textContent = 'PreEvolution / Evolutions : ';
    infoReduites.appendChild(evo);
    let evoPrec = document.createElement('img');
    evoPrec.setAttribute('class', 'evo')
    let evoActuelle = document.createElement('img');
    evoActuelle.setAttribute('class', 'evo')
    let evoSuiv = document.createElement('img');
    evoSuiv.setAttribute('class', 'evo')


    const select2 = unPokemon.apiPreEvolution.name
    fetch(`https://pokebuildapi.fr/api/v1/pokemon/${select2}`)
    .then((response) => response.json())
    .then((preEvo) => {
        evoPrec.setAttribute("src",preEvo.image);
    });
    
    fetch(`https://pokebuildapi.fr/api/v1/pokemon/${select}`)
    .then((response) => response.json())
    .then((actEvo) => {
        evoActuelle.setAttribute("src",actEvo.image);
    });
    const select3 = unPokemon.apiEvolutions[0].name
    fetch(`https://pokebuildapi.fr/api/v1/pokemon/${select3}`)
    .then((response) => response.json())
    .then((suivEvo) => {
        evoSuiv.setAttribute("src",suivEvo.image);
    });
    evo.appendChild(textEvo);
    evo.appendChild(evoPrec);
    evo.appendChild(evoActuelle);
    evo.appendChild(evoSuiv);
}

function allPokemons() {
    fetch('https://pokebuildapi.fr/api/v1/pokemon')
    .then((response) => response.json())
    .then((json) => {
    for (let i=0; i<json.length; i++) {
        console.log(json[i]);

        let option = document.createElement('option');
        option.textContent = json[i].name;
        let pokeSelector = document.querySelector('#poke-select');
        pokeSelector.appendChild(option);
        //console.log(pokeSelector);
        //console.log(option);
    }
});
}

document.querySelector('#poke-select').addEventListener('change', getPokemon);
function getPokemon() {
    const select = document.querySelector('#poke-select').value;
    console.log(select);
    // fetch('https://pokebuildapi.fr/api/v1/pokemon/' + select)
    fetch(`https://pokebuildapi.fr/api/v1/pokemon/${select}`)
    .then((response) => response.json())
    .then((unPokemon) => {
        let infoReduites = document.querySelector('#infoReduites');
        //Nuke l'intérieur de la div
            infoReduites.innerHTML = "";
            let texteTitre = document.createElement('span');
            texteTitre.textContent = 'Voici les informations connues de ' + select + ' : ';
            infoReduites.appendChild(texteTitre);
        
            //Montrer l'image du pokémerde
            let pokemonImage = document.createElement('img');
            pokemonImage.setAttribute("src",unPokemon.image);
            pokemonImage.setAttribute("class", 'pokePrincipal');
            infoReduites.appendChild(pokemonImage);

            let types = [];
            unPokemon.apiTypes.forEach(type => {
                types.push(type.image);
            });
            let typeDiv = document.createElement('div');
            console.log(typeDiv.childElementCount);
            infoReduites.appendChild(typeDiv);
            let textType = document.createElement('span')
            textType.textContent = 'Type(s) : ';
            typeDiv.appendChild(textType);

            for (let index = 0; index < types.length; index++) {
                let imgType = document.createElement("img");
                imgType.setAttribute("src", types[index])
                imgType.setAttribute("class", 'type')
                typeDiv.appendChild(imgType);
            }
            const pokeDetailDiv = document.querySelector('#detailsPoke');
            pokeDetailDiv.innerHTML = "";

            //Détails poké
            
            let monBouton = document.querySelector('#bouton');
            monBouton.addEventListener('click', () => {
            console.log('clicked');
            // console.log(querySelector(".detailsPoke"));
                pokeDetailDiv.innerHTML = "";
                const health = unPokemon.stats.HP;
                const attack = unPokemon.stats.attack;
                const defense = unPokemon.stats.defense;
                const specialAttack = unPokemon.stats.special_attack;
                const specialDefense = unPokemon.stats.special_defense;
                const speed = unPokemon.stats.speed;
                let statsTab = []
                let statsNametab = ['HP : ', 'Attaque : ', 'Defense : ', 'Attaque Spé : ', 'Défense Spé : ', 'Vitesse : ']
                statsTab.push(health);
                statsTab.push(attack);
                statsTab.push(defense);
                statsTab.push(specialAttack);
                statsTab.push(specialDefense);
                statsTab.push(speed);
                for (let kappa = 0; kappa < statsTab.length; kappa++) {
                    console.log(statsTab[kappa]);
                    let ligneStat = document.createElement('span');
                    ligneStat.textContent = statsNametab[kappa] + statsTab[kappa] + ' ';
                    pokeDetailDiv.appendChild(ligneStat);
                };
                statsTab = [];
                console.log('topkekfini')
            });
            getEvoPoke (select, unPokemon);
    });
}






//let monFormulaire = document.forms["formPokeSelect"];
    //monFormulaire.addEventListener("submit", getValues); 
    // Remarquez que l'on n'envoie rien et que l'on appelle la fonction sans les parenthèses
/*
    function getPokemon(url, param, idPokemon) {

        const selectedPokemonIndex = parseInt(idPokemon); // Récupérez l'indice du Pokémon sélectionné
        console.log("bouton JS : ");
        if (!isNaN(selectedPokemonIndex)) {
          localStorage.setItem("selection", selectedPokemonIndex);
          // Effectuer une nouvelle requête API pour obtenir les détails du Pokémon sélectionné
          fetch(url,param)
            .then((response) => response.json()) // Convertir la réponse en JSON
            .then((selectedPokemon) => {
              console.log(selectedPokemon.name);
              resultatElement.innerHTML = `
                <h2>Voici les informations de ${selectedPokemon.name}</h2>
                <img src="${selectedPokemon.image}" alt="Image Pokemon">
                <p>Élément : ${selectedPokemon.apiTypes
                  .map((type) => type.name)
                  .join(", ")}</p>
                ${selectedPokemon.apiEvolutions &&
                  selectedPokemon.apiEvolutions.length > 0
                  ? `<p>Évolution : ${selectedPokemon.apiEvolutions
                    .map((evolution) => evolution.name)
                    .join(", ")}</p>`
                  : "<p>Aucune évolution.</p>"
                }
                  <button type="submit" name="caract"><a href="./caracteristique.html">Caractéristique</a></button>
              `;
            })
            .catch((error) => {
              console.log("Erreur lors de la requête API : " + error); // Gérez les erreurs
            });
        } else {
          console.log("Sélection de Pokémon invalide.");
        }
      }
      
      document.forms[0].addEventListener("submit", (eventDetails) => {
        eventDetails.preventDefault();
        let fetchTarget = "";
        const idPokemon = document.querySelector("select").value
        if (eventDetails.submitter.getAttribute("name") == "pokemon-js") {
          console.log("JAVASCRIPT");
          const param = {};
          fetchTarget = apiUrl + idPokemon;
          getPokemon(fetchTarget, param, idPokemon);
        } else {
          console.log("PHP");
          const param = {
            method: "POST",
              body: document.querySelector("select").value,
              headers: {
                  "Content-Type": "application/text"
              }
          };
          fetchTarget = "./php/data.php";
          getPokemon(fetchTarget, param, idPokemon);
        }
      })

      */