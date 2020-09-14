import React, { useCallback, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import Button from 'components/Button';
import Input from 'components/Input';

import { useToast } from 'hooks/toast';
import { useAuth } from 'hooks/auth';

import { FaGoogle } from 'react-icons/fa';
import { FiLock, FiLogIn, FiMail } from 'react-icons/fi';

import logoImg from '../../assets/logo_horizontal_positiva.png';
import { Wrapper, AnimationContainer, Background } from './styles';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const { signInWithEmailAndPassword, signInWithGoogle } = useAuth();

  const handleEnterWithGoogle = useCallback(async () => {
    try {
      await signInWithGoogle();
    } catch (error) {}
  }, [signInWithGoogle]);

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});

        await signInWithEmailAndPassword({
          email: data.email,
          password: data.password,
        }).catch((error: Error) => {
          formRef.current?.setErrors(error);
        });
        history.push('/dashboard');
      } catch (error) {
        console.log(error);
      }
    },
    [history, signInWithEmailAndPassword],
  );

  const handleSignInWithGoogle = useCallback(async () => {
    await signInWithGoogle();
  }, [signInWithGoogle]);

  return (
    <Wrapper>
      <AnimationContainer>
        <img src={logoImg} alt="Okami - Zoly" />

        <div>
          <h2>Entrar no app</h2>
          <Form ref={formRef} onSubmit={handleSubmit}>
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
            <Button type="submit">Entrar</Button>
            <Link to="/password-forget">Esqueci minha senha</Link>
          </Form>

          <Button type="submit" onClick={handleEnterWithGoogle}>
            <FaGoogle size={16} />
            Entrar com Google
          </Button>

          <Link to="/sign-up">
            <FiLogIn />
            Criar Conta
          </Link>
        </div>
      </AnimationContainer>
      <Background />
    </Wrapper>
  );
};

export default SignIn;
