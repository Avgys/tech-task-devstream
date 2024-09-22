'use strict';

import Canvas from "./canvas";
import { PUBLIC_URL } from "./main";

export async function LoadImages(imageUrls) {
  const srcUrl = PUBLIC_URL;
  const canvas = new Canvas(document.getElementById('images-canvas'));

  const promises = imageUrls.map(async (imageData) => {
    try {
      const img = await LoadImage(srcUrl + imageData.image_url)
      return canvas.AddImageToCanvas(img);
    }
    catch (error) {
      console.error('Error loading image:', error);
    }
  });

  return await Promise.all(promises);
}

async function LoadImage(url) {
  console.log('Loading ' + url)

  try {
    const response = await fetch(url);
    const blob = await response.blob();

    const urlResource = URL.createObjectURL(blob, response.headers.get('content-type'));
    const img = new Image();
    img.src = urlResource;
    img.alt = url.split('/').at(-1)
    return new Promise((resolve, reject) => {
          img.onload = () => resolve(img);
          img.onerror = (error) => reject(error);
        });
  }
  catch (error) {
    console.error(error);
  }
}

export async function DownloadImage(image) {
  console.log('Downloading ' + image.alt)

  try {
    const link = document.createElement('a');
    link.href = image.src;
    link.download = image.alt;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  catch (error) {
    console.error(error);
  }
}