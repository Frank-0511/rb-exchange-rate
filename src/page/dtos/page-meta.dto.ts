import { ApiProperty } from '@nestjs/swagger';
import { PageMetaDtoParameters } from '../models/page.modle';

export class PageMetaDto {
  @ApiProperty()
  readonly page: number;

  @ApiProperty()
  readonly pageSize: number;

  @ApiProperty()
  readonly count: number;

  @ApiProperty()
  readonly totalPage: number;

  @ApiProperty()
  readonly hasPreviousPage: boolean;

  @ApiProperty()
  readonly hasNextPage: boolean;

  constructor({ pageOptionsDto, count }: PageMetaDtoParameters) {
    this.page = pageOptionsDto.page;
    this.pageSize = pageOptionsDto.pageSize;
    this.count = count;
    this.totalPage = Math.ceil(this.count / this.pageSize);
    this.hasPreviousPage = this.page > 1;
    this.hasNextPage = this.page < this.totalPage;
  }
}
