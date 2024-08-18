import styled, { keyframes } from "styled-components";

const LoadingAnimation = keyframes`
 0% {
    transform: translateX(0);
  }
  50%,
  100% {
    transform: translateX(500px);
  }
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 500px;
  border: 5px solid linear-gradient(to right, #f2f2f2, #ddd, #f2f2f2);
`;

const ProfileContainer = styled.div`
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  width: 80%;

  height: 200px;
  background: linear-gradient(to right, #f2f2f2, #ddd, #f2f2f2);
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 800px;
    height: 100%;
    background: linear-gradient(to right, #f2f2f2, #ddd, #f2f2f2);
    animation: ${LoadingAnimation} 1s infinite linear;
  }
`;

const SearchBarContainer = styled.div`
  overflow: hidden;
  position: relative;
  background: linear-gradient(to right, #f2f2f2, #ddd, #f2f2f2);
  border-radius: 10px;
  width: 80%;
  height: 100px;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 800px;
    height: 100%;
    background: linear-gradient(to right, #f2f2f2, #ddd, #f2f2f2);
    animation: ${LoadingAnimation} 10s infinite linear;
  }
`;

const FolderMenuContainer = styled.div`
  margin-top: 80px;
  border-radius: 10px;
  width: 80%;
  height: 80px;
  border: 5px solid #f2f2f2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  column-gap: 50px;
`;

const FolderMenuSubContainer = styled.div`
  display: flex;
  align-items: center;
`;

const FolderMenu = styled.div`
  overflow: hidden;
  position: relative;
  width: 100px;
  height: 50px;

  background-color: linear-gradient(to right, #f2f2f2, #ddd, #f2f2f2);
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 800px;
    height: 100%;
    background: linear-gradient(to right, #f2f2f2, #ddd, #f2f2f2);
    animation: ${LoadingAnimation} 1s infinite linear;
  }
`;

function FolderPageSkeleton() {
  return (
    <Wrapper>
      <HeaderContainer>
        <ProfileContainer />
      </HeaderContainer>
      <SearchBarContainer />
      <FolderMenuContainer>
        <FolderMenuSubContainer>
          <FolderMenu />
          <FolderMenu />
        </FolderMenuSubContainer>
        <FolderMenu />
      </FolderMenuContainer>
    </Wrapper>
  );
}

export default FolderPageSkeleton;
