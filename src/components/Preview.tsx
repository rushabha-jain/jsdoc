import React, { useRef, useEffect } from "react";
import "./Preview.css";

interface IPreviewProps {
  code: string;
  err: string;
}

const Preview: React.FC<IPreviewProps> = ({ code, err }) => {
  const frame = useRef<HTMLIFrameElement | null>(null);

  const html = useRef(`
  <html>
    <head>
      <title>Unique Property</title>
      <style>
        html {
            background: #fff;
        }
      </style>
    </head>
    <body>
      <div id="root"></div>
      <script>
        const handleError = (error) => {
          const root = document.querySelector('#root');
          root.innerHTML = '<div style="color: red;"><h4>Runtime Error:</h4>' + error + '</div>';
          console.error(error);
        };
        window.addEventListener('error', (event) => {
          event.preventDefault();
          console.log('Called for unhandled error');
          console.log('This will prevent default printing of console error message');
          handleError(event.error);
        });
        window.addEventListener('message', (event) => {
          try {
            eval(event.data);
          } catch (error) {
            handleError(error.message);
          }
        }, false);
      </script>
    </body>
  </html>
  `);

  useEffect(() => {
    if (frame.current && frame.current.contentWindow) {
      frame.current.srcdoc = html.current;
      setTimeout(() => {
        frame.current?.contentWindow?.postMessage(code, "*");
      }, 10);
    }
  }, [code, html]);

  return (
    <div className="preview">
      <iframe
        style={{ width: "100%", height: "100%" }}
        title="preview"
        sandbox="allow-scripts"
        ref={frame}
      />
      {err && <div className="preview-error">{err}</div>}
    </div>
  );
};

export default Preview;
