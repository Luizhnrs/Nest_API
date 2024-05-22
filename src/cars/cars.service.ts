import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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
    const car = this.cars.find((car) => car.id === id);

    if(car.id === null || !car)
      {
        throw new NotFoundException("Car id cannot be null or don't exists");
      }

    return car;
  }

  update(id: number, updateCarDto: UpdateCarDto) {
    const car = this.findOne(id);

    if(car.id === null || !car){
      throw new NotFoundException("This car cannot be updated, because is not exists");
    }

    car.brand = updateCarDto.brand
    car.model = updateCarDto.model
    car.year = updateCarDto.year
    
  
    return;
  }

  remove(id: number) {
    const car = this.findOne(id);
    const carIndex = this.cars.findIndex((cars) => car.id === id);
    this.cars.splice(carIndex, 1);

    if(car.id === null || !car){
      throw new NotFoundException("This car cannot be deleted, because is not exists");
    }
    
    return car;
  }
}
