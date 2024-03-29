import cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader';
import cornerstone from 'cornerstone-core';
import cornerstoneTools from 'cornerstone-tools';
import dicomParser from 'dicom-parser';
import cornerstoneMath from 'cornerstone-math';
import Hammer from 'hammerjs';

var config = {
  maxWebWorkers: navigator.hardwareConcurrency || 1,
  startWebWorkersOnDemand: true,
  taskConfiguration: {
    decodeTask: {
      initializeCodecsOnStartup: false,
      usePDFJS: false,
      strict: false,
    },
  },
};

function _initCornerstoneWADOImageLoade() {
  // Externals
  cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
  cornerstoneWADOImageLoader.external.dicomParser = dicomParser;

  cornerstoneTools.external.cornerstoneMath = cornerstoneMath;
  cornerstoneTools.external.Hammer = Hammer;

  cornerstoneTools.external.cornerstone = cornerstone;

  // 初始化工具，此方法必须放在cornerstone.enable(element)前，否则工具可能会无法使用
  cornerstoneTools.init({
    mouseEnabled: true,
    showSVGCursors: true,
  });

  // Image Loader
  cornerstoneWADOImageLoader.webWorkerManager.initialize(config);
}

_initCornerstoneWADOImageLoade();

interface Cache {
  [propname: string]: any;
}

const loadImage = async (fileList: FileList) => {
  const status = await new Promise((resolve, reject) => {
    try {
      // const cache: Array<string> = [];
      const cache: Cache = {};
      for (let i = 0; i < fileList.length; i++) {
        const file = fileList[i];
        const imageId = cornerstoneWADOImageLoader.wadouri.fileManager.add(file);
        cache[imageId] = file;
      }
      // fileList.forEach((file) => {
      //   const imageId = cornerstoneWADOImageLoader.wadouri.fileManager.add(file?.originFileObj);
      //   cache[imageId] = file;
      // });
      window.cache = cache;
      resolve(true);
    } catch (err) {
      console.log('图像加载失败', err);
      resolve(false);
    }
  });
  return status;
};

export { loadImage };
