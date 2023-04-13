export * from './date';
export * from './string';

export const calculateDelta = (params: {
  latitude: number;
  longitude: number;
  accuracy: number;
}) => {
  const oneDegreeOfLatitudeInMeters = 111.32 * 1000;
  const latDelta = params.accuracy / oneDegreeOfLatitudeInMeters;
  const longDelta =
    params.accuracy /
    (oneDegreeOfLatitudeInMeters * Math.cos(params.latitude * (Math.PI / 180)));

  return {
    latitudeDelta: latDelta,
    longitudeDelta: longDelta,
  };
};

export const isPointNear = (params: {
  checkPoint: { lat: number; lng: number };
  centerPoint: { lat: number; lng: number };
  km: number;
}) => {
  const { checkPoint, centerPoint, km } = params;

  const ky = 40000 / 360;
  const kx = Math.cos((Math.PI * centerPoint.lat) / 180.0) * ky;
  const dx = Math.abs(centerPoint.lng - checkPoint.lng) * kx;
  const dy = Math.abs(centerPoint.lat - checkPoint.lat) * ky;
  return Math.sqrt(dx * dx + dy * dy) <= km;
};
