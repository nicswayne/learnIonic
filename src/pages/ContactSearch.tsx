import React, { useState } from 'react';
import { Contacts, Contact } from '@ionic-native/contacts';
import { CallNumber } from '@ionic-native/call-number';
import {
  IonContent,
  IonPage,
  IonInput,
  IonList,
  IonItem,
  IonButton,
  IonRippleEffect,
  IonCard,
  IonCardContent,
  IonIcon
} from '@ionic/react';
import './ContactSearch.css';
import { callOutline } from 'ionicons/icons';
import Menu from '../components/Menu';

const ContactSearch: React.FC = () => {
  const [contactList, updateContactList] = useState<Contact[]>([]);
  const [contactSearch, updateContactSearch] = useState('');

  const contacts = new Contacts()

  function searchContacts() {
    const options = {
      filter: contactSearch,
      multiple: true
    }
    contacts.find(['displayName', 'name', 'nickname', 'name.givenName', 'name.familyName', 'organizations', 'phoneNumbers'], options).then((list) => {
      updateContactList(list)
    })
  }

  function callContact(number: string | undefined) {
    console.log(number);
    if (!number) {
      return;
    }

    CallNumber.callNumber(number, true)
  }

  return (
    <IonPage>
      <Menu title="Call Contact" />
      <IonContent>
        <IonInput required autoCapitalize="off" name="search" placeholder="Search for Contact" onInput={(e: any) => updateContactSearch(e.target.value)}></IonInput>
        <IonButton className="ripple-parent" type="submit" expand="block" onClick={searchContacts}>
          Search Contacts
        <IonRippleEffect type="unbounded"></IonRippleEffect>
        </IonButton>
        <IonList>
          {contactList.map((contact) => (
            <IonCard>
              <IonCardContent>
                <IonItem>
                  {contact.name.formatted}
                </IonItem>
                {!!contact.phoneNumbers.length && contact.phoneNumbers.map((phoneNumber) => (
                  <IonItem className="phone-value" onClick={() => callContact(phoneNumber.value)}>
                    {`${phoneNumber.type}: ${phoneNumber.value}`}
                    <IonIcon className="call-icon" icon={callOutline} size="small" />
                  </IonItem>
                ))}
              </IonCardContent>
            </IonCard>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default ContactSearch;
