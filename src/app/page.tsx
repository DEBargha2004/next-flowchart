"use client";

import { useAppState } from "@/hooks/redux-essentials";

import { ReactFlowProvider } from "reactflow";

import FlowChartCanvas from "@/components/custom/flowchart-canvas";

export default function Home() {
  const windowState = useAppState((state) => state.windowState);

  return (
    <main
      className={`relative`}
      style={{
        width: `${windowState.w}px`,
        height: `${windowState.h}px`,
      }}
    >
      <ReactFlowProvider>
        <FlowChartCanvas />
      </ReactFlowProvider>
    </main>
  );
}
