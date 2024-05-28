import React, { useEffect, useRef, useState } from 'react';
import File from './File';
import { FileData } from './FileData';
import { UploadingFileData } from './UploadingFileData';
import { useAtom } from 'jotai';
import { filesAtom, uploadingFilesAtom } from '../../atoms';
import UploadingFile from './UploadingFile';
import InfiniteScroller from '../Common/InfiniteScroller';

const FilesContainer: React.FC = () => {
  const [timestamp,] = useState(Math.floor(Date.now() / 1000));
  const [currentPage, setCurrentPage] = useState(1);
  const [files, setFiles] = useAtom(filesAtom);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [uploadingFiles, ] = useAtom(uploadingFilesAtom);

  const fetchFiles = async (page?: number) => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/files?page=${page}&timestamp=${timestamp}`);
      const responseFiles = await response.json();

      if (responseFiles.data.length === 0) {
        setHasMore(false);
      }

      // @ts-ignore
      setFiles([...files, ...responseFiles.data]);
    } catch (error) {
      console.error('Error fetching files:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles(currentPage);
  }, [currentPage]);

  const handleAppend = () => {
    if (hasMore && !isLoading) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  if (files.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-white opacity-25 pb-9">
          {isLoading ? 'Loading...' : 'No files found'}
        </p>
      </div>
    )
  }

  return (
    <InfiniteScroller onScrollBottom={handleAppend} className="flex-1 p-4 overflow-y-auto">
      <div className="flex gap-5 flex-wrap justify-center">
        <>
          {uploadingFiles.map((file: UploadingFileData) => (
            <UploadingFile key={file.id} />
          ))}
          {files.map((file: FileData) => (
            <File key={file.id} {...file} />
          ))}
        </>
      </div>
      <div className="w-[1px] h-[108px]" />
    </InfiniteScroller>
  );
};

export default FilesContainer;
