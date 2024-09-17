module.exports = function(eleventyConfig) {
    // Return your Object options:
    eleventyConfig.addPassthroughCopy("views/index.css");
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