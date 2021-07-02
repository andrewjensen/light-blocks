import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

interface Props {
}

// FIXME: clean up

const TopBar: React.FC<Props> = () => {
  return (
    <Container>
      <Title><TitleLink to="/">light-blocks</TitleLink></Title>

      {/* <Controls>
        <RunButton onClick={onRun}>
          {isRunning ? 'Running...' : 'Run'}
        </RunButton>
      </Controls> */}
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

const TitleLink = styled(Link)`
  color: white;
  text-decoration: none;
`;

// const Controls = styled.div``;

// const RunButton = styled.button`
//   background-color: black;
//   color: white;
//   border: 1px solid white;
//   font-size: 18px;
//   padding: 5px 10px;
//   cursor: pointer;

//   &:hover, &:active {
//     background-color: rgba(255, 255, 255, 0.2);
//   }
// `;
