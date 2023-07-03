import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm"
import { PostDataDto } from "./auth.dto";
import { SysUser } from '../modules/SysUser.entity'
import { Repository } from "typeorm"

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(SysUser)
    private sysUserRepository: Repository<SysUser>
  ) { }

  async findAll(): Promise<SysUser[]> {
    return await this.sysUserRepository.find({})
  }

  getAuth(id: string): string {
    return `hello get  ${id}`
  }

  postAuth(data: PostDataDto): string {
    return `hello post code = ${data.code}  name = ${data.name}`
  }
}