import {
  SearchBarSection,
  SearchForm,
  SearchBtn,
  Input,
  Text,
} from './Searchbar.styled';
import PropTypes from 'prop-types';

export const Searchbar = ({ onSubmit }) => {
  const handleSubmit = e => {
    e.preventDefault();
    const request = e.target.request.value;
    onSubmit(request);
  };

  return (
    <SearchBarSection>
      <SearchForm onSubmit={handleSubmit}>
        <SearchBtn type="submit">
          <Text>Search</Text>
        </SearchBtn>
        <Input
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="request"
        ></Input>
      </SearchForm>
    </SearchBarSection>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
