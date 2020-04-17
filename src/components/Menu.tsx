import React from 'react';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonIcon,
} from '@ionic/react';
import { personCircleOutline } from 'ionicons/icons';

interface Props extends RouteComponentProps {
  title: string
}

const Menu: React.FC<Props> = ({ title, history }) => {
  return (
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonIcon onClick={() => history.push('/profileEdit')} size="large" icon={personCircleOutline} />
        </IonButtons>
        <IonTitle>{title}</IonTitle>
      </IonToolbar>
    </IonHeader>
  )
}

export default withRouter(Menu);