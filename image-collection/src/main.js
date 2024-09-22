'use strict';
import { LoadImages } from './images'
import { ShowTerms } from './useterms'

export const PUBLIC_URL = 'http://188.166.203.164';

getData().then((e) => {
  ShowTerms(
    e.terms_of_use.paragraphs, 
    () => {
      document.getElementById('policy-window').setAttribute('hidden', '');    
      LoadImages(e.images);
    },
    () => {
      document.getElementById('policy-window-text').innerText = "You have no choice";
    });
});

async function getData() {
  const url = PUBLIC_URL + '/static/test.json';
  try{
    const response = await fetch(url);
    const content = await response.json();
    return content;
  }
  catch (error){
    console.log(error);
  }
}