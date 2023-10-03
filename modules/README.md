# Trader Mo(v)e modules

## Compile and deploy modules

```bash
# Publish modules
movement move publish --package-dir ./uq64x64 --named-addresses uq64x64=default
movement move publish --package-dir ./u256 --named-addresses u256=default
movement move publish --package-dir ./TestCoin --named-addresses SwapDeployer=default
movement move publish --package-dir ./LPResourceAccount --named-addresses SwapDeployer=default

# Create resource account & publish LPCoin
# Note: Use swap::test_resource_account to get the ResourceAccountDeployer address
movement move compile --package-dir ./LPCoin --named-addresses ResourceAccountDeployer=0xf559c35eba021ad4fe968920f0a6e376bb15cd7e62cd384ab0bf3490cd7c2464 --save-metadata
# Get the first arg
hexdump -ve '1/1 "%02x"' ./LPCoin/build/LPCoin/package-metadata.bcs
# Get the second arg
hexdump -ve '1/1 "%02x"' ./LPCoin/build/LPCoin/bytecode_modules/LPCoinV1.mv
# This command is to publish LPCoin contract, using ResourceAccountDeployer address.
# Note: replace two args with the above two hex
movement move run --function-id 0x0d9b5f58abc4c5fe4b9b06e7dd34a08608eb1c0a9672e5229dc454eafa2388b8::LPResourceAccount::initialize_lp_account \
--args hex:064c50436f696e0100000000000000004039303141423541343133313137373343414633383930363842353437373844343046444545333243443744313534363444373946343431373846414246373736e3011f8b08000000000002ff458fcb4ec3301045f7fe0acb6b489c9aa60189450562c502b1ad2ae4c7b8b5da782cdb0942887fc7ee43ddcde39cd19d4d90fa2077b0255e8e409f297bff7841e71999212687be8e78231ace08d91808e00d78ed206dc93a644c6fb178df180f05fca53b97abb0cf39a4a7b62ded7e528dc6b19515be3f4a952ea5c6084d01d81d4d93322e56f1bc1a7186d65e0f5ff85b5f8c0873c507d13f7446583e8855bfb0a25b71ce7b0e4b785c5aa53aadf462509633fa57d24b6322a454a37f42c2296a586b8d93cfaf108ef803a7085fe5d17f1092a9801601000001084c50436f696e56316b1f8b08000000000002ff5dc8b10a80201080e1bda7b80768b15122881a1b22a23deca0403d516f10f1dd2bdafab7ff3374b0465830107b85bd52c4368ee83425f4524ef34097dd04e40a9e42f4ac227cdaba73b7910cbcb32687a2863f351de452951b1e36ff316700000000000300000000000000000000000000000000000000000000000000000000000000010e4170746f734672616d65776f726b00000000000000000000000000000000000000000000000000000000000000010b4170746f735374646c696200000000000000000000000000000000000000000000000000000000000000010a4d6f76655374646c696200 \
hex:a11ceb0b0600000005010002020208070a1c0826200a460500000001000200010001084c50436f696e5631064c50436f696e0b64756d6d795f6669656c64f559c35eba021ad4fe968920f0a6e376bb15cd7e62cd384ab0bf3490cd7c2464000201020100
movement move publish --package-dir ./Swap --named-addresses SwapDeployer=default,ResourceAccountDeployer=0xf559c35eba021ad4fe968920f0a6e376bb15cd7e62cd384ab0bf3490cd7c2464,u256=default,uq64x64=default

# Initialize and mint test coins (USDT & BTC)
movement move run --function-id 0x0d9b5f58abc4c5fe4b9b06e7dd34a08608eb1c0a9672e5229dc454eafa2388b8::TestCoinsV1::initialize
movement move run --function-id 0x0d9b5f58abc4c5fe4b9b06e7dd34a08608eb1c0a9672e5229dc454eafa2388b8::TestCoinsV1::mint_coin \
--args address:0x0d9b5f58abc4c5fe4b9b06e7dd34a08608eb1c0a9672e5229dc454eafa2388b8 u64:20000000000000000 \
--type-args 0x0d9b5f58abc4c5fe4b9b06e7dd34a08608eb1c0a9672e5229dc454eafa2388b8::TestCoinsV1::USDT
movement move run --function-id 0x0d9b5f58abc4c5fe4b9b06e7dd34a08608eb1c0a9672e5229dc454eafa2388b8::TestCoinsV1::mint_coin \
--args address:0x0d9b5f58abc4c5fe4b9b06e7dd34a08608eb1c0a9672e5229dc454eafa2388b8 u64:2000000000000 \
--type-args 0x0d9b5f58abc4c5fe4b9b06e7dd34a08608eb1c0a9672e5229dc454eafa2388b8::TestCoinsV1::BTC

# MOE Coin
movement move publish --package-dir ./moe_coin --named-addresses MoeCoin=default

# Create initial pools (USDT/MVMT, BTC/MVMT, BTC/USDT)
movement move run --function-id 0x0d9b5f58abc4c5fe4b9b06e7dd34a08608eb1c0a9672e5229dc454eafa2388b8::TraderMoePoolV1::add_liquidity_entry \
--args u64:1000000000000 u64:1000000000 u64:1 u64:1 \
--type-args 0x0d9b5f58abc4c5fe4b9b06e7dd34a08608eb1c0a9672e5229dc454eafa2388b8::TestCoinsV1::USDT 0x1::aptos_coin::AptosCoin
movement move run --function-id 0x0d9b5f58abc4c5fe4b9b06e7dd34a08608eb1c0a9672e5229dc454eafa2388b8::TraderMoePoolV1::add_liquidity_entry \
--args u64:100000000000 u64:1000000000 u64:1 u64:1 \
--type-args 0x0d9b5f58abc4c5fe4b9b06e7dd34a08608eb1c0a9672e5229dc454eafa2388b8::TestCoinsV1::BTC 0x1::aptos_coin::AptosCoin
movement move run --function-id 0x0d9b5f58abc4c5fe4b9b06e7dd34a08608eb1c0a9672e5229dc454eafa2388b8::TraderMoePoolV1::add_liquidity_entry \
--args u64:10000000000 u64:250000000000000 u64:1 u64:1 \
--type-args 0x0d9b5f58abc4c5fe4b9b06e7dd34a08608eb1c0a9672e5229dc454eafa2388b8::TestCoinsV1::BTC 0x0d9b5f58abc4c5fe4b9b06e7dd34a08608eb1c0a9672e5229dc454eafa2388b8::TestCoinsV1::USDT
```
