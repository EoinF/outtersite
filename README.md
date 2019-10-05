# Outtersite

The static html and css for my website at https://outterest.com

I am actively avoiding the use of javascript to see how much can be accomplished without it.

I use gulp to watch the files in the src folder, then transform them using the templating engine called handlebars, and finally copying them over to the build folder using gulp.

I use browserSync during development to hot reload

Just running `npm run start` will launch a local server served from the build folder
Running `npm run build` produces the static application in the build folder
