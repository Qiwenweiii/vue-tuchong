import Logo from '@/assets/logo.png';

export const downloadOrigin = (imageDetail, preview) => {
  const isPreview = preview === 'preview';
  let logo;

  let downloadName = `图虫创意-${imageDetail.id}`;
  const image = new Image();
  image.setAttribute('crossOrigin', '*');

  image.src = imageDetail.urls.full;
  if (isPreview) {
    image.src = imageDetail.urls.regular;
    downloadName = `图虫创意-样图-${imageDetail.id}`;

    logo = new Image();
    logo.src = Logo;
  }

  image.onload = () => {
    const canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;

    const ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0);

    if (isPreview) {
      let topStart = image.height * 0.8;
      const ratio = image.width / image.height;
      if (ratio > 1) {
        topStart = image.height * 0.7;
      }

      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.fillRect(0, topStart, 450, 150);

      ctx.globalAlpha = 0.6;
      ctx.drawImage(
        logo,
        0,
        0,
        logo.width,
        logo.height - 70,
        50,
        topStart + 20,
        300,
        (logo.height - 70) * (300 / logo.width)
      );

      ctx.globalAlpha = 1;
      ctx.font = '24px Arial';
      ctx.fillStyle = 'rgba(255,255,255,.6)';
      ctx.fillText(`ID: ${imageDetail.id}`, 60, topStart + 115);
    }

    canvas.toBlob((blob) => {
      const link = document.createElement('a');
      link.download = downloadName;
      link.href = URL.createObjectURL(blob);
      link.click();

      URL.revokeObjectURL(link.href);
    }, 'image/jpeg');
  };
};
