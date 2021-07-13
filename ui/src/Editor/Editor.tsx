import { useEffect, useState } from 'react';
import Blockly, { WorkspaceSvg } from 'blockly';
import { BlocklyEditor } from 'react-blockly';
import { useParams } from 'react-router-dom';

import ViewContainer from '../common/components/ViewContainer';
import { defineBlocks } from '../blocks';
import { ProgramMeta } from '../common/types';
import { TOOLBOX_CATEGORIES } from './toolbox';

interface Props {
  programs: ProgramMeta[]
  runningProgramId: number | null
  currentBlockId: string | null
  onUpdateSource: (programId: number, source: string) => void
}

interface EditorUrlParams {
  programId?: string
}

defineBlocks();

const Editor: React.FC<Props> = ({ programs, runningProgramId, currentBlockId, onUpdateSource }) => {
  const { programId: rawProgramId } = useParams<EditorUrlParams>();
  if (!rawProgramId) {
    throw new Error('No program ID to load');
  }
  const programId = parseInt(rawProgramId);
  const program = programs.find(program => program.id === programId);

  const [workspace, setWorkspace] = useState<WorkspaceSvg | null>(null);
  const [previousSource, setPreviousSource] = useState<string>('');

  useEffect(() => {
    if (workspace && programId === runningProgramId) {
      const nullableBlock = currentBlockId as string; // Working around Blockly's incorrect type
      workspace.highlightBlock(nullableBlock);
    }
  }, [currentBlockId, programId, runningProgramId, workspace]);

  const handleWorkspaceDidChange = (changedWorkspace: WorkspaceSvg) => {
    const dom = Blockly.Xml.workspaceToDom(changedWorkspace);
    const text = Blockly.Xml.domToPrettyText(dom);

    if (!workspace) {
      setWorkspace(changedWorkspace);
    }

    if (text !== previousSource) {
      setPreviousSource(text);

      if (previousSource !== '') {
        onUpdateSource(programId, text);
      }
    }
  }

  if (!program) {
    return null;
  }

  return (
    <ViewContainer>
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
        initialXml={program.source}
        workspaceDidChange={handleWorkspaceDidChange}
      />
    </ViewContainer>
  );
}

export default Editor;
