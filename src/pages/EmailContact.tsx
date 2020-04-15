import React, { useState } from 'react';
import { Contacts, Contact } from '@ionic-native/contacts';
import { EmailComposer } from '@ionic-native/email-composer';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonButton,
  IonRippleEffect,
  IonCard,
  IonCardContent,
  IonListHeader
} from '@ionic/react';

const EmailContact: React.FC = () => {
  const [emailsList, setEmailsList] = useState<any[]>([])
  const [contactInfo, setContactInfo] = useState<Contact>(new Contact())

  const contacts = new Contacts()

  function success(contact: Contact) {
    setContactInfo(contact)
    setEmailsList(contact.emails)
  }

  function selectContact() {
    contacts.pickContact().then(success)
  }

  function generateEmail(email: string) {
    EmailComposer.open({
      to: email,
      subject: 'I generated this email from my app',
      body: 'My co-workers would know how cool this is.'
    })

  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Select a Contact</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonButton className="ripple-parent" type="submit" expand="block" onClick={selectContact}>
          Select Contact
        <IonRippleEffect type="unbounded"></IonRippleEffect>
        </IonButton>
        <IonList>
          {!!contactInfo.name &&
            <IonListHeader>
              {contactInfo.name.formatted}
            </IonListHeader>
          }
          {!emailsList.length &&
            <IonCard>
              <IonCardContent>
                <IonItem>
                  Please select a contact with an email
                </IonItem>
              </IonCardContent>
            </IonCard>
          }
          {!!emailsList.length && emailsList.map((email) => (
            <IonCard onClick={() => generateEmail(email.value)}>
              <IonCardContent>
                <IonItem>
                  {email.type ?? '(no type entered)'}
                </IonItem>
                <IonItem>
                  {email.value}
                </IonItem>
              </IonCardContent>
            </IonCard>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default EmailContact;
