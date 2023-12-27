import justifiedLayout from 'justified-layout';

export function useLayoutGeometry(imagesList, containerWidth, targetRowHeight) {
  const sizeList = [];

  imagesList.forEach((image) => {
    sizeList.push({
      width: image.width,
      height: image.height,
    });
  });

  return justifiedLayout(sizeList, { containerWidth, targetRowHeight, boxSpacing: 6, containerPadding: 0 });
}
