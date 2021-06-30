import { useEffect, useState } from 'react';
import Blockly, { WorkspaceSvg } from 'blockly';
import { BlocklyEditor } from 'react-blockly';
import styled from '@emotion/styled';

import { defineBlocks } from './blocks';

interface Props {
  currentBlockId: string | null
  onUpdateProgram: (program: string) => void
}

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

const Editor: React.FC<Props> = ({ currentBlockId, onUpdateProgram }) => {
  const [workspace, setWorkspace] = useState<WorkspaceSvg | null>(null);

  useEffect(() => {
    if (workspace) {
      const nullableBlock = currentBlockId as string; // Working around Blockly's incorrect type
      workspace.highlightBlock(nullableBlock);
    }
  }, [currentBlockId, workspace]);

  const handleWorkspaceDidChange = (changedWorkspace: WorkspaceSvg) => {
    const dom = Blockly.Xml.workspaceToDom(changedWorkspace);
    const text = Blockly.Xml.domToPrettyText(dom);

    if (!workspace) {
      setWorkspace(changedWorkspace);
    }

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
          renderer: 'zelos'
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
