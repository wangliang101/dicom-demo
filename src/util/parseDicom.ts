import dicomParser from 'dicom-parser';
import { TAG_DICT } from '../const';

interface FileObj {
  [k: string]: string;
}

const parserDicomTag = (file: any) => {
  const reader = new FileReader();
  const tag = new Promise((resolve) => {
    reader.onload = function () {
      var arrayBuffer = reader.result;
      if (!arrayBuffer || typeof arrayBuffer === 'string') return;
      const byteArray = new Uint8Array(arrayBuffer);

      const dataSet = dicomParser.parseDicom(byteArray);
      const { elements } = dataSet;

      const tagObj = Object.entries(elements).reduce((arr, [k, v]) => {
        const key: string = `(${k.substring(1, 5)},${k.substring(5)})`.toLocaleUpperCase();

        const tagName: string = TAG_DICT[key as keyof typeof TAG_DICT].name;
        // arr[tagName] = dataSet.string(k);
        arr.push({ name: tagName, tag: k, value: dataSet.string(k) });
        return arr;
      }, [] as Array<FileObj>);
      resolve(tagObj);
    };
  });

  reader.readAsArrayBuffer(file);
  return tag;
};

export default parserDicomTag;
