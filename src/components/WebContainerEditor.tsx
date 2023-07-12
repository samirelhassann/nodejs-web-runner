/* eslint-disable no-console */

"use client";

import React, { ReactNode, useEffect, useState } from "react";

import ANSIToHTML from "ansi-to-html";

import { getWebcontainerInstance } from "@/lib/web-container";
import { GetLibraryNames } from "@/utils/getLibraryNames";
import CodeEditor from "@uiw/react-textarea-code-editor";

import { OutputTerminal } from "./OutputTerminal";

const ANSIConverter = new ANSIToHTML();

interface WebContainerEditorProps {
  initialCode: string;
}

export function WebContainerEditor({
  initialCode,
}: WebContainerEditorProps): ReactNode {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const test: string[] = ["G", "?25h", "?25l", "⠁ "];

  const formatedOutput = output.filter((line) => !test.includes(line));

  useEffect(() => {
    setCode(initialCode);
  }, [initialCode]);

  const handleEvaluateTheCode = async () => {
    setOutput([]);
    setIsRunning(true);

    const libraries = GetLibraryNames(code);

    const webContainer = await getWebcontainerInstance();

    await webContainer.mount({
      "index.js": {
        file: {
          contents: code,
        },
      },
      "package.json": {
        file: {
          contents: `
            {
              "name": "example-app",
              "type": "module",
              "dependencies": {
                ${libraries.map((lib) => `"${lib}": "latest"`).join(", ")}
              },
              "scripts": {
                "start": "node index.js"
              }
            }
          `.trim(),
        },
      },
    });

    const install = await webContainer.spawn("yarn", ["install"]);

    setOutput(["Installing dependencies..."]);

    install.output.pipeTo(
      new WritableStream({
        write(data) {
          setOutput((state) => [...state, ANSIConverter.toHtml(data)]);
        },
      })
    );

    await install.exit;

    setOutput((state) => [...state, "--------", "Running the application..."]);

    const start = await webContainer.spawn("yarn", ["start"]);

    start.output.pipeTo(
      new WritableStream({
        write(data) {
          setOutput((state) => [...state, ANSIConverter.toHtml(data)]);
        },
      })
    );

    setIsRunning(false);
  };

  const handleStopExecution = () => {
    setIsRunning(false);
  };

  return (
    <div className="flex flex-col justify-between h-full ">
      <div className="h-[70%] w-full not-prose" data-gramm="false">
        <CodeEditor
          value={code}
          language="js"
          placeholder="Please enter JS code."
          onChange={(event) => setCode(event.target.value)}
          minHeight={80}
          padding={20}
          spellCheck={false}
          className="w-full h-full scrollbar-thumb-zinc-600 scrollbar-thumb-rounded-md scrollbar-thin"
          style={{
            backgroundColor: "#21202e",
            borderRadius: 4,
            fontFamily: "monospace",
            fontSize: 16,
            overflow: "auto",
          }}
        />
      </div>
      <OutputTerminal
        content={formatedOutput}
        onValuateTheCode={handleEvaluateTheCode}
        onStopExecution={handleStopExecution}
        isRunning={isRunning}
      />
    </div>
  );
}
