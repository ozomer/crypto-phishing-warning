const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.increasePageViews = functions.https.onRequest(async (req, res) => {
  // The counters are separated from the global static data, so changes will trigger
  // minimal changes in the react app.
  try {
    if (req.method !== 'POST') {
      console.info(`Bad method: ${req.method}`);
      res.status(400);
      res.json({
        ok: false,
        reason: 'Bad request method',
      });
      return;
    }
    const hostname = `${req.hostname}`.replace(/^www\.$/, '').slice(0, 100);
    // We cannot use common.js here
    console.info(`handling hostname: ${hostname}`);
    const key = (/^[a-zA-Z0-9][a-zA-Z0-9.\-_]*$/.test(hostname)
    ? hostname
    : `base64:${Buffer.from(hostname).toString('base64')}`);
    console.info(`handling key: ${key}`);
    const docRef = admin.firestore().collection('page-views').doc(key);
    const { exists } = await docRef.get();
    if (!exists) {
      res.status(400);
      res.json({
        ok: false,
        reason: 'Invalid hostname',
      });
    }
    await docRef.update({
      count: admin.firestore.FieldValue.increment(1),
    });
    res.json({
      ok: true,
    });
  } catch (err) {
    console.error(`${err}`);
    console.error(err.stack || err);
    res.status(500);
    res.json({
      ok: false,
      reason: 'Internal Error',
    });
  }
});
