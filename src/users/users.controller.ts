import { Body, Controller,  Get,  Post } from '@nestjs/common';
import { RegistrationReqModel } from 'src/models/registration.req.model';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private userService:UsersService){}

    @Post('registration')
    async registerUser(@Body() reg: RegistrationReqModel){
        return await this.userService.registerUser(reg);
    }

    @Get('test')
    async testPassword(){
        return await this.userService.password();
    }
}
