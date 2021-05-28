import { BlocklyEditor } from 'react-blockly';

import { defineBlocks } from './blocks';
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

defineBlocks();

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
