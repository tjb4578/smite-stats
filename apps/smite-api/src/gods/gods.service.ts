import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { timer } from 'rxjs';
import { filter, map, switchMap, take } from 'rxjs/operators';
import { SmiteService } from '../auth/smite.service';
import { God, GodDocument } from '@smitestats/gods';

@Injectable()
export class GodsService {
  constructor(
    private http: HttpService, 
    private service: SmiteService,
    @InjectModel(God.name) private godModel: Model<GodDocument>) {
      console.log('[GodsService] Setting up interval')

      // Once a day, refetch god info
      timer(0, 1000 * 60 * 60 * 24).subscribe(() => {
        this.godModel.deleteMany({}).exec();

        this.service.buildUrl('getgods').pipe(
          take(1),
          filter(response => !!response),
          switchMap(url => {
            url = `${url}/1`;
            console.log('[SmiteApiService] Url: ' + url)
            return this.http.get(url).pipe(map(res => {
              return res.data.map(godData => this.buildGod(godData))
            }))
          })
          ).subscribe(gods => this.godModel.insertMany(gods));
    })
  }

  async getGods() {
    return this.godModel.find({}).exec();
  }

  buildGod(godData): God {
    const god = new God;
    god.godId = godData.id;
    god.name = godData.Name;
    god.role = godData.Roles;
    god.title = godData.Title;
    god.godCard_URL = godData.godCard_URL;
    god.godIcon_URL = godData.godIcon_URL;
    god.latestGod = godData.latestGod === 'y';

    const types = godData.Type.split(',');
    if (types && types.length === 2) {
      god.type = types[0];
      god.dmgType = types[1].trim();
    }
    return god;
  }
}
