// @ts-ignore
import cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader';

// @ts-ignore
import cornerstone from 'cornerstone-core';

import dicomParser from 'dicom-parser';

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
