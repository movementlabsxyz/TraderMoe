import { createSlice } from '@reduxjs/toolkit'
import { SupportedChainId } from 'constants/chains'

export enum ConnectionType {
  DEFAULT,
}

const connectionURLMap = {
  [ConnectionType.DEFAULT]: {
    [SupportedChainId.APTOS]: `https://fullnode.mainnet.aptoslabs.com`,
    // [SupportedChainId.APTOS]: `https://aptos-mainnet.nodereal.io/v1/0b8627f45c4544efaa2b71672a21d1c7`,
    [SupportedChainId.MOVEMENT_TESTNET]: `https://seed-node1.movementlabs.xyz/v1`,
  },
}

export function getRPCURL(connection: ConnectionType, chainId: SupportedChainId) {
  const maps = connectionURLMap[connection]
  if (!maps) {
    return undefined
  }
  return connectionURLMap[connection][chainId]
}

export interface ConnectionState {
  currentConnection: ConnectionType
  error: { [chainId: number]: string | undefined }
}

export const initialState: ConnectionState = {
  currentConnection: ConnectionType.DEFAULT,
  error: {
    [SupportedChainId.APTOS]: undefined,
  },
}

const connectionSlice = createSlice({
  name: 'connection',
  initialState,
  reducers: {
    updateConnectionError(state, { payload }: { payload: { chainId: SupportedChainId; error: string | undefined } }) {
      state.error[payload.chainId] = payload.error
    },
  },
})

export const { updateConnectionError } = connectionSlice.actions
export default connectionSlice.reducer
