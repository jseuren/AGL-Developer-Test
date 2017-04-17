var agltest = agltest || {};

agltest.dataService = (function () {

    'use strict';

    var $output = $('#output');

    //render out a single gender and the cats assocaited with that gender (in alphabetical order)
    function renderCatsForGender(gender, template) {

        var compiledTemplate = Handlebars.compile(template);
        var gridHtml = compiledTemplate(gender);
        return gridHtml;
    }

    function getOwnersWithCats(people) {

        return _.filter(people, function (owner) {
            if (owner.pets) {
                //if there are any cats then return true as these are the owners we are intested in
                if (_.findIndex(owner.pets, function (pet) {
                    return pet.type.toLowerCase() === 'cat';
                }) >= 0) {
                    return true;
                }
            }

            return false;
        });
    }

    function getCatNamesForGenders(ownersWithCats) {

        var genders = _.groupBy(ownersWithCats, 'gender');

        return _.map(genders, function (gender) {
            return {
                gender: gender[0].gender,
                cats: _.sortBy(
                    _.filter(
                        _.flatten(
                            _.pluck(gender, 'pets')),
                        function (pet) {
                            return pet.type.toLowerCase() === 'cat';
                        }),
                    'name')
            };
        });

    }

    function outputCatListByGender(people) {

        //check data has atually been received
        if (people && people.length) {

            console.log(people); // server response

            //filter out any owners who do not have cats at all
            var ownersWithCats = getOwnersWithCats(people);

            var mappedData = getCatNamesForGenders(ownersWithCats);

            var htmlOutput = '';

            $.ajax({
                url: '/src/templates/cats.handlebars',
                cache: true,
                success: function (data) {
                    var template = data;
                    //use handlebars to easily generate
                    _.each(mappedData, function (element) {

                        htmlOutput += renderCatsForGender(element, template);

                    });

                    //render output to screen
                    $output.replaceWith(htmlOutput);
                }
            });


        } else {

            console.log('No Repsonse Received');

        }

    }

    var initialize = function () {

        $.ajax({
            url: 'http://agl-developer-test.azurewebsites.net/people.json',
            //as it is not on local domain need to use jsonp
            dataType: 'jsonp',
            success: function (response) {

                outputCatListByGender(response);

            },
            error: function () {

                //handle error appropriately here
                $output.replaceWith("Cannot load cat list at this point...");

            }
        });
    };


    return {
        init: initialize,
        //output below two function for testing purposes
        renderCatsForGender: renderCatsForGender,
        outputCatListByGender: outputCatListByGender,
        getOwnersWithCats: getOwnersWithCats,
        getCatNamesForGenders: getCatNamesForGenders
    };

}());