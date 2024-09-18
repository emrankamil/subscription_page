import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<void>;
    findAll(): Promise<User[]>;
}
