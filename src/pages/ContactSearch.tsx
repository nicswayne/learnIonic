import React, { useState } from 'react';
import { Contacts, Contact } from '@ionic-native/contacts';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonInput,
  IonList,
  IonItem,
  IonButton,
  IonRippleEffect,
  IonCard,
  IonCardContent
} from '@ionic/react';
import './ContactSearch.css';

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

  function getPhoneNumber(numbers: any[]) {
    const mobile = numbers.find(x => x.type === 'mobile')
    if (mobile.value) {
      return mobile.value
    }
    const home = numbers.find(x => x.type === 'home')
    if (home.value) {
      return home.value
    }
    return ''
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Contacts</IonTitle>
        </IonToolbar>
      </IonHeader>
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
                <IonItem>
                  {getPhoneNumber(contact.phoneNumbers)}
                </IonItem>
              </IonCardContent>
            </IonCard>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default ContactSearch;
