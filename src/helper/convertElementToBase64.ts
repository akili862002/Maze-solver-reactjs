import html2canvas from "html2canvas";

export const convertElementToBase64 = (id: string) =>
  new Promise<string>((resolve) => {
    html2canvas(document.getElementById(id) as any).then(function (canvas) {
      document.body.appendChild(canvas);
      resolve(canvas.toDataURL());
      canvas.remove();
    });
  });
