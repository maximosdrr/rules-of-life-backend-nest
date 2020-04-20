import {
  Controller,
  Post,
  Get,
  UseGuards,
  Req,
  Query,
  Delete,
  Put,
} from '@nestjs/common';
import { RuleGroupService } from './rule-group.service';
import { InsertResult, DeleteResult } from 'typeorm';
import { RuleGroup } from './entitys/rule-group.entity';
import { JwtGuards } from 'src/auth/jwt.guards';

@Controller('rule-group')
@UseGuards(JwtGuards)
export class RuleGroupController {
  constructor(private ruleGroupService: RuleGroupService) {}
  @Post('insert')
  insert(@Req() request): Promise<InsertResult> {
    const ruleGroup: RuleGroup = request.body;
    ruleGroup.user = request.headers['user-id'];
    return this.ruleGroupService.insert(ruleGroup);
  }

  @Get('findAll')
  findAll(@Req() request): Promise<RuleGroup[]> {
    const userId = request.headers['user-id'];
    return this.ruleGroupService.findAll(userId);
  }

  @Get('findOne')
  findOne(
    @Req() request,
    @Query('ruleGroupId') ruleGroupId,
  ): Promise<RuleGroup> {
    const userId = request.headers['user-id'];
    return this.ruleGroupService.findOne(userId, ruleGroupId);
  }

  @Delete('delete')
  delete(
    @Req() request,
    @Query('ruleGroupId') ruleGroupId,
  ): Promise<DeleteResult> {
    const userId = request.headers['user-id'];
    return this.ruleGroupService.delete(userId, ruleGroupId);
  }

  @Put('update')
  update(@Req() request): Promise<RuleGroup> {
    const userId = request.headers['user-id'];
    const ruleGroup = request.body;
    return this.ruleGroupService.update(userId, ruleGroup);
  }
}
