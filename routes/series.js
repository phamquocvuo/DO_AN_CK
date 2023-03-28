var express = require("express");
var router = express.Router();
const hostClone = require("../src/config/hostClone");
const config = require("../src/config");
const MovieSerieModel = require("../src/db/model/MovieSerie");
const MovieModel = require("../src/db/model/Movie");
const RegionModel = require("../src/db/schema/RegionSchema");
const striptags = require("striptags");


//Page quoc gia
router.get("/quoc-gia/:region/page/:currentPage", async (req, res) => {
  const { region, currentPage } = req.params;

  let itemPerPage = config.itemPerPage;
  const promMenu = MovieModel.getMenu();
  const promTotalMovies = MovieSerieModel.countMovieByRegion(region);
  const promRegionName = RegionModel.findOne({ regionSlug: region });

  let [menu, totalMovies, resRegion] = await Promise.all([
    promMenu,
    promTotalMovies,
    promRegionName,
  ]);
  let totalPage =
    totalMovies <= itemPerPage ? 1 : Math.ceil(totalMovies / itemPerPage);
  let skipItem = (currentPage - 1) * itemPerPage;
  let listMovies = await MovieSerieModel.findMovieByRegion(
    region,
    itemPerPage,
    skipItem
  );

  res.render("series-view/region", {
    title: "Movie - Quốc gia " + resRegion.region,
    movie: null,
    listMovies: listMovies,
    menu: menu,
    region: resRegion.region,
    totalPage: totalPage,
    currentPage: currentPage,
    parentLink: `/phim-bo/quoc-gia/${region}`,
    isShowPaging: itemPerPage < totalMovies,
  });
});

//Page tim kiem theo nam
router.get("/nam/:year/page/:currentPage", async (req, res) => {
  const { year, currentPage } = req.params;
  let itemPerPage = config.itemPerPage;
  const promMenu = MovieModel.getMenu();
  const promTotalMovies = MovieSerieModel.countMovieByYear(year);
  let [menu, totalMovies] = await Promise.all([promMenu, promTotalMovies]);
  let totalPage =
    totalMovies <= itemPerPage ? 1 : Math.ceil(totalMovies / itemPerPage);
  let skipItem = (currentPage - 1) * itemPerPage;
  let listMovies = await MovieSerieModel.findMovieByYear(
    year,
    itemPerPage,
    skipItem
  );

  res.render("series-view/year", {
    title: "Movie - Năm phát hành " + year,
    movie: null,
    listMovies: listMovies,
    menu: menu,
    year: year,
    totalPage: totalPage,
    currentPage: currentPage,
    isShowPaging: itemPerPage < totalMovies,
    parentLink: `/phim-bo/nam/${year}`,
  });
});

//Page tim kiem
router.get("/tim-kiem/:name/page/:currentPage", async (req, res) => {
  const { name, currentPage } = req.params;
  let itemPerPage = config.itemPerPage;

  const promMenu = MovieModel.getMenu();
  const promTotalMovies = MovieSerieModel.countMovieByName(name);
  let [menu, totalMovies] = await Promise.all([promMenu, promTotalMovies]);

  let totalPage =
    totalMovies <= itemPerPage ? 1 : Math.ceil(totalMovies / itemPerPage);
  let skipItem = (currentPage - 1) * itemPerPage;
  let listMovies = await MovieSerieModel.findMovieByName(
    name,
    itemPerPage,
    skipItem
  );

  res.render("series-view/search", {
    title: "Movie - Tìm kiếm " + name,
    movie: null,
    listMovies: listMovies,
    menu: menu,
    search: decodeURIComponent(name),
    currentPage: currentPage,
    totalPage: totalPage,
    isShowPaging: itemPerPage < totalMovies,
    parentLink: `/phim-bo/tim-kiem/${encodeURIComponent(name)}`,
  });
});

module.exports = router;
