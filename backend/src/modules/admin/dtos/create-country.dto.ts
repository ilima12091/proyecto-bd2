import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCountryDto {
  // Se agrega el id para poder usar el mismo DTO para la creación y actualización de un país
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  confederation: string;
}
