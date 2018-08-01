const request = require('request')
const parser = require('xml2json');
const envHelper = require('./../environmentVariablesHelper.js')
const bodyParser = require('body-parser')
const uuidv1 = require('uuid')

module.exports = function (app) {
  app.get('/rssfeed/news', bodyParser.json({ limit: '10mb' }), createAndValidateRequestBody,
  getNewsRssFeed);

  app.get('/rssfeed/opportunities', bodyParser.json({ limit: '10mb' }), createAndValidateRequestBody,
  getOpportunitesRssFeed);
}


/**
 * This function is useful to modify date for certificate
 * @param {String} reqDate 
 * @return {String}
 */
function getCertificateDate (reqDate) {
  var date = reqDate ? new Date(reqDate) : new Date()
  return moment(date).format('DD-MMM-YYYY')
}

/**
 * This middleware function is used to validate request body and create response structure
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next : Middleware function, used to perform next operation
 */
function createAndValidateRequestBody (req, res, next) {
  req.body = req.body || {}
  req.body.ts = new Date()
  req.body.url = req.url
  req.body.path = req.route.path
  req.body.params = req.body.params ? req.body.params : {}
  req.body.params.msgid = req.headers['msgid'] || req.body.params.msgid || uuidv1()

  var rspObj = {
    apiId: 'api.news.rss',
    path: req.body.path,
    apiVersion: '1.0',
    msgid: req.body.params.msgid,
    result: {},
    startTime: new Date(),
    method: req.originalMethod
  }
  var removedHeaders = ['host', 'origin', 'accept', 'referer', 'content-length', 'user-agent', 'accept-encoding',
    'accept-language', 'accept-charset', 'cookie', 'dnt', 'postman-token', 'cache-control', 'connection']

  removedHeaders.forEach(function (e) {
    delete req.headers[e]
  })
  req.rspObj = rspObj
  next()
}

/**
 * This function helps to return success response
 * @param {Object} data 
 * @returns {Object} Success response object
 */
function successResponse (data) {
  var response = {}
  response.id = data.apiId
  response.ver = data.apiVersion
  response.ts = new Date()
  response.params = getParams(data.msgid, 'successful', null, null)
  response.responseCode = data.responseCode || 'OK'
  response.result = data.result
  return response
}

/**
 * this function create error response body.
 * @param {Object} data
 * @returns {nm$_responseUtil.errorResponse.response}
 */
function errorResponse (data) {
  var response = {}
  response.id = data.apiId
  response.ver = data.apiVersion
  response.ts = new Date()
  response.params = getParams(data.msgId, 'failed', data.errCode, data.errMsg)
  response.responseCode = data.responseCode
  response.result = data.result
  return response
}

/**
 * This function is use to get params data for response
 * @param {string} msgId 
 * @param {string} status 
 * @param {string} errCode 
 * @param {string} msg 
 * @return {object} response params object
 */
function getParams (msgId, status, errCode, msg) {
  var params = {}
  params.resmsgid = uuidv1()
  params.msgid = msgId || null
  params.status = status
  params.err = errCode
  params.errmsg = msg

  return params
}

function getNewsRssFeed(req, res) {
  var options = {
    url: envHelper.JALDHARA_NEWS_RSS_FEED_URL,
    method: 'GET',
    json: true
  };
  const rspObj = req.rspObj

  request(options, function (err, response, body) {
    if (err && !body) {
      console.log('Error while fetch rss feed', JSON.stringify(err))
      rspObj.errCode = 'SERVER_ERROR'
      rspObj.errMsg = 'fetching news feed failed, Please try again later...'
      rspObj.responseCode = 'SERVER_ERROR'
      return res.status(500).send(errorResponse(rspObj))
    } else {
      try {
        let resultData = []
        let parseData = JSON.parse(parser.toJson(response.body))
        let rssItems = parseData.rss.channel.item;
        rssItems.forEach(element => {
          const description = JSON.parse(parser.toJson(element.description))
          const data = {
            title: element.title,
            link: element.link,
            description: description && description.meta && description.meta.content
          }
          data && data.description && resultData.push(data)
        });
        rspObj.result = resultData
        return res.status(200).send(successResponse(rspObj))
      }
      catch(err) {
        rspObj.errCode = 'INTERNAL_SERVER_ERROR'
        rspObj.errMsg = 'fetching news feed failed, Please try again later...'
        rspObj.responseCode = 'SERVER_ERROR'
        return res.status(500).send(errorResponse(rspObj))
      }
    }
  });

}

function getOpportunitesRssFeed(req, res) {
  var options = {
    url: envHelper.JALDHARA_OPPORTUNITIES_RSS_FEED_URL,
    method: 'GET',
    json: true
  };
  const rspObj = req.rspObj

  request(options, function (err, response, body) {
    if (err && !body) {
      console.log('Error while fetch rss feed', JSON.stringify(err))
      rspObj.errCode = 'SERVER_ERROR'
      rspObj.errMsg = 'fetching opportunites feed failed, Please try again later...'
      rspObj.responseCode = 'SERVER_ERROR'
      return res.status(500).send(errorResponse(rspObj))
    } else {
      try {
        let resultData = []
        let parseData = JSON.parse(parser.toJson(response.body))
        let rssItems = parseData.rss.channel.item;
        rssItems.forEach(element => {
          const data = {
            title: element.title,
            link: element.link
          }
          data && resultData.push(data)
        });
        rspObj.result = resultData
        return res.status(200).send(successResponse(rspObj))
      }
      catch(err) {
        rspObj.errCode = 'INTERNAL_SERVER_ERROR'
        rspObj.errMsg = 'fetching opportunites feed failed, Please try again later...'
        rspObj.responseCode = 'SERVER_ERROR'
        return res.status(500).send(errorResponse(rspObj))
      }
    }
  });

}
//getNewsRssFeed()

module.exports.getNewsRssFeed = getNewsRssFeed;
module.exports.getOpportunitesRssFeed = getOpportunitesRssFeed