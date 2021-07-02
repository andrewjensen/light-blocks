import styled from '@emotion/styled';

import { ProgramMeta } from '../common/types';
import { ProgramListItem } from './ProgramListItem';
import { CreateProgramButton } from './CreateProgramButton';

interface Props {
  programs: ProgramMeta[]
  onClickCreate: () => void
  onPlay: (programId: number) => void
  onEdit: (programId: number) => void
  onDelete: (programId: number) => void
}

export const ProgramList: React.FC<Props> = ({
  programs,
  onClickCreate,
  onPlay,
  onEdit,
  onDelete
}) => {
  return (
    <Container>
      {programs.map(program => (
        <ProgramListItem
          key={program.id}
          program={program}
          onPlay={() => onPlay(program.id)}
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
