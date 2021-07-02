import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { ProgramMeta } from './common/types';

interface Props {
  programs: ProgramMeta[]
}

interface EditorUrlParams {
  programId?: string
}

const TopBar: React.FC<Props> = ({ programs }) => {
  const { programId: rawProgramId } = useParams<EditorUrlParams>();

  let editingProgram: ProgramMeta | null = null;
  if (rawProgramId) {
    const programId = parseInt(rawProgramId);
    editingProgram = programs.find(program => program.id === programId) || null;
  }

  // FIXME: figure out running state
  const isRunning = false;

  return (
    <Container>
      <AppTitle><TitleLink to="/">light-blocks</TitleLink></AppTitle>

      {editingProgram && (
        <>
          <ProgramTitle>{editingProgram.title}</ProgramTitle>
          <Controls>
            <RunButton onClick={() => {}}>
              {isRunning ? 'Running...' : 'Run'}
            </RunButton>
          </Controls>
        </>
      )}
    </Container>
  )
}

export default TopBar;

const Container = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 1rem 1rem;
  background-color: black;
  color: white;
`;

const AppTitle = styled.h1`
  font-size: 28px;
  margin: 0;
`;

const ProgramTitle = styled.h2`
  font-size: 18px;
  margin: 0;
  margin-top: 0;
  margin-bottom: 0;
  margin-left: 2rem;
`;

const TitleLink = styled(Link)`
  color: white;
  text-decoration: none;
`;

const Controls = styled.div`
  margin-left: 2rem;
`;

const RunButton = styled.button`
  display: block;
  background-color: black;
  color: white;
  border: 1px solid white;
  font-size: 14px;
  padding: 5px 10px;
  cursor: pointer;

  &:hover, &:active {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;
