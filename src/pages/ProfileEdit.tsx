import React, { useState, FormEvent } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonInput,
  IonLabel,
  IonList,
  IonItem,
  IonButton,
  IonAvatar,
  IonIcon,
  IonDatetime,
  IonRadioGroup,
  IonRadio,
  IonFab,
  IonRippleEffect
} from '@ionic/react';
import './ProfileEdit.css';
import { personCircleSharp } from 'ionicons/icons';

const ProfileEdit: React.FC = () => {
  const [name, updateName] = useState('')
  const [email, updateEmail] = useState('')
  const [password, updatePassword] = useState('')
  const [birthdate, updateBirthdate] = useState('')
  const [gender, updateGender] = useState('')

  function handleSubmit(e: any) {
    e.preventDefault()
    console.log('name', name);
    console.log('password', password);
    console.log('birthdate', birthdate);
    console.log('gender', gender);
  }

  function scrollToMiddle(target: Element) {
    target.scrollIntoView({ block: "center", behavior: "smooth" })
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonAvatar className="avatar-wrapper">
          <IonIcon className="avatar" color="secondary" icon={personCircleSharp}></IonIcon>
        </IonAvatar>
        <form onSubmit={handleSubmit}>
          <IonList>
          {/* <IonList className="super-tall"> */}
            <IonItem>
              <IonLabel position="stacked" >Name</IonLabel>
              <IonInput required autoCapitalize="on" name="name" placeholder="Name" value={name} onInput={(e: any) => updateName(e.target.value)}></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked" >Email</IonLabel>
              <IonInput required minlength={8} name="email" placeholder="Email" type="email" value={email} onInput={(e: any) => updateEmail(e.target.value)}></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked" >Password</IonLabel>
              <IonInput required minlength={8} clearInput name="password" placeholder="Password" type="password" value={password} onInput={(e: any) => updatePassword(e.target.value)}></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Birthdate</IonLabel>
              <IonDatetime onIonChange={(e: any) => updateBirthdate(e.target.value)} displayFormat="MM/DD/YYYY" value={birthdate} ></IonDatetime>
            </IonItem>
            <IonItem>
              <IonRadioGroup className="fullWidth" value={gender} onIonChange={(e:any) => updateGender(e.target.value)}>
                <IonLabel>Gender</IonLabel>
                <IonList>
                  <IonItem>
                    <IonLabel>Male</IonLabel>
                    <IonRadio mode="md" slot="start" value="male"></IonRadio>
                  </IonItem>
                  <IonItem>
                    <IonLabel>Female</IonLabel>
                    <IonRadio mode="md" slot="start" value="female"></IonRadio>
                  </IonItem>
                </IonList>
              </IonRadioGroup>
            </IonItem>
          </IonList>
          <IonFab className="fullWidth">
            <IonButton className="ripple-parent" type="submit" expand="block">
              Save
              <IonRippleEffect type="unbounded"></IonRippleEffect>
            </IonButton>
          </IonFab>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default ProfileEdit;