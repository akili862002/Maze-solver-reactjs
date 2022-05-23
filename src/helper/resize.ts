export const resizeImage = (
  img: string,
  toWidth: number | null | undefined,
  toHeight: number | null | undefined
): Promise<string> => {
  return new Promise((resolve, reject) => {
    let image = new Image();
    image.src = img;
    image.crossOrigin = "anonymous";

    image.onload = () => {
      let width = image.width;
      let height = image.height;

      let newWidth = width;
      let newHeight = height;

      if (toWidth) {
        newHeight = height * (toWidth / width);
        newWidth = toWidth;
      } else if (toHeight) {
        newWidth = width * (toHeight / height);
        newHeight = toHeight;
      }

      let canvas = document.createElement("canvas");
      canvas.width = newWidth;
      canvas.height = newHeight;

      let context = canvas.getContext("2d");

      (context as any).drawImage(image, 0, 0, newWidth, newHeight);

      resolve(canvas.toDataURL());
    };
    image.onerror = reject;
  });
};
