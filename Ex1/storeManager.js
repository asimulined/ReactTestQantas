// 2.
const getData = (url, callback = data => data) =>
  callback(request.get(url), url);

const saveToDb = data => db.save(data);

const processData = urls => {
  return urls.map(getData).map(saveToDb);
};

// 3./(\.)?test\.com$/i
const logWithSpecialUrl = urlRegex => log => (data, url) => {
  if (urlRegex.test(url)) {
    log(data);
  }
  return data;
};

const processDataWithLogging = urls => {
  const urlPatterns = /(\.)?test\.com$/i;
  const log = logWithSpecialUrl(urlPatterns)(console.log);
  return urls.map(url => getData(url, log)).map(saveToDb);
};

// 4.
const findAllTryToCookie = () => db.find("trySetCookie", /^(?!\s*$).+/);
