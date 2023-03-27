
const common = require('./src/common');
common.initDb();

const clonePhim4400 = require("./src/clonePhim4400");
const phim4400 = async () => {
  await clonePhim4400.getListHomePage("https://xemphimnao.com");
  console.log("========== CLONE DONE ==========");
};
// 
const fullPhim = async () => {
  const cloneFullFim = require("./src/cloneFullFim");
  // await cloneFullFim.getListHomePage("https://www.fullphim.net");
  let count = 4
  for(let i = count ; i >= 1; i--) {
    await cloneFullFim.clonePhimBo(`https://www.fullphim.net/the-loai/phim-bo?d5307828_page=${i}`);
  }
  // await cloneFullFim.clonePhimBo(`https://www.fullphim.net/the-loai/phim-bo`);
  console.log('=========== CLONE DONE ==========');
};
// fullPhim();

const cloneTrangPhim = require('./src/cloneTrangPhim');
const activeCloneTrangPhim = async() => {
  //CLONE PHIM BO
  await cloneTrangPhim.clonePhimBo(`https://trangphim.net`);
  console.log('=========== CLONE DONE ==========');
}


const cloneTopPhimHD = require('./src/cloneTopPhimHD');
const activeCloneTopPhim = async() => {
  await cloneTopPhimHD.getListHomePage(`http://topphimhdz.net/`);
  console.log('=========== CLONE DONE ==========');
}


const cloneXuongPhim = require('./src/cloneXuongPhim');
const activeCloneXuongPhim = async() => {
  await cloneXuongPhim.getListHomePage(`https://tv.alophimhd.com/`);
  console.log('=========== CLONE DONE ==========');
}
const triggerClone = async() => {
  // activeCloneTopPhim();
  activeCloneXuongPhim();
  // phim4400();
}
triggerClone();
module.exports = {
  triggerClone
}