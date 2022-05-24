import { InputLabel } from 'Project/Board/IssueDetails/EstimateTracking/Styles';
import React from 'react';
// import { useRouteMatch, useHistory } from 'react-router-dom';
import { Link, useHistory } from 'react-router-dom';
import { Button, InputDebounced } from 'shared/components';
import api from 'shared/utils/api';
import { storeAuthToken } from 'shared/utils/authToken';
import './Login.css';
import toast from 'shared/utils/toast';
import Google from '../assets/google.svg';
import {
  LoginPage,
  BackgroundPage,
  AuthPage,
  LeftPage,
  TitlePage,
  FormInput,
  TitleAuth,
} from './Styled';

const Login = () => {
  const history = useHistory();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const onLogin = async data => {
    try {
      const { accessToken } = await api.post('/login', data);
      storeAuthToken(accessToken);
      history.push('/');
      toast.success('Login successful');
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <LoginPage>
      <LeftPage>
        <TitlePage>
          <h1>Welcome to PM App from Team 2</h1>
          <p>Login to discover more information</p>
        </TitlePage>
        <BackgroundPage />
      </LeftPage>
      <AuthPage>
        <TitleAuth>
          <h1>Login</h1>
          <p>Enter your credentials to access your account</p>
        </TitleAuth>

        <Button
          width={[1]}
          mt="1.5vh"
          height={['40px']}
          bg="#fff"
          onClick={() => console.log('login')}
          color="#575757"
          border="1px solid"
          borderColor="#dedede"
          mb="20px"
        >
          <img src={Google} alt="null" style={{ marginRight: '10px' }} />
          Log In with Google
        </Button>
        <hr />
        <div style={{ marginTop: '20px' }}>
          <FormInput>
            <InputLabel>Email Address</InputLabel>
            <InputDebounced
              placeholder="name@gmail.com"
              className="auth-input"
              onChange={value => setEmail(value)}
            />
          </FormInput>
          <FormInput>
            <InputLabel>Password</InputLabel>
            <InputDebounced
              type="password"
              placeholder="Enter your password"
              className="auth-input"
              onChange={value => setPassword(value)}
            />
          </FormInput>
          <Button
            width={[1]}
            mt="1.5vh"
            height={['40px']}
            variant="primary"
            onClick={() => onLogin({ email, password })}
          >
            Login
          </Button>
        </div>
        <div style={{ marginTop: '20px' }}>
          <p>
            Not a member?{' '}
            <Link key="register" to="/register">
              sign up now
            </Link>
          </p>
        </div>
      </AuthPage>
    </LoginPage>
  );
};

export default Login;
