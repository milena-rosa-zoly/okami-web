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
import api from 'services/api';
import filesize from 'filesize';

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
  const [uploadedFile, setUploadedFile] = useState<DropFileProps | undefined>(
    undefined,
  );
  const [processing, setProcessing] = useState(false);

  const handleSubmitFile = useCallback(
    async (data: FormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          languageCode: Yup.string().notRequired(),
          numberOfSpeakers: Yup.string().default('1').notRequired(),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const formData = new FormData();

        if (uploadedFile) {
          formData.append('file', uploadedFile.file, uploadedFile.filename);
          formData.append('languageCode', data.languageCode || 'pt-BR');
          formData.append(
            'numberOfSpeakers',
            String(data.numberOfSpeakers) || '1',
          );

          const importAudioResponse = await api.post('files/import', formData);
          if (importAudioResponse.status === 200) {
            const { id } = importAudioResponse.data;

            const response = await api.get(`transcriptions/${id}`);
            console.log(response.data);
          }
        } else {
          throw new Error('Por favor, adicione um arquivo');
        }
      } catch (err) {
        const validationErrors = {};

        if (err instanceof Yup.ValidationError) {
          err.inner.forEach(error => {
            validationErrors[error.path] = error.message;
          });

          formRef.current?.setErrors(validationErrors);
        }
      }
    },
    [uploadedFile],
  );

  const handleUploadFile = useCallback(
    (files: File[]) => {
      const file = files[0];

      setUploadedFile({
        file,
        filename: file.name,
        fileUrl: URL.createObjectURL(file),
        readableSize: filesize(file.size),
      });
    },
    [uploadedFile],
  );

  return (
    <ImportFileContainer>
      <Form
        ref={formRef}
        onSubmit={handleSubmitFile}
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

        <AudioInput onUpload={handleUploadFile} />

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
