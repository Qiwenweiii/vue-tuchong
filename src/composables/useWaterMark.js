import Logo from '@/assets/logo.png';

// 返回值问题
export function useWaterMark(imageDetail) {
  const resultImg = document.createElement('img');
  let logo = new Image();
  logo.src = Logo;

  let img = new Image();
  img.setAttribute('crossOrigin', '*'); // 没有这一行会报错，跨域引起的错误
  img.src = imageDetail.urls.regular;

  img.addEventListener('load', () => {
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;

    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    let topStart = img.height * 0.8;
    const ratio = img.width / img.height;
    if (ratio > 1) {
      topStart = img.height * 0.7;
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

    resultImg.src = canvas.toDataURL('image/jpeg');
  });

  return resultImg;
}
