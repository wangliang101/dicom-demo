import { useEffect, useRef, useContext } from 'react';
import { APPContext } from '../../state';
import cornerstoneTools from 'cornerstone-tools';
import { UploadProps } from 'antd';
import { loadImage } from '../../util/loadImage';
import cornerstone from 'cornerstone-core';

import './index.less';
let currentDicomIndex = 0;
const Viewport = () => {
  const viewportRef = useRef(null);
  const { state, dispatch } = useContext(APPContext);
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

  // 关闭鼠标右键默认事件
  useEffect(() => {
    const handlePreventDafault = function (e: MouseEvent) {
      e.preventDefault();
    };
    function handleScroll(event: WheelEvent) {
      // Do something in response to the scroll event
      const cache = Object.keys(window.cache);
      if (cache && viewportRef.current) {
        currentDicomIndex = currentDicomIndex + Math.round(event.deltaY / 2);
        if (currentDicomIndex > cache.length - 1) {
          currentDicomIndex = cache.length - 1;
        } else if (currentDicomIndex < 0) {
          currentDicomIndex = 0;
        }
        console.log('index', cache, `dicomfile:${currentDicomIndex}`);
        cornerstone.loadImage(cache[currentDicomIndex]).then(function (image: any) {
          cornerstone.displayImage(viewportRef.current, image);
        });
      }
      console.log(event);
    }
    const handleResize = () => {
      console.log('resize');
      cornerstone.resize(viewportRef.current);
    };
    document.addEventListener('contextmenu', handlePreventDafault);
    document.addEventListener('wheel', handleScroll);
    window.addEventListener('resize', handleResize);
    return () => {
      document.removeEventListener('contextmenu', handlePreventDafault);
      document.removeEventListener('wheel', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (state.loadState) {
      const cache = Object.keys(window.cache);
      cornerstone.enable(viewportRef.current);
      cornerstone.loadImage(cache[0]).then(function (image: any) {
        cornerstone.displayImage(viewportRef.current, image);
      });

      // 设置鼠标快捷键，中键为缩放，右键为wwwc
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
      cornerstoneTools.setToolActive('Zoom', { mouseButtonMask: 4 });
    }
  }, [state.loadState]);
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return null;
    const loadStatuts = await loadImage(files);
    if (loadStatuts) dispatch({ type: 'CHANGE_LOAD_STATE', payload: true });
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
