import IconButton from "../Common/IconButton";
import { FileData } from "./FileData";
import { FaUser, FaHistory, FaDownload, FaTrash } from "react-icons/fa";
import { confirmAlert } from 'react-confirm-alert';
import { useAtom } from "jotai";
import { filesAtom } from "../../atoms";

interface FileProps extends FileData {
  isSuccess?: boolean;
}

const File: React.FC<FileProps> = ({ id, size, width, height, user, createdAt, extension, downloadUrl, previewUrl, isSuccess = false }) => {
  const [, setFiles] = useAtom(filesAtom);

  const handleDelete = (): void => {
    confirmAlert({
      message: 'Are you sure you want to delete this file?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            setFiles((prevFiles) => prevFiles.filter((file: FileData) => file.id !== id));
            fetch(`${process.env.REACT_APP_API_URL}/api/files/${id}`, {
              method: 'DELETE',
            });
          }
        },
        {
          label: 'No'
        }
      ]
    });
  }

  return (
    <div className={`
      ${isSuccess ? 'file-container-success' : ''}
      file-container relative w-[192px] h-[192px] bg-white bg-opacity-[0.02] overflow-hidden opacity-[75%] hover:opacity-[100%] rounded-xl flex flex-col
    `}>
        <div className="absolute flex z-10">
          <div className="rounded px-1 py-0.5 text-[8px] bg-white z-10">{size}</div>
          <div className="rounded -ml-3 pl-4 pr-1 py-0.5 text-[8px] text-white bg-gray-500">{extension.toUpperCase()}</div>
        </div>

        <div className="preview-bg flex-1 bg-cover bg-center" style={{ backgroundImage: `url(${previewUrl})` }} />

        <div className="absolute inset-0 flex items-center justify-center gap-2 hover-fadeIn-children">
          <a target="_blank" href={downloadUrl}>
            <IconButton icon={<FaDownload/>} />
          </a>
          <IconButton icon={<FaTrash/>} onClick={handleDelete} />
        </div>

        <div className="backdrop-blur-[15px] bg-black bg-opacity-50 absolute bottom-0 left-0 right-0 p-2">
          <p className="text-[9px] font-border text-white absolute right-[2px] -top-[13px] monospace">{width}x{height}</p>
          <div className="flex gap-1 items-center text-white text-xs opacity-50">
            <FaUser size={10} />
            {user}
          </div>
          <div className="flex gap-1 items-center text-white text-xs opacity-30">
            <FaHistory size={10} />
            {createdAt}
          </div>
        </div>
    </div>
  )
}

export default File;
