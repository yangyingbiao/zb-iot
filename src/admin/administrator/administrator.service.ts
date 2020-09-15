import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Administrator from '../../entity/administrator';

@Injectable()
export class AdministratorService {
    constructor(
        @InjectRepository(Administrator)
        private administratorRepository : Repository<Administrator>
    ) {}

    findAdministratorByAccount(account : string, select : Array<any>) : Promise<Administrator | undefined> {
        return this.administratorRepository.findOne({ where : {account : account}, select : select})
    }
}
