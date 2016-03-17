/**
 * app webserver entrypoint
*/

import Promise   from "bluebird";
import _         from "lodash";
import fs        from "fs";
import koa       from "koa";
import koaRouter from "koa-router";
import koaSend   from "koa-send";
import winston   from "winston";

const NODE_ENV = process.env.NODE_ENV;

/**
 * app config
*/
const app = koa();
// performance logger
app.use( function* ( next ) {
  let loggingName = `${this.request.method} ${this.request.url}`;
  winston.profile( loggingName );
  yield next;
  winston.profile( loggingName );
})


/**
 * public api.
 * api end points that do not require authentification
 * includes static file servers
*/
const router = new koaRouter();
// our html template only needs to be compiled once determined by whether we are in development or production
// this affects whether the page will require our static app bundle or our hot reloading assets from the dev server
const appTemplate = _.template( fs.readFileSync( __dirname + "/../front/views/index.html", { encoding: "utf8" } ) );
const compiledTemplate = appTemplate( { environment: NODE_ENV } );
// static file servers
router.get(/\/build\//, function* () {
	let path = this.path.replace( "/build/", "/" );
	yield koaSend( this, path, { root: "front/build", maxage: 60000 } );
});
router.get(/\/assets\//, function* () {
	let path = this.path.replace( "/assets/", "/" );
	yield koaSend( this, path, { root: "front/assets", maxage: 60000 } );
});
router.get( "*", function* () { this.body = compiledTemplate } );

// end declaration of public end points
app.use( router.middleware() );


/**
 * start app
*/
let port = NODE_ENV === "production" ? 8101 : 8201;
app.listen( port );
console.info( `High Horse Browser is running on port: ${port}` );








