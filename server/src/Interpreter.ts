import { DOMParser } from 'xmldom';
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
import { ProgramMeta, LightEnvironment } from './types';
import logger from './logger';

export interface ExecutionContext {
  lightId: number | null
}

type RuntimeStatus =
  | { type: 'STOPPED' }
  | { type: 'RUNNING' }
  | { type: 'TERMINATING' }

export type InterpreterEvent =
  | { type: 'STATUS_RUNNING', programId: number }
  | { type: 'STATUS_STOPPED' }
  | { type: 'CURRENT_BLOCK', blockId: string | null };

type EventListener = (event: InterpreterEvent) => void;

export default class Interpreter {
  private environment: LightEnvironment
  private program: ProgramMeta | null
  private startBlock: Element | null
  private handlers: Map<string, IBlockHandler>
  private eventListener: EventListener
  private status: RuntimeStatus

  constructor(environment: LightEnvironment) {
    this.environment = environment;
    this.program = null;
    this.startBlock = null;
    this.handlers = defineBlocks();
    this.eventListener = () => {};
    this.status = { type: 'STOPPED' };
  }

  setEventListener(listener: EventListener) {
    this.eventListener = listener;
  }

  setProgram(inProgram: ProgramMeta) {
    logger.debug('Interpreter: Setting current program:');
    logger.debug(inProgram.source);
    logger.debug('');

    this.program = inProgram;

    const programXml = new DOMParser().parseFromString(
      inProgram.source,
      'text/xml'
    );
    this.startBlock = getStartBlock(programXml);
  }

  getEnvironment(): LightEnvironment {
    return this.environment;
  }

  isTerminating(): boolean {
    return this.status.type === 'TERMINATING';
  }

  /**
   * Run the program, notifying the event listener of state changes.
   */
  async run() {
    logger.debug('Interpreter.run()');

    if (!this.program) {
      throw new Error('No program initialized');
    }

    this.status = { type: 'RUNNING' };
    this.emitEvent({ type: 'STATUS_RUNNING', programId: this.program.id });

    const mainSequence = this.startBlock;
    if (!mainSequence) {
      throw new Error('Program is empty');
    }
    const initialContext: ExecutionContext = {
      lightId: null
    };
    await this.executeSequence(mainSequence, initialContext);

    this.status = { type: 'STOPPED' };
    this.emitEvent({ type: 'CURRENT_BLOCK', blockId: null });
    this.emitEvent({ type: 'STATUS_STOPPED' });

    logger.debug('Interpreter.run() complete');
  }

  stop() {
    this.status = { type: 'TERMINATING' };
  }

  /**
   * Execute a sequence of statement blocks.
   *
   * @param firstBlock The first statement block in the sequence
   * @param context The execution context to run the sequence within
   */
  async executeSequence(firstBlock: Element, context: ExecutionContext) {
    let currentBlock: Element | null = firstBlock;
    while (currentBlock && this.status.type === 'RUNNING') {
      await this.execute(currentBlock, context);
      currentBlock = getNextBlock(currentBlock);
    }
  }

  /**
   * Execute a block while notifying the event listener.
   *
   * @param block the block to execute
   * @param context The execution context to run the sequence within
   */
  async execute(block: Element, context: ExecutionContext) {
    logger.debug(`Interpreter.execute(): ${stringifyBlock(block)}`);

    const blockId = getBlockId(block);

    if (!context.lightId) {
      this.emitEvent({ type: 'CURRENT_BLOCK', blockId });
    }

    await this.evaluate(block, context);

    logger.debug('');
  }

  /**
   * Evaluate a block's expression with the handler for its type.
   *
   * @param block The block to evaluate
   * @param context The execution context to run within
   * @returns The result of evaluating the expression
   */
  async evaluate(block: Element, context: ExecutionContext): Promise<ProgramValue> {
    const type = getBlockType(block);
    const handler = this.handlers.get(type);
    if (!handler) {
      throw new Error(`No handler defined for block type "${type}"`);
    }
    return await handler.evaluate(block, this, context);
  }

  async evaluateSubExpression(block: Element, valueName: string, context: ExecutionContext): Promise<ProgramValue> {
    const subExpression = getNestedValue(block, valueName);
    if (!subExpression) {
      throw new Error(`block is missing expression for value ${valueName}`);
    }

    const result = await this.evaluate(subExpression, context);
    return result;
  }

  private emitEvent(event: InterpreterEvent) {
    this.eventListener(event);
  }
}
