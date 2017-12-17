# Exporting CSS Loaders

This is a prototype of an idea on how css webpack loaders could work in the
future in a way that they contribute to the same exported module.

## How to start

To check out the prototype in action, run the following:

* `yarn`
* `npx webpack --watch`

Then open the `web/index.html` file.
(Results will be in the console.)

## Summary

Assuming "first-loader" and "second-loader" is in the chain of loaders, the
following should work:

```js
import css, { first, second } from "styles.css";

// Where "css" is a css string, processed by both loaders, and
// "first" / "second" are loader-specific exports, like stats, JS objects, etc.
```

## Webpack Config

To allow such functionality, loaders must agree to expect and pass on a
standardised meta object, which contains the processed css and parts of the
module that'll eventually be returned at the end of the loader chain.

In order for this to work, we also need an extra loader at the very end, which
creates the js module from the parts, and returns it as a string, like so:

```js
{
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["css-exports-loader", "second-loader", "first-loader"]
      }
    ];
  }
}
```

## Outstanding Issues

* The need for an "css-exports-loader": if the loader can't detect whether it's
  the last one in the loader-chain, then we need to make the above described
  "css-exports-loader". (Otherwise all css-loaders could have the capability to
  return the actual js module string, if it knows it's the last one in the chain.)
* This prototype allows loaders work in the same scope, which means name
  collisions and conflicts are highly likely. This is due to the fact, that the
  final loader simply concatenates all the module parts added by previous loaders.
* It would be nice to be able to read other loaders' output in following ones.
  For example: a loader might need the classmap generated by the css-loader in
  modules mode.
* if the css-loader runs in module:true mode, the classmap will no longer be
  exported as default.

## Goals

* Make it possible for multiple css loaders to contribute to the same js module
  exports
* Make it possible for loaders to access each others' output. (A loader running
  after another one might do things differently based on stats from the previous
  one in the chain.)
* Avoid conflicts that may arise if the css loaders add not only exports, but
  other local JS code to the module string.
* Avoid named export conflicts: if two loaders add the same named export,
  they'll collide.
* Make it possible to decide which module's export should be the default one.
  (Would be very useful to configure the css-loader to export it's classmaps as
  defaults, as it does it currently.)
* Make the `meta => js module string` conversion automatic when webpack reaches
  the last loader in the chain, instead of using the `css-exports-loader`.
