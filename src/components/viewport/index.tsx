import { ChangeEvent, DragEvent, useEffect, useState, useRef } from 'react';
import { Upload, UploadProps } from 'antd';
import { loadImage } from '../../util/loadImage';

// @ts-ignore
import cornerstone from 'cornerstone-core';
import './index.less';

const Viewport = () => {
  const viewportRef = useRef(null);
  const [loadStatus, setLoadStatus] = useState(false);
  const props: UploadProps = {
    beforeUpload: () => {
      return false;
    },
    async onChange(info) {
      const { fileList } = info;
      const loadStatuts = await loadImage(fileList);
      if (loadStatuts) setLoadStatus(true);
    },
    showUploadList: false,
  };

  useEffect(() => {
    if (loadStatus) {
      const cache = window.cache;
      cornerstone.enable(viewportRef.current);
      cornerstone.loadImage(cache[0]).then(function (image: any) {
        cornerstone.displayImage(viewportRef.current, image);
      });
    }
  }, [loadStatus]);
  return (
    <div className="viewport-wrap">
      <div className="upload">
        <Upload {...props}>
          <div className="upload_area">
            <p>上传</p>
          </div>
        </Upload>
      </div>
      <div className="viewport" ref={viewportRef}></div>
    </div>
  );
};

export default Viewport;
