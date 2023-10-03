import { SupportedChainId } from './chains'
import { APTOS_CoinInfo } from './coinInfo'

export const COIN_BASES = {
  [SupportedChainId.APTOS]: [
    APTOS_CoinInfo['0x1::aptos_coin::AptosCoin'],
    APTOS_CoinInfo['0x5672606854002b598c229d348a1f117dc036a6bc9772b0ea8a9bf8bd2f2c9d64::moe_coin::MoeCoin'],
    APTOS_CoinInfo['0x777821c78442e17d82c3d7a371f42de7189e4248e529fe6eee6bca40ddbb::apcoin::ApCoin'],
    APTOS_CoinInfo['0xd11107bdf0d6d7040c6c0bfbdecb6545191fdf13e8d8d259952f53e1713f61b5::staked_coin::StakedAptos'],
    APTOS_CoinInfo['0xf22bede237a07e121b56d91a491eb7bcdfd1f5907926a9e58338f964a01b17fa::asset::USDC'],
    APTOS_CoinInfo['0x5e156f1207d0ebfa19a9eeff00d62a282278fb8719f4fab3a586a0a2c0fffbea::coin::T'],
  ],
  [SupportedChainId.MOVEMENT_TESTNET]: [],
}
