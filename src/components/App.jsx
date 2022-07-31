import React, { Component } from 'react';
import { GlobalStyle } from './GlobalStyle';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';
import { getPictures } from 'services/api';

export class App extends Component {
  state = {
    page: 1,
    request: null,
    response: null,
    isLoading: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    try {
      if (prevState.isLoading === false) {
        this.setState({ isLoading: true });
      }
      const receivedPictures = await getPictures(
        this.state.request,
        this.state.page
      );
      console.log(receivedPictures);
      if (
        prevState.request !== this.state.request ||
        prevState.page !== this.state.page
      ) {
        this.setState(prevState => {
          if (
            prevState.request !== this.state.request ||
            prevState.response === null
          ) {
            return { response: receivedPictures };
          }
          return { response: [...prevState.response, ...receivedPictures] };
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      if (prevState.isLoading === true) {
        this.setState({ isLoading: false });
      }
    }
  }

  increasePage = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  onSubmit = request => {
    this.setState(prevState => {
      if (prevState.request === request) {
        return { page: prevState.page + 1 };
      }
      return { request, page: 1 };
    });
  };

  render() {
    const { response, isLoading } = this.state;

    return (
      <>
        <GlobalStyle />
        <Searchbar onSubmit={this.onSubmit} />
        <ImageGallery>
          {response &&
            response.map(({ id, webformatURL, tags }) => {
              return (
                <ImageGalleryItem key={id} url={webformatURL} name={tags} />
              );
            })}
        </ImageGallery>
        {isLoading && <Loader />}
        {response && <Button loadMore={this.increasePage} />}
        <Modal></Modal>
      </>
    );
  }
}
