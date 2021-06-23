import { IBlockHandler } from './IBlockHandler';
import StartBlock from './StartBlock';
import LightOnBlock from './LightOnBlock';
import LightOffBlock from './LightOffBlock';
import SetColorSimpleBlock from './SetColorSimpleBlock';
import WaitBlock from './WaitBlock';
import NumberBlock from './NumberBlock';
import RandomBetweenBlock from './RandomBetweenBlock';
import ColorFromComponentsBlock from './ColorFromComponentsBlock';
import SetColorBlock from './SetColorBlock';

const TO_DEFINE: IBlockHandler[] = [
  new StartBlock(),
  new LightOnBlock(),
  new LightOffBlock(),
  new SetColorSimpleBlock(),
  new WaitBlock(),
  new NumberBlock(),
  new RandomBetweenBlock(),
  new SetColorBlock(),
  new ColorFromComponentsBlock(),
];

export function defineBlocks(): Map<string, IBlockHandler> {
  const blocks = new Map();

  for (let block of TO_DEFINE) {
    blocks.set(block.getType(), block);
  }

  return blocks;
}
