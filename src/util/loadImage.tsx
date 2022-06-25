// @ts-ignore
import cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader';

// @ts-ignore
import cornerstone from 'cornerstone-core';

import dicomParser from 'dicom-parser';

import {} from 'antd';

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

  // Image Loader
  cornerstoneWADOImageLoader.webWorkerManager.initialize(config);
}

_initCornerstoneWADOImageLoade();

interface fileList {
  // uid: string;
  // size?: number;
  // name: string;
  // fileName?: string;
  // lastModified?: number;
  // lastModifiedDate?: Date;
  // url?: string;
  // percent?: number;
  // thumbUrl?: string;
  // crossOrigin?: React.ImgHTMLAttributes<HTMLImageElement>['crossOrigin'];
  originFileObj?: Object;
}

const loadImage = async (fileList: Array<fileList>) => {
  const status = await new Promise((resolve, reject) => {
    try {
      const cache: Array<string> = [];
      fileList.forEach((file) => {
        const imageId = cornerstoneWADOImageLoader.wadouri.fileManager.add(
          file?.originFileObj
        );
        cache.push(imageId);
      });
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
