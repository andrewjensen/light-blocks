import { useEffect, useRef } from 'react';
import Blockly from 'blockly';
import { useBlocklyWorkspace } from 'react-blockly/dist';
import { useParams } from 'react-router-dom';

import ViewContainer from '../common/components/ViewContainer';
import { defineBlocks } from '../blocks';
import { ProgramMeta } from '../common/types';
import { TOOLBOX } from './toolbox';
import LightBlocksTheme from './theme';
import FieldColorComponents from './FieldColorComponents';
import useDebounce from './useDebounce';

// @ts-ignore
import ThemeDarkTheme from '@blockly/theme-dark';
// @ts-ignore
import ThemeDeuteranopia from '@blockly/theme-deuteranopia';
// // @ts-ignore
// import ThemeHackermode from '@blockly/theme-hackermode';
// @ts-ignore
import ThemeHighcontrast from '@blockly/theme-highcontrast';
// @ts-ignore
import ThemeModern from '@blockly/theme-modern';
// @ts-ignore
import ThemeTritanopia from '@blockly/theme-tritanopia';

interface Props {
  programs: ProgramMeta[]
  runningProgramId: number | null
  currentBlockId: string | null
  onUpdateSource: (programId: number, source: string) => void
}

interface EditorUrlParams {
  programId?: string
}

const DEBOUNCE_TIME_MS = 1000;

defineBlocks();

Blockly.fieldRegistry.register('field_color_components', FieldColorComponents);

const Editor: React.FC<Props> = ({ programs, runningProgramId, currentBlockId, onUpdateSource }) => {
  const { programId: rawProgramId } = useParams<EditorUrlParams>();
  if (!rawProgramId) {
    throw new Error('No program ID to load');
  }
  const programId = parseInt(rawProgramId);
  const program = programs.find(program => program.id === programId);

  const blocklyRef = useRef(null);

  const { workspace, xml } = useBlocklyWorkspace({
    ref: blocklyRef,
    workspaceConfiguration: {
      grid: {
        spacing: 20,
        length: 3,
        colour: '#ccc',
        snap: true,
      },
//      theme: LightBlocksTheme,
      theme: ThemeDarkTheme,
      renderer: 'zelos'
    },
    toolboxConfiguration: TOOLBOX,
    initialXml: program?.source,
  });

  const debouncedSource = useDebounce(xml, DEBOUNCE_TIME_MS);

  useEffect(() => {
    if (debouncedSource !== null && debouncedSource !== '') {
      onUpdateSource(programId, debouncedSource);
    }
  }, [debouncedSource, programId, onUpdateSource]);

  useEffect(() => {
    if (workspace && programId === runningProgramId) {
      workspace.highlightBlock(currentBlockId);
    }
  }, [currentBlockId, programId, runningProgramId, workspace]);

  if (!program) {
    return null;
  }

  return (
    <ViewContainer>
      <div ref={blocklyRef} className="fill-height" />
    </ViewContainer>
  )
}

export default Editor;
