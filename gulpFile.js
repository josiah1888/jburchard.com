var gulp = require('gulp');
var uglify = require('gulp-uglify');
var csso = require('gulp-csso');
var changed = require('gulp-changed');
var imagemin =require('gulp-imagemin');
var inlineSource = require('gulp-inline-source');
var filter = require('gulp-filter'); // Will phase out filter in favor of gIf
var uncss = require('gulp-uncss');
var htmlmin = require('gulp-htmlmin');
var useref = require('gulp-useref');
var inject = require('gulp-inject');
var gIf = require('gulp-if');

var DIST = 'dist/';

gulp.task('build', ['build-all', 'sitemap'], function() {
    var html = filter(['**/*.html'], {restore: true});

    return gulp.src(['src/**/*.html', '!**/googledeb6aa7f54e627ec.html', '!src/partials/**'])
        .pipe(inject(gulp.src(['src/partials/head.html']), createInjectOptions('head')))
        .pipe(inject(gulp.src(['src/partials/footer.html']), createInjectOptions('footer')))
        .pipe(inject(gulp.src(['src/partials/scripts.html']), createInjectOptions('scripts')))
        .pipe(inject(gulp.src(['src/partials/sidebar.html']), createInjectOptions('sidebar')))
        .pipe(gIf('index.html', inject(gulp.src(''), injectSidebarLinks())))
        .pipe(useref({searchPath: ['.', '../', 'src']}))
        .pipe(inlineSource({rootpath: 'dist'}))
        .pipe(html)
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true
        }))
        .pipe(html.restore)
        .pipe(gulp.dest(DIST));
});

gulp.task('build-all', function() {
    var js = filter(['**/*.js'], {restore: true});
    var css = filter(['**/*.css'], {restore: true});
    var images = filter(['**/*.(gif|jpg|svg|png)'], {restore: true});
    
    return gulp.src('src/**/*.*')
        .pipe(js)
        .pipe(uglify())
        .pipe(js.restore)
        .pipe(css)
        .pipe(uncss({html: ['src/**/*.html'], ignore: ['#sidebar.menu-active>.inner.menu', '#sidebar.menu-active']}))
        .pipe(csso())
        .pipe(css.restore)
        .pipe(images)
        .pipe(imagemin())
        .pipe(images.restore)
        .pipe(gulp.dest(DIST))
});

gulp.task('sitemap', function(done) {
    var sm = require('sitemap');
    var fs = require('fs');

    var pages = [
        { url: '/'},
        { url: '/blog/'},
        { url: '/blog/scoring-100-pagespeed-insights'},
        { url: '/blog/academic-research-computer-science'},
        ];
 
    var sitemap = sm.createSitemap({
        hostname: 'https://jburchard.com', 
        urls: pages
    });
 
    fs.writeFileSync(DIST + 'sitemap.xml', sitemap.toString());
    return done();
});

function createInjectOptions(tagName) {
    return {
        starttag: `<!-- inject:${tagName}:{{ext}} -->`,
        transform: function (filePath, file) {
            return file.contents.toString('utf8')
        }
    };
}

function injectSidebarLinks() {
    return {
        starttag: '<!-- inject:sidebar-links:html -->',
        transform: function () {
            return `
                <li><a class="sidebar__link" href="#intro">Welcome</a></li>
                <li><a class="sidebar__link" href="#one">Experience</a></li>
                <li><a class="sidebar__link" href="#two">Projects</a></li>` 
        }
    }
}