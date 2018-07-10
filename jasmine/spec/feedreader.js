/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

$(function() {
    describe('RSS Feeds', function() {
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        it("urls are defined and not empty", function () {
            allFeeds.forEach(function (elem) {
                expect(elem.url).toBeDefined();
                expect(elem.url.length).not.toBe(0);
            });
        });

        it("names are defined and not empty", function () {
            allFeeds.forEach(function (elem) {
                expect(elem.name).toBeDefined();
                expect(elem.name.length).not.toBe(0);
            });
        });
    });

    describe("The menu", function () {
        const body = document.querySelector("body");
        const menuIcon = $('.menu-icon-link');
        if (body == undefined || menuIcon == undefined) {
            throw "elements not found on the page";
        }
    
        it("is hidden by default", function () {
            expect(body.classList).toContain("menu-hidden");
        });

        it("changes states when clicked", function () {
            menuIcon.click();
            expect(body.classList).not.toContain("menu-hidden");
            menuIcon.click();
            expect(body.classList).toContain("menu-hidden");
        });
    });

    describe("Initial Entries", function () {

        beforeEach(function (done) {
            loadFeed(0, () => done());
        });

        it("are at least one", function (done) {
            expect(document.querySelectorAll(".feed .entry").length).not.toBeLessThan(1);
            done();
        });
    });

    describe("New Feed Selection", function () {
        let feed = document.querySelector(".feed"),
            contentBefore;
        if (feed == undefined) {
            throw ".feed is undefined";
        }

        beforeEach((done) => {
            loadFeed(0, () => {
                contentBefore = feed.innerHTML;
                loadFeed(1, done);
            });
        });

        it("changes feed", function (done) {
            expect(feed.innerHTML).not.toBe(contentBefore);
            done();
        });
    });
}());
