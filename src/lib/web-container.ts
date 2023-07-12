import { WebContainer } from "@webcontainer/api";

let webContainerInstance: WebContainer;

export async function getWebcontainerInstance() {
  if (!webContainerInstance) {
    webContainerInstance = await WebContainer.boot();
  }

  return webContainerInstance;
}
