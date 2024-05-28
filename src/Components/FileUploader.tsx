// @ts-nocheck

import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'
import { useAtom } from 'jotai';
import { emailAtom, filesAtom, uploadingFilesAtom, usernameAtom } from '../atoms';
import { toast } from 'react-toastify';
import isValidEmail from 'is-valid-email'

const MAX_MB: number = 5;

const TIP_CONTENT: string = 'Drag files or click here to upload';
const INVALID_CREDENTIALS_CONTENT: string = 'Provide valid email and username to begin uploading';

const FileUploader: React.FC = () => {
  const [uploadingFiles, setUploadingFiles] = useAtom(uploadingFilesAtom);
  const [files, setFiles] = useAtom(filesAtom);
  const [email,] = useAtom(emailAtom);
  const [username,] = useAtom(usernameAtom);

  const credentialsProvided = username?.length && isValidEmail(email);

  const removeFileFromUploading = (fileId) => {
    setUploadingFiles(uploadingFiles.filter(file => file.id !== fileId));
  }

  const getUploadParams = ({ meta }) => {
    return {
      url: 'http://localhost/api/files',
      fields: { username, email }
    }
  }

  const handleChangeStatus = ({ meta, file, xhr }, status, allFiles) => {
    const dropzoneFile = allFiles.find(file => file.meta.id === meta.id);

    if (! dropzoneFile) {
      return;
    }

    switch (status) {
      case 'preparing':
        setUploadingFiles([{ id: meta.id }, ...uploadingFiles]);
        break;

      case 'done':
        removeFileFromUploading(meta.id);

        dropzoneFile.remove();

        const data = JSON.parse(xhr.response).file;
        setFiles([{ isSuccess: meta.id, ...data }, ...files]);
        break;

      case 'error_upload':
      case 'error_upload_params':
      case 'exception_upload':
        dropzoneFile.remove();
        toast.error("Error occured while uploading the file");
        removeFileFromUploading(meta.id);
        break;

      case 'error_file_size':
        dropzoneFile.remove();
        toast.error(`File exceeded maximum size (${MAX_MB}MB)`);
        removeFileFromUploading(meta.id);
        break;
    }
  }

  const handleSubmit = (files, allFiles) => {
    allFiles.forEach(file => file.remove())
  }

  return (
    <div className="left-2 right-2 -bottom-2 fixed bg-black bg-opacity-75 hover:bg-opacity-80 transition-[0.5s] backdrop-blur-[10px] rounded-xl">
      <Dropzone
        multiple
        getUploadParams={getUploadParams}
        onChangeStatus={handleChangeStatus}
        onSubmit={handleSubmit}
        maxSizeBytes={1024 * 1024 * MAX_MB}
        inputContent={credentialsProvided ? TIP_CONTENT : INVALID_CREDENTIALS_CONTENT}
        inputWithFilesContent={null}
        styles={{
          dropzone: { border: 0 },
          inputLabel: { color: 'white', opacity: 0.75, fontWeight: 100 }
        }}
        accept="image/*"
        autoUpload={true}
        canCancel={false}
        disabled={!credentialsProvided || (files => files.some(f => ['preparing', 'getting_upload_params', 'uploading'].includes(f.meta.status)))}
        PreviewComponent={null}
        SubmitButtonComponent={null}
        submitButtonContent={null}
        submitButtonDisabled
      />
    </div>
  );
}

export default FileUploader;
