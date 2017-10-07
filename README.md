## baaboo-app by [Thien Kim](https://thienkim-frontend.github.io/cv/)
> This app is buit with Angular 1, Yeoman

*Useful Urls*


Home						https://thienkim-frontend.github.io/baaboo.angular/#!

Product					https://thienkim-frontend.github.io/baaboo.angular/#!/product

Category				https://thienkim-frontend.github.io/baaboo.angular/#!/category/banh-bo-nuong

Product detail	https://thienkim-frontend.github.io/baaboo.angular/#!/details/banh-cupcake

Contact					https://thienkim-frontend.github.io/baaboo.angular/#!/contact

Price						https://thienkim-frontend.github.io/baaboo.angular/#!/price

Gallery					https://thienkim-frontend.github.io/baaboo.angular/#!/gallery

About						https://thienkim-frontend.github.io/baaboo.angular/#!/about

Team						https://thienkim-frontend.github.io/baaboo.angular/#!/team

404							https://thienkim-frontend.github.io/baaboo.angular/#!/404


## Plugins
AngularJS v1.6.5 			https://angularjs.org/

UI Bootstrap 					https://github.com/angular-ui/bootstrap

UI-Router 						https://ui-router.github.io/ng1/

imagesLoaded 					https://github.com/desandro/imagesloaded

owlcarousel2 					https://owlcarousel2.github.io/OwlCarousel2/

fancyBox3 						http://fancyapps.com/fancybox/3/

easy-pie-chart 				https://github.com/rendro/easy-pie-chart

countTo.js 						https://github.com/mhuggins/jquery-countTo

countdown.js 					http://keith-wood.name/countdown.html

appear.js 						https://github.com/bas2k/jquery.appear/

Parallax.js						https://github.com/pixelcog/parallax.js/

WOW.js 								https://github.com/matthieua/WOW

Bootstrap 3 					http://bootstrapdocs.com/v3.0.3/docs/

Sass 									http://sass-lang.com/

Compass 							http://compass-style.org/

## Build & development

1. Install Node.js
	https://nodejs.org/en/

2. Install Grund, Yeoman, Bower globally

	Grunt - The JavaScript Task Runner
	https://gruntjs.com/getting-started

	Yeoman generator for AngularJS - lets you quickly set up a project with sensible defaults and best practices.
	https://github.com/yeoman/generator-angular

	Bower - A package manager for the web
	https://bower.io/
	```
	$ npm install -g grunt-cli bower yo generator-karma generator-angular
	```
3. Install project dependencies, please check file package.json for more information
	```
	$ npm install
	```
4. Preview website
	http://localhost:9000/#!/
	```
	$ grunt serve
	```
5. Concat and minify all files javascript and images for "go LIVE" website
	```
	$ grunt
	```
## Testing with karma
```
$ grunt test
```
