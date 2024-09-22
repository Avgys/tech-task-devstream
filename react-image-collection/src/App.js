import './App.css';
import { useEffect, useState } from 'react';
import getData from './GetData';
import TermsOfUse from './TermsOfUse';
import ImageCollection from './ImageCollection';

function App() {
  const [data, setData] = useState(null);  
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    console.log('Use effect called')
    getData().then(newData => setData(newData));
  }, []);
  
  console.log(data);
  return (
    <div className="App">  
    {
      !accepted     
      ? data?.terms_of_use && <TermsOfUse termsOfUse={data.terms_of_use?.paragraphs}  onAccept={() => setAccepted(true)}/>
      : data?.images && <ImageCollection imageUrls={data.images}/>
    }
    </div>
  );
}


export const PUBLIC_URL = 'http://188.166.203.164';

export default App;