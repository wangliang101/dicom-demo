import { ChangeEvent, DragEvent } from 'react';
import { Upload, UploadProps } from 'antd';
import './index.less';

const props: UploadProps = {
  beforeUpload: () => {
    return false;
  },
  onChange(info) {
    console.log('info', info);
  },
};

const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
  console.log('handleFileSelect', e.target.files);
};

const handleDirSelect = (e: DragEvent<HTMLDivElement>) => {
  console.log('handleDirSelect', e.target.files);
};

const Viewport = () => {
  return (
    <div className="viewport-wrap">
      <div className="upload">
        {/* <Upload {...props}>
          <div className="upload_area">
            <p>上传</p>
            <p>点击上传文件</p>
            <p>拖拽上传文件夹</p>
          </div>
        </Upload> */}
        <input
          type={'file'}
          onDrop={handleDirSelect}
          onChange={handleFileSelect}
        ></input>
      </div>
      <div className="viewport">ddd</div>
    </div>
  );
};

export default Viewport;
