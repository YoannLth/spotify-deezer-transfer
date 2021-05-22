import { StreamingService } from './StreamingService';

export class SynchronizationEngine {
  inputService?: StreamingService;

  outputService?: StreamingService;

  init(inputService: StreamingService, outputService: StreamingService) {
    this.inputService = inputService;
    this.outputService = outputService;
  }

  checkServicesConnection = async (): Promise<boolean> => {
    if (this.inputService == null || this.outputService == null) {
      throw new Error('Services have not been initiated');
    }

    const inputConnectionSuccess = await this.inputService.verifyConnection();
    const outputConnectionSuccess = await this.outputService.verifyConnection();

    if (inputConnectionSuccess && outputConnectionSuccess) {
      return true;
    }
    return false;
  };
}

const syncEngine = new SynchronizationEngine();

export default syncEngine;
