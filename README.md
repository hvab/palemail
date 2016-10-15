# palemail
> Builder for email development

## Basic features
* Included Gulp v4.0
* [SCSS (SASS)](http://sass-lang.com/) as a preprocessor for css. Sourcemaps is included.
* HTML with gulp-[nunjucks](https://mozilla.github.io/nunjucks/).
* CSS inliner.
* Typograf.
* Image minify.

## Install
```sh
git clone https://github.com/palegrow/palemail.git new-project
cd new-project
npm install
```

## Usage
Basic developer usage
```sh
export PATH=./node_modules/.bin:$PATH
export NODE_ENV=development
gulp --cwd sample-project
```

Production
```sh
NODE_ENV=production gulp --cwd sample-project
```
or just build `dist` without run server
```sh
NODE_ENV=production gulp build --cwd sample-project
```

ZIP `dist` folder (`gulp build` before it)
```sh
gulp zip --cwd sample-project
```

For multiple projects with nested directory structure, such as:
```
/sample-project
/project-1
/project-2
```
Dublicate `sample-project` and use the gulp CLI option `--cwd`:
```sh
gulp --cwd project-1
```
