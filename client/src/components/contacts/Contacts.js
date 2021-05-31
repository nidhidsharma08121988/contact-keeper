import React, { useContext } from 'react';
import ContactContext from '../../context/contact/contactContext';
import ContactItem from './ContactItem';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
const Contacts = () => {
  const contactContext = useContext(ContactContext);
  const { contacts, filtered, current } = contactContext;
  if (contacts.length === 0) return <h4> Please add a contact</h4>;

  return (
    <>
      <TransitionGroup>
        {current === null
          ? filtered !== null
            ? filtered.map(contact => (
                <CSSTransition key={contact.id} classNames='item' timeout={500}>
                  <ContactItem contact={contact} />
                </CSSTransition>
              ))
            : contacts.map(contact => (
                <CSSTransition key={contact.id} classNames='item' timeout={500}>
                  <ContactItem contact={contact} />
                </CSSTransition>
              ))
          : contacts.map(
              contact =>
                contact.id !== current.id && (
                  <CSSTransition
                    key={contact.id}
                    classNames='item'
                    timeout={500}
                  >
                    <ContactItem contact={contact} />
                  </CSSTransition>
                )
            )}
      </TransitionGroup>
    </>
  );
};

export default Contacts;
