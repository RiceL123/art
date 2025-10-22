const fs = require("fs");

fs.readdir(".", (err, files) => {
  if (err) {
    console.error("Error reading directory:", err);
    return;
  }

  const arr = files
    .filter(f => /\.(png|jpg|jpeg)$/i.test(f)) // only include image files
    .map(f => {
      const name = f.replace(/\.(png|jpg|jpeg)$/i, ""); // strip extension
      return {
        path: `yt_thumbnails/${name}.webp`,
        name,
        created_at: "2024-04-01",
        tags: ["digital", "krita", "yt thumbnail"],
        description: `YouTube Thumbnail for Study Strim (${name})`
      };
    });

  console.log(JSON.stringify(arr, null, 2)); // pretty-print JSON
});
