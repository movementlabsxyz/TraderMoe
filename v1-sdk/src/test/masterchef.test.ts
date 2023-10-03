import SDK, { NetworkType } from '../main'
const coinType = '0x2ce24c1d7cc2aebc8effbf4b8bf8d35985627316a3f21e55cbabc15922d6d02a::LPCoinV1::LPCoin<0x1::aptos_coin::AptosCoin,0x5672606854002b598c229d348a1f117dc036a6bc9772b0ea8a9bf8bd2f2c9d64::moe_coin::MoeCoin>'
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
