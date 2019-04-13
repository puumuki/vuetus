function createPlayer( id, name ) {
  return {
    id: id,
    name: name,
    points: {
    "17": 17,
    "d": 0,
    "18": 0,
    "t": 0,
    "19": 0,
    "r": 0,
    "20": 0,
    "b": 0
    }    
  }
}

module.exports = {
  createPlayer
}