import { IsString, IsNotEmpty, IsNumber, IsDateString, IsOptional } from 'class-validator';

export class CreateMatchDTO {
    @IsDateString()
    @IsNotEmpty()
    fecha: string;

    @IsString()
    @IsNotEmpty()
    etapa: string;

    @IsNumber()
    @IsNotEmpty()
    idEstadio: number;

    @IsNumber()
    @IsNotEmpty()
    idEquipoLocal: number;

    @IsNumber()
    @IsNotEmpty()
    idEquipoVisitante: number;

    @IsNumber()
    @IsOptional()
    golesLocal: number;

    @IsNumber()
    @IsOptional()
    golesVisitante: number;
}
