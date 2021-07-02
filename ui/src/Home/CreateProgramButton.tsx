import styled from '@emotion/styled';

interface Props {
  onClick: () => void
}

export const CreateProgramButton: React.FC<Props> = ({ onClick }) => {
  return (
    <Container onClick={onClick}>
      Create Program
    </Container>
  );
}

const Container = styled.button`
  display: block;
  box-sizing: border-box;
  width: 100%;
  background-color: #f0f0f0;
  border: 1px solid #999;
  padding: 0.5rem 1rem;
  font-size: 18px;
  text-align: left;
  cursor: pointer;
`;
