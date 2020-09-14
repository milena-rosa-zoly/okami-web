import React, { useRef, useState, useCallback } from 'react';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import Input from '../Input';
import AudioInput from '../AudioInput';
import Button from '../Button';

import { MdTranslate } from 'react-icons/md';
import { FiUsers, FiAlertTriangle } from 'react-icons/fi';

import * as Yup from 'yup';

import { ImportFileContainer, FieldsContainer, Footer } from './styles';

interface DropFileProps {
  file: File;
  fileUrl: string;
  readableSize: string;
  filename: string;
}

interface FormData {
  languageCode: string;
  numberOfSpeakers: number;
}

const ImportAudioFilePanel: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [uploadedFiles, setUploadedFiles] = useState<DropFileProps[]>([]);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = useCallback(async (data: FormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        languageCode: Yup.string()
          .length(5)
          .matches(
            RegExp('/[a-zA-Z]{2}-[a-zA-Z]{2}/g'),
            'Deve seguir o formato xx-XX. Ex: pt-BR',
          )
          .default('pt-BR'),
        numberOfSpeakers: Yup.string().default('1').notRequired(),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      // !TODO: enviar arquivo pro storage.
      console.log(data);
    } catch (err) {
      const validationErrors = {};

      if (err instanceof Yup.ValidationError) {
        err.inner.forEach(error => {
          validationErrors[error.path] = error.message;
        });

        formRef.current?.setErrors(validationErrors);
      }
    }
  }, []);

  return (
    <ImportFileContainer>
      <Form
        ref={formRef}
        onSubmit={handleSubmit}
        // initialData={{ languageCode: 'pt-BR', numberOfSpeakers: 2 }}
        noValidate
      >
        <FieldsContainer>
          <div>
            <Input
              label="Idioma"
              icon={MdTranslate}
              type="text"
              name="languageCode"
              placeholder="pt-BR"
            />
          </div>
          <div>
            <Input
              label="Número de pessoas na gravação"
              icon={FiUsers}
              type="number"
              name="numberOfSpeakers"
              min={1}
              placeholder="2"
            />
          </div>
        </FieldsContainer>

        <AudioInput onUpload={(files: File[]) => console.log(files)} />

        <Footer>
          <p>
            <FiAlertTriangle size={16} />
            Permitidos apenas arquivos de áudio
          </p>
          <Button type="submit">{processing ? 'pensando...' : 'Enviar'}</Button>
        </Footer>
      </Form>
    </ImportFileContainer>
  );
};

export default ImportAudioFilePanel;
