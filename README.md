# README

## KAIDAN
<http://18.180.120.29>

![GitHub top language](https://img.shields.io/github/languages/top/iemoto/kaidan-rails)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/iemoto/kaidan-rails)
![GitHub closed pull requests](https://img.shields.io/github/issues-pr-closed-raw/iemoto/kaidan-rails)
![GitHub contributors](https://img.shields.io/github/contributors/iemoto/kaidan-rails)

## このアプリについて
このアプリは、三種類の計算方法に対応した減価償却費の計算シミュレートを行うことができるサイトです。
![KAIDAN](/materials/toppage.png)
![KAIDAN](/materials/toppage.gif)

### 実装した機能
・jqueryで完結した三種類の計算方法に対応
  定額法（簿価1円まで償却）
  200％定率法（簿価1円まで償却）
  均等償却（簿価0円まで償却、無形固定資産や繰延資産に対応）

### 開発環境
・mac OS 10.15.3 catalina
・主な言語: Ruby(2.5.1), Rails(5.2.3) , jquery , slim, scss
・エディター: VSCode
・ブラウザ: chrome

## 改善予定
### 機能、見た目
・シンプル構造のＵＩ
・ロゴ、タイトルのオリジナルの追及
・可読性を上げるためできる限り２回以上重複する内容は関数化

## USAGE

```
$ git clone https://github.com/iemoto/kaidan-rails.git
```

## DB設計
### ratesテーブル

|Column|Type|Options|
|------|----|-------|
|fixed_rate|string||
|guarantee_rate|float(24)||
|revised_depreciation_rate|float(24)||
|straight_line|float(24)||
|password|float(24)||
