import { ChangeEvent, DragEvent, useEffect, useState, useRef } from 'react';
import cornerstoneTools from 'cornerstone-tools';
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
    // async onChange(info) {
    //   const { fileList } = info;
    //   const loadStatuts = await loadImage(fileList);
    //   if (loadStatuts) setLoadStatus(true);
    // },
    showUploadList: false,
  };

  useEffect(() => {
    if (loadStatus) {
      const cache = Object.keys(window.cache);
      cornerstone.enable(viewportRef.current);
      cornerstone.loadImage(cache[0]).then(function (image: any) {
        cornerstone.displayImage(viewportRef.current, image);
      });

      const WwwcTool = cornerstoneTools.WwwcTool;
      cornerstoneTools.addTool(WwwcTool);
      cornerstoneTools.setToolActive('Wwwc', { mouseButtonMask: 2 });

      const ZoomTool = cornerstoneTools.ZoomTool;
      cornerstoneTools.addTool(ZoomTool, {
        // Optional configuration
        configuration: {
          invert: false,
          preventZoomOutsideImage: false,
          minScale: 0.1,
          maxScale: 20.0,
        },
      });
      cornerstoneTools.setToolActive('Zoom', { mouseButtonMask: 1 });
    }
  }, [loadStatus]);
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return null;
    const loadStatuts = await loadImage(files);
    if (loadStatuts) setLoadStatus(true);
    console.log('files', files);
  };
  return (
    <div className="viewport-wrap">
      <div className="upload">
        {/* <Upload {...props}>
          <div className="upload_area">
            <p>上传</p>
          </div>
        </Upload> */}
        <input type="file" onChange={handleUpload} multiple />
      </div>
      <div className="viewport" ref={viewportRef}></div>
    </div>
  );
};

export default Viewport;
