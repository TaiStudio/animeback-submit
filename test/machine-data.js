const mocha = require("mocha");
const describe = mocha.describe;
const it = mocha.it;
const fs = require("fs");
const path = require("path");
const extensions = require("..");
const isHexColor = require("is-hexcolor");
const categories = require("../categories");
const expect = require("chai").expect;

describe("machine-generated extension data (exported by the module)", () => {
  it("is an array", () => {
    expect(extensions).to.be.an("array");
  });

  it("has the same number of extensions as the extensions directory", () => {
    const slugs = fs
      .readdirSync(path.join(__dirname, "../extensions"))
      .filter((filename) => {
        return fs
          .statSync(path.join(__dirname, `../extensions/${filename}`))
          .isDirectory();
      });

    expect(extensions.length).to.be.above(0);
    expect(extensions.length).to.equal(slugs.length);
  });

  it("sets a `slug` property on every extension", () => {
    expect(extensions.every((extension) => extension.slug.length > 0)).to.equal(
      true
    );
  });

  it("sets a multi-size icon properties on every extension", () => {
    expect(
      extensions.every((extension) => {
        return (
          extension.icon.endsWith(".png") &&
          extension.icon32.endsWith("-icon-32.png") &&
          extension.icon64.endsWith("-icon-64.png") &&
          extension.icon128.endsWith("-icon-128.png") &&
          extension.icon256.endsWith("-icon-256.png")
        );
      })
    ).to.equal(true);
  });

  it("sets a (git-based) YYYY-MM-DD `date` property on every extension", () => {
    const datePattern = /\d{4}-\d{2}-\d{2}/;

    extensions.forEach((extension) => {
      expect(datePattern.test(extension.date)).to.equal(
        true,
        `${extension.slug} does not have date property`
      );
    });
  });

  it("sets an `iconColors` array on every extension", () => {
    extensions.forEach((extension) => {
      expect(extension.iconColors).to.be.an("array", extension.slug);
      expect(extension.iconColors.length).to.be.above(2, extension.slug);
    });
  });

  it("sets a `colors.goodColorOnWhite` hex value on every extension", () => {
    extensions.forEach((extension) => {
      expect(isHexColor(extension.goodColorOnWhite)).to.eq(true);
    });
  });

  it("sets a `colors.faintColorOnWhite` semi-transparent rgba value on every extension", () => {
    extensions.forEach((extension) => {
      expect(
        extension.faintColorOnWhite,
        `${extension.slug}'s faintColorOnWhite is not right`
      ).to.match(/rgba\(\d+, \d+, \d+, /);
    });
  });

  it("sets a `colors.goodColorOnBlack` hex value on every extension", () => {
    extensions.forEach((extension) => {
      expect(isHexColor(extension.goodColorOnBlack)).to.eq(true);
    });
  });

  // it("does not override good colors if they already exist", () => {
  //   const hyper = extensions.find((extension) => extension.slug === "hyper");
  //   expect(hyper.goodColorOnWhite).to.eq("#000");
  //   expect(hyper.goodColorOnBlack).to.eq("#FFF");
  // });

  describe("releases", () => {
    const extensionsWithRepos = require("../lib/extensions-with-github-repos");
    const extensionsWithLatestRelease = extensions.filter(
      (extension) => extension.latestRelease
    );

    it("tries to fetch a release for every extension with a GitHub repo", () => {
      expect(
        extensions.filter((extension) => extension.latestReleaseFetchedAt)
          .length
      ).to.equal(extensionsWithRepos.length);
    });

    it("collects latest GitHub release data for extensions that have it", () => {
      expect(extensionsWithLatestRelease.length).to.be.above(0);
    });

    it("sets `latestRelease` on extensions with GitHub repos that use Releases", () => {
      expect(
        extensionsWithLatestRelease.every(
          (extension) => extension.latestRelease
        )
      ).to.eq(true);
    });

    it("sets `latestReleaseFetchedAt`", () => {
      expect(
        extensionsWithLatestRelease.every(
          (extension) => extension.latestReleaseFetchedAt
        )
      ).to.eq(true);
    });
  });

  describe("readmes", () => {
    const readmeExtensions = extensions.filter(
      (extension) => extension.readmeCleaned
    );

    it("collects READMEs for extensions with GitHub repos", () => {
      expect(readmeExtensions.length).to.be.above(0);
    });

    it("sets `readmeCleaned`", () => {
      expect(
        readmeExtensions.every(
          (extension) => extension.readmeCleaned.length > 0
        )
      ).to.eq(true);
    });

    it("sets `readmeOriginal`", () => {
      expect(
        readmeExtensions.every(
          (extension) => extension.readmeOriginal.length > 0
        )
      ).to.eq(true);
    });

    it("sets `readmeFetchedAt`", () => {
      expect(
        readmeExtensions.every(
          (extension) => extension.readmeFetchedAt.length > 0
        )
      ).to.eq(true);
    });
  });

  it("rewrites relative image source tags", () => {
    const beaker = extensions.find(
      (extension) => extension.slug === "beaker-browser"
    );
    const local = '<img src="build/icons/256x256.png"';
    const remote =
      '<img src="https://github.com/beakerbrowser/beaker/raw/master/build/icons/256x256.png"';

    expect(beaker.readmeOriginal).to.include(local);
    expect(beaker.readmeOriginal).to.not.include(remote);

    expect(beaker.readmeCleaned).to.not.include(local);
    expect(beaker.readmeCleaned).to.include(remote);
  });

  it("rewrites relative link hrefs", () => {
    const extension = extensions.find(
      (extension) => extension.slug === "google-play-music-desktop-player"
    );
    const local = 'href="docs/PlaybackAPI.md"';
    const remote =
      'href="https://github.com/MarshallOfSound/Google-Play-Music-Desktop-Player-UNOFFICIAL-/blob/master/docs/PlaybackAPI.md"';

    expect(extension.readmeOriginal).to.include(local);
    expect(extension.readmeOriginal).to.not.include(remote);

    expect(extension.readmeCleaned).to.not.include(local);
    expect(extension.readmeCleaned).to.include(remote);
  });
});

describe("machine-generated category data (exported by the module)", () => {
  it("is an array", () => {
    expect(categories).to.be.an("array");
  });

  it("sets a `slug` string on every category", () => {
    expect(categories.every((category) => category.slug.length > 0)).to.equal(
      true
    );
  });

  it("sets a `count` number on every category", () => {
    expect(categories.every((category) => category.count > 0)).to.equal(true);
  });
});
