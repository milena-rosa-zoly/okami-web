import React, { useCallback, useRef } from 'react';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import Input from 'components/Input';
import Button from 'components/Button';

import { useAuth } from 'hooks/auth';

import logoImg from '../../assets/logo_horizontal_positiva.png';
import { Wrapper, Background, AnimationContainer } from './styles';
import { FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';

interface PasswordForgotFormData {
  email: string;
}
const PasswordForget = () => {
  const formRef = useRef<FormHandles>(null);
  const { passwordReset } = useAuth();

  const handleSubmit = useCallback(
    async (data: PasswordForgotFormData) => {
      await passwordReset(data.email);
    },
    [passwordReset],
  );

  return (
    <Wrapper>
      <AnimationContainer>
        <img src={logoImg} alt="Okami - Zoly" />

        <div>
          <h1>Esqueci a senha</h1>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Input name="email" type="email" placeholder="E-mail" />
            <Button type="submit">Restaurar senha</Button>{' '}
          </Form>

          <Link to="/">
            <FiArrowLeft />
            Voltar para LogIn
          </Link>
        </div>
      </AnimationContainer>
      <Background />
    </Wrapper>
  );
};

export default PasswordForget;
