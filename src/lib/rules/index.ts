import { ApiMigrationRule } from './api-migration-rule';
import { CreditArbitrageRule } from './credit-arbitrage-rule';
import { CodingToolSwapRule } from './coding-tool-swap-rule';
import { OverprovisionedTeamRule } from './overprovisioned-team-rule';
import { ToolOverlapRule } from './tool-overlap-rule';

export const RULES = [
  OverprovisionedTeamRule,
  CodingToolSwapRule,
  ApiMigrationRule,
  ToolOverlapRule,
  CreditArbitrageRule,
];