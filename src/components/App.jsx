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

  onClickShowModal = (url, name) => {
    this.setState({ showModal: { url, name } });
  };

  async componentDidUpdate(prevProps, prevState) {
    if (prevState.isLoading === true) {
      this.setState({ isLoading: true });
    }

    const { request, page } = this.state;
    const receivedPictures = await getPictures(request, page);

    if (prevState.request !== request || prevState.page !== page) {
      this.setState(prevState => {
        console.log(prevState);
        console.log(this.state);
        if (prevState.response === null || prevState.request !== request) {
          console.log('doljno novoe bit');

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
                  onClickShowModal={this.onClickShowModal}
                  key={id}
                  id={id}
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
            url={this.state.showModal.url}
            name={this.state.showModal.name}
          />
        )}
      </Wrapper>
    );
  }
}
