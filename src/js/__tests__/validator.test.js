import GeoInput from "../geoinput";

describe('validateGeo function', () => {
    test('Should return true for valid coordinates', () => {
      expect(GeoInput.validateGeo("[51.5074, -0.1278]")).toStrictEqual([51.5074, -0.1278]);
      expect(GeoInput.validateGeo("51.5074, -0.1278")).toStrictEqual([51.5074, -0.1278]);
      expect(GeoInput.validateGeo("[51,-0]")).toStrictEqual([51, -0]);
      expect(GeoInput.validateGeo("90,-180")).toStrictEqual([90, -180]);
    });
  
    test('Should return false for invalid coordinates', () => {
      expect(GeoInput.validateGeo("[91, -180]")).toBe(false);
      expect(GeoInput.validateGeo("[51, -190]")).toBe(false);
      expect(GeoInput.validateGeo("abc, def")).toBe(false);
    });
  });