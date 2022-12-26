# Practice FE

> 30개 프로젝트로 배우는 프론트엔드 with React<br />
> 2022.11.10 ~

## INDEX

### [Part1. basic](#part1-basic)

#### [ch1. 가상키보드](#ch1-가상키보드)

##### [1. webpack 개발환경 설정](#1-webpack-개발환경-설정)

##### [2. eslint & prettier](#2-eslint--prettier-1)

##### [3. 다크테마 설정](#3-다크테마-설정)

##### [4. 폰트 설정](#4-폰트-변경)

##### [5. 키보드 이벤트](#5-키보드-이벤트)

#### [ch2. 이미지 슬라이드](#ch2-이미지-슬라이드)

##### [1. webpack 개발환경 설정](#1-webpack-개발환경-설정--이미지-설정)

##### [2. next & prev 버튼 설정](#2-next--prev-버튼-설정)

##### [3. 인디케이터 개발](#3-인디케이터-개발)

##### [4. Autoplay 개발](#4-autoplay-개발)

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
        <link rel="icon" href="<%= htmlWebpackPlugin.files.favicon %>">
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

#### 3. 다크테마 설정

- index.html

```
<html theme=""></html>
```

- style.css

```
html[theme="dark-mode"] {
    filter: invert(100%) hue-rotate(180deg);
}
```

- keyborad.js

```
export class Keyboard {

    // 선언
    #swithEl;

    // 실행
    constructor() {
        this.#assignElement();
        this.#addEvent();
    }

    // 탐색
    #assignElement() {
        this.#swithEl = document.getElementById("switch");
    }

    // 이벤트
    #addEvent() {
        this.#swithEl.addEventListener("change", e => {
            document.documentElement.setAttribute(
                "theme",
                e.target.checked ? "dark-mode" : ""
            )
            console.log(e.target.checked);
        });
    }
}
```

#### 4. 폰트 변경

```
export class Keyboard {
    // 선언
    #fontSelectEl;

    // 실행
    constructor() {
        this.#assignElement();
        this.#addEvent();
    }

    #assignElement() {
        this.#fontSelectEl = document.getElementById("font");
    }

    #addEvent() {
        this.#fontSelectEl.addEventListener("change", e => {
            document.body.style.fontFamily = e.target.value;
        })
    }

}
```

#### 5. 키보드 이벤트

- keyboard.js

```
export class Keyboard {
    // 선언
    #keyboardEl; // 키보드
    #inputGroupEl; // 한글 불가 메세지 출력
    #inputEl // 한글 입력 불가

    // 실행
    constructor() {
        this.#assignElement();
        this.#addEvent();
    }

    // 탐색
    #assignElement() {
        this.#keyboardEl = this.#containerEl.querySelector("#keyboard");
        this.#inputGroupEl = this.#containerEl.querySelector("#input-group");
        this.#inputEl = this.#inputGroupEl.querySelector("#input");
    }

    // 이벤트 설정
    #addEvent() {
        // 키보드 입력 모션 이벤트
        document.addEventListener("keydown", this.#onKeyDown.bind(this));
        document.addEventListener("keyup", this.#onKeyUp.bind(this));
        // 한글 입력 불가 이벤트
        this.#inputEl.addEventListener("input", this.#onInput);
    }

    // 키보드 모션 이벤트
    #onKeyDown(e) {
        // 한글 입력 불가 경고 메세지 출력
        this.#inputGroupEl.classList.toggle("error", /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(e.key));
        // 키다운 모션
        // ? => optional chaining
        this.#keyboardEl.querySelector(`[data-code=${e.code}]`)?.classList.add("active");
    }
    #onKeyUp(e) {
        this.#keyboardEl.querySelector(`[data-code=${e.code}]`)?.classList.remove("active");
    }

    // 한글 입력 불가 이벤트
    #onInput(e) {
        e.target.value = e.target.value.replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/, "");
    }
```

#### 6. 마우스 이벤트

- keyboard.js

