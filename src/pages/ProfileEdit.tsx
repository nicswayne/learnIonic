import React, { useState } from 'react';
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
  IonRippleEffect,
  IonToast
} from '@ionic/react';
import './ProfileEdit.css';
import { personCircleSharp } from 'ionicons/icons';

const ProfileEdit: React.FC = () => {
  const [name, updateName] = useState('')
  const [email, updateEmail] = useState('')
  const [password, updatePassword] = useState('')
  const [birthdate, updateBirthdate] = useState('')
  const [gender, updateGender] = useState('')
  const [showToast, updateShowToast] = useState(false)

  function handleSubmit(e: any) {
    e.preventDefault()
    updateShowToast(true)
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
        <IonToast
          isOpen={showToast}
          position="top"
          onDidDismiss={() => updateShowToast(false)}
          message="Your profile has been saved. (but not really)"
          duration={2000}
        />
      </IonContent>
    </IonPage>
  );
};

export default ProfileEdit;
