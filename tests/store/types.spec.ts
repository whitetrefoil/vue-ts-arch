import * as _     from 'lodash';
import * as types from '../../src/store/types';

jest.resetModules();

describe('store :: types', () => {
  it('should contains only string objects', () => {
    _.forEach(types, (str, key) => {
      expect(typeof str).toBe('string');
      expect(str.toUpperCase().replace('/', '__').replace(/-/g, '_')).toBe(key);
      expect(key.toUpperCase()).toBe(key);
      const splitStr = str.split('/');
      expect(splitStr.length).toBeLessThanOrEqual(2);
      expect(splitStr.length).toBeGreaterThan(0);
      if (splitStr.length === 2) {
        expect(splitStr[0].toLowerCase()).toBe(splitStr[0]);
        expect(splitStr[1].toUpperCase()).toBe(splitStr[1]);
      }
    });
  });
});
