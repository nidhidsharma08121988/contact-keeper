import React, { useReducer } from 'react';
import uuid from 'uuid'; //to generate random id to play with hardcoded data before using actual db
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
} from '../types';

const ContactState = props => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: 'Nidhi',
        email: 'nidhi@gmail.com',
        phone: '123-123-123',
        type: 'personal',
      },
      {
        id: 2,
        name: 'Priyanka',
        email: 'priyanka@gmail.com',
        phone: '234-234-234',
        type: 'personal',
      },
      {
        id: 3,
        name: 'Priyam',
        email: 'priyam@gmail.com',
        phone: '345-345-345',
        type: 'professional',
      },
    ],
  };
  const [state, dispatch] = useReducer(contactReducer, initialState);
  //actions go here
  //add contact
  //delete contact
  //set current contact
  //clear current contact
  //update contact
  //filter contacts
  //clear filter
  return (
    <ContactContext.Provider value={{ contacts: state.contacts }}>
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
