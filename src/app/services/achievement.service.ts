import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Achievement } from 'src/models/achievement.model';
import { UtilsService } from './utils.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod'
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AchievementService {

  constructor(private auth: AngularFireAuth, private db: AngularFirestore, private utils: UtilsService, private HttpClient:HttpClient) { }

  public async get(id: string): Promise<Achievement> {
    // return this.utils.get("achievements", id);
    return this.HttpClient.get<Achievement>(environment.endpoint + 'achievements').toPromise();
  }

  public getAll(): Observable<Achievement[]> {
    // return this.utils.getAll<Achievement>("achievements");
    return this.HttpClient
      .get<Achievement[]>(environment.endpoint + 'achievements');
  }


  public async create(achievement: Achievement) {
    await this.utils.create("achievements", achievement);
  }

  public async update(achievement: Achievement) {
    await this.utils.update("achievements", achievement);
  }

  public async delete(achievementId: string) {
    await this.utils.delete("achievements", achievementId);
  }

  public async getPaginate(after: number, size: number) {
    return await this.db.collection("achievements").ref
      .orderBy("metadata.created", "desc")
      .startAfter(after)
      .limit(size)
      .get();
  }

}
