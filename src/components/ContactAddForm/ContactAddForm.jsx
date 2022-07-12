import React from 'react';
import styles from './ContactAddForm.module.css';
import * as yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import PropTypes from 'prop-types';

const schema = yup.object().shape({
  name: yup
    .string()
    .required()
    .matches(
      /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
      "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
    ),
  number: yup
    .string()
    .required()
    .matches(
      /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/,
      'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
    ),
});

const FormError = ({ name }) => {
  return (
    <ErrorMessage name={name} render={message => Notify.failure(message)} />
  );
};

const initialValues = {
  name: '',
  number: '',
};

export const ContactAddForm = ({ nameChange, contactsChange }) => {
  const handleSubmit = ({ name, number }, { resetForm }) => {
    nameChange(name, number);
    contactsChange();
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      <Form className={styles.form} autoComplete="off">
        <label className={styles.label} htmlFor="name">
          Name
          <Field className={styles.input} type="text" name="name" />
          <FormError name="name" />
        </label>
        <label className={styles.label} htmlFor="number">
          Number
          <Field className={styles.input} type="tel" name="number" />
          <FormError name="number" />
        </label>
        <button className={styles.btn} type="submit">
          Add contact
        </button>
      </Form>
    </Formik>
  );
};

ContactAddForm.propTypes = {
  nameChange: PropTypes.func.isRequired,
  contactsChange: PropTypes.func.isRequired,
};
