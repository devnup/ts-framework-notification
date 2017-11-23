export interface BaseServiceOptions {
  /**
   * Enables full logging for service initialization and error handling.
   */
  verbose?: boolean;
}

export default abstract class BaseService {
  /**
   * The service name for verbose logging.
   */
  public readonly name: string;
  /**
   * The service options.
   */
  protected readonly options: BaseServiceOptions;

  /**
   * Instantiates a new base service
   * 
   * @param name The service name for verbose logging
   * @param options The service options
   */
  constructor(name: string, options: BaseServiceOptions) {
    this.name = name;
    this.options = options;
  }
}