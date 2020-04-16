import React, { useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { camera, imagesOutline, personCircleOutline, mailOutline, callOutline } from 'ionicons/icons';
import styled from 'styled-components'
import { usePhotoGallery } from './hooks/usePhotoGallery';
import ContactSearch from './pages/ContactSearch';
import EmailContact from './pages/EmailContact';
import PhotoList from './pages/PhotoList';
import ProfileEdit from './pages/ProfileEdit';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

const CircleButton = styled.div`
  background-color: #3880ff;
  width: 40px;
  height: 40px;
  border-radius: 25px;
  color: white;
  > ion-icon {
    height: 25px;
    width: 25px;
    margin: 6px;
  }
`

const App: React.FC = () => {
  const { photos, takePhoto } = usePhotoGallery()
  const [updatePhotoGallery, setUpdate] = useState(0)

  useEffect(() => {
    setUpdate(updatePhotoGallery + 1)
  }, [photos.length])

  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route path="/photoList" render={(props) => <PhotoList update={updatePhotoGallery} {...props} />} exact={true} />
            <Route path="/profileEdit" component={ProfileEdit} exact={true} />
            <Route path="/contactSearch" component={ContactSearch} exact={true} />
            <Route path="/emailContact" component={EmailContact} exact={true} />
            <Route path="/" render={() => <Redirect to="/photoList" />} exact={true} />
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="photoList" href="/photoList">
              <IonIcon icon={imagesOutline} />
            </IonTabButton>
            <IonTabButton tab="emailContact" href="/emailContact">
              <IonIcon icon={mailOutline} />
            </IonTabButton>
            <IonTabButton onClick={() => takePhoto()}>
              <CircleButton>
                <IonIcon size="20px" icon={camera}></IonIcon>
              </CircleButton>
            </IonTabButton>
            <IonTabButton tab="contactSearch" href="/contactSearch">
              <IonIcon icon={callOutline} />
            </IonTabButton>
            <IonTabButton tab="profileEdit" href="/profileEdit">
              <IonIcon icon={personCircleOutline} />
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  )
};

export default App;
