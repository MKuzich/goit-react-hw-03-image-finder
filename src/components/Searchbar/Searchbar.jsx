import {
  SearchBarSection,
  SearchForm,
  SearchBtn,
  Input,
} from './Searchbar.styled';
import { Formik } from 'formik';

export const Searchbar = () => (
  <SearchBarSection>
    <Formik>
      <SearchForm>
        <label>
          <Input></Input>
        </label>
        <SearchBtn type="submit"></SearchBtn>
      </SearchForm>
    </Formik>
  </SearchBarSection>
);
