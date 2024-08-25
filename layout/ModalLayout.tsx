import styled from "styled-components";

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1;
`;

const ModalContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 1.5rem;
  width: 380px;
  padding: 2rem;
  border-radius: 10px;
`;

type ModalLayoutProps = {
  children: React.ReactNode;
};
function ModalLayout({ children }: ModalLayoutProps) {
  return (
    <Container>
      <ModalContainer>{children}</ModalContainer>
    </Container>
  );
}

export default ModalLayout;
