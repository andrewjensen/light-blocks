import { IBlockHandler } from './IBlockHandler.js';
import StartBlock from './control/StartBlock.js';
import LightOnBlock from './colors/LightOnBlock.js';
import LightOffBlock from './colors/LightOffBlock.js';
import WaitBlock from './timing/WaitBlock.js';
import NumberBlock from './math/NumberBlock.js';
import RandomBetweenBlock from './math/RandomBetweenBlock.js';
import SetColorBlock from './colors/SetColorBlock.js';
import ColorFromComponentsBlock from './colors/ColorFromComponentsBlock.js';
import ColorPickerBlock from './colors/ColorPickerBlock.js';
import LoopForeverBlock from './control/LoopForeverBlock.js';
import LoopNTimesBlock from './control/LoopNTimesBlock.js';
import IfElseBlock from './control/IfElseBlock.js';
import BooleanBlock from './logic/BooleanBlock.js';
import CompareBlock from './logic/CompareBlock.js';
import LogicAndBlock from './logic/LogicAndBlock.js';
import LogicOrBlock from './logic/LogicOrBlock.js';
import LogicNegateBlock from './logic/LogicNegateBlock.js';
import RunDistinctProcessesBlock from './control/RunDistinctProcessesBlock.js';
import RunDuplicateProcessesBlock from './control/RunDuplicateProcessesBlock.js';

const TO_DEFINE: IBlockHandler[] = [
  // colors
  new ColorFromComponentsBlock(),
  new ColorPickerBlock(),
  new LightOffBlock(),
  new LightOnBlock(),
  new SetColorBlock(),

  // control
  new IfElseBlock(),
  new LoopForeverBlock(),
  new LoopNTimesBlock(),
  new RunDistinctProcessesBlock(),
  new RunDuplicateProcessesBlock(),
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
