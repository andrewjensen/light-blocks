import Blockly, { Block } from 'blockly';
import { BlocklyEditor } from 'react-blockly';

import './App.css';

interface ToolboxCategory {
  name: string,
  custom?: CustomToolboxCategory,
  blocks: ToolboxBlock[],
}

interface ToolboxBlock {
  type: string,
  colour?: string,
  // TODO: fill in with details from here:
  // https://github.com/nbudin/react-blockly/blob/v6-stable/README.md
}

type CustomToolboxCategory = 'VARIABLE' | 'PROCEDURE';

const TOOLBOX_CATEGORIES: ToolboxCategory[] = [
  {
    name: 'Colors',
    blocks: [
      { type: 'start' },
      { type: 'set_color' },
      { type: 'light_on' },
      { type: 'light_off' },
    ]
  }
];

const INITIAL_XML = `
  <xml xmlns="http://www.w3.org/1999/xhtml"></xml>
`;

Blockly.Blocks['start'] = {
  init: function() {
    let block = this as Block;

    block.appendDummyInput()
        .appendField("when the program starts, do:");
    block.setNextStatement(true, null);
    block.setColour(230);
    block.setTooltip("");
    block.setHelpUrl("");
  }
};

Blockly.Blocks['set_color'] = {
  init: function() {
    let block = this as Block;
    block.appendDummyInput()
        .appendField("set color to");
    block.appendValueInput("H")
        .setCheck(null)
        .appendField("H");
    block.appendValueInput("S")
        .setCheck(null)
        .appendField("S");
    block.appendValueInput("B")
        .setCheck(null)
        .appendField("B");
    block.setInputsInline(true);
    block.setPreviousStatement(true, null);
    block.setNextStatement(true, null);
    block.setColour(230);
    block.setTooltip("");
    block.setHelpUrl("");
  }
};

Blockly.Blocks['light_on'] = {
  init: function() {
    let block = this as Block;
    block.appendDummyInput()
        .appendField("turn the light on");
    block.setPreviousStatement(true, null);
    block.setNextStatement(true, null);
    block.setColour(230);
    block.setTooltip("");
    block.setHelpUrl("");
  }
};

Blockly.Blocks['light_off'] = {
  init: function() {
    let block = this as Block;
    block.appendDummyInput()
        .appendField("turn the light off");
    block.setPreviousStatement(true, null);
    block.setNextStatement(true, null);
    block.setColour(230);
    block.setTooltip("");
    block.setHelpUrl("");
  }
};

function App() {
  return (
    <div className="App">
      <BlocklyEditor
        wrapperDivClassName="fill-height"
        toolboxCategories={TOOLBOX_CATEGORIES}
        workspaceConfiguration={{
          grid: {
            spacing: 20,
            length: 3,
            colour: '#ccc',
            snap: true,
          },
        }}
        initialXml={INITIAL_XML}
      />
    </div>
  );
}

export default App;
