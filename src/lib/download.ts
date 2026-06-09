import { toJpeg } from "html-to-image";

export async function downloadJpg(element: HTMLElement, filename: string): Promise<void> {
  const dataUrl = await toJpeg(element, {
    quality: 0.95,
    pixelRatio: 2,
    skipFonts: false,
  });
  const link = document.createElement("a");
  link.download = `${filename}.jpg`;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
