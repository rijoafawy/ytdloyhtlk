const bluebird = require("bluebird");
const fs = require("fs");
const AWS = require("aws-sdk");
require("aws-sdk/lib/maintenance_mode_message").suppress = true;
const puppeteer = require("puppeteer-extra");
const useProxy = require("@stableproxy/puppeteer-page-proxy");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");

puppeteer.use(StealthPlugin());

const IDRIVE_ENPOINT = "d4b6.or4.idrivee2-60.com";
const IDRIVE_ACCESS_KEY_ID = "5ce3lLJdmdBVLqcX7RPD";
const IDRIVE_SECRET_ACCESS_KEY = "a6USwSGtrxBDlV2n19XUJWcMt69ivtpu5zm63Hfi";
const BUCKET_NAME = "alchemy-dwi-cookies";

const CONCURENCY = 2;
const HEADLESS = false; // HEADLESS  false or false;

const USE_PROXY = false;
const PROTOCOL = "http";
const PROXY_HOST = "gate.smartproxy.com";
const PROXY_PORT = "7000";
const PROXY_USERNAME = "spoj3coqzt";
const PROXY_PASSWORD = "ttZaB35y17tG~Ocsdw";

const dataAccount = `
dajgwga@niceminute.com,@@Masuk123#oZ,0xe103b306d59b6ad756c592b205d989a53af2eb68
matt833@niceminute.com,@@Masuk123#oZ,0x5c979392c8e3c117a477fe02d2d3f22f00ef9d3f
funfunnyfish@niceminute.com,@@Masuk123#oZ,0x67133e14002637b5fe7b7edd59a45306c3327cfc
amaurycolon@niceminute.com,@@Masuk123#oZ,0x54259ffaa7054ab876a3a18886c980dfc90ebff0
viktrskv@niceminute.com,@@Masuk123#oZ,0x743b9a4e541e106578edcc871b341f220bf979cc
graysmark1@niceminute.com,@@Masuk123#oZ,0xeecd54e68709e164b76c17766803288227b77d44
ericag@niceminute.com,@@Masuk123#oZ,0x2a688c6f3121fae7cdb45da945f7f0a36fde74cc
supergebster@niceminute.com,@@Masuk123#oZ,0xf014a65aea21d9df652803f2ac58d40903225eca
mzlissa576@niceminute.com,@@Masuk123#oZ,0xd1ac3fd1a91239bda5cc93d34df0187e975101db
gervlz@niceminute.com,@@Masuk123#oZ,0xea9ab5afb57f6b22f3de072f797a72bfbd62e77b
elenagorfinotd@niceminute.com,@@Masuk123#oZ,0x0e6ece6e66509ce364bfb73c09a798ef0017e416
timonkms@niceminute.com,@@Masuk123#oZ,0x970c4c5a94b37da3929aaabb0ca1ae034973c3df
golovko1946@niceminute.com,@@Masuk123#oZ,0x1fe901909ef5b9f171a882d66c39f2251888ff80
soldner3@niceminute.com,@@Masuk123#oZ,0xb582d31c535fcfdc3860e6fbf95816c6be11952a
gtimilty@niceminute.com,@@Masuk123#oZ,0x97c2c62bd43e71024e5c395eb2b5c0977c858f5f
lanmusasa@niceminute.com,@@Masuk123#oZ,0x88ee32dc09c79507dabc2350d731889355d1acc8
disnotbetty@niceminute.com,@@Masuk123#oZ,0x7d5644a85c5813fdb284717b60d309d3ff784eb1
gulnura99@niceminute.com,@@Masuk123#oZ,0x5c7a627a2fcd9386e7015bf28c19f2bab5a87933
6i14cx@niceminute.com,@@Masuk123#oZ,0xe39c7df7f59711dbd8bfc77800a8a2019748b883
maleinik@niceminute.com,@@Masuk123#oZ,0x03f5a762fa43f9fe79d33c42d615cb591357253f
eoxignca@niceminute.com,@@Masuk123#oZ,0x172ad6642b91981f99bbcf966a35037c1a8b055c
chubb66@niceminute.com,@@Masuk123#oZ,0xb043fa2c2480cefbf9889fea21f789f3fa32b1c7
economkum@niceminute.com,@@Masuk123#oZ,0xbdc81a08d1a2f018c2e7f942bbd6f3d35fb3e6d8
dickerman@niceminute.com,@@Masuk123#oZ,0x1e3025a35bcb3f48e35e448cab22b7087219593a
slavatwo@niceminute.com,@@Masuk123#oZ,0xdb76c23cb1b4aaf70506573223f2d3aa84e25a5c
mariadopustim@niceminute.com,@@Masuk123#oZ,0xae01589e2cccb2331f530c70da7e6b038f297c6b
svetam212n@niceminute.com,@@Masuk123#oZ,0x9c2ae1952251e7b738c6f54c0c559c4fb7e263fa
djcraig1@niceminute.com,@@Masuk123#oZ,0xb47f99e4d145128d444645b32b09e47ce64dc121
ivkondr@niceminute.com,@@Masuk123#oZ,0xd571e80a19a6621f70909523180fb7c617c5ab61
mohamadkh5@niceminute.com,@@Masuk123#oZ,0x78ff226e54087f068a379d78deb416dd3c972873
periander@niceminute.com,@@Masuk123#oZ,0x8b9dfd4ef17121a1b27d3e3a8c48eba0dd0ab459
denisovaargunovaolg@niceminute.com,@@Masuk123#oZ,0x70531315effbd33cc2410ebe491576da994cbed1
degweb42@niceminute.com,@@Masuk123#oZ,0x9702d12ed9cfc8bc15d14647f5dc2645118a0e5e
bostrom@niceminute.com,@@Masuk123#oZ,0xf05bfa7a2e3c09c438c5c1ecb5aaa1d996719612
belikin97@niceminute.com,@@Masuk123#oZ,0x63ac331df350a8f79c3bab5c0f63682da518b8ec
3jf23@niceminute.com,@@Masuk123#oZ,0xfc04698c99fb08aeddfbeca46bfb0225467d6e71
nokian82vrn@niceminute.com,@@Masuk123#oZ,0xe6fb0f1def8d6fb2d7d85624eeb6966758f879f6
agk4@niceminute.com,@@Masuk123#oZ,0x667a9786ad1ddf7b1da9a7dbb16561b0e0326145
flashwizerd@niceminute.com,@@Masuk123#oZ,0xa5f724462e69a0ed1c2c9fb63d3b87e1754e8298
hhgghh81@niceminute.com,@@Masuk123#oZ,0xa6d3175c18e5d87617ce8e43ce062546318c8582
kfgjnjr@niceminute.com,@@Masuk123#oZ,0xcdadd2409a9d5047458c25c172363b3898b706aa
aez999139@niceminute.com,@@Masuk123#oZ,0x5ec3da4a1a460d5f3c815412c5cc442bcab0df6c
mispolina@niceminute.com,@@Masuk123#oZ,0x32bcb477f6e372de0ba0d4ecef4753f78bbed90b
greg770@niceminute.com,@@Masuk123#oZ,0xf7b4c542b8da9d507c22caccae99b10f52440773
ivonmarina@niceminute.com,@@Masuk123#oZ,0x738e4ba56cd7a4ce9deb08b373b920dd148161cf
abrek16@niceminute.com,@@Masuk123#oZ,0xaa444b88b59db40f3c5e07a5f7913345d26bc6d9
minyaevaoksana@niceminute.com,@@Masuk123#oZ,0xab889353eb1193250e65b01dae3aa98bd40d1106
t1g3r666@niceminute.com,@@Masuk123#oZ,0x572c92dc77e10b159aee6dd07e345b7f90935479
thecuspid@niceminute.com,@@Masuk123#oZ,0xc4d44eb893730794683da4d32a01cebb64fd26cd
levochka2004@niceminute.com,@@Masuk123#oZ,0x6a1d3e6f432ac41f01e17ec9fa8313ff6e527fa6
lauraburkova@niceminute.com,@@Masuk123#oZ,0xfc99e3f9e7bc4d10616350b4f169fb977fdb5f93
loshadkastop@niceminute.com,@@Masuk123#oZ,0xd852e9bc5878dbeb13229627b802fa00fe7bd206
oqacavuridonoj@niceminute.com,@@Masuk123#oZ,0x6cd239d8507f74e1c93900b39e5432977b27b794
sanking@niceminute.com,@@Masuk123#oZ,0x240a8286417778af0d57d737160b387b607ec7bf
sovetscoekino@niceminute.com,@@Masuk123#oZ,0xc9ac7eeda4db1b75872d24f50db52de047182a70
landtolu@niceminute.com,@@Masuk123#oZ,0x447a958b914961b7f0fe46b87b0548de97bd0f8c
ateterya@gasss.net,@@Masuk123#oZ,0x3b1926930ff78d261942442249dae2d9fd832fc1
wacodave@gasss.net,@@Masuk123#oZ,0xeee93fca879e34be0db40cf08194671d29818398
olg518527554@gasss.net,@@Masuk123#oZ,0x7cd4c5a0aa4e4048dd7207c4cff114614f2e2670
hawk1711@gasss.net,@@Masuk123#oZ,0xf73a00ec462b1b88cfcc34180782d7264ba9571f
kylis707@gasss.net,@@Masuk123#oZ,0xa7d3fb1575bc5d4d7915f07680cdc81ffdf6f64d
gtroach@gasss.net,@@Masuk123#oZ,0x2b0f2b5b0c680fcc0a3fac8e37a5258508aa410c
scarsnb@gasss.net,@@Masuk123#oZ,0xaf4d6368281ac795bfe134f544f15b52dd529046
vasek8708@gasss.net,@@Masuk123#oZ,0x136263dd9ee1fb28a05db6e9639b35876f883451
alexdubinsky@gasss.net,@@Masuk123#oZ,0x608906de780b409f3506b8d92e87276724dabbe4
vladmurash@gasss.net,@@Masuk123#oZ,0x741a1255982a557b3b443710c213b7dc97f9ac84
north1043@gasss.net,@@Masuk123#oZ,0xeabb90ae14c50e59126a474031add2362969d17c
gurnkiller@gasss.net,@@Masuk123#oZ,0x4ba33a7de593cef141f6e8399f1c22f1e9c56d47
aimbad@gasss.net,@@Masuk123#oZ,0xaf04a3d0010a3f51cb01cdfc1746df8daa7c7ec0
gbeasly@gasss.net,@@Masuk123#oZ,0x51ac91c3f4c0b0cc6d2562c9492ad93b9ee49ac6
dmeddac@gasss.net,@@Masuk123#oZ,0x025e2a0360e9565b2f6c20c864f7cefab0fbbaad
jrriki@gasss.net,@@Masuk123#oZ,0x8ddd60d0f70ddba3e223dc72ff98f67c95ed4566
servicepromalp@gasss.net,@@Masuk123#oZ,0x22fe033b65c23241139b38fbe1123914b0267fcd
dominicchimangah@gasss.net,@@Masuk123#oZ,0xda7d25f6d399c95567b5a023eddcce79c355ba51
lube2009@gasss.net,@@Masuk123#oZ,0xaa5b47fa69cb8f7d395895d8366406ac590b0f5e
morikawa@gasss.net,@@Masuk123#oZ,0xc01a5766e4d0c0e910d00fa7c14d44be5f675036
ranisarilla@gasss.net,@@Masuk123#oZ,0x0f9ede3de6b07de976b4321c00d924d6cc839f9b
mary4mercy04@gasss.net,@@Masuk123#oZ,0x218a04e80f194a34cafde59831e1e3cb2ab7e3f1
dcstanle@gasss.net,@@Masuk123#oZ,0xb006a8dd379824440275e90a8d6ba97638071248
baldwinbaldwin@gasss.net,@@Masuk123#oZ,0x6bd7c597b8c0a7cac7ab6e7240a3258ee74e0627
tomster32@gasss.net,@@Masuk123#oZ,0x81f7b8beec9727713295d6a5634f6cb215953c80
tommygun50@gasss.net,@@Masuk123#oZ,0x1a6a769c5fb1cde06958f72e8a33401eb3117081
bibej@gasss.net,@@Masuk123#oZ,0x5e1d9b325d6fcd0c60de3185e81948bb5ebf93e6
divxcj@gasss.net,@@Masuk123#oZ,0xae2ef31f91adca623c4711d973271ef32c999dbe
wetmoore@niceminute.com,@@Masuk123#oZ,0xaa64b9ead2e356ceeabd2ee59d516d17e7d93138
glockki@niceminute.com,@@Masuk123#oZ,0xadacdf51a582c14e2aedfc23e779600e91d82bd0
mshoff@niceminute.com,@@Masuk123#oZ,0xf87b39204e2feef0432f540130cc79c40a98e656
igordorpa@niceminute.com,@@Masuk123#oZ,0x7555d6e67dae94af1c6dd62fd90ae5cedc382fc9
irishtop@niceminute.com,@@Masuk123#oZ,0xb7e974fa1e0aee7d4ebcd5159beb578dadd36a2e
jayson123@niceminute.com,@@Masuk123#oZ,0x7e271c80cab84ad90e0d4cdbdc289a71c0e69cbd
desasch@niceminute.com,@@Masuk123#oZ,0x40de88debae243bc5bd506f7fa6abee384ee3495
vpc54mmo@niceminute.com,@@Masuk123#oZ,0x0bccbc8f4a694f8e55b501d901f5edc6603dfdf2
brandon1@niceminute.com,@@Masuk123#oZ,0x6e3439c9faf0ae0993732fc133d06cdcc5edccbb
fthreecats@niceminute.com,@@Masuk123#oZ,0xe9ca06a5df493f6840b98348766efe6956a49b0e
byaek@niceminute.com,@@Masuk123#oZ,0x60d9b54a53e06315e93bd344c38dc720386ed40a
pg1234562@niceminute.com,@@Masuk123#oZ,0x0aaca9959726fec0a7bfacdf7dfaa851e2e28bed
esmerald686@niceminute.com,@@Masuk123#oZ,0xac126a33ce96bb5d8e2e3505140d02105e3abf26
shapi8602@niceminute.com,@@Masuk123#oZ,0x0c2b79808f7496d5b52b8a109b6f23fc782545bd
kimcjimenez@niceminute.com,@@Masuk123#oZ,0x388c022f8f707c398861e7633f7681949576363a
business77@niceminute.com,@@Masuk123#oZ,0xaaa810ddecd9375ed2d40063ebdb27d17d181c95
`;

