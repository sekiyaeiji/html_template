#フロントエンド・コーディング・レギュレーション 【PC】

##HTML

###HTML仕様

|項目|仕様|
|:--|:--|
|HTML DOCTYPE|HTML5|
|lang属性|ja|
|文字コード|UTF-8 BOMなし|
|改行コード|LF|
|要素名 letter case|小文字|
|属性名 letter case|小文字|
|属性値 入力箇所|ダブルクオーテーション|
|インデント|4スペース （※1）|
|インクルード|phpインクルード|
※1 他にTab、2スペース

###HTML実装方針

- HTML5要素を積極的に利用する

- 空要素を除く終了タグは省略せず必ず記述する

- 空要素の閉じ部分に「 /」を記述しない

- ファイルパス、内部リンクパス記述は原則としてルート絶対パスとする

- 実体参照文字列適用可能な文字列は実体参照を利用する

- 写真、サムネイル、挿絵などを除くUIパーツとしての画像表現は可能な限りCSSのbackground-imageによって実装する

- img要素にはalt属性を付与し簡潔な文字列か空値を設定する

- img要素にはwidth、heightを付与せず、サイズ定義はCSSによって行う


###文書基本構造 HTML5

```
<!DOCTYPE html>
<html lang="ja">
  <head>
  </head>
  <body>
  </body>
</html>
```

###head要素

```
<head>
  <meta charset="utf-8">
  <title>[title値]</title>
  <meta name="author" content="[コピーライト]">
  <meta name="description" content="[ページ概要]">
  <meta name="keywords" content="[キーワード],[キーワード],[キーワード]・・・">
  <link rel="shortcut icon" href="/resource/icon/favicon.ico">
  <link rel="canonical" href="[正規化フルパス URL]">
  <!--css-->
  <link rel="stylesheet" href="[スタイルシートパス]">
  <!--/css-->
</head>
```


###body要素

```
<body>

  content here

  <!--JavaScript-->
  <script src="[JavaScriptパス]"></script>
  <script>
  /*[ローカル JavaScript]*/
  </script>
  <!--/JavaScript-->
</body>
```
　

##命名規則

###ファイル命名規則

|種別|規則|
|:--|:--|
|CSS|[project class].[category]_[機能・用途（省略可）].css|
||【例】 project_name.About_imageSlide.css|
|JavaScript|[project class].[category]_[機能・用途（省略可）].js|
||【例】 project_name.About_imageSlide.js|
|画像|[image prefix]_[機能・用途]_[category（省略可）]_[variation（省略可）].[拡張子]|
||【例】 logo_header_small.png|


###image prefix（画像接頭辞）

|項目|接頭辞|
|:--|:--|
|背景|bg_|
|ボタン|btn_|
|ロゴ|logo_|
|テキスト文言|text_|
|アイコン|icon_|
|スプライト|sprite_|
|写真系|img_|
|アニメーション|anim_|
|バナー|banner_|
　

##ディレクトリ構成

|項目|ディレクトリ|
|:--|:--|
|CSS|/resource/css/|
|JavaScript|/resource/js/|
|JSON|/resource/json/|
|画像|/resource/img/|
|favicon|/resource/icon/|
|pdf、xls、文書ファイル|/resource/doc/|
|動画、音声|/resource/media/|
|その他|/resource/etc/|
|||
|HTML|/[コンテンツカテゴリディレクトリ]/|
　

##CSS

###CSSディレクトリ構成

|項目|ディレクトリ|
|:--|:--|
|reset、共通アウトライン定義、helper|/resource/css/base/|
|スプライト、ボタン、フォーム系など共通構造定義|/resource/css/parts/|
|コンテンツ固有モジュール定義|/resource/css/module/|
|動的定義|/resource/css/state/|
|外部ライブラリ、プラグイン固有定義|/resource/css/lib/|
|テーマ、スキン定義|/resource/css/theme/|
|その他|/resource/css/etc/|

###CSS実装方針

- CSSは原則として外部ファイル化する

- CSSファイルはhead要素の<!--css--><!--/css-->内にlink用によって読み込む

- CSS3を積極的に利用する

- CSSによって代替可能な画像表現はなるべくCSSによって表現する

- CSS3非対応ブラウザにおいてはプログレッシブ・エンハンスメントによる標準的なUXを提供する

- CSSハックは標準的なUXを提供する目的において最低限必要な範囲において利用する

- 写真、サムネイル、挿絵などを除くUIパーツとしての画像表現は可能な限りCSSのbackground-imageによって実装する

- img要素のサイズはCSSによって定義する

- CSSコードには適切なコメントを付記し各部の役割を明確にする
　

##JavaScript

###JavaScriptディレクトリ構成

|項目|ディレクトリ|
|:--|:--|
|外部ライブラリ、プラグイン|/resource/js/lib/|
|サイト共通汎用model、utility系|/resource/js/base/|
|api、event、templateなどサイト共通パーツ系|/resource/js/conf/|
|コンテンツ固有モジュール別単体ファイル|/resource/js/module/|
|その他|/resource/js/etc/|

###JavaScript実装方針

- JavaScriptは原則として外部ファイル化する

- JavaScriptファイルは</body>直前の<!--JS--><!--/JS-->内に読み込む

- グローバル変数はサイト全体で共有されるべき最低限の項目のみ定義する

- グローバル変数以外の全ての要素は即時実行関数など包含することを原則とする

- JavaScriptコードには適切なコメントを付記し各部の役割を明確にする
　

##画像

###画像ディレクトリ構成

|項目|ディレクトリ|
|:--|:--|
|スプライト|/resource/img/sprite/|
|バナー|/resource/img/banner/|
|コンテンツ固有モジュール別単体ファイル|/resource/img/module/[コンテンツカテゴリディレクトリ]|
|その他|/resource/img/|

###画像種別

|用途|画像タイプ|拡張子|
|:--|:--|:--|
|写真画像|JPEG|.jpg|
|アニメーション|GIF|.gif|
|以上の用途に該当しないすべて|PNG24|.png|

###画像最適化

画像ファイルには減色ツール、適正化ツールを適用する

####減色

『ImageAlpha — image minifier (like JPEG with transparency!)』
http://pngmini.com/

『ImageAlpha — image minifier (like JPEG with transparency!)』
http://pngmini.com/

####適正化

『ImageOptim — better Save For Web』
http://imageoptim.com/
　

##動作環境

###OS

|OS|ver.|
|:--|:--|
|Windows|Vista以上|
|Mac OS|0S X以上|

###Windows

|browser|ver.|
|:--|:--|
|Internet Explorer|8以上|
|Chrome|最新ver.|
|Firefox|最新ver.|
|Opera|最新ver.|

###Mac

|browser|ver.|
|:--|:--|
|Chrome|最新ver.|
|Firefox|最新ver.|
|Safari|最新ver.|
|Opera|最新ver.|

　
　
　
　
　
　
　
　
　
　
　
　
　
　
　
　
　
　
　
　
　
