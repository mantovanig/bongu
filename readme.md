# Bongu

Bongu is a Wordpress StarterKit based on [Bones starter theme](https://github.com/eddiemachado/bones) (i'm a fan of Bones! :smile: ) that reduces the time and effort to setup and build a wordpress website.

It is focused on making you, the developer, as productive as possible by doing all the common, repetitive, yet essential, tasks involved in most web development projects, this with [Gulp](https://github.com/gulpjs/gulp) task and other small features.

Inside the pack of juice:
- [Materialize](http://materializecss.com/) - With partials sass files to include only the components that you need
- [Webpack](https://webpack.github.io/)
- [Gulp](https://github.com/gulpjs/gulp)
- [ESLint](http://eslint.org/)
- [Stylelint](http://stylelint.io/)

# Installation

1. Ensure that [Node.js](http://nodejs.org/) are installed.
2. Run `git clone https://github.com/mantovanig/bongu.git && cd bongu`.
3. Run `npm install` to ensure the required dependencies are installed.
4. Run `gulp` to build all resources, at the end of task you can start to code!

## Main task
- To run the watch task: `gulp watch`
- To build svg files: `gulp build-svg`

## Create a specific css stylesheet for a template page
You can easily create a specific css stylesheet for your custom template page.

Create your php template file with this nomenclature:

```
template-yourslug.php
```

`template-` is important before the slug name!

Next you have just to create a scss file in the directory /library/scss/template/ with the name of your slug template:

```
yourslug.scss
```

For an example look the `template-home.php` in the project.

## Set the environment
A feature of Bongu is you can set the environment (production or development).

In relation to this Bongu load the appropiate resources, for example in production environment will load minified css.

To set the environment add this line in your `wp-config.php` file:

```
define('BONGU_ENV', 'dev');
```

The possible value are: `prod` and `dev`

# TO DO
- Include slickJS for carousel
- Improve SVG workflow, i'm not sure that gulp-svg-to-css is the best solution
- Improve resource loading function
