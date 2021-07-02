interface ToolboxCategory {
  name: string,
  custom?: CustomCategoryName,
  blocks: ToolboxBlock[],
}

interface ToolboxBlock {
  type: string,
  colour?: string,
  // TODO: fill in with details from here:
  // https://github.com/nbudin/react-blockly/blob/v6-stable/README.md
}

type CustomCategoryName = 'VARIABLE' | 'PROCEDURE';

export const TOOLBOX_CATEGORIES: ToolboxCategory[] = [
  {
    name: 'Colors',
    blocks: [
      { type: 'light_on' },
      { type: 'light_off' },
      { type: 'set_color' },
      { type: 'color_simple' },
      { type: 'color_components' },
    ]
  },
  {
    name: 'Timing',
    blocks: [
      { type: 'wait' }
    ]
  },
  {
    name: 'Control',
    blocks: [
      { type: 'controls_ifelse' },
      { type: 'loop_forever' },
      { type: 'loop_n_times' },
    ]
  },
  {
    name: 'Logic',
    blocks: [
      { type: 'logic_boolean' },
      { type: 'logic_and' },
      { type: 'logic_or' },
      { type: 'logic_negate' },
      { type: 'logic_compare' },
    ]
  },
  {
    name: 'Math',
    blocks: [
      { type: 'math_number' },
      { type: 'math_random_between' }
    ]
  }
];
