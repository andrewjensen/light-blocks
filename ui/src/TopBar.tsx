import styled from '@emotion/styled';

interface Props {
  onRun: () => void
}

const TopBar: React.FC<Props> = ({ onRun }) => {
  return (
    <Container>
      <Title>light-blocks</Title>

      <Controls>
        <RunButton onClick={onRun}>Run</RunButton>
      </Controls>
    </Container>
  )
}

export default TopBar;

const Container = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px 10px;
  background-color: black;
  color: white;
`;

const Title = styled.h1`
  font-size: 28px;
  margin: 0;
  flex-grow: 1;
`;

const Controls = styled.div``;

const RunButton = styled.button`
  background-color: black;
  color: white;
  border: 1px solid white;
  font-size: 18px;
  padding: 5px 10px;
  cursor: pointer;

  &:hover, &:active {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;
