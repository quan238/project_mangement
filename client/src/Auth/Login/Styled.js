import styled from 'styled-components';
import background from '../assets/background.png';

export const split = `
    height: 100%;
    width: 50%;
    position: fixed;
    z-index: 1;
    top: 0;
    overflow-x: hidden;
    padding-top: 20px;
`;

export const LoginPage = styled.div`
  display: flex;
  flex-direction: column;
  ${split}
  left:0;
`;

export const TitleAuth = styled.div`
  h1 {
    margin-bottom: 20px;
  }
  p {
    margin-bottom: 20px;
  }
`;

export const LeftPage = styled.div`
  background-color: #ededed;
  width: 50%;
  content: '';
  ${split}
  right:0;
`;

export const BackgroundPage = styled.div`
  background-image: url(${background});
  position: fixed;
  height: 75%;
  width: 40%;
  bottom: 0;
  right: 0;
  border-top: 15px #1a1919 solid;
  border-left: 15px #1a1919 solid;
  border-top-left-radius: 55px;
`;

export const TitlePage = styled.div`
  padding: 10vh 0 0 20vh;
`;

export const FormInput = styled.div`
  margin: 2.4vh 0;
`;

export const AuthPage = styled.div`
  width: 50%;
  margin: auto;
`;
