const mapboxgl = require('mapbox-gl');

module.exports = function matchAlgoritm(myPosition, targetPositions, range) {
  let indexArray = [];
  for (let i = 0; i < targetPositions.length; i++) {
    const { lastLatitude } = targetPositions[i];
    const { lastLongitude } = targetPositions[i];
    const Position = new mapboxgl.LngLat(myPosition[0], myPosition[1]);
    const targetPostion = new mapboxgl.LngLat(lastLongitude, lastLatitude);
    const distance = Position.distanceTo(targetPostion);
    if (distance <= range) {
      indexArray.push(i);
    }
  }

  const result = indexArray.map((item) => targetPositions[item]);
  return result;
};
