import Blockly from "blockly";

export const TOOLBOX: Blockly.utils.toolbox.ToolboxDefinition = {
  kind: 'categoryToolbox',
  contents: [
    {
      kind: 'category',
      name: 'Colors',
      contents: [
        { kind: 'block', type: 'light_on' },
        { kind: 'block', type: 'light_off' },
        { kind: 'block', type: 'set_color' },
        { kind: 'block', type: 'color_picker' },
        { kind: 'block', type: 'color_components' },
      ]
    },
    {
      kind: 'category',
      name: 'Timing',
      contents: [
        { kind: 'block', type: 'wait' }
      ]
    },
    {
      kind: 'category',
      name: 'Control',
      contents: [
        { kind: 'block', type: 'controls_ifelse' },
        { kind: 'block', type: 'loop_forever' },
        { kind: 'block', type: 'loop_n_times' },
        { kind: 'block', type: 'run_duplicate_processes'},
        { kind: 'block', type: 'run_distinct_processes'},
      ]
    },
    {
      kind: 'category',
      name: 'Logic',
      contents: [
        { kind: 'block', type: 'logic_boolean' },
        { kind: 'block', type: 'logic_and' },
        { kind: 'block', type: 'logic_or' },
        { kind: 'block', type: 'logic_negate' },
        { kind: 'block', type: 'logic_compare' },
      ]
    },
    {
      kind: 'category',
      name: 'Math',
      contents: [
        { kind: 'block', type: 'math_number' },
        { kind: 'block', type: 'math_random_between' }
      ]
    }
  ]
};
