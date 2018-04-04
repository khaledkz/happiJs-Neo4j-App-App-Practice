'use strict';

const Path = require('path');
const Hapi = require('hapi');
const Hoek = require('hoek');

const server = Hapi.server({
    port: 3000,
    host: 'localhost'
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
        path: '/',
        handler: (request, h) => {
    
            return 'Hello, world!';
        }
    });
    
    
    server.route({
        method: 'GET',
        path: '/page',
        // handler: {view:{
        //     template: 'main'
        // }}
        handler:(req,h)=>{
             return h.view('main')
        }
    });

 

    server.route({
        method: 'GET',
        path: '/file',
        handler: (request, h) => {
    
            return h.file('./public/pages/hello.html');
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