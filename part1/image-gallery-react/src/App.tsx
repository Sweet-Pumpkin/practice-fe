import React, { useCallback, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import './App.css';
import ImageBox from './components/imageBox';

function App() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [imageList, setImageList] = useState<string[]>([]);

  /** react-dropzone */
  const onDrop = useCallback((acceptedFiles: any) => {
    if (acceptedFiles.length) {
      for (const file of acceptedFiles) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = e => {
          setImageList(prev => [...prev, e.target?.result as string]);
        }
      }
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className='container'>
      <div 
        className={imageList.length > 0 ? 'gallery-box row' : 'gallery-box'}
      >
        {
          imageList.length === 0 &&
          <div className='text-center'>
            이미지가 없습니다.<br />
            이미지를 추가해주세요.
          </div>
        }

        {
          imageList.map((el, idx) => <ImageBox key={idx} src={el} />)
        }
        <div 
          className='plus-box'
          {...getRootProps()}
        >
          <input 
            type="file" 
            ref={inputRef} 
            {...getInputProps()}
          />
          +
        </div>
      </div>
    </div>
  );
}

export default App;
