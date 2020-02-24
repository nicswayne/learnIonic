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
import { camera, imagesOutline, personCircleOutline } from 'ionicons/icons';
import styled from 'styled-components'
import { usePhotoGallery } from './hooks/usePhotoGallery';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';

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
            <Route path="/tab1" render={(props) => <Tab1 update={updatePhotoGallery} {...props} />} exact={true} />
            <Route path="/tab2" component={Tab2} exact={true} />
            <Route path="/" render={() => <Redirect to="/tab1" />} exact={true} />
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="tab1" href="/tab1">
              <IonIcon icon={imagesOutline} />
            </IonTabButton>
            <IonTabButton onClick={() => takePhoto()}>
              <CircleButton>
                <IonIcon size="20px" icon={camera}></IonIcon>
              </CircleButton>
            </IonTabButton>
            <IonTabButton tab="tab2" href="/tab2">
              <IonIcon icon={personCircleOutline} />
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  )
};

export default App;
