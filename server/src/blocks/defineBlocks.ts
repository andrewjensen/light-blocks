import { IBlockHandler } from './IBlockHandler';
import StartBlock from './StartBlock';
import LightOnBlock from './LightOnBlock';
import LightOffBlock from './LightOffBlock';
import WaitBlock from './WaitBlock';

const TO_DEFINE: IBlockHandler[] = [
  new StartBlock(),
  new LightOnBlock(),
  new LightOffBlock(),
  new WaitBlock()
];

export function defineBlocks(): Map<string, IBlockHandler> {
  const blocks = new Map();

  for (let block of TO_DEFINE) {
    blocks.set(block.getType(), block);
  }

  return blocks;
}