```
export class Keyboard {
    // 선언
    #keyboardEl; // 키보드
    #inputGroupEl; // 한글 불가 메세지 출력
    #inputEl; // 메세지 출력 (한글 출력 불가)

    //// 마우스 입력 시 키보드 사용 불가 기능
    #keyPress = false;
    #mouseDown = false;

    // 실행
    constructor() {
        this.#assignElement();
        this.#addEvent();
    }

    // 탐색
    #assginElement() {
        this.#keyboardEl = this.#containerEl.querySelector("#keyboard");
        this.#inputGroupEl = this.#containerEl.querySelector("#input-group");
        this.#inputEl = this.#inputGroupEl.querySelector("#input");
    }

    // 마우스 이벤트
    this.#keyboardEl.addEventListener("mousedown", this.#onMouseDown.bind(this));
    document.addEventListener("mouseup", this.#onMouseUp.bind(this));

    // 마우스 이벤트
    #onMouseDown(e) {
        // 키보드 사용 시 마우스 사용 불가 기능
        if (this.#keyPress) return;
        this.#mouseDown = true;

        //// closest => 일치하는 요소 중 가장 가까운 요소 찾기
        e.target.closest("div.key")?.classList.add("active");
    }
    #onMouseUp(e) {
        // 키보드 사용 시 마우스 사용 불가 기능
        if (this.#keyPress) return;
        this.#mouseDown = false;

        // 키 엘리먼트
        const keyEl = e.target.closest("div.key");
        // 키 엘리먼트 중 active 활성화 유무
        //// undefined => !undefined = true => !!undefined = false
        //// contains => 특정 값 유무에 따라 불린 값을 넘겨준다.
        //// false가 아닌 undefined를 넘겨줄 수 있으므로 => !!
        const isActive = !!keyEl?.classList.contains("active");
        // 키 엘리먼트에 data-val 값
        const val = keyEl?.dataset.val;

        // 일반 키 입력 조건문
        if (isActive && !!val && val !== "Space" && val !== "Backspace") {
            this.#inputEl.value += val;
        }
        // 스페이스 키 조건문
        if (isActive && val === "Space") {
            this.#inputEl.value += " ";
        }
        // 백스페이스
        if (isActive && val === "Backspace") {
            this.#inputEl.value = this.#inputEl.value.slice(0, -1);
        }

        // 키업 모션
        this.#keyboardEl.querySelector(".active")?.classList.remove("active");
    }
}
```

### ch2. 이미지 슬라이드

#### 1. webpack 개발환경 설정 & 이미지 설정

1. webpack boilerplate 다운로드

1) `https://github.com/Billy-FE/webpack-boilerplate` 주소에서 `git clone`
2) `npm i`

2. font awesome 사용법

1) `npm i --save @fortawesome/fontawesome-free`
2) css file에 경로 추가하기

```
// style.css
@import url(~@fortawesome/fontawesome-free/css/all.min.css);
```

3. HTML 이미지 설정

1) webpack.config.js 설정

```
module: {
    rules: [
      {
        // HTML 이미지 파일 설정
        test: /\.jpeg$/,
        type: 'assets/inline', // webpack의 내장된 loader로 jpeg 이미지 파일을 읽겠다는 설정
      }
    ],
},
```

2. HTML 설정

```
<img src="<%= require('./src/image/red.jpeg') %>" alt="red" />
```

#### 2. next & prev 버튼 설정

1. 슬라이더 갯수 & 가로 길이 계산 or 초기화

```
// imageSlider.js
/** 슬라이더 갯수 계산 */
initSliderNumber() {
    this.#sliderNumber = this.sliderListEl.querySelectorAll('li').length;
}

/** 슬라이더 가로 길이 계산 */
initSliderWidth() {
    this.#sliderWidth = this.sliderListEl.clientWidth;
}
```

2. css 값 동적으로 변경

1) style.css => `.slider-wrap ul.slider` => width : 100%

2)

```
imageSlider.js
/** 슬라이더 리스트 가로 길이 동적 할당 */
initSliderListWidth() {
    this.sliderListEl.style.width = `${this.#sliderNumber * this.#sliderWidth}px`;
}
```

3. next & prev btn 이벤트 추가

```
/** 이벤트 실행 */
addEvent() {
    this.nextBtnEl.addEventListener('click', this.moveToRigth.bind(this));
    this.previousBtnEl.addEventListener('click', this.moveToLeft.bind(this));
}

