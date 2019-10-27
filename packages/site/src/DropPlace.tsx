/* eslint-disable no-console */
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';
import { PandoraUser } from '@tune-sync/pandora';

type DropPlaceProps = {
  onFileParse?: (feedback: PandoraUser[]) => void;
};

export const DropPlace = ({
  onFileParse = feedback => console.log(feedback),
}: DropPlaceProps) => {
  const onDrop = useCallback(
    acceptedFiles => {
      const reader = new FileReader();

      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading as failed');
      reader.onprogress = progressEvent =>
        console.log(`${progressEvent.loaded}/${progressEvent.total} loaded`);
      reader.onload = () => {
        const textStr = reader.result as string;
        const typed = JSON.parse(textStr) as PandoraUser[];
        if (onFileParse) onFileParse(typed);
      };

      acceptedFiles.forEach((file: any) => {
        reader.readAsText(file);
      });
    },
    [onFileParse],
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const Title = styled.h1`
    font-size: 1.5em;
  `;

  // spreading getRootProps onto a styled-components breaks functionality
  // probably a ref issue?
  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <Title>Upload Pandora track feedback</Title>
      {isDragActive ? (
        <p>Drop the files here...</p>
      ) : (
        <p>Drag and drop a pandora_feedback.json file or click to select one</p>
      )}
      <p>Don't have your track feedback yet?</p>
      <p>
        Use the @tune-sync/cli to download feedback via the unofficial Pandora
        REST API
      </p>
    </div>
  );
};
