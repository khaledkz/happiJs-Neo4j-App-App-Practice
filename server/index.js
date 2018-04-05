'use strict';

const Path = require('path');
const Hapi = require('hapi');
const Hoek = require('hoek');

 


const server = Hapi.server({
    port: 3000,
    host: 'localhost',
    routes: {
        files: {
            relativeTo: Path.join(__dirname, './public')
        }
    }
});

const init = async () => {
    await server.register(require('vision'));
    await server.register(require('inert'));

   
    server.views({
        engines: {
            html: require('handlebars')
        },
        relativeTo: __dirname,
        layout:true,
        path: './view/templates',
        layoutPath: './view/templates/layout',
     });


     server.route({
        method: 'GET',
        path: '/{p*}',
        handler: {
            directory: {
                path: Path.join(__dirname, 'public'),
                listing: false,
                index: false
            }
        }
    });


     server.route({
        method: 'GET',
        path: '/stylesheet/style.css',
        handler: {
            file: {
                path: 'stylesheet/style.css',
                filename: 'style.css', // override the filename in the Content-Disposition header
                mode: 'attachment', // specify the Content-Disposition is an attachment
                lookupCompressed: true // allow looking for script.js.gz if the request allows it
            }
        }
    });

    // server.route({
    //     method: 'GET',
    //     path: '/images/hapi.jpg',
    //     handler: {
    //         file: {
    //             path: 'images/hapi.jpg',
    //             filename: 'hapi.jpg', // override the filename in the Content-Disposition header
    //             mode: 'attachment', // specify the Content-Disposition is an attachment
    //          }
    //     }
    // });


    // server.route({
    //     method: 'GET',
    //     path: '/{param*}',
    //     handler: {
    //         directory: {
    //             path: 'public/images/{param*}',
    //             listing: true
    //         }
    //     }
    // });
        
    server.route({
        method: 'GET',
        path: '/',
        // handler: {view:{
        //     template: 'main'
        // }}
        handler:(req,h)=>{
             return h.view('index')
        }
    });

    server.route({
        method: 'GET',
        path: '/service',
        handler:(req,h)=>{
             return h.view('service')
        }
    });

    server.route({
        method: 'GET',
        path: '/contact',
        handler:(req,h)=>{
             return h.view('contact')
        }
    });

    server.route({
        method: 'GET',
        path: '/branches',
        handler:(req,h)=>{
             return h.view('branches')
        }
    });

    server.route({
        method: 'GET',
        path: '/file',
        handler: (request, h) => {
    
            return h.file('./pages/hello.html');
        }
    });
 
    
    server.route({
        method: 'GET',
        path: '/{name}',
        handler: (request, h) => {
    
            return 'Hello, ' + encodeURIComponent(request.params.name) + '!';
        }
    });

    await server.start();

    console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();