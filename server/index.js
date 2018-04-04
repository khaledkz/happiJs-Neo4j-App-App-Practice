'use strict';

const Hapi = require('hapi');

const Vision = require('vision');
const Handlebars = require('handlebars');


const server = Hapi.server({
    port: 3000,
    host: 'localhost'
});

// server.route({
//     method: 'GET',
//     path: '/',
//     handler: (request, h) => {

//         return ('<h1>Hello, world!</h1>');
//     }
// });

// server.route({
//     method: 'GET',
//     path: '/{name}',
//     handler: (request, h) => {

//         return 'Hello, ' + encodeURIComponent(request.params.name) + '!';
//     }
// });

// const init = async () => {

//     await server.start();
//     console.log(`Server running at: ${server.info.uri}`);
// };


const init = async () => {

    await server.register(require('inert'));
    await server.register(Vision);

    server.views({
        engines: { html: Handlebars },
        relativeTo: __dirname,
        path: 'view/handlebars/'
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {
    
            return h.file('./public/pages/hello.html',{});
        }
    });

    server.route({
        method: 'GET',
        path: '/main',
        handler: (request, h) => {
    
            return h.view('main')
        }
    })

    server.route({
    method: 'GET',
    path: '/{name}',
    handler: (request, h) => {

        return h.file('./public/images/hapi.jpg');
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