# Install Sui CLI
install-sui-cli:
    # Follow the Sui installation instructions
    # Example command for macOS using Homebrew
    brew install mystenlabs/tap/sui


install-sui-client-gen:
    cargo install --locked --git https://github.com/kunalabs-io/sui-client-gen.git



# Set up Testnet Environment
setup-testnet-env:
    sui client new-env --alias testnet --rpc https://fullnode.testnet.sui.io:443
    sui client switch --env testnet

# Create New Address
create-new-address:
    # sui client new-address secp256k1
    sui client new-address ed25519


# Switch Active Address
switch-active-address ADDRESS:
    sui client switch --address {{ADDRESS}}

# Request Sui from Faucet
request-sui ADDRESS:
    curl --location --request POST 'https://faucet.testnet.sui.io/gas' \
    --header 'Content-Type: application/json' \
    --data-raw '{ "FixedAmountRequest": { "recipient": "{{ADDRESS}}" } }'

publish-move PKG="grant_compiler":
    cd contracts/{{PKG}} && sui client publish --gas-budget 100000000

publish-counter:
    cd move/counter && sui client publish --gas-budget 100000000

# Install Dependencies
install-dependencies:
    bun install

# Start dApp in Development Mode
dev:
    bun run dev

# Build dApp for Deployment
build:
    bun run build