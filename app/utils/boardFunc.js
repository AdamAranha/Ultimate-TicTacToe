let placementArray = [];
for (let count = 0; count < 9; count++) {
    placementArray[count] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
}

function checkAvailability(position) {
    let wasPlaced;
    if (placementArray[position.p1][position.p2] === 0) {
        placementArray[position.p1][position.p2] = position.currentPlayer
        wasPlaced = true;
    } else {
        console.log('Space occupied')
        wasPlaced = false
    }
    return { placementArray, wasPlaced }
}

module.exports = { checkAvailability }