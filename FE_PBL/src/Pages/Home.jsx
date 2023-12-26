import Magnifier from "react-magnifier";
import { useEffect } from "react";
import Convert from "./Convert";

function Home() {
  const serverUrl = 'http://localhost:4000';

    useEffect(() => {
      const processedImageUrl = `${serverUrl}/processed-image`;
      const processedImage = document.getElementById('processedImage');
      const processedImage_Mag = document.getElementById('processedImage_Mag');
      
    }, []); 

  return (
    <>
      <Convert/>
      
    </>
  )
}

export default Home
