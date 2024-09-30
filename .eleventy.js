module.exports = function(eleventyConfig) {
    // Pass through the CSS file correctly
    eleventyConfig.addPassthroughCopy("views/_includes/main.css");
    eleventyConfig.addPassthroughCopy("views/_data/glossary.json");
    eleventyConfig.addPassthroughCopy("views/_scripts/glossary.js");
    // Collection for PCB posts
    eleventyConfig.addCollection('pcb', function(collectionApi) {
      return collectionApi.getFilteredByTag('pcb');
    });

    // Collection for Software posts
    eleventyConfig.addCollection('software', function(collectionApi) {
      return collectionApi.getFilteredByTag('software');
    });

    // Collection for Case posts
    eleventyConfig.addCollection('case', function(collectionApi) {
      return collectionApi.getFilteredByTag('case');
    });
    return {
      passthroughFileCopy: true,
      dir: {
        input: "views",
        includes: "_includes",
        data: "_data",
        output: "_site"
      }
    }
  };
  