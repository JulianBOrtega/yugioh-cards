import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CardImage } from '../models/card-image.interface';
import { writeFileSync, existsSync } from 'fs';

@Injectable({
  providedIn: 'root'
})

export class CardsApiService {
  private readonly _OFFSET : number = 0;
  private readonly _LIMIT : number = 15;
  private readonly _BASE_URL : string = 'https://db.ygoprodeck.com/api/v7/cardinfo.php';
  private readonly _IMG_FOLDER_PATH : string = '../../assets/cardImages';

  constructor(private http: HttpClient) {}

  getCards(offset = this._OFFSET, limit: number = this._LIMIT) : Observable<any>
  {
    return this.http.get<any>(`${this._BASE_URL}?num=${limit}&offset=${offset}`);
  }

  processCardImages(cardImages : CardImage[]) : void 
  {
    for (let i = 0; i < cardImages.length; i++) {
      const cardImage = cardImages[i];
      const imageFound = this.findImage(cardImage.id.toString());

      if(imageFound != null) 
      {
        cardImage.image_url = imageFound[0];
        cardImage.image_url_cropped = imageFound[1];
        cardImage.image_url_small = imageFound[2];

        continue;
      }
      
      cardImage.downloaded = false;
      
      const img_obs = this.http.get<any>(cardImage.image_url)
      const imgCropped_obs = this.http.get<any>(cardImage.image_url_cropped)
      const imgSmall_obs = this.http.get<any>(cardImage.image_url_small)

      img_obs.subscribe(img => 
        imgCropped_obs.subscribe(imgCropped => 
          imgSmall_obs.subscribe(imgSmall => {
            cardImage.image_url_small = this.storeImage(imgSmall, cardImage.id + "_small");
            cardImage.image_url_cropped = this.storeImage(imgCropped, cardImage.id + "_cropped");
            cardImage.image_url = this.storeImage(img, cardImage.id.toString());

            cardImage.downloaded = true;
      })));
    }
  }

  private storeImage(imageData:any, filename:string) : string 
  {
    const path = this._IMG_FOLDER_PATH + filename + ".jpg";
    writeFileSync(path, imageData);
    
    return path;
  }

  private findImage(filename:string) : string[] | null
  {
    const path = this._IMG_FOLDER_PATH + filename;
    if(!existsSync(path + ".jpg")) return null;
    
    return [path, path + "_cropped.jpg", path + "_small.jpg"];
  }

}
