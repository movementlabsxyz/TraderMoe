script {
    fun register(account: &signer) {
        aptos_framework::managed_coin::register<MoeCoin::moe_coin::MoeCoin>(account)
    }
}
