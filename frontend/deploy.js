// frontend/deploy.js
const ghpages = require("gh-pages");

ghpages.publish(
  "build",
  {
    dotfiles: true,
    add: true,
  },
  (err) => {
    if (err) {
      console.error("Deployment failed:", err);
    } else {
      console.log("Deployment successful!");
    }
  }
);
// This script deploys the contents of the 'build' directory to GitHub Pages
// Make sure to run 'npm run build' before executing this script
