import Environment from '../Environment';

export interface IBlockHandler {
  getType: () => string
  evaluate: (block: Element, environment: Environment) => Promise<void>
}
