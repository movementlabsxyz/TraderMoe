module MoeCoin::moe_coin {
    struct MoeCoin {}

    fun init_module(sender: &signer) {
        aptos_framework::managed_coin::initialize<MoeCoin>(
            sender,
            b"Moe Coin",
            b"MOE",
            6,
            false,
        );
    }
}
