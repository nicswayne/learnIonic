import React, { useEffect, useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
  IonActionSheet
} from '@ionic/react';
import { trash, close, pencil } from 'ionicons/icons';
import './PhotoList.css';
import { Photo, usePhotoGallery } from '../hooks/usePhotoGallery';

const PhotoList: React.FC<{ update: number }> = ({ update }) => {
  const [photoToDelete, setPhotoToDelete] = useState<Photo>();
  const { deletePhoto, loadSaved, photos } = usePhotoGallery();

  useEffect(() => {
    loadSaved()
  }, [update])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Photo Gallery</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
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
          //   text: 'Edit',
          //   icon: pencil
          // }, {
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
