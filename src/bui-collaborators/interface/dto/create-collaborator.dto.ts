import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Length } from "class-validator";
import { BuiCollaboratorEntity } from "src/bui-collaborators/core/domain/entities/bui-collaborator.entity";

export class CreateCollaboratorDto implements BuiCollaboratorEntity{
   
    @IsNotEmpty()
    @ApiProperty()
    @IsString()
    username: string;
    @IsNotEmpty()
    @Length(8)
    @ApiProperty()
    password: string;

}