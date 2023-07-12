/* eslint-disable react/no-danger */

"use client";

import React, { ReactNode, useEffect, useRef } from "react";

import { StartButton } from "./StartButton";
import { StopButton } from "./StopButton";

interface ComponentProps {
  content: string[];
  isRunning: boolean;
  onValuateTheCode: () => Promise<void>;
  onStopExecution: () => Promise<void> | void;
}

export function OutputTerminal({
  content,
  isRunning,
  onValuateTheCode,
  onStopExecution,
}: ComponentProps): ReactNode {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const outputDivRef = useRef<any>(null);

  useEffect(() => {
    if (outputDivRef?.current) {
      outputDivRef.current.scrollTop = outputDivRef.current.scrollHeight;
    }
  }, [content]);

  return (
    <div
      ref={outputDivRef}
      className="flex items-start justify-between p-5 mt-2 text-sm bg-black rounded h-[30%] overflow-y-scroll scrollbar-thumb-zinc-600 scrollbar-thumb-rounded-md scrollbar-thin"
      contentEditable={false}
      spellCheck={false}
    >
      <div className="w-full text-xs leading-loose prose font-monospace prose-invert ">
        {content.length > 0 ? (
          content.map((line) => {
            return (
              <p key={`${line}`} dangerouslySetInnerHTML={{ __html: line }} />
            );
          })
        ) : (
          <span className="text-zinc-400">
            Click on run to evaluate the code.
          </span>
        )}
      </div>

      <div className="sticky top-0 right-0 z-10">
        {!isRunning ? (
          <StartButton onClick={onValuateTheCode} />
        ) : (
          <StopButton onClick={onStopExecution} />
        )}
      </div>
    </div>
  );
}
