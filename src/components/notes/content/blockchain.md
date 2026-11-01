## Smart Contracts and Ethereum

- **Smart Contracts:** user defined programs running on top of a decentralized blockchain network. Preferably use solidity (https://soliditylang.org/)
- **Ethereum Testnet:** a production like env to test the code before deploying it to MainNet https://ethereum.org/developers/docs/networks/
- **Gas Fee:** bill you need to pay for the computation (on the EVM) used by these transactions (more complicated transactions consume more gas). Do mention the gas limit (maximum amount of gas you're willing to use)

::viz gas-fee

- **Contract programming model:** contract class, contract object, storage fields, functions/methods, access control (`require()` to check if a domain with that name exists), composition
- In solidity, `private` only stops other contracts from reading a field; the data is still stored on-chain and anyone can read it, so never keep secrets there
- **Decentralized Finance:** https://rdi.berkeley.edu/berkeley-defi/f25
- **Tokens:** contracts that function as digital assets
  - **Fungible:** can be interchangeable
- **Central limit order book (CLOB):** https://coinmarketcap.com/academy/glossary/central-limit-order-books-clobs
  - The fee is generally in terms of the tokens (a percentage of the transaction)
- **Smart Contracts resources**
  - https://speedrunethereum.com/
  - https://ethereum.org/
  - Eth.build
  - Scaffold-eth2
  - ERC-8004
