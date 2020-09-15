import React, { useCallback, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import Input from 'components/Input';
import Button from 'components/Button';

import logoImg from '../../assets/logo_horizontal_positiva.png';
import { Wrapper, AnimationContainer, Background } from './styles';

import { useAuth } from '../../hooks/auth';
import { useToast } from 'hooks/toast';
import { FiArrowLeft, FiLock, FiMail, FiUser } from 'react-icons/fi';
import { FaGoogle } from 'react-icons/fa';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const { addToast } = useToast();

  const { createUser } = useAuth();

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});

        await createUser({
          email: data.email,
          displayName: data.name,
          password: data.password,
          photoURL: 'https://api.adorable.io/avatars/152/abott@adorable.png',
        });

        formRef.current?.reset();
        history.push('/');
      } catch (error) {
        formRef.current?.setErrors(error);
      }
    },
    [createUser, history],
  );

  return (
    <Wrapper>
      <Background />
      <AnimationContainer>
        <img src={logoImg} alt="Logo Zoly" />

        <div>
          <h2>Criar conta</h2>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Input icon={FiUser} name="name" type="text" placeholder="Nome" />
            <Input
              icon={FiMail}
              name="email"
              type="email"
              placeholder="E-mail"
            />
            <Input
              icon={FiLock}
              name="password"
              type="password"
              placeholder="Senha"
            />
            <Input
              icon={FiLock}
              name="passwordConfirmation"
              type="password"
              placeholder="Confirme a senha"
            />
            <Button type="submit">Criar conta</Button>
          </Form>

          <Button
            type="submit"
            onClick={() => console.log('signupwithgoogle?')}
          >
            <FaGoogle size={16} />
            Entrar com Google
          </Button>

          <Link to="/">
            <FiArrowLeft />
            Voltar para LogIn
          </Link>
        </div>
      </AnimationContainer>
    </Wrapper>
  );
};

export default SignUp;
