import aptosLogo from 'assets/aptos_logo.svg'
import { Coin } from 'hooks/common/Coin'

import { SupportedChainId } from './chains'
import {
  APTOS_CoinInfo,
  MOVEMENT_TESTNET_CoinInfo,
} from './coinInfo'

interface BaseChainInfo {
  readonly docs: string
  readonly bridge?: string
  readonly explorer: string
  readonly logoUrl: string
  readonly label: string
  readonly helpCenterUrl?: string
  readonly nativeCoin: Coin
  readonly moeCoin?: Coin
  readonly defaultBuyCoin?: Coin
  readonly stableCoin: Coin
  readonly zUSDC?: Coin
  readonly color?: string
  readonly backgroundColor?: string
}

export type ChainInfoMap = { readonly [chainId: number]: BaseChainInfo }

export const CHAIN_INFO: ChainInfoMap = {
  [SupportedChainId.APTOS]: {
    docs: 'https://aptoslabs.com/',
    explorer: 'https://explorer.aptoslabs.com/?network=mainnet',
    label: 'Aptos',
    logoUrl: aptosLogo,
    nativeCoin: APTOS_CoinInfo['0x1::aptos_coin::AptosCoin'],
    moeCoin: APTOS_CoinInfo['0x2e2f2175ecc96dfc48dbd789da52455344513e98c0641a737637fe83dc0b6d7c::moe_coin::MoeCoin'],
    defaultBuyCoin:
      APTOS_CoinInfo['0x2e2f2175ecc96dfc48dbd789da52455344513e98c0641a737637fe83dc0b6d7c::moe_coin::MoeCoin'],
    stableCoin: APTOS_CoinInfo['0x2e2f2175ecc96dfc48dbd789da52455344513e98c0641a737637fe83dc0b6d7c::asset::USDC'],
  },
  [SupportedChainId.MOVEMENT_TESTNET]: {
    docs: 'https://docs.movementlabs.xyz/',
    explorer: 'https://explorer.movementlabs.xyz/',
    label: 'MovementTest',
    logoUrl: aptosLogo,
    nativeCoin: MOVEMENT_TESTNET_CoinInfo['0x1::aptos_coin::AptosCoin'],
    moeCoin:
      MOVEMENT_TESTNET_CoinInfo['0x2e2f2175ecc96dfc48dbd789da52455344513e98c0641a737637fe83dc0b6d7c::moe_coin::MoeCoin'],
    defaultBuyCoin:
      MOVEMENT_TESTNET_CoinInfo['0x2e2f2175ecc96dfc48dbd789da52455344513e98c0641a737637fe83dc0b6d7c::moe_coin::MoeCoin'],
    stableCoin:
      MOVEMENT_TESTNET_CoinInfo['0x2e2f2175ecc96dfc48dbd789da52455344513e98c0641a737637fe83dc0b6d7c::TestCoinsV1::USDT'],
  },
}

export function getChainInfo(chainId: SupportedChainId): BaseChainInfo {
  if (chainId) {
    return CHAIN_INFO[chainId] ?? undefined
  }
  return undefined
}

export function getChainInfoOrDefault(chainId: number | undefined) {
  return getChainInfo(chainId) ?? CHAIN_INFO[SupportedChainId.APTOS]
}
