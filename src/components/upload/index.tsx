import { useDropzone } from 'react-dropzone';

const Upload = () => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  acceptedFiles.forEach((file) => console.log('useDropzone', file));

  return (
    <div {...getRootProps({ className: 'dropzone' })}>
      <input {...getInputProps()} />
      <p>Drag 'n' drop some files here, or click to select files</p>
    </div>
  );
};

export default Upload;
