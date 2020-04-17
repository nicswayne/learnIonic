import React, { useEffect, useState } from 'react';
import {
  IonContent,
  IonPage,
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
  IonActionSheet,
  IonText
} from '@ionic/react';
import { trash, close } from 'ionicons/icons';
import { Photo, usePhotoGallery } from '../hooks/usePhotoGallery';
import './PhotoList.css'
import Menu from '../components/Menu';

const PhotoList: React.FC<{ update: number }> = ({ update }) => {
  const [photoToDelete, setPhotoToDelete] = useState<Photo>();
  const { deletePhoto, loadSaved, photos } = usePhotoGallery();

  useEffect(() => {
    loadSaved()
    // eslint-disable-next-line
  }, [update])

  return (
    <IonPage>
      <Menu title="Photo Gallery" />
      <IonContent>
        {!photos.length &&
          <div className="empty-state">
            <IonText> No Photos!</IonText>
            <IonText> Click the camera icon to take a photo</IonText>
          </div>
        }
        <IonGrid>
          <IonRow>
            {photos.map((photo, index) => (
              <IonCol size-xs="12" size-sm="6" size-lg="4" key={index}>
                <IonImg onClick={() => setPhotoToDelete(photo)} src={photo.base64 ?? photo.webviewPath} />
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
        <IonActionSheet
          isOpen={!!photoToDelete}
          buttons={[{
            text: 'Delete',
            role: 'destructive',
            icon: trash,
            handler: () => {
              if (photoToDelete) {
                deletePhoto(photoToDelete);
                setPhotoToDelete(undefined);
              }
            }
          }, {
            text: 'Cancel',
            icon: close,
            role: 'cancel'
          }]}
          onDidDismiss={() => setPhotoToDelete(undefined)}
        />
      </IonContent>
    </IonPage>
  );
};

export default PhotoList;
