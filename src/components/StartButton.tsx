import React, { ReactNode } from "react";
import { RxLightningBolt } from "react-icons/rx";

interface StartButtonProps {
  onClick: () => Promise<void>;
}

export function StartButton({ onClick }: StartButtonProps): ReactNode {
  return (
    <button
      type="button"
      contentEditable={false}
      onClick={onClick}
      className="flex items-center gap-2 p-3 mt-2 font-bold text-white bg-[#7B54EE] rounded hover:bg-[#7a54eeb6] h-fit"
    >
      <RxLightningBolt size={18} />
      Run code
    </button>
  );
}
