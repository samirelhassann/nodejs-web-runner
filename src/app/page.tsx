/* eslint-disable jsx-a11y/control-has-associated-label */

"use client";

import { useState } from "react";

import { WebContainerEditor } from "@/components/WebContainerEditor";

interface Menu {
  name: string;
  initialCode: string;
}

const sideMenus: Menu[] = [
  {
    name: "Simple axios request",
    initialCode: `
import axios from 'axios';
  
const username = "YOUR_USERNAME";
      
const request = await axios.get(\`https://api.github.com/users/\${username}/repos\`);

const repos = request.data;

console.log(\`\${repos.length} repos founded\`)

repos.forEach((repo, index) => {
  console.log(\`\${index+1} - \${repo.name}\`)
})`,
  },
  {
    name: "Fibonacci",
    initialCode: `
function fibonacci(n) {
  const sequence = [0, 1];

  for (let i = 2; i < n; i++) {
    const a = sequence[i - 1];
    const b = sequence[i - 2];
    sequence.push(a + b);
  }

  return sequence;
}

const n = 10; 
const fibSequence = fibonacci(n);
console.log(fibSequence);`,
  },
];

export default function Home() {
  const [example, setExample] = useState<Menu>(sideMenus[0]);

  return (
    <main className="min-h-screen p-8 bg-gradient-to-b from-sky-400 to-sky-200">
      <div className="mx-auto grid min-h-[200px] w-[90%] grid-cols-[16rem_1fr] overflow-hidden rounded-xl border border-black/20 bg-zinc-800 shadow-sm">
        <aside className="flex flex-col border-r border-r-zinc-600 bg-zinc-700">
          <div className="flex gap-2 p-4 group">
            <button
              type="button"
              className="w-3 h-3 rounded-full hover:bg-red-400 bg-zinc-300"
            />
            <button
              type="button"
              className="w-3 h-3 rounded-full hover:bg-yellow-400 bg-zinc-300"
            />
            <button
              type="button"
              className="w-3 h-3 rounded-full hover:bg-green-400 bg-zinc-300"
            />
          </div>

          <div className="flex flex-col mt-8">
            <span className="pl-3 mb-4 text-zinc-300">Examples</span>

            {sideMenus.map((e) => (
              <button
                key={e.name}
                type="button"
                className="flex py-1 pl-3 items-center gap-1 text-zinc-300 data-[selected=true]:bg-zinc-600 data-[selected=true]:font-bold data-[selected=true]:text-zinc-100 "
                data-selected={e.name === example.name}
                onClick={() => setExample(e)}
              >
                <span className="text-md">{e.name}</span>
              </button>
            ))}
          </div>
        </aside>

        <main className="h-[calc(100vh-70px)] p-4 overflow-y-scroll text-black scrollbar-thumb-zinc-600 scrollbar-thumb-rounded-md scrollbar-thin">
          <WebContainerEditor initialCode={example.initialCode} />
        </main>
      </div>
    </main>
  );
}
