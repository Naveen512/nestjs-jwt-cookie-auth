import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegistrationReqModel } from 'src/models/registration.req.model';
import { RegistrationRespModel } from 'src/models/registration.resp.model';
import { Repository } from 'typeorm';
import { User } from './user';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private user: Repository<User>) {}

  private async registrationValidation(regModel: RegistrationReqModel): Promise<string> {
    if (!regModel.email) {
      return "Email can't be empty";
    }

    const emailRule =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!emailRule.test(regModel.email.toLowerCase())) {
      return 'Invalid email';
    }

    const user = await this.user.findOne({ email: regModel.email });
    if (user != null && user.email) {
      return 'Email already exist';
    }

    if (regModel.password !== regModel.confirmPassword) {
      return 'Confirm password not matching';
    }
    return '';
  }

  private async getPasswordHash(password: string): Promise<string> {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  }

  public async registerUser(
    regModel: RegistrationReqModel,
  ): Promise<RegistrationRespModel> {
    let result = new RegistrationRespModel();

    const errorMessage = await this.registrationValidation(regModel);
    if (errorMessage) {
      result.message = errorMessage;
      result.successStatus = false;

      return result;
    }

    let newUser = new User();
    newUser.firstName = regModel.firstName;
    newUser.lastName = regModel.lastName;
    newUser.email = regModel.email;
    newUser.password = await this.getPasswordHash(regModel.password);

     await this.user.insert(newUser);
    result.successStatus = true;
    result.message = 'succeess';
    return result;
  }

  async password(){
      let user = await this.user.findOne({email:'naveen@gmail.com'});
      return await bcrypt.compare('123@abcd',user.password);
  }
}
