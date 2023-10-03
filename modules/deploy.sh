#!/bin/bash

# print blue underline
stage() {
    local text="$1"
    local blue_underline="\033[4;34m"  # 4 is for underline, 34 is for blue
    local reset="\033[0m"              # Reset to default

    echo -e "${blue_underline}${text}${reset}"
}


# defaults
. .env

echo "SWAP_DEPLOYER=$SWAP_DEPLOYER" 
echo "RESOURCE_ACCOUNT_DEPLOYER=$RESOURCE_ACCOUNT_DEPLOYER"

# Publish modules
stage "Publishing uq64x64..."
movement move publish --package-dir ./uq64x64 --named-addresses uq64x64=default --assume-yes
stage "Publishing u256..."
movement move publish --package-dir ./u256 --named-addresses u256=default --assume-yes
stage "Publishing TestCoin..."
movement move publish --package-dir ./TestCoin --named-addresses SwapDeployer=default --assume-yes
stage "Publishing LPResourceAccount"
movement move publish --package-dir ./LPResourceAccount --named-addresses SwapDeployer=default --assume-yes

# Create resource account & publish LPCoin
# Note: Use swap::test_resource_account to get the ResourceAccountDeployer address
stage "Compiling LPCoin..."
movement move compile --package-dir ./LPCoin --named-addresses ResourceAccountDeployer=0x$RESOURCE_ACCOUNT_DEPLOYER --save-metadata

stage "Publishing LPCoin contract..."
# Get the first arg
METADATA=$(hexdump -ve '1/1 "%02x"' ./LPCoin/build/LPCoin/package-metadata.bcs)
# Get the second arg
COIN_CODE=$(hexdump -ve '1/1 "%02x"' ./LPCoin/build/LPCoin/bytecode_modules/LPCoinV1.mv)
# This command is to publish LPCoin contract, using ResourceAccountDeployer address.
# Note: replace two args with the above two hex
movement move run --function-id "0x${SWAP_DEPLOYER}::LPResourceAccount::initialize_lp_account" \
--args hex:$METADATA hex:$COIN_CODE --assume-yes

stage "Publishing Swap..."
movement move publish --package-dir ./Swap --named-addresses SwapDeployer=default,ResourceAccountDeployer=0x$RESOURCE_ACCOUNT_DEPLOYER,u256=default,uq64x64=default --assume-yes

# Initialize and mint test coins (USDT & BTC)
stage "Initializing TestCoin..."
movement move run --function-id 0x$SWAP_DEPLOYER::TestCoinsV1::initialize --assume-yes

stage "Minting TestCoin-USDT..."
movement move run --function-id 0x$SWAP_DEPLOYER::TestCoinsV1::mint_coin \
--args address:0x$SWAP_DEPLOYER u64:20000000000000000 \
--type-args 0x$SWAP_DEPLOYER::TestCoinsV1::USDT --assume-yes
stage "Minting TestCoint-BTC..."
movement move run --function-id 0x$SWAP_DEPLOYER::TestCoinsV1::mint_coin \
--args address:0x$SWAP_DEPLOYER u64:2000000000000 \
--type-args 0x$SWAP_DEPLOYER::TestCoinsV1::BTC --assume-yes

# MOE Coin
stage "Publishing MoeCoin..."
movement move publish --package-dir ./moe_coin --named-addresses MoeCoin=default --assume-yes

# Create initial pools (USDT/MVMT, BTC/MVMT, BTC/USDT)
stage "Adding USDT/MVMT..."
movement move run --function-id 0x$SWAP_DEPLOYER::TraderMoePoolV1::add_liquidity_entry \
--args u64:1000000000000 u64:1000000000 u64:1 u64:1 \
--type-args 0x$SWAP_DEPLOYER::TestCoinsV1::USDT 0x1::aptos_coin::AptosCoin --assume-yes

stage "Adding BTC/MVMT..."
movement move run --function-id 0x$SWAP_DEPLOYER::TraderMoePoolV1::add_liquidity_entry \
--args u64:100000000000 u64:1000000000 u64:1 u64:1 \
--type-args 0x$SWAP_DEPLOYER::TestCoinsV1::BTC 0x1::aptos_coin::AptosCoin --assume-yes

stage "Adding BTC/USDT..."
movement move run --function-id 0x$SWAP_DEPLOYER::TraderMoePoolV1::add_liquidity_entry \
--args u64:10000000000 u64:250000000000000 u64:1 u64:1 \
--type-args 0x$SWAP_DEPLOYER::TestCoinsV1::BTC 0x$SWAP_DEPLOYER::TestCoinsV1::USDT --assume-yes