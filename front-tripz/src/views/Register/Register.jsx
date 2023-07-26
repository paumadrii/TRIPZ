import React from 'react';
import { styled } from 'styled-components';
import { validations } from '../../utils/constants/validations';
import { useForm } from 'react-hook-form';
import { registerUser } from '../../services/user';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const { register, handleSubmit, getValues } = useForm();
  const navigate = useNavigate();

  const onSubmit = async () => {
    const { email, password, username } = getValues();
    const payload = { email, password, username };
    const response = await registerUser(payload);
    console.log(response);
  };
  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <Container>
      <Content>
        <Title>Register</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input {...register('email', { required: validations.required })} placeholder="email@domain.com" />
          <Input {...register('username', { required: validations.required })} placeholder="username" />
          <Input {...register('password', validations)} type="password" placeholder="******" />
          <SubmitButton onClick={onSubmit}>Iniciar sesión</SubmitButton>
          <SubmitButtonInput type="submit" />
        </Form>
        <Footer>
          ¿Ya tienes una cuenta? <GoingLogin onClick={handleLogin}>Iniciar Sesión</GoingLogin>
        </Footer>
      </Content>
    </Container>
  );
};

export default Register;

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fafafb;
`;

const Content = styled.div`
  width: 100%;
  max-width: 500px;
  box-shadow: 0 1px 3px 0 rgba(60, 64, 67, 0.3), 0 4px 8px 3px rgba(60, 64, 67, 0.15);
  border-radius: 6px;
  padding: 16px;
  height: 250px;
  font-family: Arial, Helvetica, sans-serif;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin: 16px;
  height: fit-content;
  background-color: #80808013;
`;

const Title = styled.div`
  font-size: 36px;
  margin-top: 32px;
  margin-bottom: 16px;
  color: orange;
`;
const Form = styled.form`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  width: 100%;
  height: 36px;
  margin-top: 8px;
  border-radius: 4px;
  border: 1px solid orange;
  padding: 8px;
`;
const Footer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 32px;
`;

const GoingLogin = styled.div`
  border-bottom: 1px solid orange;
  padding: 8px;
  cursor: pointer;
  &:hover {
    text-shadow: 3px 3px 2px rgba(176, 176, 176, 1), 19px -7px 23px rgba(145, 145, 145, 1);
  }
`;

const SubmitButtonInput = styled.input`
  display: none;
`;

const SubmitButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid orange;
  border-radius: 4px;
  padding: 8px;
  background-color: orange;
  font-size: 16px;
  color: white;
  font-weight: 600;
  font-family: Arial, Helvetica, sans-serif;
  text-decoration: none;
  margin-top: 24px;
  margin-bottom: 24px;
  cursor: pointer;
  &:hover {
    background-color: #df9205;
  }
`;
