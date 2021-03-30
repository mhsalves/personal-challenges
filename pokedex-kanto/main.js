var detailImage = document.querySelector('#detail-image');
var detailAbility = document.querySelector('#detail-ability');
var detailType = document.querySelector('#detail-type');

var detailHp = document.querySelector('#detail-hp');
var detailAttack = document.querySelector('#detail-attack');
var detailDefense = document.querySelector('#detail-defense');
var detailSpecialAttack = document.querySelector('#detail-special-attack');
var detailSpecialDefense = document.querySelector('#detail-special-defense');
var detailSpeed = document.querySelector('#detail-speed');

var optionsContent = document.querySelector('#options-content');

function getPokemonId(url) {
  var split = url.split('/');
  return split[split.length - 2];
}

function loadDetail(pokemon) {
  detailImage.src = pokemon.sprites.other.dream_world.front_default;

  var abilityString = '';
  pokemon.abilities.forEach(function(ability, index) {
    abilityString += ability.ability.name;
    if (index !== pokemon.abilities.length - 1) abilityString += ' | ';
  });

  var typeString = '';
  pokemon.types.forEach(function(type, index) {
    typeString += type.type.name;
    if (index !== pokemon.types.length - 1) typeString += ' | ';
  });

  detailAbility.innerHTML = abilityString
  detailType.innerHTML = typeString

  detailHp.innerHTML = pokemon.stats[0].base_stat + ' (empenho: ' + pokemon.stats[0].effort + ')';
  detailAttack.innerHTML = pokemon.stats[1].base_stat + ' (empenho: ' + pokemon.stats[1].effort + ')';
  detailDefense.innerHTML = pokemon.stats[2].base_stat + ' (empenho: ' + pokemon.stats[2].effort + ')';
  detailSpecialAttack.innerHTML = pokemon.stats[3].base_stat + ' (empenho: ' + pokemon.stats[3].effort + ')';
  detailSpecialDefense.innerHTML = pokemon.stats[4].base_stat + ' (empenho: ' + pokemon.stats[4].effort + ')';
  detailSpeed.innerHTML = pokemon.stats[5].base_stat + ' (empenho: ' + pokemon.stats[5].effort + ')';
}

function fetchDetails(url) {
  fetch(url)
    .then(response => response.json())
    .then(function(pokemon) {
      console.log(pokemon);
      loadDetail(pokemon);
    });
}

function createOption(pokemon) {
  var id = getPokemonId(pokemon.url);
  var imageSource = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + id + '.png';

  var option = document.createElement('div');
  option.classList.add('option');

  var image = document.createElement('img');
  image.src = imageSource;
  image.alt = pokemon.name;

  option.appendChild(image);

  option.addEventListener('click', function() {
    fetchDetails(pokemon.url);
  });

  return option;
}

function generateOptions(results) {
  optionsContent.innerHTML = '';

  results.forEach(function(pokemon) {
    var option = createOption(pokemon);
    optionsContent.appendChild(option);
  });
}

function loadOptions() {
  fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
    .then(response => response.json())
    .then(response => response.results)
    .then(function(results) {
      generateOptions(results);
    });
}

loadOptions();
