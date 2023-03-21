export class SignInAuthDto {
    email: string;
    password: string;
}

export class SignUpAuthDto extends SignInAuthDto { }