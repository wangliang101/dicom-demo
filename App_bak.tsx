import { useEffect, useState, ChangeEvent, useRef } from "react";
import { Button, Upload, UploadProps } from "antd";
import "./App.css";

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
  // const aaa = dicomParser.readTag(ccc.stream());
  // console.log("tag", aaa);

  const reader = new FileReader();
  reader.onload = function (file) {
    var arrayBuffer = reader.result;
    if (!arrayBuffer || typeof arrayBuffer === "string") return;
    const byteArray = new Uint8Array(arrayBuffer);

    let dataSet;

    dataSet = dicomParser.parseDicom(byteArray);

    const studyInstanceUid = dataSet.string("x0020000d");

    const pixelDataElement = dataSet.elements.x7fe00010;

    const aaa = dicomParser.parseDicom(byteArray);
    const { elements } = aaa;

    Object.entries(elements).forEach(([k, v]) => {
      console.log("tttttt", k, aaa.string(k));
    });
    // aaa.elements
    console.log("tag", aaa);

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
  const [imageIds, setImageIds] = useState([] as Array<string>);
  useEffect(() => {
    // ?????????cornerstone????????????
    _initCornerstone();
  }, []);

  // ??????????????????
  const handleFileSelect = async (e: ChangeEvent<HTMLInputElement>) => {
    // ????????????????????????
    const element = document.getElementById("dicomImage");

    // ???????????????????????????????????????cornerstone.enable(element)???????????????????????????????????????
    cornerstoneTools.init({
      showSVGCursors: true,
    });

    // ??????element
    cornerstone.enable(element);

    // ??????????????????
    const files = e.target.files || [];
    const file = files[0];

    // ????????????????????????
    parserDicom(file);
    // cornerstoneWADOImageLoader?????????????????????imageId
    const imageId = cornerstoneWADOImageLoader.wadouri.fileManager.add(file);

    // ??????dicom
    cornerstone.loadImage(imageId).then(function (image: any) {
      cornerstone.displayImage(element, image);
    });

    // ????????????????????????
    const toolName = "Length";
    const apiTool = cornerstoneTools[`${toolName}Tool`];
    cornerstoneTools.addTool(apiTool);
    // toolName????????????cornerstoneTools.LengthTool.name, ???????????????
    cornerstoneTools.setToolActive(toolName, { mouseButtonMask: 1 });
  };

  const props: UploadProps = {
    beforeUpload: (file) => {
      console.log("file", file);
      return false;
    },
    onChange(info) {
      console.log("info", info);
      const { fileList } = info;
      const tmpImageIds: Array<string> = [];
      fileList.forEach(({ originFileObj }) => {
        const imageId =
          cornerstoneWADOImageLoader.wadouri.fileManager.add(originFileObj);
        tmpImageIds.push(imageId);
      });
      setImageIds(tmpImageIds);
    },
  };

  useEffect(() => {
    if (!imageIds.length) return;

    const element = document.getElementById("dicomImage");
    cornerstone.enable(element);
    cornerstone.loadImage(imageIds[0]).then(function (image: any) {
      cornerstone.displayImage(element, image);
    });
  }, [imageIds]);

  return (
    <div className="App">
      <div
        className="viewport"
        id={"dicomImage"}
        style={{ width: "512px", height: "512px", background: "gray" }}
      ></div>
      <input type={"file"} onChange={handleFileSelect}></input>
      <Upload directory {...props}>
        <Button type="primary">???????????????</Button>
      </Upload>
      {/* <Button type="primary">antd??????</Button> */}
    </div>
  );
}

export default App;
