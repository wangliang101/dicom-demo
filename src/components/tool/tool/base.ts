import cornerstoneTools from 'cornerstone-tools';
console.log('cornerstoneTools', cornerstoneTools);
const baseTool = (toolName: string, status: Boolean) => {
  // 长度工具使用示例
  if (status === true) {
    const apiTool = cornerstoneTools[`${toolName}Tool`];
    cornerstoneTools.addTool(apiTool);
    cornerstoneTools.setToolActive(toolName, { mouseButtonMask: 1 });
  } else if (status === false) {
    cornerstoneTools.removeTool(toolName);
  }
};

export default baseTool;
