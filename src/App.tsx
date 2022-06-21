import { useEffect, useState, ChangeEvent, useRef } from "react";

// @ts-ignore
import cornerstoneWADOImageLoader from "cornerstone-wado-image-loader";
// @ts-ignore
import cornerstone from "cornerstone-core";
// @ts-ignore
import cornerstoneTools from "cornerstone-tools";

import dicomParser from "dicom-parser";
// @ts-ignore
import cornerstoneMath from "cornerstone-math";
// @ts-ignore
import Hammer from "hammerjs";
import "./App.css";
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

const parserDicom = (file: any) => {
  const reader = new FileReader();
  reader.onload = function (file) {
    var arrayBuffer = reader.result;
    if (!arrayBuffer || typeof arrayBuffer === "string") return;
    const byteArray = new Uint8Array(arrayBuffer);

    let dataSet;

    dataSet = dicomParser.parseDicom(byteArray);

    const studyInstanceUid = dataSet.string("x0020000d");

    const pixelDataElement = dataSet.elements.x7fe00010;

    console.log("dicomParser", studyInstanceUid, pixelDataElement);
  };
  reader.readAsArrayBuffer(file);
};

function _initCornerstone() {
  // Externals
  cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
  cornerstoneWADOImageLoader.external.dicomParser = dicomParser;
  cornerstoneTools.external.cornerstoneMath = cornerstoneMath;
  cornerstoneTools.external.cornerstone = cornerstone;
  cornerstoneTools.external.Hammer = Hammer;

  // Image Loader
  cornerstoneWADOImageLoader.webWorkerManager.initialize(config);
}

function App() {
  useEffect(() => {
    // 初始化cornerstone相关配置
    _initCornerstone();
  }, []);

  // 处理上传文件
  const handleFileSelect = async (e: ChangeEvent<HTMLInputElement>) => {
    // 获取展示宿主元素
    const element = document.getElementById("dicomImage");

    // 初始化工具，此方法必须放在cornerstone.enable(element)前，否则工具可能会无法使用
    cornerstoneTools.init({
      showSVGCursors: true,
    });

    // 激活element
    cornerstone.enable(element);

    // 获取上传文件
    const files = e.target.files || [];
    const file = files[0];

    // 解析相关标签示例
    parserDicom(file);
    // cornerstoneWADOImageLoader解析文件，获取imageId
    const imageId = cornerstoneWADOImageLoader.wadouri.fileManager.add(file);

    // 展示dicom
    cornerstone.loadImage(imageId).then(function (image: any) {
      cornerstone.displayImage(element, image);
    });

    // 长度工具使用示例
    const toolName = "Length";
    const apiTool = cornerstoneTools[`${toolName}Tool`];
    cornerstoneTools.addTool(apiTool);
    // toolName不能使用cornerstoneTools.LengthTool.name, 他们不一样
    cornerstoneTools.setToolActive(toolName, { mouseButtonMask: 1 });
  };

  return (
    <div className="App">
      <div
        className="viewport"
        id={"dicomImage"}
        style={{ width: "512px", height: "512px", background: "gray" }}
      ></div>
      <input type={"file"} onChange={handleFileSelect}></input>
    </div>
  );
}

export default App;
