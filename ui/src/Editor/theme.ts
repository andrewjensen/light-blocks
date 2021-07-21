import Blockly from 'blockly';

const HUE_RED = '#cf0007';
const HUE_ORANGE = '#f5843d';
const HUE_YELLOW = '#ffc014';
const HUE_GREEN = '#53ab00';
const HUE_BLUE = '#1692df';
const HUE_VIOLET = '#60359c';

// @ts-ignore
const ClassicTheme = Blockly.Themes.Classic;

const LightBlocksTheme = Blockly.Theme.defineTheme('lightBlocks', {
  'base': ClassicTheme,
  'componentStyles': {
    // 'workspaceBackgroundColour': '#1e1e1e',
    // 'toolboxBackgroundColour': 'blackBackground',
    // 'toolboxForegroundColour': '#fff',
    // 'flyoutBackgroundColour': '#252526',
    // 'flyoutForegroundColour': '#ccc',
    // 'flyoutOpacity': 1,
    // 'scrollbarColour': '#797979',
    // 'insertionMarkerColour': '#fff',
    // 'insertionMarkerOpacity': 0.3,
    // 'scrollbarOpacity': 0.4,
    // 'cursorColour': '#d0d0d0',
    // 'blackBackground': '#333'
  },
  blockStyles: {
    'event_blocks': {
      colourPrimary: HUE_GREEN,
      hat: 'cap'
    },
    'process_blocks': {
      colourPrimary: HUE_ORANGE,
    },
    'color_blocks': {
      colourPrimary: HUE_BLUE,
    },
    'logic_blocks': {
      colourPrimary: HUE_YELLOW,
    },
    'control_blocks': {
      colourPrimary: HUE_YELLOW,
    },
    'timing_blocks': {
      colourPrimary: HUE_RED,
    },
    'math_blocks': {
      colourPrimary: HUE_VIOLET,
    }
  },
  categoryStyles: {

  }
});

export default LightBlocksTheme;

// @ts-ignore
// Blockly.Themes.LightBlocks = lightBlocksTheme;
