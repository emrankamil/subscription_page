import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async updateCustomerId(userId: string, customerId: string): Promise<User> {
    try {
      const user: CreateUserDto = await this.userModel.findById(userId);

      if (!user) {
        throw new Error('User not found');
      }

      // Update the customerId field
      const updatedUser = new this.userModel({
        ...user,
        customerId,
      });

      // Save the updated user
      return updatedUser.save();
    } catch (error) {
      console.error('Error updating customer ID:', error);
      // Handle error appropriately, e.g., throw an exception or return an error response
    }
  }
}
