const ONE_MILISECON = 1000000;

const getMsFromHrTime = (hrtime: [number, number]): number => hrtime[0] + hrtime[1] / ONE_MILISECON;

export default getMsFromHrTime;
