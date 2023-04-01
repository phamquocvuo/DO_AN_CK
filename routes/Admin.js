var express = require("express");
var router = express.Router();

const clonePhim4400 = require("../src/clonePhim4400");
const hostClone = require("../src/config/hostClone");
const checkAdminLogin = require("../src/middleware/checkAdminLogin");

const MovieSerieModel = require("../src/db/model/MovieSerie");
const MovieModel = require("../src/db/model/Movie");
const MovieOptionModel = require("../src/db/model/MovieOption");
const RegionModel = require("../src/db/schema/RegionSchema");
var sessionstorage = require("sessionstorage");
const config = require("../src/config");
const common = require("../src/common");
//Page trang chu

router.get("/",async (req, res, next) => {
  //Phim moi
  const topMovies = MovieModel.getTopMovie(config.itemPerPage);
  //Phim hanh dong
  const hotMovies = MovieModel.findMovieByCategory(
    "phim-hanh-dong",
    config.itemPerPage,
    0
  );
  //Phim viet
  const vietMovies = MovieModel.findMovieByCategory("pr", config.itemPerPage);
  //Danh sach phim bo
  const seriaMovies = MovieSerieModel.getTopListSerieMovie(config.itemPerPage);
  const menu = MovieModel.getMenu();
  let [resTopMV, resHotMV, resSeriaMV, resVietMV, resMenu] = await Promise.all([
    topMovies,
    hotMovies,
    seriaMovies,
    vietMovies,
    menu,
  ]);
  res.render("index", {
    title: "Movies",
    topMovies: resTopMV,
    hotMovies: resHotMV,
    seriaMovies: resSeriaMV,
    vietMovies: resVietMV,
    movie: null,
    menu: resMenu,
  });
});

//Page thong tin phim

module.exports = router;
