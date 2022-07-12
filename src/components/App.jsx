import { Phonebook } from './Phonebook/Phonebook';
import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
    name: '',
    number: '',
  };

  deleteContact = e => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(
        contact => contact.id !== e.target.id
      ),
    }));
  };

  filterChange = e => {
    this.setState({ filter: e.target.value });
  };

  nameChange = (name, number) => {
    this.setState({ name: name, number: number });
  };

  contactsChange = () => {
    this.setState(prevState => {
      if (
        prevState.contacts.find(contact =>
          contact.name.toLowerCase().includes(prevState.name.toLowerCase())
        )
      ) {
        return Notify.warning(`${prevState.name} is already in contacts`);
      }
      return {
        contacts: [
          ...prevState.contacts,
          { name: prevState.name, number: prevState.number, id: nanoid() },
        ],
        name: '',
        number: '',
      };
    });
  };

  render() {
    return (
      <Phonebook
        data={this.state}
        nameChange={this.nameChange}
        contactsChange={this.contactsChange}
        filterChange={this.filterChange}
        deleteContact={this.deleteContact}
      ></Phonebook>
    );
  }
}
