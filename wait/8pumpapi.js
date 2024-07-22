import { VersionedTransaction } from "@solana/web3.js";
import base58 from "bs58";
import { sign } from "crypto";
import "dotenv/config";

// curl -X POST \
//   https://pumpapi.fun/api/trade_transaction \
//   -H "Content-Type: application/json" \
//   -d '{ "trade_type": "buy", "mint": "DVbNTGFdvCq8WoLoBEkha53w86fzmD6h1ubQn195pump", "amount": 0.01, "slippage": 5, "priorityFee": 1000, "userPublicKey": "HR9qkHSB52Fsm1y9VXUttjs2qkRJ5pGQvz6oSYikFu6T"}'


// curl -X POST \
//   https://pumpapi.fun/api/trade_transaction \
//   -H "Content-Type: application/json" \
//   -d '{ "trade_type": "sell", "mint": "DVbNTGFdvCq8WoLoBEkha53w86fzmD6h1ubQn195pump", "amount": 100, "slippage": 5, "priorityFee": 0, "userPublicKey": "7WmRN3hUYg7gwVw7fw9Q9DCsX2fLM88UsnUsiC6rdFTJ"}'

/*
trade_type: buy | sell 交易类型
mint: 交易合约地址
amount: 交易数量
slippage:  滑点百分点
priorityFee: 优先费，单位lamports,用于优先打包
userPublicKey: 用户公钥
*/

// @degenfrends/solana-pumpfun-trader 第三方包, 获取coin 的时候可以在后端取数据
// https://github.com/degenfrends/solana-pumpfun-trader/blob/main/src/index.ts

const transaction = VersionedTransaction.deserialize(base58.decode("ARVh4McKbWvyecj3BgNFFfbHqAmwt2ugv7d2tDdNcZv7rdorhNoCWHY1sGoeTP9NbPzqEZsdkAu3kuewxE1MuEeHEkX3bGFYtyC569xjy7aJuyZrTu7AnkBhrHoSgDSDJbiohmjrn77VaLPaEdLtuw3vhCJonqYnMnZhM4GXUdEY7NGwxNuMX537XwdkD6QnHy7yon2jWnsFiQEKuHxmDA2tD6eMHgv7wmKAMvLzb1LpmagKay2kDjxf1QQVhNKrx9gnJtmueMgJd8CnnNT6F1pJFYRHcdKNXqnaLWFbeDRyVBn63fs9sT8YxYfefMPPNuJhYCwhHDJY6NM21Q3f1y8q9GhjhEC2wfAs7NPh5m6Vf2Sth36WQDacXNH7FcEzLkSKbAu57k2C2Ndm6Xb4EoGcZU5dQXqtK1KeciizhrirVftYX1qqJX6Kf1ggR1kKxSgYq5rUZVubWYRfDJzkHafETLDWATLSmS7CczfSYz9jDTFC84NPUbL5ZH5HmH2Au1b94oSYPRq97vQ5DpzxMTfJ3778xKsr4Gsxh7wwgyx6kCTKW8XwJUuBriJhXrPCxgYqzVvXe3LELcBu6hpjSroBR99uRsJvWsbiJFYAh2sTeNRg9F1ZvX5qGk8QmhbtDXvk3cNXovWYRsVfqE8bhAdbMvF2xb7aGiWTfVwtfAHw22V4jCyWFqhG2RNZWFq8qMrozZ61TGrLygakLN4fUzjxJfdqay7qup656P"));
console.log(transaction);

console.log(transaction.message.compiledInstructions)

