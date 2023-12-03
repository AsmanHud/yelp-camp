const mongoose = require('mongoose');
const cities = require('./cities');
const { descriptors, places } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp')
    .then(() => {
        console.log('Mongoose connection open!');
    })
    .catch(err => {
        console.log('Something went wrong with Mongoose connection...');
        console.log(err);
    });

function randChoose(arr, size) {
    return arr[Math.floor(Math.random() * size)];
}

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const randomCity = randChoose(cities, 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            // YOUR USER ID
            author: '656a3edcd541fc1770d85ca6',
            location: `${randomCity.city}, ${randomCity.state}`,
            title: `${randChoose(descriptors, descriptors.length)} ${randChoose(places, places.length)}`,
            images: [
                {
                    url: 'https://res.cloudinary.com/dgloi1rla/image/upload/v1701545008/YelpCamp/ahjsxhvh9f0pagg5crro.jpg',
                    filename: 'YelpCamp/ahjsxhvh9f0pagg5crro',
                },
                {
                    url: 'https://res.cloudinary.com/dgloi1rla/image/upload/v1701545010/YelpCamp/tolo2vfi5fbzsulazjdx.jpg',
                    filename: 'YelpCamp/tolo2vfi5fbzsulazjdx',
                }
            ],
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque nulla quam ullam consectetur amet animi eligendi incidunt cum corporis esse perferendis voluptatum architecto, minus illo delectus sed reiciendis autem ipsa!',
            price,
            geometry: {
                type: 'Point',
                coordinates: [
                    randomCity.longitude, randomCity.latitude
                ]
            }
        });
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});