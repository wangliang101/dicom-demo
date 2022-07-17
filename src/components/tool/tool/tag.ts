import dicomParser from 'dicom-parser';
import { TAG_DICT } from '../../../const';

interface FileObj {
  [k: string]: string;
}

const parserDicom = (file: any) => {
  const reader = new FileReader();
  const tag = new Promise((resolve) => {
    reader.onload = function () {
      var arrayBuffer = reader.result;
      if (!arrayBuffer || typeof arrayBuffer === 'string') return;
      const byteArray = new Uint8Array(arrayBuffer);

      const dataSet = dicomParser.parseDicom(byteArray);
      const { elements } = dataSet;

      const tagObj = Object.entries(elements).reduce(
        (obj: FileObj, [k, v]): FileObj => {
          const key: string = `(${k.substring(1, 5)},${k.substring(
            5
          )})`.toLocaleUpperCase();

          const tagName: string = TAG_DICT[key as keyof typeof TAG_DICT].name;
          obj[tagName] = dataSet.string(k);
          return obj;
        },
        {} as FileObj
      );
      console.table(tagObj);
      resolve(tagObj);
    };
  });

  reader.readAsArrayBuffer(file.originFileObj);
  return tag;
};

const tagTool = (file: any, status: boolean) => {
  if (status === true) {
    return parserDicom(file);
  } else {
    return {};
  }
};

export default tagTool;
