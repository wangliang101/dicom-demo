import { useReducer, useCallback, MouseEvent } from 'react';
import { Button } from 'antd';
import './index.less';

// const toolOption = ['tag', 'Length', 'Angle'];

const initialToolOption = {
  tag: {
    active: false,
  },
  Length: {
    active: false,
  },
  Angle: {
    active: false,
  },
};

type toolOption = {
  [active: string]: Boolean;
};

interface InitialToolOption {
  [toolName: string]: toolOption;
}

type ActionType = {
  type: string;
  payload?: number;
};

function reducer(
  state: InitialToolOption,
  action: ActionType
): InitialToolOption {
  switch (action.type) {
    case 'tag':
      return { ...state, tag: { active: !state.tag.active } };
    case 'Length':
      return { ...state, Length: { active: !state.Length.active } };
    case 'Angle':
      return { ...state, Angle: { active: !state.Angle.active } };
    default:
      return { ...state };
  }
}

const Tool = () => {
  const [state, dispatch] = useReducer(reducer, initialToolOption);

  const handleToolCLick = useCallback((key: string) => {
    dispatch({ type: key });
  }, []);
  return (
    <div className="tool-wrap">
      {Object.entries(state).map(([toolName, tooOption]) => {
        return (
          <Button
            key={toolName}
            type={tooOption.active ? 'primary' : 'ghost'}
            onClick={() => handleToolCLick(toolName)}
          >
            {toolName}
          </Button>
        );
      })}
    </div>
  );
};

export default Tool;
