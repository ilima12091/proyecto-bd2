import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCampusDto {
    // Se agrega el id para poder usar el mismo DTO para la creación y actualización de un país
    id: number;

    @IsString()
    @IsNotEmpty()
    city: string;

    @IsString()
    @IsNotEmpty()
    state: string;

    @IsNumber()
    @IsNotEmpty()
    countryId: number;
}
