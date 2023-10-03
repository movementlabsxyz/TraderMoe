#!/bin/bash

# Publish modules
movement move publish --package-dir ./uq64x64 --named-addresses uq64x64=default
movement move publish --package-dir ./u256 --named-addresses u256=default
movement move publish --package-dir ./TestCoin --named-addresses SwapDeployer=default
movement move publish --package-dir ./LPResourceAccount --named-addresses SwapDeployer=default

# Create resource account & publish LPCoin
# Note: Use swap::test_resource_account to get the ResourceAccountDeployer address
movement move compile --package-dir ./LPCoin --named-addresses ResourceAccountDeployer=0x2df45330918eb7b6dfc845a3b37cca2035efe0c99977d6f61d457abf17f28b19 --save-metadata
# Get the first arg
METADATA=$(hexdump -ve '1/1 "%02x"' ./LPCoin/build/LPCoin/package-metadata.bcs)
# Get the second arg
COIN_CODE=$(hexdump -ve '1/1 "%02x"' ./LPCoin/build/LPCoin/bytecode_modules/LPCoinV1.mv)
# This command is to publish LPCoin contract, using ResourceAccountDeployer address.
# Note: replace two args with the above two hex
movement move run --function-id 0x2f293ddaf809db8ac65b34bc48622d9e655e4e27c7b524c0798f1d8e0db6f3b5::LPResourceAccount::initialize_lp_account \
--args hex:$METADATA hex:$COIN_CODE
movement move publish --package-dir ./Swap --named-addresses SwapDeployer=default,ResourceAccountDeployer=0x2df45330918eb7b6dfc845a3b37cca2035efe0c99977d6f61d457abf17f28b19,u256=default,uq64x64=default

# Initialize and mint test coins (USDT & BTC)
movement move run --function-id 0x2f293ddaf809db8ac65b34bc48622d9e655e4e27c7b524c0798f1d8e0db6f3b5::TestCoinsV1::initialize
movement move run --function-id 0x2f293ddaf809db8ac65b34bc48622d9e655e4e27c7b524c0798f1d8e0db6f3b5::TestCoinsV1::mint_coin \
--args address:0x2f293ddaf809db8ac65b34bc48622d9e655e4e27c7b524c0798f1d8e0db6f3b5 u64:20000000000000000 \
--type-args 0x2f293ddaf809db8ac65b34bc48622d9e655e4e27c7b524c0798f1d8e0db6f3b5::TestCoinsV1::USDT
movement move run --function-id 0x2f293ddaf809db8ac65b34bc48622d9e655e4e27c7b524c0798f1d8e0db6f3b5::TestCoinsV1::mint_coin \
--args address:0x2f293ddaf809db8ac65b34bc48622d9e655e4e27c7b524c0798f1d8e0db6f3b5 u64:2000000000000 \
--type-args 0x2f293ddaf809db8ac65b34bc48622d9e655e4e27c7b524c0798f1d8e0db6f3b5::TestCoinsV1::BTC

# MOE Coin
movement move publish --package-dir ./moe_coin --named-addresses MoeCoin=default

# Create initial pools (USDT/MVMT, BTC/MVMT, BTC/USDT)
movement move run --function-id 0x2f293ddaf809db8ac65b34bc48622d9e655e4e27c7b524c0798f1d8e0db6f3b5::TraderMoePoolV1::add_liquidity_entry \
--args u64:1000000000000 u64:1000000000 u64:1 u64:1 \
--type-args 0x2f293ddaf809db8ac65b34bc48622d9e655e4e27c7b524c0798f1d8e0db6f3b5::TestCoinsV1::USDT 0x1::aptos_coin::AptosCoin
movement move run --function-id 0x2f293ddaf809db8ac65b34bc48622d9e655e4e27c7b524c0798f1d8e0db6f3b5::TraderMoePoolV1::add_liquidity_entry \
--args u64:100000000000 u64:1000000000 u64:1 u64:1 \
--type-args 0x2f293ddaf809db8ac65b34bc48622d9e655e4e27c7b524c0798f1d8e0db6f3b5::TestCoinsV1::BTC 0x1::aptos_coin::AptosCoin
movement move run --function-id 0x2f293ddaf809db8ac65b34bc48622d9e655e4e27c7b524c0798f1d8e0db6f3b5::TraderMoePoolV1::add_liquidity_entry \
--args u64:10000000000 u64:250000000000000 u64:1 u64:1 \
--type-args 0x2f293ddaf809db8ac65b34bc48622d9e655e4e27c7b524c0798f1d8e0db6f3b5::TestCoinsV1::BTC 0x2f293ddaf809db8ac65b34bc48622d9e655e4e27c7b524c0798f1d8e0db6f3b5::TestCoinsV1::USDT
