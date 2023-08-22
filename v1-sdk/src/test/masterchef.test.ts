import SDK, { NetworkType } from '../main'
const coinType = '0x6d013996933469b027ea0917214f9c45e6f10b7aa075b4200c11869069fb471b::LPCoinV1::LPCoin<0x1::aptos_coin::AptosCoin,0x2e2f2175ecc96dfc48dbd789da52455344513e98c0641a737637fe83dc0b6d7c::moe_coin::MoeCoin>'
const userAddress = '0x2c5ebdd44fd5eac6382e53319a8fae35b87c3b25903c8b44ed35f9db63746538'

describe('Masterchef Module', () => {
  const sdk = new SDK('https://fullnode.mainnet.aptoslabs.com', NetworkType.Mainnet)

  test('getLPInfoResources', async () => {
    const output = await sdk.MasterChef.getLPInfoResources()
    console.log(output)
    expect(output.length).toBeGreaterThan(0)
  })

  test('getPoolInfoByCoinType', async () => {
    const output = await sdk.MasterChef.getPoolInfoByCoinType(sdk.networkOptions.modules.AniAddress)
    console.log(output)
    expect(Number(output.alloc_point)).toBeGreaterThan(0)
  })

  test('getAllPoolInfo', async () => {
    const output = await sdk.MasterChef.getAllPoolInfo()
    console.log(output)
    expect(output.length).toBeGreaterThan(0)
  })

  test('getMasterChefData', async () => {
    const output = await sdk.MasterChef.getMasterChefData()
    console.log(output)
    expect(1).toBe(1)
  })

  test('getUserInfoByCoinType', async () => {
    const output = await sdk.MasterChef.getUserInfoByCoinType(userAddress, sdk.networkOptions.modules.AniAddress)
    console.log(output)
    expect(1).toBe(1)
  })

  test('getUserInfoAll', async () => {
    const output = await sdk.MasterChef.getUserInfoAll(userAddress)
    console.log(output)
    expect(1).toBe(1)
  })

  test('getFirstTwoPairStakedLPInfo', async () => {
    const output = await sdk.MasterChef.getFirstTwoPairStakedLPInfo()
    console.log(output)
    expect(1).toBe(1)
  })

  test('checkRegisteredANI true', async () => {
    const output = await sdk.MasterChef.checkRegisteredANI(sdk.networkOptions.modules.MasterChefDeployerAddress)
    expect(output).toBe(true)
  })

  test('checkRegisteredANI false', async () => {
    const output = await sdk.MasterChef.checkRegisteredANI(sdk.networkOptions.modules.ResourceAccountAddress)
    expect(output).toBe(false)
  })

  test('registerANIPayload', async () => {
    const output = sdk.MasterChef.registerANIPayload()
    console.log(output)
    expect(1).toBe(1)
  })

  test('stakeLPCoinPayload', async () => {
    const output = sdk.MasterChef.stakeLPCoinPayload({
      amount: '100000000',
      coinType,
      method: 'deposit',
    })
    console.log(output)
    expect(1).toBe(1)
  })

  test('stakeANIPayload', async () => {
    const output = sdk.MasterChef.stakeANIPayload({
      amount: '100000000',
      method: 'enter_staking',
    })
    console.log(output)
    expect(1).toBe(1)
  })
})
