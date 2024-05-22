import { Injectable } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { Car } from './entities/car.entity';

@Injectable()
export class CarsService {
  private readonly cars: Car[] = []
  private id: number = 1;

  create(createCarDto: CreateCarDto) {
    const newCar = {
      id: this.id,
      brand: createCarDto.brand,
      model: createCarDto.model,
      year: createCarDto.year
    };
    this.id = this.id + 1;

    this.cars.push(newCar);
    return newCar;
  }

  findAll() {
    return this.cars;
  }

  findOne(id: number) {
    return this.cars.find((car) => car.id === id);
  }

  update(id: number, updateCarDto: UpdateCarDto) {
    return `This action updates a #${id} car`;
  }

  remove(id: number) {
    return `This action removes a #${id} car`;
  }
}
