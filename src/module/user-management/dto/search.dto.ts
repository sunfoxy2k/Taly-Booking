import { ApiProperty } from '@nestjs/swagger'

export class SearchDto {

    @ApiProperty({
        type: String,
        required: true,
    })
    keyword: string

    @ApiProperty({
        type: String,
        required: false,
    })
    field: string
    
    @ApiProperty({
        type: String,
        required: false,
    })
    location: string

    @ApiProperty({
        type: Number,
        required: false,
        // default: 0,
    })
    page: number
}