module.exports = async function(eleventyConfig) {
  // Dynamically import the Pug plugin
  const pugPlugin = await import("@11ty/eleventy-plugin-pug");

  // Add the Pug plugin to Eleventy
  eleventyConfig.addPlugin(pugPlugin.default);

  // Pass through the CSS file correctly
  eleventyConfig.addPassthroughCopy("views/_includes/main.css");
  eleventyConfig.addPassthroughCopy("views/_data/glossary.json");
  eleventyConfig.addPassthroughCopy("views/_includes/glossary.js");
  eleventyConfig.addPassthroughCopy("views/_includes/clipboard.js");

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
    },
    markdownTemplateEngine: "pug",
    htmlTemplateEngine: "pug",
    templateFormats: ["pug", "md"]
  };
};
