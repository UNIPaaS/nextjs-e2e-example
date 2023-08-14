import { ReactNode } from "react";
import { useAppInit } from "@/hooks/useAppInit";

interface AppInitProps {
  children: ReactNode;
}
export function AppInit({ children }: AppInitProps) {
  useAppInit();

  return <>children</>;
}
