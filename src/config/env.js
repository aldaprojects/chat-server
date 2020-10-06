process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

if ( process.env.NODE_ENV === 'dev' ) {
    process.env.URL_DB = 'mongodb://localhost/chat-server';
} else {
    process.env.URL_DB = process.env.MONGO_URI || '';
}

process.env.PORT = process.env.PORT || 3000;

const URL_DB = process.env.URL_DB;
const PORT = process.env.PORT;

module.exports = {
    URL_DB,
    PORT
}