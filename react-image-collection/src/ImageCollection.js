import { useRef, useEffect, useState } from 'react'
import { PUBLIC_URL } from './App';

function ImageCollection({ imageUrls }) {
    return (
        <div className='grid'>
            {imageUrls.map((x) => <ImageCell key={x.image_url} imageUrl={PUBLIC_URL + x.image_url} width={300} maxHeight={200} />)}
        </div>)
}

function ImageCell({ imageUrl, width, maxHeight }) {
    const canvasRef = useRef(null);
    const [img, setImage] = useState(null);

    useEffect(() => {
        LoadImage(imageUrl).then(img => {
            setImage(img);
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');

            const ratio = Math.max(img.width / width, img.height / maxHeight);
            
            canvas.width = img.width / ratio;
            canvas.height = img.height / ratio;

            context.drawImage(img, 0, 0, canvas.width, canvas.height);
        });
    }, []);

    return (
        <div className='image-cell'>
            <canvas ref={canvasRef} />
            <button onClick={() => DownloadImage(img)}>Download</button>
        </div>
    )
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

export default ImageCollection;