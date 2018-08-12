/**
 * 游戏基础参数配置表
 */
const BASE_GAME_CONFIGURE = {

  //一级工人基础生产力
  workerBaseProlificacy: 3,

  //工人每级对生产力加成
  workerLevelAddition: [
    1,
    1.67,
    2.00,
    1.90,
    2.26,
    3.42,
    5.05,
    5.48,
    5.82,
    6.23,
    6.78,
    7.58,
    7.98,
    8.68,
    9.65
  ],

  //工人每级抡矿锄的效率
  workerLevelHit: [
    1,
    1,
    1,
    1,
    2,
    2,
    2,
    3,
    4,
    5
  ],

  //头部装备每级对工人生产力的加成
  equipment1Addition: [
    1,
    1.1,
    1.2,
    1.4,
    1.6,
    1.8
  ],

  //上身装备每级对工人生产力的加成
  equipment2Addition: [
    1,
    1.1,
    1.3,
    1.5,
    1.8,
    2.0
  ],

  //下身装备每级对工人生产力的加成
  equipment3Addition: [
    1,
    1.1,
    1.3,
    1.5,
    1.8,
    2.0
  ],

  //脚部装备每级对工人生产力的加成
  equipment4Addition: [
    1,
    1.1,
    1.2,
    1.3,
    1.4,
    1.5
  ],

  //工具装备每级对工人生产力的加成
  equipment5Addition: [
    1,
    1.1,
    1.5,
    2.0,
    2.5,
    3.0
  ],

  workerHealthLevelDeduction: [
    1,
    0.9,
    0.7,
    0.4
  ],

  luckyPotion1Addition: 1.5,

  luckyPotion1Addition: 2.0,

  energyPotion1Addition: 1.5,

  energyPotion2Addition: 2.0,

  baseLuckyValue: 1,

  robotProlificacy: 1.5

}