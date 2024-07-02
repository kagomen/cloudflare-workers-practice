- Workers における SECRET の利用方法

  1.  SECRET を登録する

      1. コマンドで登録する

      ```
      wrangler secret put API_KEY
      ```

      2. wrangler.toml に登録する

      ```
      [vars]
      API_KEY = "XXXXXXXXXXXX"
      ```

  2.  `env.API_KEY`として参照する

- KV の使い方

  1.  KV に namespace を作成する
  2.  wrangler.toml に以下のように登録する

  ```
  [[kv_namespaces]]
  binding = "KV_COUNT"
  id = "XXXXXXXXXXXX"
  ```

  3. `env.KV_COUNT`として参照する

- 参考
  - https://reffect.co.jp/html/cloudflare-workers
