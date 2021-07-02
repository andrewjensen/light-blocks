import { DOMParser } from 'xmldom';
import Environment from './Environment';
import { ProgramValue } from './ProgramValue';
import {
  getStartBlock,
  getNextBlock,
  getBlockId,
  getBlockType,
  stringifyBlock,
  getNestedValue
} from './blockUtils';
import { defineBlocks } from './blocks/defineBlocks';
import { IBlockHandler } from './blocks/IBlockHandler';

export type InterpreterEvent =
  | { type: 'STATUS_RUNNING', programId: number }
  | { type: 'STATUS_STOPPED' }
  | { type: 'CURRENT_BLOCK', blockId: string | null };

type EventListener = (event: InterpreterEvent) => void;

export default class Interpreter {
  private environment: Environment
  private program: Document | null
  private startBlock: Element | null
  private handlers: Map<string, IBlockHandler>
  private eventListener: EventListener

  constructor(environment: Environment) {
    this.environment = environment;
    this.program = null;
    this.startBlock = null;
    this.handlers = defineBlocks();
    this.eventListener = () => {};
  }

  setEventListener(listener: EventListener) {
    this.eventListener = listener;
  }

  setProgram(programText: string) {
    console.log('setting program:');
    console.log(programText);
    console.log('');

    const program = new DOMParser().parseFromString(
      programText,
      'text/xml'
    );
    this.program = program;
    this.startBlock = getStartBlock(program);
  }

  getEnvironment(): Environment {
    return this.environment;
  }

  /**
   * Run the program, notifying the event listener of state changes.
   */
  async run() {
    console.log('run()');

    // FIXME: include programId
    this.emitEvent({ type: 'STATUS_RUNNING', programId: -1 });

    const mainSequence = this.startBlock;
    if (!mainSequence) {
      throw new Error('Program is empty');
    }
    await this.executeSequence(mainSequence);

    this.emitEvent({ type: 'CURRENT_BLOCK', blockId: null });
    this.emitEvent({ type: 'STATUS_STOPPED' });
  }

  /**
   * Execute a sequence of statement blocks.
   *
   * @param firstBlock The first statement block in the sequence
   */
  async executeSequence(firstBlock: Element) {
    let currentBlock: Element | null = firstBlock;
    while (currentBlock) {
      await this.execute(currentBlock);
      currentBlock = getNextBlock(currentBlock);
    }
  }

  /**
   * Execute a block while notifying the event listener.
   *
   * @param block the block to execute
   */
  async execute(block: Element) {
    console.log(`Interpreter.execute(): ${stringifyBlock(block)}`);

    const blockId = getBlockId(block);
    this.emitEvent({ type: 'CURRENT_BLOCK', blockId });

    await this.evaluate(block);

    console.log('');
  }

  /**
   * Evaluate a block's expression with the handler for its type.
   *
   * @param block The block to evaluate
   * @returns The result of evaluating the expression
   */
  async evaluate(block: Element): Promise<ProgramValue> {
    const type = getBlockType(block);
    const handler = this.handlers.get(type);
    if (!handler) {
      throw new Error(`No handler defined for block type "${type}"`);
    }
    return await handler.evaluate(block, this);
  }

  async evaluateSubExpression(block: Element, valueName: string): Promise<ProgramValue> {
    const subExpression = getNestedValue(block, valueName);
    if (!subExpression) {
      throw new Error(`block is missing expression for value ${valueName}`);
    }

    const result = await this.evaluate(subExpression);
    return result;
  }

  private emitEvent(event: InterpreterEvent) {
    this.eventListener(event);
  }
}
