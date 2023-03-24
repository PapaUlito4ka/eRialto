import { CreateUserDto } from "src/users/dto/create-user.dto";

export class SignInAuthDto {
    email: string;
    password: string;
}

export class SignUpAuthDto extends CreateUserDto { }