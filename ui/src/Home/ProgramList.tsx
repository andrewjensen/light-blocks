import styled from '@emotion/styled';

import { ProgramMeta } from './Home';
import { ProgramListItem } from './ProgramListItem';

interface Props {
  programs: ProgramMeta[]
}

export const ProgramList: React.FC<Props> = ({ programs }) => {
  return (
    <Container>
      {programs.map(program => (
        <ProgramListItem key={program.id} program={program} />
      ))}
    </Container>
  )
};

const Container = styled.div`
  margin: 2rem auto;
`;
