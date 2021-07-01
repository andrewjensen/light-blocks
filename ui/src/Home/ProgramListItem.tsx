import styled from '@emotion/styled';

import { ProgramMeta } from './Home';

interface Props {
  program: ProgramMeta
}

export const ProgramListItem: React.FC<Props> = ({ program }) => {
  return (
    <Container>
      <Title>{program.title}</Title>
      <Controls>
        <Button>Play</Button>
        <Button>Edit</Button>
        <Button>Delete</Button>
      </Controls>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-basis: 0;
  align-items: center;
  margin-bottom: 1rem;
  padding: 0.5rem 1rem;
  border: 1px solid #999;
`;

const Title = styled.h3`
  flex-grow: 1;
  margin: 0;
  font-size: 18px;
  font-weight: normal;
`;

const Controls = styled.div`
  flex-grow: 0;
`;

const Button = styled.button`
  font-size: 12px;
  margin-left: 0.25rem;
`;