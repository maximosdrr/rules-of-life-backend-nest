import { Test, TestingModule } from '@nestjs/testing';
import { RuleGroupController } from '../rule-group.controller';

describe('RuleGroup Controller', () => {
  let controller: RuleGroupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RuleGroupController],
    }).compile();

    controller = module.get<RuleGroupController>(RuleGroupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