/** 슬라이드를 오른쪽으로 움직이게 하는 함수 */
moveToRigth() {
    this.#currentPosition++;

    /** 경계값 설정 */
    if (this.#currentPosition === this.#sliderNumber) {
        this.#currentPosition = 0;
    }

    this.sliderListEl.style.left = `-${this.#sliderWidth * this.#currentPosition}px`;
}

/** 슬라이드를 왼쪽으로 움직이게 하는 함수 */
moveToLeft() {
    this.#currentPosition--;

    /** 경계값 설정 */
    if (this.#currentPosition === -1) {
        this.#currentPosition = this.#sliderNumber - 1;
    }

    this.sliderListEl.style.left = `-${this.#sliderWidth * this.#currentPosition}px`;
}
```

#### 3. 인디케이터 개발

1. 동적 인디케이터 함수 설정

```
// imageSlider.js
/** 선언 */
sliderWrapEl;
indicaterWrapEl;

/** 탐색 */
assignment() {
    this.silderWrapEl = document.querySelector('slider-wrap);
    this.indicaterWrapEl = this.sliderWrapEl.querySelector('indicator-wrap');
}

/** 인디케이터 갯수 동적 할당 */
createIndicator() {
    const docFragment = document.createDocumentFragment();

    for (let i = 0; i < this.#sliderNumber; i++) {
        const li = document.createElement('li');
        li.dataset.index = i;
        docFragment.appendChild(li);
    }

    this.indicaterWrapEl.querySelector('ul').appendChild(docFragment);
}
```

2.  인디케이터 활성화 시키기

```
// imageSlider.js
/** 인디케이터 활성화 */

// 최소 실행시 인디케이터 활성화
constructor() {
    this.setIndicator();
}

// 버튼 클릭 시 인디케이터 활성화
moveToLeft() {
    // ~~~~~
    this.setIndicator();
}

moveToRight() {
    // ~~~~~
    this.setIndicator();
}

setIndicator() {
    // index 비활성화 => index에 따라서 활성화
    this.indicaterWrapEl.querySelector('li.active')?.classList.remove('active');
    this.indicaterWrapEl.querySelector(`ul li:nth-child(${this.#currentPosition + 1})`).classList.add('active');
}
```

3. 인디케이터 클릭 이벤트

```
// imageSlider.js
/** 인디케이터 클릭 이벤트 */
onClickIndicator(e) {
    // 정수형으로 변환
    const indexPosition = parseInt(e.target.dataset.index, 10);

    // 정수형이 아닐 경우 실행 x
    if (Number.isInteger(indexPosition)) {
        this.#currentPosition = indexPosition;
        this.sliderListEl.style.left = `-${this.#sliderWidth * this.#currentPosition}px`;
        this.setIndicator();
    }
}
```

#### 4. Autoplay 개발

```
// imageSlider.js
/** autoplay */
initAutoplay() {
    this.#intervalId = setInterval(this.moveToRigth.bind(this), 3000);
}

moveToRight() {
    / ~~~~~ /

    // autoplay 상태가 play인 경우 실행
    if (this.#autoplay) {
        // slider 동작 시 autoplay 중단
        clearInterval(this.#intervalId);
        // slider 동작 후 autoplay 실행
        this.#intervalId = setInterval(this.moveToRigth.bind(this), 3000);
    }

}

moveToLeft() {
    / ~~~~~ /

    // autoplay 상태가 play인 경우 실행
    if (this.#autoplay) {
        // slider 동작 시 autoplay 중단
        clearInterval(this.#intervalId);
        // slider 동작 후 autoplay 실행
        this.#intervalId = setInterval(this.moveToRigth.bind(this), 3000);
    }

}

/** 토글 이벤트 */
togglePlay(e) {
    if (e.target.dataset.status === 'play') {
        this.#autoplay = true;
        this.controlWrapEl.classList.remove('pause');
        this.controlWrapEl.classList.add('play');

        // autoplay 실행
        this.initAutoplay();

    } else if (e.target.dataset.status === 'pause') {
        this.#autoplay = false;
        this.controlWrapEl.classList.remove('play');
        this.controlWrapEl.classList.add('pause');

        // autoplay 중단
        clearInterval(this.#intervalId);
    }
}
```

### ch3. date picker

1. snowpack & sass 설치

1) `npm init -y`
2) `npm i -D snowpack`
3) `npm i -D @snowpack/plugin-sass`
4) /public/index.html 설정

```
index.html

<!DOCTYPE html>
<html>
    <head>
        <link rel="icon" href="favicon.ico" />
        <link rel="stylesheet" href="dist/scss/style.css" />
    </head>
    <body>

        <script src="dist/js/index.js"></script>
    </body>
</html>
```

5. snowpack.config.js 설정

```
// snowpack.config.js
module.exports = {

    mount: {
        public: { url: '/', static: true, },
        src: { url: '/dist' }
    },

    optimize: {
        minify: true
    },

    plugins: [
        '@snowpack/plugin-sass'
    ]
}
```

6. package.json 설정

```
// package.json
"scripts": {
    "start": "snowpack dev",
    "build": "snowpack build"
},
```

7. eslint & prettier

```
// termial
$ npm i -D eslint
$ npm install --save-dev --save-exact prettier
$ npm i -D eslint-config-prettier eslint-plugin-prettier

// .eslintrc.json
{
    "env": {
        "browser": true,
        "es2021": true
    },

    "extends": ["eslint:recommended", "plugin:prettier/recommended"],

    "parserOptions": {
        "ecmaVersion": 13,
        "sourceType": "module"
    },

    "rules": {
        "prettier/prettier": "error"
    }
}

// .eslintignore
/node_modules
/build
snowpack.config.js

// .prettierrc.json
{
    "trailingComma": "all",
    "bracketSpacing": true,
    "useTabs": false,
    "semi": true,
    "printWidth": 80,
    "arrowParens": "avoid",
    "proseWrap": "never",
    "endOfLine": "auto",
    "tabWidth": 2,
    "singleQuote": true
}

// .prettierignore
/node_modules
/build
snowpack.config.js
```

8. open workspace settings

1) `cmd` + `shift` + `P`
2) /.vscode/settings.json
```
// settings.json
{
    "editor.formatOnSave" : true,
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true 
    }
}
```

#### Date Picker HTML & CSS
1. CSS : display grid
```
.container {
    display: grid;
    grid-template-columns: 1fs 4fs 1fs;
    grid-template-rows: 1fs 2fs 1fs;
}

.item {
    display: flex;
    justify-content: center;


// => 1   1      1
//    1   1      1
//    
//    1   1      1
}
```

### ch4. 계산기
1. CSS : 중앙정렬
```
.wrapper {
    display: grid;
    place-items: center;
    /*   place-content: center; */
    min-height: 100vh;
}
```
`place-items` => `align-items` & `justify-items`
`place-content` => `align-content` & `justify-content`

### ch5. bmi 계산기
1. CSS `align-items`
```
.row {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
}

|o|o|o| => |o|o|x|
|o|o|x|    |o|o|o|
```

### ch6. 이미지 계산기
1. yarn install
- yarn을 사용하는 것이 dependencies 관리나, 라이브러리 충돌 방지에 효율
```
npm install -g yarn
```
2. react & typescript install
```
yarn create react-app /** 폴더이름 */ --template typescript
```

3. 리액트 앱 실행
```
yarn start
```

4. 컴포넌트
- 태그를 리턴하는 함수.
- 컴포넌트는 태그가 될 수 있다.

5. 이미지 업로드
```
const [imageList, setImageList] = useState<string[]>([]);
onChange={e => {
    const file = e.currentTarget.files?.[0];
    if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = event => {
            setImageList(prev => [...prev, event.target?.result as string]);
        }
    }
}}
```

6. react-dropzone
- terminal
```
yarn add react-dropzone
// or
yarn add @types/react-dropzone
```
- App.tsx
```
import { useDropzone } from 'react-dropzone';
const onDrop = useCallback((acceptedFiles: any) => {
    if (acceptedFiles.length) {
      for (const file of acceptedFiles) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = e => {
          setImageList(prev => [...prev, e.target?.result as string]);
        }
      }
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

return (
    <div 
        className='plus-box'
        {...getRootProps()}
    >
        <input 
            type="file" 
            ref={inputRef} 
            {...getInputProps()}
        />
        +
    </div>
);
```