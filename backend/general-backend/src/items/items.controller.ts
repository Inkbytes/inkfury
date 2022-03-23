import {Controller, Get, Req, Request, Post, Delete, Body, Put, Param} from '@nestjs/common';
import {CreateItemDto} from "./dto/create-item.dto";
import { ItemsService} from "./items.service";
import {ItemsModules} from "./items.modules";
import { Item } from "./interfaces/item.interface";

@Controller('items')
export class ItemsController {
    constructor(private readonly itemsService : ItemsService) {}
    @Get()
    findAll() : Item[] {
        return this.itemsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id : string) : Item {
        return this.itemsService.findOne(id);
    }

    @Post()
    create(@Body() createItemDto : CreateItemDto, @Req() req : Request) : string {
        console.log(req.url);
        return `Name: ${createItemDto.name} Desc: ${createItemDto.description}`;
    }

    @Delete(':id')
    delete(@Param('id') id : string) : string {
        return `Delete ${id}`;
    }

    @Put(':id')
    update(@Body() updateItemDto: CreateItemDto , @Param('id') id : number) : string {
        return `Updated ${id} - Name: ${updateItemDto.name}`;
    }
}

