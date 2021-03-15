import React, { useState, useEffect } from "react";
import bundler from "../bundler";
import CodeEditor from "./CodeEditor";
import Preview from "./Preview";
import Resizable from "./Resizable";
import { Cell, updateCell } from "../state";
import { useDispatch } from "react-redux";

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const dispatch = useDispatch();
  const [code, setCode] = useState("");
  const [err, setErr] = useState("");
  useEffect(() => {
    const timeout = setTimeout(async () => {
      const output = await bundler(cell.content);
      setCode(output.code);
      setErr(output.error);
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [cell.content]);

  return (
    <Resizable direction="vertical">
      <div className="code-cell">
        <Resizable direction="horizontal">
          <CodeEditor
            code={cell.content}
            onChange={(value: string) => dispatch(updateCell(cell.id, value))}
          />
        </Resizable>
        <Preview code={code} err={err} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
