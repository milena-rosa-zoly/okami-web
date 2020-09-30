import React, { useCallback, useState } from 'react';
import Player from 'react-player';
import { useDropzone } from 'react-dropzone';

import { Wrapper, UploadMessage } from './styles';

interface UploadProps {
  onUpload: Function;
}

interface FileProps {
  filename: string;
  readableSize: string;
  fileUrl: string;
}

const AudioInput: React.FC<UploadProps> = ({ onUpload }) => {
  const [uploadedFile, setUploadedFile] = useState<File | undefined>(undefined);

  const onDropAccepted = useCallback(
    files => {
      onUpload(files);
      setUploadedFile(files[0]);
    },
    [onUpload],
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
  } = useDropzone({
    accept: '.raw, audio/*',
    onDropAccepted,
  });

  const renderDragMessage = useCallback(() => {
    if (!isDragActive) {
      return (
        <UploadMessage>Selecione ou arraste o arquivo aqui.</UploadMessage>
      );
    }

    if (isDragReject) {
      return <UploadMessage type="error">Arquivo não suportado.</UploadMessage>;
    }

    return <UploadMessage type="success">Solte o arquivo aqui.</UploadMessage>;
  }, [isDragActive, isDragReject]);

  return (
    <Wrapper
      {...getRootProps()}
      isDragActive={isDragActive}
      isDragReject={isDragReject}
    >
      <input {...getInputProps()} />
      {uploadedFile ? (
        <Player
          url={URL.createObjectURL(uploadedFile)}
          controls
          config={{ file: { forceAudio: true } }}
          width="100%"
          height="100%"
        />
      ) : (
        renderDragMessage()
      )}
    </Wrapper>
  );
};

export default AudioInput;
