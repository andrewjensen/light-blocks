
import { BlocklyWorkspace } from 'react-blockly';

import './App.css';

const INITIAL_XML = `
  <xml xmlns="http://www.w3.org/1999/xhtml">
    <block type="text" x="70" y="30">
      <field name="TEXT">Code Gets Creative!</field>
    </block>
  </xml>
`;

function App() {
  return (
    <div className="App">
      <BlocklyWorkspace
        wrapperDivClassName="fill-height"
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
