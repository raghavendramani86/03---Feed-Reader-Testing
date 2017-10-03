/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against the current application.
 */

$(function() {
  /* Test Suite for testing RSS feeds */
  describe('RSS Feeds', function() {
    it('are defined', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });
    /* This Test will loop through each feed
    * in the allFeeds object and ensures it has a URL defined
    * and that the URL is not empty.
    */
    it('have urls that are defined and not empty', function() {
      for (var i = 0; i < allFeeds.length; i++) {
        expect(allFeeds[i].url).toBeDefined();
        expect(allFeeds[i].url).not.toBe('');
      }
    });
    /* This Test will loop through each feed
    * in the allFeeds object and ensures it has a name specified
    * and that the name is not empty.
    */
    it('have names that are defined and not empty', function() {
      for (var i = 0; i < allFeeds.length; i++) {
        expect(allFeeds[i].name).toBeDefined();
        expect(allFeeds[i].name).not.toBe('');
      }
    });
  });

  /* Test Suite for the Menu Icon */
  describe('The menu', function() {
    var menuIcon = $('.menu-icon-link');
    var body = $('body');
    /* This test ensures that the menu element is
    * hidden by default. The "menu-hidden" class is
    * checked from the list of all classes on the
    * body element
    */
    it('is hidded by default on page load', function() {
      expect(body.hasClass('menu-hidden')).toBe(true);
    });
    /* This test enures that the menu changes visibility
    * when the menu icon is clicked. This test has two
    * expectations:
    * 1. The menu displays on click of the menu icon
    * 2. The menu is hidden again on click of the menu icon
    * This is determine by triggering the click event on the
    * menu-icon and checking the class assigned to the body
    * element when this event is triggered
    */
    it('is shown on first click of the menu icon\
    and hidden on the next click of the menu icon', function() {
      // on click of menuIcon
      menuIcon.trigger('click');
      expect(body.hasClass('menu-hidden')).toBe(false);
      // on second click of menuIcon
      menuIcon.trigger('click');
      expect(body.hasClass('menu-hidden')).toBe(true);
    });
  });

  /* Test Suite for Initial Entries */
  describe('Initial Entries', function() {
    // Load initial feed asynchronously and ensure it completes
    beforeEach(function(done) {
      loadFeed(0,function() {
        done();
      });
    });
    /* This test ensures that when the loadFeed function
    * is called and completes its work, there is at least
    * a single .entry element within the .feed container.
    * the descendant selector jQuery function us used on
    * on the .feed class to check for atleast one .entry
    * class element within its hierarchy
    */
    it('contains atleast one article with a class attribute = entry', function() {
      //looking for atleast one .entry class using the descendant selector jQuery function
      expect($('.feed .entry').length).toBeGreaterThan(0);
    });
  });

  /* Test Suite for New Feed Selection*/
  describe('New Feed Selection', function() {
    var oldFeedInfo;
    var newFeedInfo;
    // Load both the feeds 0 and 3 before testing
    beforeEach(function(done) {
        // load first feed - feed(0)
      loadFeed(0, function() {
        // Store first feed data for comparison
        oldFeedInfo = $('.feed').html();
        // load new feed - feed(3)
        loadFeed(3, function() {
          done();
        });
      });
    });
    /* This test ensures that everytime a new
    * feed loads, new data is loaded. This can
    * be determined by storing the first feed
    * information and comparing it with the
    * information from the next feed
    */
    it('changes content from the previous feed selection', function() {
      // Store next feed data for comparison
      newFeedInfo = $('.feed').html();
      // Comparing feed(0) and feed(3)
      expect(newFeedInfo).not.toBe(oldFeedInfo);
    });
  });
}());
