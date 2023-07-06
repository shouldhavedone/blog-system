import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm"
import { SysUser } from '../entities/SysUser.entity'
import { Repository } from "typeorm"

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(SysUser)
    private sysUserRepository: Repository<SysUser>
  ) { }

  
}