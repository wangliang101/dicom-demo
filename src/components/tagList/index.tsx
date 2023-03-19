import { useEffect, useContext, useState } from 'react';
import { Table } from 'antd';
import { APPContext } from '../../state';
import parserDicomTag from '../../util/parseDicom';
import './index.less';

const columns = [
  {
    title: 'tag',
    dataIndex: 'tag',
    key: 'tag',
  },
  {
    title: 'name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'value',
    dataIndex: 'value',
    key: 'value',
  },
];

const TagList = () => {
  const { state } = useContext(APPContext);
  const [tagData, setTagData] = useState([] as Array<any>);

  const getTag = async (file: any) => {
    const data = await parserDicomTag(file);
    if (Array.isArray(data)) {
      setTagData(data);
    }
  };
  console.log(tagData);

  useEffect(() => {
    if (!state.loadState) return;
    const [file] = Object.values(window.cache);
    getTag(file);
  }, [state.loadState]);
  return (
    <div className="tagList_wrap">
      <Table dataSource={tagData} columns={columns} pagination={false} scroll={{ x: 400, y: 'calc(100vh - 55px)' }} />
    </div>
  );
};

export default TagList;
