import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import Header from 'components/Header';
import Button from 'components/Button';
import Input from 'components/Input';
import AudioInput from 'components/AudioInput';

import Firebase from '../../utils/firebase';
import api from '../../services/api';
import filesize from 'filesize';

import { FiPlus, FiMinus, FiAlertTriangle, FiUsers } from 'react-icons/fi';
import { Ring } from 'react-spinners-css';
import {
  Wrapper,
  Content,
  AddAudioButton,
  Transcriptions,
  Transcription,
  ImportFileContainer,
  FieldsContainer,
  Footer,
} from './styles';
import { MdTranslate } from 'react-icons/md';

interface AudioFileProps {
  id: string;
  filename: string;
  originalFilename: string;
  audioChannelCount: number;
  encoding: string;
  sampleRateHertz: number;
  languageCode: string;
  numberOfSpeakers: number;
  saveFileFinished: boolean;
  jsonFileAddress: string;
  txtFileAddress: string;
  createdAt: Date;
  updatedAt: Date;
}
interface DropFileProps {
  file: File;
  fileUrl: string;
  readableSize: string;
  filename: string;
}

interface FormFields {
  languageCode: string;
  numberOfSpeakers: number;
}

const Dashboard: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const audioFilesRef = useRef<AudioFileProps>({} as AudioFileProps);

  const [addAudio, setAddAudio] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<DropFileProps | undefined>(
    undefined,
  );
  const [transcriptions, setTranscriptions] = useState<AudioFileProps[]>([]);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    api.get('files').then(response => setTranscriptions(response.data));
  }, []);

  const toggleAddAudio = useCallback(() => {
    setAddAudio(!addAudio);
  }, [addAudio]);

  const convertJsonToTxt = useCallback(async () => {
    await api.get(`/transcriptions/text/${audioFilesRef.current.id}`);

    if (audioFilesRef.current.txtFileAddress === '') {
      const interval = setInterval(async () => {
        const response = await api.get(`/files/${audioFilesRef.current.id}`);

        if (response.data.txtFileAddress !== '') {
          audioFilesRef.current = response.data;
          clearInterval(interval);
          setProcessing(false);
        }
      }, 1000);
    }
  }, []);

  const transcriptAudioFile = useCallback(async () => {
    await api.get(`/transcriptions/${audioFilesRef.current.id}`);

    if (audioFilesRef.current.jsonFileAddress === '') {
      const interval = setInterval(async () => {
        const response = await api.get(`/files/${audioFilesRef.current.id}`);

        if (response.data.jsonFileAddress !== '') {
          audioFilesRef.current = response.data;
          clearInterval(interval);
          await convertJsonToTxt();
        }
      }, 1000);
    }
  }, [convertJsonToTxt]);

  const processFile = useCallback(
    async (data: FormData) => {
      setProcessing(true);
      const createdAudioFile = await api.post<AudioFileProps>(
        '/files/import',
        data,
      );
      audioFilesRef.current = createdAudioFile.data;

      if (!audioFilesRef.current.saveFileFinished) {
        let interval = setInterval(async () => {
          const response = await api.get(`/files/${audioFilesRef.current.id}`);

          if (response.data.saveFileFinished) {
            audioFilesRef.current = response.data;
            clearInterval(interval);
            await transcriptAudioFile();
          }
        }, 1000);
      }
    },
    [transcriptAudioFile],
  );

  const handleSubmitFile = useCallback(
    async (data: FormFields) => {
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

          await processFile(formData);
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
    [uploadedFile, processFile],
  );

  const handleUploadFile = useCallback((files: File[]) => {
    const file = files[0];

    setUploadedFile({
      file,
      filename: file.name,
      fileUrl: URL.createObjectURL(file),
      readableSize: filesize(file.size),
    });
  }, []);

  const downloadJsonFile = useCallback(async (id: string) => {
    const response = await api.get(`/files/${id}`);

    if (response.data) {
      const downloadUrl = await Firebase.downloadFile(
        response.data.jsonFileAddress,
      );
      const element = document.createElement('a');
      element.href = downloadUrl;
      element.download = response.data.filename;
      document.body.appendChild(element); // Required for this to work in FireFox
      element.click();
    }
  }, []);

  const downloadTxtFile = useCallback(async (id: string) => {
    const response = await api.get(`/files/${id}`);

    if (response.data) {
      const downloadUrl = await Firebase.downloadFile(
        response.data.txtFileAddress,
      );
      const element = document.createElement('a');
      element.href = downloadUrl;
      element.download = response.data.filename;
      document.body.appendChild(element); // Required for this to work in FireFox
      element.click();
    }
  }, []);

  return (
    <Wrapper>
      <Header />
      <Content>
        <AddAudioButton type="button" onClick={toggleAddAudio}>
          {addAudio ? <FiMinus size={20} /> : <FiPlus size={20} />}
        </AddAudioButton>

        {addAudio && (
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
                <Button type="submit" disabled={processing}>
                  {processing ? <Ring color="#fff" size={24} /> : 'Transcrever'}
                </Button>
              </Footer>
            </Form>
          </ImportFileContainer>
        )}

        <Transcriptions>
          {transcriptions.map(transcription => (
            <Transcription key={transcription.id}>
              <strong>{transcription.originalFilename}</strong>

              <div>
                {transcription.jsonFileAddress && (
                  <Button onClick={() => downloadJsonFile(transcription.id)}>
                    JSON
                  </Button>
                )}
                {transcription.txtFileAddress && (
                  <Button onClick={() => downloadTxtFile(transcription.id)}>
                    TXT
                  </Button>
                )}
              </div>
            </Transcription>
          ))}
        </Transcriptions>
      </Content>
    </Wrapper>
  );
};

export default Dashboard;
