const times = require("../data/times.json");
const moonPhases = require("../data/moonPhases.json");

const parseSpecies = species => ({
  ...species,
  moves: species.moves.map(parseMove),
  abilities: species.abilities.map(parseAbility),
  sname: parseStandardName(species.name)
})

const parseSpawns = ({ spawns, ...etc }) => spawns.map(({ level, condition: { timeRange, moonPhase, canSeeSky, isRaining, isThundering, ...condition }, ...spawn }) => ({
  ...spawn,
  ...etc,
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

const parseRange = (rangesString, predefineds = {}) => rangesString ?
  ((rangesString in predefineds) ?
    predefineds[rangesString] :
    rangesString).split(",").map((rangeString) => {
      const [min, max = min] = rangeString.split("-");
      return ({ min: +min, max: +max })
    }) : [];

const parseTriBoolean = input => (input === null || input === undefined) ? "n/a" : input ? "yes" : "no";

const parseStandardName = name => name.toLowerCase().replaceAll(" ", "-").match(/[a-z-]/g).join("");

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