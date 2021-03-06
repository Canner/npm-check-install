import checkPkg from "./checkPkg";
import installPkg from "./installPkg";
import { info } from "./utils";

const npmCheckInstall = (
  pkgName,
  options = { cwd: process.cwd(), global: false }
) => {
  return new Promise(async (resolve, reject) => {
    if (!pkgName) reject(`Package Name is required!`);

    try {
      const hasFound = await checkPkg(pkgName, options);
      if (!hasFound) {
        console.log(info(`Package "${pkgName}" not found.`));
        await installPkg(pkgName, options);
      }
      resolve(hasFound);
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = npmCheckInstall;
