import React, { useState } from 'react';
import { Calendar } from '@ionic-native/calendar';
import {
  IonContent,
  IonPage,
  IonList,
  IonItem,
  IonButton,
  IonRippleEffect,
  IonLabel,
  IonInput,
  IonDatetime,
  IonFab
} from '@ionic/react';
import './CalendarEvent.css';
import Menu from '../components/Menu';

const CalendarEvent: React.FC = () => {
  const [title, updateTitle] = useState('')
  const [location, updateLocation] = useState('')
  const [note, updateNote] = useState('')
  const [startDate, updateStartDate] = useState('')
  const [endDate, updateEndDate] = useState('')

  function handleSubmit() {
    Calendar.createEventInteractively(title, undefined, note, new Date(startDate), new Date(endDate))
  }

  function checkComplete() {
    return !(title && startDate && endDate)
  }

  return (
    <IonPage>
      <Menu title="Event" />
      <IonContent>
        <form onSubmit={handleSubmit}>
          <IonList>
            <IonItem>
              <IonLabel position="stacked" >Title</IonLabel>
              <IonInput required autoCapitalize="on" name="title" placeholder="Title" value={title} onInput={(e: any) => updateTitle(e.target.value)}></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked" >Location</IonLabel>
              <IonInput autoCapitalize="on" name="location" placeholder="Event location" value={location} onInput={(e: any) => updateLocation(e.target.value)}></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Start Date</IonLabel>
              <IonDatetime onIonChange={(e: any) => updateStartDate(e.target.value)} displayFormat="MM/DD/YYYY h:mm A" value={startDate} ></IonDatetime>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">End Date</IonLabel>
              <IonDatetime onIonChange={(e: any) => updateEndDate(e.target.value)} displayFormat="MM/DD/YYYY h:mm A" value={endDate} ></IonDatetime>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked" >Note</IonLabel>
              <IonInput name="note" placeholder="Event note" value={note} onInput={(e: any) => updateNote(e.target.value)}></IonInput>
            </IonItem>
          </IonList>
          <IonFab className="fullWidth">
            <IonButton disabled={checkComplete()} className="ripple-parent" type="submit" expand="block">
              Save
              <IonRippleEffect type="unbounded"></IonRippleEffect>
            </IonButton>
          </IonFab>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default CalendarEvent;
