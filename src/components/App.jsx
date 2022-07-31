import React, { PureComponent } from 'react';
import { GlobalStyle } from './GlobalStyle';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';
import { getPictures } from 'services/api';
import { Wrapper } from './App.styled';

export class App extends PureComponent {
  state = {
    page: 1,
    request: null,
    response: null,
    isLoading: false,
    showModal: null,
  };

  async componentDidUpdate(prevProps, prevState) {
    this.setState({ isLoading: true });

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

    if (prevState.isLoading === true) {
      this.setState({ isLoading: false });
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
      <Wrapper>
        <GlobalStyle />
        <Searchbar onSubmit={this.onSubmit} />
        <ImageGallery>
          {response &&
            response.map(({ id, webformatURL, tags, largeImageURL }) => {
              return (
                <ImageGalleryItem
                  key={id}
                  originalUrl={largeImageURL}
                  url={webformatURL}
                  name={tags}
                />
              );
            })}
        </ImageGallery>
        {isLoading && <Loader />}
        {response && <Button loadMore={this.increasePage} />}

        {this.state.showModal && (
          <Modal
            url={this.state.showModal.largeImageURL}
            name={this.state.showModal.tags}
          />
        )}
      </Wrapper>
    );
  }
}