const waiting = (time) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};

const getData = (data, start, end) => {
  const splitData = data.split(/\r?\n/).filter((n) => n);
  const sliceData = splitData.slice(start, end);
  return sliceData;
};

const s3 = () => {
  const endpoint = new AWS.Endpoint(IDRIVE_ENPOINT);
  const s3 = new AWS.S3({
    endpoint: endpoint,
    accessKeyId: IDRIVE_ACCESS_KEY_ID,
    secretAccessKey: IDRIVE_SECRET_ACCESS_KEY,
  });

  return s3;
};

const existsBucket = async (bucketName) => {
  try {
    await listObjects(bucketName);

    return true;
  } catch (err) {
    if (err.code == "NoSuchBucket") {
      return false;
    } else {
      throw err;
    }
  }
};

const listObjects = (bucketName) => {
  return new Promise((resolve, reject) => {
    const data = {
      Bucket: bucketName,
    };

    s3().listObjects(data, function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

const getObject = (bucketName, fileName) => {
  return new Promise((resolve, reject) => {
    const data = {
      Bucket: bucketName,
      Key: fileName,
    };

    s3().getObject(data, function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

const createObject = async (obj, bucketName, fileName) => {
  const buf = Buffer.from(JSON.stringify(obj));

  return new Promise((resolve, reject) => {
    const data = {
      Bucket: bucketName,
      Key: fileName,
      Body: buf,
      ContentEncoding: "base64",
      ContentType: "application/json",
      ACL: "private",
    };

    s3().upload(data, function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

const checkExistsObject = async (bucketName, fileName) => {
  try {
    await getObject(bucketName, fileName);

    return true;
  } catch (err) {
    if (err && (err.code == "NoSuchKey" || err.code == "NoSuchBucket"))
      return false;
  }
};

const saveCookies = async (page, cookieFile) => {
  const session = await page.target().createCDPSession();
  const reaponseCookies = await session.send("Network.getAllCookies");

  await session.detach();
  await createObject(reaponseCookies.cookies, BUCKET_NAME, cookieFile);
};

const loadCookies = async (page, cookieFile) => {
  const session = await page.target().createCDPSession();
  const cookies = JSON.parse(cookieFile);
  await session.send("Network.setCookies", {
    cookies: cookies,
  });
  await session.detach();
};

const retryElement = async (page, element, xpath = false, retryCount = 1) => {
  try {
    if (xpath) {
      return await page.waitForXPath(element, { timeout: 8000 });
    } else {
      return await page.waitForSelector(element, { timeout: 8000 });
    }
  } catch (err) {
    if (retryCount <= 0) {
      throw err;
    }
    const currentUrl = await page.url();
    await page.goto(currentUrl, { waitUntil: "networkidle2" });

    return await retryElement(page, element, (xpath = false), retryCount - 1);
  }
};

const launchBrowser = async () => {
  try {
    let browser;

    let args = [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-accelerated-2d-canvas",
      "--disable-notifications",
      "--no-first-run",
      "--disable-gpu",
      // "--start-maximized",
      "--disable-infobars",
      "--disable-web-security",
      "--ignore-certificate-errors",
      "--disable-background-timer-throttling",
      "--disable-backgrounding-occluded-windows",
      "--disable-features=IsolateOrigins,site-per-process,SitePerProcess",
      "--flag-switches-begin --disable-site-isolation-trials --flag-switches-end",
    ];

    const proxyHost = `${PROTOCOL}://${PROXY_HOST}:${PROXY_PORT}`;

    USE_PROXY ? args.push(`--proxy-server=${proxyHost}`) : null;

    let browserOptions = {
      executablePath: process.env.PUPPETEER_EXEC_PATH,
      headless: HEADLESS,
      ignoreHTTPSErrors: true,
      acceptInsecureCerts: true,
      defaultViewport: null,
      args: args,
    };

    browser = await puppeteer.launch(browserOptions);
    const context = browser.defaultBrowserContext();

    context.overridePermissions("https://auth.alchemy.com", [
      "geolocation",
      "notifications",
    ]);
    context.overridePermissions("https://www.alchemy.com", [
      "geolocation",
      "notifications",
    ]);

    const [page] = await browser.pages();

    if (USE_PROXY) {
      await page.authenticate({
        username: PROXY_USERNAME,
        password: PROXY_PASSWORD,
      });
    }

    await page.setRequestInterception(true);
    const rejectRequestPattern = [
      "googlesyndication.com",
      "/*.doubleclick.net",
      "/*.amazon-adsystem.com",
      "/*.adnxs.com",
      "/*.ads.net",
    ];
    const blockList = [];
    page.on("request", (request) => {
      if (
        rejectRequestPattern.find((pattern) => request.url().match(pattern))
      ) {
        blockList.push(request.url());
        request.abort();
      } else request.continue();
    });

    return { page, browser };
  } catch (err) {
    console.log(`Browser ${err}`);
  }
};

const login = async (page, email, password) => {
  try {
    await page.goto("https://www.alchemy.com/faucets/arbitrum-sepolia", {
      waitUntil: "networkidle2",
    });

    const cookieFile = `${email}.json`;

    const isExistCookies = await checkExistsObject(BUCKET_NAME, cookieFile);

    if (isExistCookies) {
      const getCookies = await getObject(BUCKET_NAME, cookieFile);
      const cookies = getCookies.Body.toString("utf-8");
      await loadCookies(page, cookies);
    }

    await waiting(5000);

    const logoutButtonElm = await page.$$eval("button", (button) => {
      const logoutButton = button.find(
        (btn) => btn.textContent.trim() == "Logout"
      );

      if (logoutButton) {
        return true;
      }

      return false;
    });

    if (logoutButtonElm) {
      return true;
    }

    await page.$$eval("button", (button) => {
      const loginButton = button.find(
        (btn) => btn.textContent.trim() == "Alchemy Login"
      );

      if (loginButton) {
        loginButton.focus();
        loginButton.click();
      }
    });

    await waiting(10000);

    try {
      await retryElement(page, 'input[type="email"]');

      const inputUser = await page.$('input[type="email"]');
      await page.evaluate((user) => {
        user.focus();
        user.click();
      }, inputUser);
      await page.keyboard.type(email);

      const inputPass = await page.$('input[type="password"]');
      await page.evaluate((pass) => {
        pass.focus();
        pass.click();
      }, inputPass);
      await page.keyboard.type(password);

      await page.waitForSelector('button[type="submit"]');
      const buttonLogin = await page.$('button[type="submit"]');

      await page.evaluate((login) => {
        login.click();
      }, buttonLogin);

      await waiting(15000);

      await saveCookies(page, cookieFile);
    } catch (err) {}

    return true;
  } catch (err) {
    console.log(`[${email}] - Login error ${err}`);
  }
};
const claimFoucet = async (page, email, wallet) => {
  let success = false;
  let retry = 0;
  let maxTry = 3;
  let message = "";

  try {
    while (!success && retry <= maxTry) {
      await waiting(2000);

      await retryElement(page, 'form input[type="text"]');
      const walletInputElm = await page.$('form input[type="text"]');

      await page.evaluate((walletInput) => {
        walletInput.focus();
        walletInput.click();
      }, walletInputElm);

      await page.keyboard.down("Control");
      await page.keyboard.press("A");
      await page.keyboard.up("Control");
      await page.keyboard.press("Backspace");
      await page.keyboard.sendCharacter(wallet);

      await page.waitForXPath('//div/button[contains(., "Send Me ETH")]');

      const [sendButtonElm] = await page.$x(
        '//div/button[contains(., "Send Me ETH")]'
      );

      await waiting(2000);

      await sendButtonElm.click();

      await waiting(4000);

      const successClaimElm = await page.$x(
        '//*[@id="root"]/div[1]/div[2]/div[3]/div[2]/div/div[2]/div/div[2]'
      );

      if (successClaimElm !== "undefined" && successClaimElm.length > 0) {
        console.log(`[${email}] - BERHASIL CLAIM ARBIT !!`);
        success = true;
        return true;
      } else {
        const [spanMessageElm] = await page.$x('//div[@role="alert"]/span');

        let textMessage = await page.evaluate(
          (element) => element.textContent.trim(),
          spanMessageElm
        );

        message = textMessage;

        retry++;

        await waiting(3000);
      }
    }

    console.log(`[${email}] - GAGAL CLAIM ARBIT ${message}`);
    return true;
  } catch (err) {
    console.log(`[${email}] - TERJADI ERROR: ${err}`);
  }
};

const bot = async (page, account) => {
  let success = false;
  try {
    await page.bringToFront();
    const client = await page.target().createCDPSession();
    await client.send("Network.clearBrowserCookies");
    await client.send("Network.clearBrowserCache");
    await client.send("Page.enable");
    await client.send("Page.setWebLifecycleState", { state: "active" });

    const data = account.split(",");
    const email = data[0];
    const password = data[1];
    const wallet = data[2];

    const sigin = await login(page, email, password);

    if (sigin) {
      success = await claimFoucet(page, email, wallet);
    }

    return success;
  } catch (err) {
    console.log(err);
  }
};
(async () => {
  const args = process.argv;

  // const startData = parseInt(args[2]);
  // const endData = parseInt(args[3]);

  // if (!startData && !endData) {
  //   console.log(`Params require "node run.js 0 5"`);
  //   process.exit();
  // }

  // For github action
  const rangeDate = process.env.RANGE_INDEX;
  const splitDate = rangeDate.split(",");
  const startData = splitDate[0];
  const endData = splitDate[1];

  const accounts = getData(dataAccount, startData, endData);

  return bluebird.map(
    accounts,
    async (account) => {
      const { page, browser } = await launchBrowser();

      try {
        await bot(page, account);
      } catch (err) {
        await browser.close();
      }

      await browser.close();
    },
    { concurrency: CONCURENCY }
  );
})();
