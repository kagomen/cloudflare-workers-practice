- Workers における SECRET の利用方法

1. SECRET を登録する

   1. コマンドで登録する

   ```
   wrangler secret put API_KEY
   ```

   2. wrangler.toml に登録する

   ```
   [vars]
   API_KEY = "XXXXXXXXXXXX"
   ```

2. fetch 関数の第 2 引数から渡される env から参照する

```
{env.API_KEY}
```
