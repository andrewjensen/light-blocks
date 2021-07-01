import styled from '@emotion/styled';

import { ProgramMeta } from './Home';
import { ProgramListItem } from './ProgramListItem';

interface Props {
  programs: ProgramMeta[]
  onPlay: (programId: number) => void
  onEdit: (programId: number) => void
  onDelete: (programId: number) => void
}

export const ProgramList: React.FC<Props> = ({
  programs,
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
    </Container>
  )
};

const Container = styled.div`
  margin: 2rem auto;
`;
