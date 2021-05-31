import React, { useReducer } from 'react';
import { v4 } from 'uuid'; //to generate random id to play with hardcoded data before using actual db
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
    current: null,
    filtered: null,
  };
  const [state, dispatch] = useReducer(contactReducer, initialState);
  //actions go here
  //add contact
  const addContact = contact => {
    contact.id = v4();
    dispatch({
      type: ADD_CONTACT,
      payload: contact,
    });
  };
  //delete contact
  const deleteContact = id => {
    dispatch({
      type: DELETE_CONTACT,
      payload: id,
    });
  };
  //set current contact
  const setCurrent = contact => {
    dispatch({
      type: SET_CURRENT,
      payload: contact,
    });
  };
  //clear current contact
  const clearCurrent = contact => {
    dispatch({
      type: CLEAR_CURRENT,
    });
  };
  //update contact
  const updateContact = contact => {
    dispatch({
      type: UPDATE_CONTACT,
      payload: contact,
    });
  };
  //filter contacts
  const filterContacts = text => {
    dispatch({
      type: FILTER_CONTACTS,
      payload: text,
    });
  };
  //clear filter
  const clearFilter = () => {
    dispatch({
      type: CLEAR_FILTER,
    });
  };
  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
        filterContacts,
        clearFilter,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
