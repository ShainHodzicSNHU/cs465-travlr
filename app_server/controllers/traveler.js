const sampleTrips = [
  { title: 'Coral Reef Escape', nights: 7, price: 1299, image: '/images/reef1.jpg' },
  { title: 'Blue Lagoon Retreat', nights: 5, price: 999, image: '/images/reef2.jpg' },
  { title: 'Sunset Coves Getaway', nights: 3, price: 599, image: '/images/reef3.jpg' }
];

const travelList = (req, res) => {
  res.render('travel', {
    title: 'Travlr Getaways',
    subtitle: 'Plan your next adventure',
    trips: sampleTrips,
    year: new Date().getFullYear()
  });
};

module.exports = { travelList };
