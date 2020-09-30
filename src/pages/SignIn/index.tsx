import React, { useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';

import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import Button from 'components/Button';
import Input from 'components/Input';

import getValidationErrors from 'utils/getValidationErrors';
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

  const { addToast } = useToast();
  const { signInWithEmailAndPassword, signInWithGoogle } = useAuth();

  const handleEnterWithGoogle = useCallback(async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Erro na autenticação',
        description:
          'Ocorreu um erro ao realizar o login. Por favor, tente novamente.',
      });
    }
  }, [signInWithGoogle, addToast]);

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().required('Senha obrigatória'),
        });

        await schema.validate(data, { abortEarly: false });

        await signInWithEmailAndPassword({
          email: data.email,
          password: data.password,
        });
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);
          formRef.current?.setErrors(errors);
          return;
        }
        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description:
            'Ocorreu um erro ao realizar o login. Por favor, verifique as credenciais.',
        });
      }
    },
    [signInWithEmailAndPassword, addToast],
  );

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
