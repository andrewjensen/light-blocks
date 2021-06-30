import { IBlockHandler } from './IBlockHandler';
import StartBlock from './control/StartBlock';
import LightOnBlock from './colors/LightOnBlock';
import LightOffBlock from './colors/LightOffBlock';
import WaitBlock from './timing/WaitBlock';
import NumberBlock from './math/NumberBlock';
import RandomBetweenBlock from './math/RandomBetweenBlock';
import ColorFromComponentsBlock from './colors/ColorFromComponentsBlock';
import SetColorBlock from './colors/SetColorBlock';
import ColorSimpleBlock from './colors/ColorSimpleBlock';
import LoopForeverBlock from './control/LoopForeverBlock';
import LoopNTimesBlock from './control/LoopNTimesBlock';
import IfElseBlock from './control/IfElseBlock';
import BooleanBlock from './logic/BooleanBlock';
import CompareBlock from './logic/CompareBlock';
import LogicAndBlock from './logic/LogicAndBlock';
import LogicOrBlock from './logic/LogicOrBlock';
import LogicNegateBlock from './logic/LogicNegateBlock';

const TO_DEFINE: IBlockHandler[] = [
  // colors
  new ColorFromComponentsBlock(),
  new ColorSimpleBlock(),
  new LightOffBlock(),
  new LightOnBlock(),
  new SetColorBlock(),

  // control
  new IfElseBlock(),
  new LoopForeverBlock(),
  new LoopNTimesBlock(),
  new StartBlock(),

  // logic
  new BooleanBlock(),
  new CompareBlock(),
  new LogicAndBlock(),
  new LogicNegateBlock(),
  new LogicOrBlock(),

  // math
  new NumberBlock(),
  new RandomBetweenBlock(),

  // timing
  new WaitBlock(),
];

export function defineBlocks(): Map<string, IBlockHandler> {
  const blocks = new Map();

  for (let block of TO_DEFINE) {
    blocks.set(block.getType(), block);
  }

  return blocks;
}
