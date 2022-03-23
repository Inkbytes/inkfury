import { Injectable } from '@nestjs/common';
import {Item} from './interfaces/item.interface';

@Injectable()
export class ItemsService {
   private readonly items: Item[] = [
       {
           id: "0",
           name: "Avocado",
           description: "The best thing for masturbation",
           qty: 100,
       },
       {
           id: "1",
           name: "Banana",
           description: "The best thing for relaxation",
           qty: 50,
       }
   ];

    findAll() : Item[] {
        return this.items;
    }

    findOne(id : string) : Item {
        return this.items.find(item => item.id === id);
    }
}
