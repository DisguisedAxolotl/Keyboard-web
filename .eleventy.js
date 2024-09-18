module.exports = function(eleventyConfig) {
    // Pass through the CSS file correctly
    eleventyConfig.addPassthroughCopy("views/_includes/main.css");
    eleventyConfig.addPassthroughCopy("views/_data/glossary.json");
    eleventyConfig.addPassthroughCopy("views/_scripts/glossary.js");
  
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
  