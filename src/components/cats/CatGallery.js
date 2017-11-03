import ImageGallery from 'react-image-gallery';
import React from 'react';


const CatGallery = ({gallery}) => {

  const items =  (gallery || [])
    .map(g => ({original: g.imageSRC, thumbnail: g.imageSRC}));

  return (

    <ImageGallery
      items={items}
      slideInterval={2000}/>
  );


};

export default CatGallery;
