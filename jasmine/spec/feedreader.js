/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });
        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('have urls that are defined', function() {
             for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].url).toBeDefined();
             }
         });

         it('have urls that are not empty', function() {
             for (var i = 0; i < allFeeds.length; i++) {
               expect(allFeeds[i].url).not.toBe('');
             }
         });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

         it('have names that are defined', function() {
           for (var i = 0; i < allFeeds.length; i++) {
             expect(allFeeds[i].name).toBeDefined();
           }
         });

         it('have names that are not empty', function() {
           for (var i = 0; i < allFeeds.length; i++) {
             expect(allFeeds[i].name).not.toBe('');
           }
         });

    });

    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function() {
      var menuIcon = $('.menu-icon-link');
      var body = $('body')[0];
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
         it('is hidded by default on page load', function() {
           expect(body.classList.value).toBe('menu-hidden');
         });

         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
          it('is shown on first click of the menu hamburger icon', function() {
            // on click of menuIcon
            menuIcon.trigger('click');
            expect(body.classList.value).toBe('');
          });
          it('is hidden again on second click of the menu hamburger icon', function() {
            // on click of menuIcon
            menuIcon.trigger('click');
            expect(body.classList.value).toBe('menu-hidden');
          })
        });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
      /* TODO: Write a test that ensures when the loadFeed
       * function is called and completes its work, there is at least
       * a single .entry element within the .feed container.
       * Remember, loadFeed() is asynchronous so this test will require
       * the use of Jasmine's beforeEach and asynchronous done() function.
       */
       beforeEach(function(done) {
         loadFeed(0,function() {
           done();
         })
       });
       it('contains atleast one article with a class attribute = entry', function(done) {
         expect($('.feed').children()[0].children[0].className).toBe('entry');
         done();
       });
    });

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
      var oldFeedInfo;

      /* TODO: Write a test that ensures when a new feed is loaded
       * by the loadFeed function that the content actually changes.
       * Remember, loadFeed() is asynchronous.
       */
       beforeEach(function(done) {
        //  loadFeed(0, function() {
           //  store old feed data for comparison
           oldFeedInfo = $('.feed').children()[0];
           //  load new feed
           loadFeed(3, function() {
             done();
           });
        //  });
       });

      it('changes content from the previous feed selection', function() {
        var newFeedInfo = $('.feed').children()[0];
        // comparing feed(0) and feed(3)
        expect(newFeedInfo).not.toBe(oldFeedInfo);
      });
    });

}());
