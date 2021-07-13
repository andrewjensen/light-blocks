import styled from '@emotion/styled';

import { ProgramMeta } from '../common/types';
import { ProgramListItem } from './ProgramListItem';
import { CreateProgramButton } from './CreateProgramButton';

interface Props {
  programs: ProgramMeta[]
  runningProgramId: number | null
  onClickCreate: () => void
  onRun: (programId: number) => void
  onStop: () => void
  onEdit: (programId: number) => void
  onDelete: (programId: number) => void
}

export const ProgramList: React.FC<Props> = ({
  programs,
  runningProgramId,
  onClickCreate,
  onRun,
  onStop,
  onEdit,
  onDelete
}) => {
  return (
    <Container>
      {programs.map(program => (
        <ProgramListItem
          key={program.id}
          program={program}
          isRunning={runningProgramId === program.id}
          onRun={() => onRun(program.id)}
          onStop={onStop}
          onEdit={() => onEdit(program.id)}
          onDelete={() => onDelete(program.id)}
        />
      ))}
      <CreateProgramButton
        onClick={onClickCreate}
      />
    </Container>
  )
};

const Container = styled.div`
  margin: 2rem auto;
`;
