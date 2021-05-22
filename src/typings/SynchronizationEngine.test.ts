import { SynchronizationEngine } from './SynchronizationEngine';
import DeezerEngine from './DeezerEngine';

describe('SynchronizationEngine', () => {
  const inputService = new DeezerEngine('123');
  const outputService = new DeezerEngine('123');
  let syncEngine: SynchronizationEngine;

  beforeEach(() => {
    syncEngine = new SynchronizationEngine();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('init', () => {
    it('should init values with correct values', () => {
      syncEngine.init(inputService, outputService);
      expect(syncEngine.inputService).toBe(inputService);
      expect(syncEngine.outputService).toBe(outputService);
    });
  });

  describe('checkServicesConnection', () => {
    it('should throw error if init have not been called before', async () => {
      await expect(syncEngine.checkServicesConnection()).rejects.toBeDefined();
    });

    it('should not throw error if init have been called before', async () => {
      syncEngine.init(inputService, outputService);
      await expect(syncEngine.checkServicesConnection()).resolves.toBeDefined();
    });

    it('should return true if both services connections have succeed', async () => {
      syncEngine.init(inputService, outputService);

      if (syncEngine.inputService && syncEngine.outputService) {
        jest
          .spyOn(syncEngine.inputService, 'verifyConnection')
          .mockImplementation(() => new Promise((res) => res(true)));
        jest
          .spyOn(syncEngine.outputService, 'verifyConnection')
          .mockImplementation(() => new Promise((res) => res(true)));

        const result = await syncEngine.checkServicesConnection();
        expect(result).toBe(true);
      } else {
        throw new Error();
      }
    });

    it('should return false if one service connection fails', async () => {
      syncEngine.init(inputService, outputService);

      if (syncEngine.inputService && syncEngine.outputService) {
        jest
          .spyOn(syncEngine.inputService, 'verifyConnection')
          .mockImplementation(() => new Promise((res) => res(true)));
        jest
          .spyOn(syncEngine.outputService, 'verifyConnection')
          .mockImplementation(() => new Promise((res) => res(false)));

        const result = await syncEngine.checkServicesConnection();
        expect(result).toBe(false);
      } else {
        throw new Error();
      }
    });

    it('should return false if both service connection fails', async () => {
      syncEngine.init(inputService, outputService);

      if (syncEngine.inputService && syncEngine.outputService) {
        jest
          .spyOn(syncEngine.inputService, 'verifyConnection')
          .mockImplementation(() => new Promise((res) => res(false)));
        jest
          .spyOn(syncEngine.outputService, 'verifyConnection')
          .mockImplementation(() => new Promise((res) => res(false)));

        const result = await syncEngine.checkServicesConnection();
        expect(result).toBe(false);
      } else {
        throw new Error();
      }
    });
  });
});
