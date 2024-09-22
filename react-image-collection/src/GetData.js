import { PUBLIC_URL } from "./App";

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

  export default getData;