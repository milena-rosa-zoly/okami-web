import React, { useState, useCallback } from 'react';

import Header from 'components/Header';
import Button from 'components/Button';
import ImportAudioFilePanel from 'components/ImportAudioFilePanel';

import { FiPlus, FiMinus } from 'react-icons/fi';
import {
  Wrapper,
  Content,
  AddAudioButton,
  Transcriptions,
  Transcription,
} from './styles';

const Dashboard: React.FC = () => {
  const [addAudio, setAddAudio] = useState(false);

  const toggleAddAudio = useCallback(() => {
    setAddAudio(!addAudio);
  }, [addAudio]);

  return (
    <Wrapper>
      <Header />
      <Content>
        <AddAudioButton type="button" onClick={toggleAddAudio}>
          {addAudio ? <FiMinus size={20} /> : <FiPlus size={20} />}
        </AddAudioButton>

        {addAudio && <ImportAudioFilePanel />}

        <Transcriptions>
          {/* {repositories.map(repository => ( */}

          <Transcription>
            <strong>nome-do-arquivo.mp3</strong>

            <div>
              <Button>JSON</Button>
              <Button>TXT</Button>
            </div>
          </Transcription>

          <Transcription>
            <strong>nome-do-arquivo.mp3</strong>

            <div>
              <Button>JSON</Button>
              <Button>TXT</Button>
            </div>
          </Transcription>

          <Transcription>
            <strong>nome-do-arquivo.mp3</strong>

            <div>
              <Button>JSON</Button>
              <Button>TXT</Button>
            </div>
          </Transcription>

          {/* ))} */}
        </Transcriptions>
      </Content>
    </Wrapper>
  );
};

export default Dashboard;
