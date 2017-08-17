# フロントエンド・コーディング・レギュレーション

## HTML

###  HTML仕様

|項目|仕様|
|:--|:--|
|HTML DOCTYPE|HTML5|
|lang属性|ja|
|文字コード|UTF-8 BOMなし|
|改行コード|LF|
|要素名 letter case|小文字|
|属性名 letter case|小文字|
|属性値指定|ダブルクオーテーション「"」を利用|
|インデント|2スペース （※1）|

※1 他にTab、4スペース

###  HTML実装方針

- HTML5要素を積極的に利用する
- 空要素を除く終了タグは省略せず必ず記述する
- 空要素の閉じ部分に「 /」を記述しない
- ファイルパス、内部リンクパス記述は原則としてルート絶対パスとする
- 実体参照文字列適用可能な文字列は実体参照を利用する
- 写真、サムネイル、挿絵などを除くUIパーツとしての画像表現は可能な限りsvg要素、またはCSSのbackground-imageによって実装する
- img要素にはalt属性を付与し簡潔な文字列か空値を設定する


### 文書基本構造 HTML5

```
<!DOCTYPE html>
<html lang="ja">
  <head>
  </head>
  <body>
  </body>
</html>
```

### head要素

#### PC

```
<head>
  <meta charset="utf-8">
  <title>[title値]</title>
  <meta name="author" content="[コピーライト]">
  <meta name="description" content="[ページ概要]">
  <meta name="keywords" content="[キーワード],[キーワード],[キーワード]・・・">
  <link rel="shortcut icon" href="/resource/icon/favicon.ico">
  <link rel="canonical" href="[正規化フルパス URL]">
  <link rel="stylesheet" href="[スタイルシートパス]">
</head>
```

#### SP

```
<head>
  <meta charset="utf-8">
  <title>[title値]</title>
  <meta name="author" content="[コピーライト]">
  <meta name="description" content="[ページ概要]">
  <meta name="keywords" content="[キーワード],[キーワード],[キーワード]・・・">
  <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no">
  <meta name="format-detection" content="telephone=no,address=no,email=no">
  <link rel="apple-touch-icon" sizes="152x152" href="/icon/Icon-76@2x.png">
  <link rel="apple-touch-icon" sizes="144x144" href="/icon/Icon-72@2x.png">
  <link rel="apple-touch-icon" sizes="120x120" href="/icon/Icon-60@2x.png">
  <link rel="apple-touch-icon" sizes="114x114" href="/icon/Icon@2x.png">
  <link rel="apple-touch-icon" sizes="76x76" href="/icon/Icon-76.png">
  <link rel="apple-touch-icon" sizes="72x72" href="/icon/Icon-72.png">
  <link rel="apple-touch-icon" sizes="60x60" href="/icon/Icon-60.png">
  <link rel="apple-touch-icon" sizes="57x57" href="/icon/Icon.png">
  <link rel="shortcut icon" href="/icon/favicon.ico">
  <link rel="canonical" href="[正規化フルパス URL]">
  <link rel="stylesheet" href="[スタイルシートパス]">
</head>
```

### body要素

```
<body>

  content here

  <script src="[JavaScriptパス]"></script>
</body>
```
　

## 命名規則

### ファイル命名規則

|種別|規則|
|:--|:--|
|CSS|`[category（省略可）]-[機能・用途（省略可）].css`  【例】`about.css`|
|JavaScript|`[category（省略可）]-[機能・用途（省略可）].js`  【例】`common.js`|
|画像|`[image prefix]-[機能・用途]-[category（省略可）]-[variation（省略可）].[拡張子]`  【例】`logo-header-small.png`|


### image prefix（画像接頭辞）

|項目|接頭辞|
|:--|:--|
|背景|bg-|
|ボタン|btn-|
|ロゴ|logo-|
|テキスト文言|text-|
|アイコン|icon-|
|スプライト|sprite-|
|写真系|img-|
|アニメーション|anim-|
|バナー|banner-|
　

## ディレクトリ構成

|項目|ディレクトリ|
|:--|:--|
|CSS|/stat/css/|
|JavaScript|/stat/js/|
|JSON|/stat/json/|
|画像|/stat/img/|
|favicon|/stat/icon/|
|pdf、xls、文書ファイル|/stat/doc/|
|動画、音声|/stat/media/|
|その他|/stat/etc/|
|||
|HTML|/[category]/|
　

## CSS

### CSSディレクトリ構成

|項目|ディレクトリ|
|:--|:--|
|その他|/stat/css/|

### CSS実装方針

- CSSは原則として外部ファイル化する
- CSSファイルはhead要素にlink用によって読み込む
- CSSによって代替可能な画像表現はなるべくCSSによって表現する
- レガシーブラウザにおいては、可能な場合に限りグレイスフル デグラデーションによる最低限のユーザビリティを提供する
- CSSハックは標準的なUXを提供する目的において最低限必要な範囲において利用する
- 写真、サムネイル、挿絵などを除くUIパーツとしての画像表現は可能な限りCSSのbackground-imageによって実装する
- CSSコードには適切なコメントを付記し各部の役割を明確にする
　

## JavaScript

### JavaScriptディレクトリ構成

|項目|ディレクトリ|
|:--|:--|
|その他|/stat/js/|

### JavaScript実装方針

- JavaScriptは原則として外部ファイル化する
- JavaScriptファイルは&lt;/body&gt;直前に読み込む
- グローバル変数はサイト全体で共有されるべき最低限の項目のみ定義する
- JavaScriptコードには適切なコメントを付記し各部の役割を明確にする
　

## 画像

### 画像ディレクトリ構成

|項目|ディレクトリ|
|:--|:--|
|スプライト|/stat/img/sprite/|
|バナー|/stat/img/banner/|
|コンテンツ固有ファイル|/stat/img/[category]/|
|その他|/stat/img/|

### 画像種別

|用途|画像タイプ|拡張子|
|:--|:--|:--|
|写真画像|JPEG|.jpg|
|GIFアニメーション|GIF|.gif|
|以上の用途に該当しないすべて|PNG24|.png|

### 画像最適化

画像ファイルには最適化ツールを適用する

> #### imagemin
> [Github - imagemin](https://github.com/imagemin/imagemin)  
> [npm - imagemin](https://www.npmjs.com/package/imagemin)


## 動作環境

### PC

#### OS

|OS|ver.|
|:--|:--|
|Windows|7以上|
|Mac OS|0S X以上|

#### browser

##### Windows

|browser|version|
|:--|:--|
|Internet Explorer|11|
|Edge|最新|
|Chrome|最新|
|Firefox|最新|
|Opera|最新|

##### Mac

|browser|version|
|:--|:--|
|Chrome|最新|
|Firefox|最新|
|Safari|最新|
|Opera|最新|


### SP

#### OS

|OS|ver.|
|:--|:--|
|iOS|9.x以上|
|Android|4.4以上|

#### browser

##### iOS

|browser|ver.|
|:--|:--|
|Mobile Safari|最新|
|Chrome|最新|

##### Android

|browser|ver.|
|:--|:--|
|ブラウザ|最新|
|Chrome|最新|
