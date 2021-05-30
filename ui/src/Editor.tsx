import Blockly, { WorkspaceSvg } from 'blockly';
import { BlocklyEditor } from 'react-blockly';
import styled from '@emotion/styled';

import { defineBlocks } from './blocks';

interface Props {
  onUpdateProgram: (program: string) => void
}

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

const INITIAL_XML = `
  <xml xmlns="https://developers.google.com/blockly/xml">
    <block type="start" id="x+S5DXa,yii=}TE}ZK{S" x="290" y="90"></block>
  </xml>
`;

const TOOLBOX_CATEGORIES: ToolboxCategory[] = [
  {
    name: 'Colors',
    blocks: [
      { type: 'start' },
      // { type: 'set_color' },
      { type: 'set_color_simple' },
      { type: 'light_on' },
      { type: 'light_off' },
    ]
  },
  {
    name: 'Timing',
    blocks: [
      { type: 'wait' }
    ]
  }
];

const Editor: React.FC<Props> = ({ onUpdateProgram }) => {
  const handleWorkspaceDidChange = (workspace: WorkspaceSvg) => {
    const dom = Blockly.Xml.workspaceToDom(workspace);
    const text = Blockly.Xml.domToPrettyText(dom);

    onUpdateProgram(text);
  }

  return (
    <Container>
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
        workspaceDidChange={handleWorkspaceDidChange}
      />
    </Container>
  );
}

export default Editor;

const Container = styled.main`
  flex-grow: 1;
`;
