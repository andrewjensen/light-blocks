import { DOMParser } from 'xmldom';
import {
  getStartBlock,
  getNextBlock,
  getBlockId,
  stringifyBlock
} from './blockUtils';

export default class Interpreter {
  private program: Document | null
  private currentBlock: Element | null

  constructor() {
    this.program = null;
    this.currentBlock = null;
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
    this.currentBlock = getStartBlock(program);
  }

  run() {
    console.log('run()');

    while (this.currentBlock) {
      this.tick();
    }
  }

  tick() {
    if (!this.currentBlock) {
      throw new Error('No current block');
    }

    console.log(`Interpreter.tick(): ${stringifyBlock(this.currentBlock)}`);

    const id = getBlockId(this.currentBlock);
    console.log(`  id: ${id}`);

    // TODO: evaluate this block

    this.currentBlock = getNextBlock(this.currentBlock);
  }
}
