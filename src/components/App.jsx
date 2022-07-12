import React, { Component } from 'react';
import { GlobalStyle } from './GlobalStyle';
// import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Searchbar } from 'components/Searchbar/Searchbar';
// import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
// import { Loader } from 'components/Loader/Loader';
// import { Button } from 'components/Button/Button';
// import { Modal } from 'components/Modal/Modal';

export class App extends Component {
  render() {
    return (
      <>
        <GlobalStyle />
        <Searchbar />
        {/* <ImageGallery>
          <ImageGalleryItem />
        </ImageGallery>
        <Loader></Loader>
        <Button></Button>
        <Modal></Modal> */}
      </>
    );
  }
}
