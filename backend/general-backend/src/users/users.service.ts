import { Injectable } from '@nestjs/common';
import {User} from "./interfaces/user.interface";

@Injectable()
export class UsersService {
    private users : User[] = [
        {
            id: "1",
            fullname: 'Ashad Mohamed',
            username: 'mashad',
            pdp: 'https://profile.intra.42.fr/users/mashad/photo',
        },
        {
            id: "2",
            fullname: 'Oussama El ouarti',
            username: 'oel-ouar',
            pdp: 'https://profile.intra.42.fr/users/oel-ouar/photo',
        }
    ];

    findAll() : User[] {
        return this.users;
    }

    findOne(id : string) : User {
        return this.users.find(item => item.id === id);
    }

    addUser(user : User) : boolean {
        if (this.users.find(item => (item.id === user.id)))
            return false;
        this.users.push(user);
        return true;
    }

    rmUser(id : string) : boolean {
        if (this.findOne(id)) {
            this.users = this.users.filter(ele => ele.id != id);
            return true;
        }
        return false;
    }
}
