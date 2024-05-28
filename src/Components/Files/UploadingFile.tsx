import { FaImage } from "react-icons/fa";

const UploadingFile: React.FC = () => {
  return (
    <div className={`
      file-container file-container-loading relative w-[192px] h-[192px] bg-white bg-opacity-[0.02] overflow-hidden opacity-[75%] hover:opacity-[100%] rounded-xl flex items-center justify-center
    `}>
        <FaImage color="white" opacity={0.25} size={50} />
    </div>
  )
}

export default UploadingFile;
