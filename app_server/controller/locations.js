const homelist = (req, res) => {
    res.render('locations-list', {
        title: 'PetNeeds - For all your pets needs',
        pageHeader: {
            title: 'PetNeeds',
            strapline: 'Find the best products for your pets'
        },
        sidebar: 'Looking for grooming products for your pets? PetNeeds helps you find the best qulity products for your pets. Perhaps a brush or food? Let PetNeeds help you find the products you are looking for.',
        products: [{
                name: 'Dog Food',
                company: 'Pedigree',
                rating: 3,
                smalDesc: 'Pedigree high quality dog food',
                tags: ['Dog', 'Food', 'Medium'],
                price: 'INR 500',
                imgSrc: '/resources/pedigree.jpeg'
            }, {
                name: 'Kennel',
                company: 'MidWest',
                rating: 4,
                smalDesc: 'Small kennel for animal transport',
                tags: ['Any Animal', 'Shelter', 'Small'],
                price: 'INR 2400',
                imgSrc: '/resources/kennel.jpeg'
            }, {
                name: 'Dog Brush',
                company: 'QPets',
                rating: 5,
                smalDesc: 'A dog brush for rough hair',
                tags: ['Dog', 'Brush', 'Rough'],
                price: 'INR 450',
                imgSrc: '/resources/dogbrush.jpeg'
            }, {
                name: 'Cat Food',
                company: 'Whiskas',
                rating: 2,
                smalDesc: 'Cat Food for adult cats',
                tags: ['Cat', 'Food', 'Adult'],
                price: 'INR 250',
                imgSrc: '/resources/whiskas.jpeg'
            }, {
                name: 'Aquarium',
                company: 'QPets',
                rating: 4,
                smalDesc: 'Medium sized aquarium',
                tags: ['Fish', 'Shelter', '20ltr'],
                price: 'INR 3050',
                imgSrc: '/resources/aquarium.jpeg'
            }, {
                name: 'Rabbit Cage',
                company: 'MidWest',
                rating: 3,
                smalDesc: 'Small sized cage for rabbits',
                tags: ['Rabbit', 'Shelter', 'Small'],
                price: 'INR 2050',
                imgSrc: '/resources/rabbitcage.jpeg'
            }
        ]
    });
    };
    /* GET 'Location info' page */
    const locationInfo = (req, res) => {
        res.render('location-info', {
            title: 'Location info',
            product: {
                name: 'Dog Food',
                company: 'Pedigree',
                imgSrc: '/resources/pedigree.jpeg',
                rating: 3,
                smalDesc: 'Pedigree high quality dog food',
                tags: ['Dog', 'Food', 'Medium'],
                desc: 'PEDIGREE Professional Range adult dog food fulfills the special needs of your dog. The range provides expert nutrition combining high-quality ingredients with the science developed by our veterinarians and nutritionists.',
                quantity: [{
                    qty: '500GM',
                    price: '260 RS'
                }, {
                    qty: '1KG',
                    price: '500 RS'
                }, {
                    qty: '5KG',
                    price: '2200 RS'
                }]
            },
            reviews: [{
                author: 'Simon Holmes',
                date: '16 February 2017',
                content: 'Great brand. Bowl gets emptied in 2 minutes by my pet.',
                rating: 4
            }, {
                author: 'Charlie Chaplin',
                date: '14 February 2017',
                content: 'It was okay. My dog doesnt eat much.',
                rating: 3
            }],
            sidebar: {
                lead: 'Pedigree offers the best & affordable dog food in India. Explore the nutritionally balanced dog food & learn how to take care of dogs.',
                last: 'If you have bought and liked it - or if you dont - please leave a review to help other people just like you.'
            }
        });
    };
    /* GET 'Add review' page */
    const addReview = (req, res) => {
        res.render('location-review-form', {
            title: 'Add review',
            product: 'Pedigree'
        });
    };
    
    module.exports = {
    homelist,
    locationInfo,
    addReview
    };