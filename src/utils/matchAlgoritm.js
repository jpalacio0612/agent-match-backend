const mapboxgl = require('mapbox-gl');

module.exports = function matchAlgoritm(myPosition, targetPositions, range) {
  const filterTargetPositions = targetPositions.filter(
    (pos) => pos.lastLatitude && pos.lastLongitude,
  );

  let indexArray = [];
  for (let i = 0; i < filterTargetPositions.length; i++) {
    const { lastLatitude } = filterTargetPositions[i];
    const { lastLongitude } = filterTargetPositions[i];
    const Position = new mapboxgl.LngLat(myPosition[0], myPosition[1]);
    const targetPostion = new mapboxgl.LngLat(lastLongitude, lastLatitude);
    const distance = Position.distanceTo(targetPostion);
    if (distance <= range) {
      indexArray.push(i);
    }
  }

  const result = indexArray.map((item) => filterTargetPositions[item]);
  return result;
};
