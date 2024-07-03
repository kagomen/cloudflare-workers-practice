# Workers

- Workers における SECRET の利用方法

  1.  SECRET を登録する

      1. コマンドで登録する

      ```
      wrangler secret put API_KEY
      ```

      2. ~~wrangler.toml に登録する~~ 【追記】だめ : https://github.com/cloudflare/wrangler-legacy/issues/209#issuecomment-541654484

      ```
      [vars]
      API_KEY = "XXXXXXXXXXXX"
      ```

          	- 代わりに`.dev.vars`で管理する（ローカル）

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

# Hono

- `c`とは？

  > リクエストを処理する際に利用されるコンテキストオブジェクトを表します。このコンテキストオブジェクトには、以下のような機能やデータが含まれることがあります：

  > - 環境変数 (c.env):
  >   - c.env は、アプリケーションの実行環境に関する情報を含むオブジェクトです。例えば、API キー、設定値、または他の外部システムへの接続情報などが含まれることがあります。
  > - レスポンス生成メソッド (c.json, c.html, c.text など):
  >   - c オブジェクトは、レスポンスを生成するための便利なメソッドを提供します。例えば、JSON データを返す場合には c.json()、HTML を返す場合には c.html()、テキストを返す場合には c.text() などがあります。これらのメソッドは、適切な HTTP レスポンスを生成して返すために使用されます。
  > - その他の機能やデータ:
  >   - Hono フレームワークによって提供される他の機能やデータも、c コンテキストを通じて利用可能です。これには、セキュリティ機能、セッション管理、ログ記録、カスタムミドルウェアの実装などが含まれる場合があります。

# Turnstile

- https://zenn.dev/kameoncloud/articles/cdf8f67bd8ce6f
- https://wp-kyoto.net/create-turnstile-demo-application-using-hono-and-honojsx/
- https://qiita.com/khayama/items/524c2b11087a974f46e6
