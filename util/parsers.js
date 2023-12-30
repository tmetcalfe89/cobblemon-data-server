const parseSpecies = species => ({
  ...species,
  moves: species.moves.map(parseMove),
  abilities: species.abilities.map(parseAbility),
  sname: parseStandardName(species.name)
})

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
  parseSpecies
}