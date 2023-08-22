import { NetworkType } from '@tradermoe/v1-sdk'

export enum SupportedChainId {
  APTOS = 1,
  MOVEMENT_TESTNET = 4,
}

export const CHAIN_IDS_TO_NAMES = {
  [SupportedChainId.APTOS]: 'aptos',
  [SupportedChainId.MOVEMENT_TESTNET]: 'movement_testnet',
}

export const CHAIN_IDS_TO_SDK_NETWORK = {
  [SupportedChainId.APTOS]: NetworkType.Mainnet,
  [SupportedChainId.MOVEMENT_TESTNET]: NetworkType.Testnet,
}

export function isSupportedChain(chainId: number | undefined): chainId is SupportedChainId {
  return !!chainId && !!SupportedChainId[chainId]
}

export function isAptosChain(chainId: number | undefined): chainId is SupportedChainId {
  return (
    chainId === SupportedChainId.APTOS ||
    chainId === SupportedChainId.MOVEMENT_TESTNET
  )
}
