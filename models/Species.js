const abilities = require("../data/abilities.json")
const types = require("../data/types.json")
const times = require("../data/times.json")
const moves = require("../data/moves.json")
const eggGroups = require("../data/eggGroups.json")
const movePrefixes = require("../data/movePrefixes.json")
const experienceGroup = require("../data/experienceGroup.json")

const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  version: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  nationalPokedexNumber: {
    type: Number,
    required: true,
  },
  baseStats: {
    hp: {
      type: Number,
      required: true,
    },
    attack: {
      type: Number,
      required: true,
    },
    defence: {
      type: Number,
      required: true,
    },
    special_attack: {
      type: Number,
      required: true,
    },
    special_defence: {
      type: Number,
      required: true,
    },
    speed: {
      type: Number,
      required: true,
    },
  },
  maleRatio: {
    type: Number,
    default: 0.5,
  },
  catchRate: {
    type: Number,
    default: 45,
  },
  baseScale: {
    type: Number,
    default: 1,
  },
  baseExperienceYield: {
    type: Number,
    default: 10,
  },
  baseFriendship: {
    type: Number,
    default: 0
  },
  evYield: {
    hp: {
      type: Number,
      default: 0,
    },
    attack: {
      type: Number,
      default: 0,
    },
    defence: {
      type: Number,
      default: 0,
    },
    special_attack: {
      type: Number,
      default: 0,
    },
    special_defence: {
      type: Number,
      default: 0,
    },
    speed: {
      type: Number,
      default: 0,
    },
  },
  experienceGroup: {
    type: String,
    enum: experienceGroup,
    default: experienceGroup[0]
  },
  hitbox: {
    width: {
      type: Number,
      default: 1
    },
    height: {
      type: Number,
      default: 1
    },
    fixed: {
      type: Boolean,
      default: false
    },
  },
  primaryType: {
    type: String,
    enum: types,
    default: types[0]
  },
  secondaryType: {
    type: String,
    enum: types
  },
  abilities: {
    type: [{
      name: {
        type: String,
        validate: {
          validator: v => abilities.includes(v)
        },
        required: true,
      },
      hidden: {
        type: Boolean,
        default: false
      }
    }],
    default: []
  },
  shoulderMountable: {
    type: Boolean,
    default: false,
  },
  moves: {
    type: [{
      name: {
        type: String,
        validate: {
          validator: v => moves.includes(v),
        },
        required: true
      },
      source: {
        type: String,
        enum: ["tm", "tutor", "egg", "form_change", "level"],
        required: true,
      },
      level: {
        type: Number,
        min: 0,
        max: 100
      }
    }],
    default: []
  },
  features: {
    type: [{
      type: String
    }]
  },
  behaviour: {
    resting: {
      canSleep: {
        type: Boolean,
        default: false
      },
      times: {
        type: String,
        enum: times,
        default: "night"
      },
      sleepChance: {
        type: Number,
        default: 1 / 600
      },
      blocks: [{
        type: String
      }],
      biomes: [{
        type: String
      }],
      light: {
        type: String,
        validate: {
          validator: function (v) {
            const range = v.split("-");
            if (range.length !== 2) {
              return false;
            }
            return range.every((e) => Number.isInteger(+e))
          },
          message: "{PATH} is not a valid light range: {VALUE}"
        }
      },
      depth: {
        type: String,
        enum: ["comatose", "normal"],
        default: "normal"
      },
      willSleepOnBed: {
        type: Boolean,
        default: false,
      }
    },
    moving: {
      walk: {
        canWalk: {
          type: Boolean,
          default: true
        },
        avoidsLand: {
          type: Boolean,
          default: false
        },
        walkSpeed: {
          type: Number,
          default: 0.35
        }
      },
      swim: {
        avoidsWater: {
          type: Boolean,
          default: false
        },
        hurtByLava: {
          type: Boolean,
          default: true
        },
        canSwimInWater: {
          type: Boolean,
          default: true
        },
        canSwimInLava: {
          type: Boolean,
          default: true
        },
        swimSpeed: {
          type: Number,
          default: 0.3
        },
        canBreatheUnderwater: {
          type: Boolean,
          default: false
        },
        canBreatheUnderlava: {
          type: Boolean,
          default: false
        },
        canWalkOnWater: {
          type: Boolean,
          default: false
        },
        canWalkOnLava: {
          type: Boolean,
          default: false
        },
      },
      fly: {
        canFly: {
          type: Boolean,
          default: false
        },
        flySpeedHorizontal: {
          type: Number,
          default: 0.3
        },
      },
      wanderChance: {
        type: Number,
        default: 120
      },
      wanderSpeed: {
        type: Number,
        default: 1.0
      },
      canLook: {
        type: Boolean,
        default: true
      },
      looksAtEntities: {
        type: Boolean,
        default: true
      },
    },
    idle: {
      pointsAtSpawn: {
        type: Boolean,
        default: false
      },
    }
  },
  pokedex: [{
    type: String
  }],
  drops: {
    entries: [{
      percentage: {
        type: Number
      },
      quantity: {
        type: Number
      },
      maxSelectableTimes: {
        type: Number
      },
      item: {
        type: String
      },
      quantityRange: {
        type: String
      },
      nbt: {
        type: String
      }
    }],
    amount: {
      type: String,
      default: "1-1"
    }
  },
  eggCycles: {
    type: Number,
    default: 120
  },
  eggGroups: {
    type: [{
      type: String,
      enum: eggGroups
    }],
    default: []
  },
  dynamaxBlocked: {
    type: Boolean,
    default: false
  },
  implemented: {
    type: Boolean,
    default: false
  },
  height: {
    type: Number,
    default: 1
  },
  weight: {
    type: Number,
    default: 1
  },
  // forms: {
  //   type: [{
  //     type: mongoose.Types.ObjectId,
  //     ref: "Species"
  //   }],
  //   default: []
  // },
  labels: {
    type: [{
      type: String
    }]
  },
  // evolutions: {
  //   type: [{
  //   }]
  // },
  preEvolution: {
    type: String,
  }
});

module.exports = mongoose.model("Species", schema);