import React, { useState, useEffect } from "react";
import bundler from "../bundler";
import CodeEditor from "./CodeEditor";
import Preview from "./Preview";
import Resizable from "./Resizable";

const CodeCell: React.FC = () => {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");
  const [err, setErr] = useState("");
  useEffect(() => {
    const timeout = setTimeout(async () => {
      const output = await bundler(input);
      setCode(output.code);
      setErr(output.error);
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [input]);

  return (
    <Resizable direction="vertical">
      <div className="code-cell">
        <Resizable direction="horizontal">
          <CodeEditor
            code={input}
            onChange={(value: string) => setInput(value)}
          />
        </Resizable>
        <Preview code={code} err={err} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
