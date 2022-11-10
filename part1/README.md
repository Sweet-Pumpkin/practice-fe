# Practice FE

> 30개 프로젝트로 배우는 프론트엔드 with React<br />
> 2022.11.10 ~

## INDEX

### [Part1. basic](#part1-basic)

#### [ch1. 가상키보드](#ch1-가상키보드)

##### [1. webpack 개발환경 설정](#1-webpack-개발환경-설정)

##### [2. eslint & prettier](#2-eslint--prettier-1)

#### [ch2. 이미지 슬라이드](#ch2-이미지-슬라이드)

#### [ch3. date picker](#ch3-date-picker)

#### [ch4. 계산기](#ch4-계산기)

#### [ch5. bmi 계산기](#ch5-bmi-계산기)

#### [ch6. 이미지 계산기](#ch6-이미지-계산기)

---

## Part1. basic

### ch1. 가상키보드

#### 1. webpack 개발환경 설정

- package.json 생성

```
// Terminal
$ npm init -y
```

- webpack 설치

```
// Terminal
$ npm i -D webpack webpack-cli webpack-dev-server
```

devDependencies : 로컬 개발 환경이나 테스트 환경에서 필요한 패키지 설치. `-D`.
Dependencies : 프로덕션 환경에서 필요한 패키지 설치.

- 기본 webpack 압축 프로그램 외 추가적인 압축프로그램 설치

```
// Terminal
$ npm i -D terser-webpack-plugin
```

- webpack.config.js 생성

```
// webpack.config.js
const path = require("path");
const TerserWebpackPlugin = require("terser-webpack-plugin");

module.exports = {
    entry: "./src/js/index.js", // 자바스크립트 파일의 진입점 설정
    output: { // 빌드 시 번들 속성
        filename: "bundle.js",
        path: path.resolve(__dirname, "./dist"), // 상대 경로 X, 절대 경로로 설정
        clean: true
    },

    devtool: "source-map", // 빌드 파일과 원본 파일을 서로 연결
    mode: "development",
    optimization: {
        minimizer: [
            new TerserWebpackPlugin()
        ]
    }
}
```

- webpack 실행

```
// Terminal
$ npx webpack
```

- HTML & CSS 관련 모듈 설치

```
// Terminal
$ npm i -D html-webpack-plugin
$ npm i -D mini-css-extract-plugin css-loader css-minimizer-webpack-plugin
```

```
// webpack.config.js
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {

    ~~~~~

    plugins: [
        new HTMLWebpackPlugin({
            title: "keybord",
            template: "./index.html",
            inject: "body",
            favicon: "./favicon.png"
        }),

        new MiniCssExtractPlugin({
            filename: "style.css"
        })
    ],

    module: { // css 읽는 방법 설정
        rules: [
            {
                test: /\.css$/,
                use: [ MiniCssExtractPlugin.loader, "css-loader" ]
            }
        ]
    },

    devtool: "source-map", // 빌드 파일과 원본 파일을 서로 연결
    mode: "development",
    optimization: {
        minimizer: [
            new TerserWebpackPlugin(),
            new CssMinimizerPlugin()
        ]
    }
}
```

```
// index.html
<!DOCTYPE html>
<html>
    <head>
        <title>
            <% htmlWebpackPlugin.options.title %>
        </title>
    </head>
    <body>

    </body>
</html>
```

```
// package.js

~~~~~

"scripts": {
    "build": "webpack"
},

~~~~~

```

- 적용 확인

```
$ npm run build
```

- production mode
  공백, 줄바꿈 등을 없애고 빌드해주는 모드

```
// package.js

~~~~~

"scripts": {
    "build": "webpack --mode=production"
},

~~~~~

```

- webpack dev server

```
// webpack.config.js
    devServer: {
        host: "localhost",
        port: 8080,
        open: true,
        watchFiles: "index.html"
    }
```

```
// package.js

~~~~~

  "scripts": {
    "build": "webpack --mode=production",
    "dev": "webpack-dev-server"
  },

~~~~~

```

#### 2. eslint & prettier

- eslint 설치

```
$ npm i -D eslint
```

- prettier 설치

```
$ npm i --save-dev --save-exact prettier
$ npm i -D eslint-config-prettier eslint-plugin-prettier

```

`--save-dev`: `-D`.
`--save-exact`: `^` 표시를 제거.
`^`: 마이너 버전에 대한 업데이트를 허용한다는 표시.

- eslint 설정

```
npx eslint --init
```

- .eslintrc.json에 plugin 추가

```
// .eslintrc.json

    ~~~~~

    "extends": [
        "eslint:recommended",
        "plugin:prettier/recommend"
    ],

    ~~~~~

    "rules": {
        "prettier/prettier": "error"
    }

```

"eslint-recommended" 부분에 "eslint-google" 등으로 바꿔도 됨

- .eslintignore 생성

```
// .eslintignore
/node_modules
/dist
webpack.config.js
```

- .prettierrc.json 생성
  [prettier playgrond](https://prettier.io/playground/)에서 Copy config JSON 붙여넣기

- .prettierignore 생성

```
// .eslintignore
/node_modules
/dist
webpack.config.js
```

- .vscode settings.json 내용 추가
  `command` + `shift` + `p` => Preferences: Open Workspace Settings(JSON)
  ```
    // settings.json
    {
    "editor.formatOnSave": true,
    "editor.codeActionOnSave": {
        "source.fixAll.eslint": true
    }
  }
  ```
  저장할 때 vscode에서 eslint & prettier 문법으로 fix 설정

### ch2. 이미지 슬라이드

### ch3. date picker

### ch4. 계산기

### ch5. bmi 계산기

### ch6. 이미지 계산기
