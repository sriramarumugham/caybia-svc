import mongo from 'mongoose';
require('dotenv').config();

export const connectDb = () => {
  mongo
    .connect(process.env.MONGO_DB_URI || 'urlnotfound', {})
    .then((res) => {
      console.log(
        'mongodb connected successfully',
        process.env.MONGO_DB_URI || 'urlnotfound',
      );
    })
    .catch((err) => {
      console.log(err, '-->');
    });
};
