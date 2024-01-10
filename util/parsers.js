const times = require("../data/times.json");
const moonPhases = require("../data/moonPhases.json");

const parseSpecies = species => ({
  ...species,
  moves: species.moves.map(parseMove),
  abilities: species.abilities.map(parseAbility),
  sname: parseStandardName(species)
})

const parseSpawns = ({ spawns, ...etc }) => spawns.map(({ pokemon, level, condition: { timeRange, moonPhase, canSeeSky, isRaining, isThundering, ...condition }, ...spawn }) => ({
  ...spawn,
  ...etc,
  pokemon: parsePokemon(pokemon),
  sname: parseSpawnStandardName(pokemon),
  level: parseRange(level),
  condition: {
    canSeeSky: parseTriBoolean(canSeeSky),
    isRaining: parseTriBoolean(isRaining),
    isThundering: parseTriBoolean(isThundering),
    timeRange: parseRange(timeRange, times),
    moonPhase: parseRange(moonPhase, moonPhases),
    ...condition
  }
}))

const parsePokemon = pokemon => {
  const splitter = pokemon.split(" ");
  return {
    name: splitter[0],
    aspects: splitter.slice(1).sort()
  }
}

const parseSpawnStandardName = pokemon => {
  const splitter = pokemon.split(" ")
  return [splitter[0], ...splitter.slice(1).sort()].join("-")
}

const parseRange = (rangesString, predefineds = {}) => rangesString ?
  ((rangesString in predefineds) ?
    predefineds[rangesString] :
    rangesString).split(",").map((rangeString) => {
      const [min, max = min] = rangeString.split("-");
      return ({ min: +min, max: +max })
    }) : [];

const parseTriBoolean = input => (input === null || input === undefined) ? "n/a" : input ? "yes" : "no";

const parseStandardName = ({ name, aspects = [] }) => [name.toLowerCase().replaceAll(" ", "-").match(/[a-z-]/g).join(""), ...aspects.sort()].join("-");

const parseMove = move => {
  const [source, name] = move.split(":");
  const isLevel = Number.isInteger(+source);
  return {
    name,
    source: isLevel ? "level" : source,
    level: isLevel ? +source : undefined
  }
}

const parseAbility = ability => {
  const isHidden = ability.startsWith("h:");
  const name = isHidden ? ability.slice(2) : ability;
  return {
    hidden: isHidden || undefined,
    name
  }
}

module.exports = {
  parseSpecies,
  parseSpawns
}