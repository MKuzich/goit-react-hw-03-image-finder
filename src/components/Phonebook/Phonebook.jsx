import React from 'react';
import { Section } from '../Section/Section';
import { Contacts } from 'components/Contacts/Contacts';
import { ContactAddForm } from 'components/ContactAddForm/ContactAddForm';
import PropTypes from 'prop-types';

export const Phonebook = ({
  data,
  nameChange,
  contactsChange,
  filterChange,
  deleteContact,
}) => {
  const { contacts, filter } = data;

  return (
    <>
      <Section title="Phonebook">
        <ContactAddForm
          nameChange={nameChange}
          contactsChange={contactsChange}
        />
      </Section>
      <Section title="Contacts">
        <Contacts
          contacts={contacts}
          filterChange={filterChange}
          filter={filter}
          deleteContact={deleteContact}
        />
      </Section>
    </>
  );
};

Phonebook.propTypes = {
  data: PropTypes.shape({
    contacts: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
      })
    ),
    filter: PropTypes.string,
  }),
  nameChange: PropTypes.func.isRequired,
  contactsChange: PropTypes.func.isRequired,
  filterChange: PropTypes.func.isRequired,
  deleteContact: PropTypes.func.isRequired,
};
