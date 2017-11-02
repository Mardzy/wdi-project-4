import ImageGallery from 'react-image-gallery';
import React from 'react';


const CatGallery = ({gallery}) => {

  // handleImageLoad(event) {
  //   console.log('Image loaded ', event.target)
  // }



  // const images = [
  //   {
  //     original: 'http://lorempixel.com/1000/600/nature/1/',
  //     thumbnail: 'http://lorempixel.com/250/150/nature/1/'
  //   },
  //   {
  //     original: 'http://lorempixel.com/1000/600/nature/2/',
  //     thumbnail: 'http://lorempixel.com/250/150/nature/2/'
  //   },
  //   {
  //     original: 'http://lorempixel.com/1000/600/nature/3/',
  //     thumbnail: 'http://lorempixel.com/250/150/nature/3/'
  //   }
  // ];

  const items =  (gallery || [])
    .map(g => ({original: g.imageSRC, thumbnail: g.imageSRC}));

  return (

    <ImageGallery
      items={items}
      slideInterval={2000}/>
  );


};

export default CatGallery;
