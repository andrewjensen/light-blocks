import { BlocklyEditor } from 'react-blockly';
import styled from '@emotion/styled';

import TopBar from './TopBar';
import { defineBlocks } from './blocks';

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

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const EditorContainer = styled.div`
  flex-grow: 1;
`;

function App() {
  return (
    <Container>
      <TopBar />
      <EditorContainer>
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
      </EditorContainer>
    </Container>
  );
}

export default App;
