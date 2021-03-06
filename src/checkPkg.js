import child_process from "child_process";
const exec = child_process.exec;
const MAX_BUFFER_SIZE = 1024 * 10000;

const checkPkg = (pkgName, options) => {
  return new Promise((resolve, reject) => {
    exec(
      `npm ls --json --parseable --depth=0 --global ${options.global ||
        false} ${pkgName}`,
      { cwd: options.cwd, maxBuffer: MAX_BUFFER_SIZE },
      (_, stdout) => {
        let pkgJSON;
        try {
          pkgJSON = JSON.parse(stdout);
        } catch (err) {
          return reject(`Parsing error "npm ls --json... ${err}`);
        }

        if (pkgJSON && pkgJSON.dependencies && pkgJSON.dependencies[pkgName])
          return resolve(true);
        else return resolve(false);
      }
    );
  });
};

export default checkPkg;
