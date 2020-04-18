import { Test, TestingModule } from '@nestjs/testing';
import { RuleGroupService } from '../rule-group.service';

describe('RuleGroupService', () => {
  let service: RuleGroupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RuleGroupService],
    }).compile();

    service = module.get<RuleGroupService>(RuleGroupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
